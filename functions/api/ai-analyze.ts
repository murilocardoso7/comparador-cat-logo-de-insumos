import { GoogleGenAI } from '@google/genai';
import { cleanAndParseJson, generateFallbackAnalysis } from '../../src/utils/catalogUtils';

export const onRequest = async (context: any) => {
  if (context.request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (context.request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Método não permitido' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  try {
    const body: any = await context.request.json();
    const { items, selectedGroup } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: 'Nenhum insumo selecionado para análise.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    // Access Gemini API Key from Cloudflare Environment Variables
    const env: any = context.env;
    const apiKey = env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn('GEMINI_API_KEY is missing in Cloudflare environment - using high-fidelity offline network analysis fallback');
      const fallback = generateFallbackAnalysis(items, selectedGroup || 'Todos');
      return new Response(JSON.stringify(fallback), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const itemsSummary = items.map((it: any) => ({
      codigo: it.codigo,
      catmat: it.catmat,
      descricao: it.descricao ? it.descricao.substring(0, 180) + '...' : '',
      subcategoria: it.subcategoria,
      hospitais_utilizadores: Array.isArray(it.hospitals) ? it.hospitals.join(', ') : '',
      total_hospitais: Array.isArray(it.hospitals) ? it.hospitals.length : 0,
    }));

    const prompt = `Você é um analista sênior de compras de insumos médico-hospitalares da Ebserh (Empresa Brasileira de Serviços Hospitalares).
Analise o seguinte lote de insumos pertencentes ao grupo clínico: "${selectedGroup || 'Todos'}".

Estes insumos foram extraídos do catálogo SPIA e mostram quais hospitais os utilizam.
Sua tarefa é comparar os itens, identificar aqueles que mais se repetem (mais comuns) e sugerir oportunidades de padronização, agrupamento de descrições sinônimas ou variações pequenas, estimar economia com centralização de compras e dar conselhos estratégicos voltados para o HU-UFCAT (Catalão/GO), que é um hospital novo querendo eliminar o "achismo" nas compras públicas.

Aqui está o lote de insumos em formato JSON:
${JSON.stringify(itemsSummary, null, 2)}

Retorne um relatório estruturado no seguinte formato JSON (preencha em português do Brasil):
{
  "summary": "Resumo analítico descrevendo a amostragem de insumos e as principais redundâncias encontradas.",
  "standardizationSuggestions": [
    {
      "recommendedItem": "Nome simplificado/padronizado do item recomendado (ex: Agulha de Biópsia Jamshidi 11G)",
      "similarItems": ["Lista de códigos Ebserh ou fragmentos de descrições de itens que correspondem à mesma utilidade e podem ser padronizados juntos"],
      "justification": "Explicação técnica detalhada de por que esses itens são equivalentes e por que devem ser padronizados sob este item."
    }
  ],
  "potentialSavingsEstimate": "Estimativa qualitativa ou percentual de economia potencial de escala (ex: 'De 15% a 25% com licitação conjunta de grande volume')",
  "procurementAdvice": "Conselho estratégico para as equipes de licitação da Sede e dos HUFs sobre como comprar estes insumos mais comuns de forma centralizada e eficiente."
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'OBJECT',
          properties: {
            summary: {
              type: 'STRING',
              description: 'Resumo analítico descrevendo a amostragem de insumos e as principais redundâncias encontradas.'
            },
            standardizationSuggestions: {
              type: 'ARRAY',
              items: {
                type: 'OBJECT',
                properties: {
                  recommendedItem: {
                    type: 'STRING',
                    description: 'Nome simplificado/padronizado do item recomendado (ex: Agulha de Biópsia Jamshidi 11G)'
                  },
                  similarItems: {
                    type: 'ARRAY',
                    items: { type: 'STRING' },
                    description: 'Lista de códigos Ebserh ou fragmentos de descrições de itens que correspondem à mesma utilidade e podem ser padronizados juntos'
                  },
                  justification: {
                    type: 'STRING',
                    description: 'Explicação técnica detalhada de por que esses itens são equivalentes'
                  }
                },
                required: ['recommendedItem', 'similarItems', 'justification']
              }
            },
            potentialSavingsEstimate: {
              type: 'STRING',
              description: 'Estimativa qualitativa ou percentual de economia potencial de escala (ex: De 15% a 25% com licitação conjunta de grande volume)'
            },
            procurementAdvice: {
              type: 'STRING',
              description: 'Conselho estratégico para as equipes de licitação da Sede e dos HUFs sobre como comprar estes insumos mais comuns de forma centralizada e eficiente.'
            }
          },
          required: ['summary', 'standardizationSuggestions', 'potentialSavingsEstimate', 'procurementAdvice']
        },
        systemInstruction: 'Você é um especialista em logística, aquisições públicas brasileiras (Lei 14.133/21) e padronização de materiais de saúde da rede Ebserh.',
      },
    });

    const responseText = response.text || '{}';
    const parsedAnalysis = cleanAndParseJson(responseText);
    
    return new Response(JSON.stringify(parsedAnalysis), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  } catch (err: any) {
    console.error('Gemini API Error in Cloudflare - falling back to offline consensus report:', err);
    // Fallback on failure
    const body: any = await context.request.json().catch(() => ({}));
    const { items, selectedGroup } = body;
    const fallback = generateFallbackAnalysis(items || [], selectedGroup || 'Todos');
    return new Response(JSON.stringify(fallback), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
};
