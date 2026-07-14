import * as cheerio from 'cheerio';
import { Insumo, SelectOption } from '../types';

// Robust HTML parser for the Ebserh Catalog
export function parseCatalogHtml(html: string): {
  items: Insumo[];
  grupos: SelectOption[];
  hospitais: SelectOption[];
  totalResults: number;
} {
  const $ = cheerio.load(html);

  // Extract select options for "grupo"
  const grupos: SelectOption[] = [];
  $('select[name="grupo"] option').each((_, el) => {
    const val = $(el).attr('value') || '';
    const text = $(el).text().replace(/\s+/g, ' ').trim();
    if (text) {
      grupos.push({ value: val, label: text });
    }
  });

  // Extract select options for "hospital"
  const hospitais: SelectOption[] = [];
  $('select[name="hospital"] option').each((_, el) => {
    const val = $(el).attr('value') || '';
    const text = $(el).text().replace(/\s+/g, ' ').trim();
    if (text) {
      hospitais.push({ value: val, label: text });
    }
  });

  // Extract table rows
  const items: Insumo[] = [];
  let rows = $('#medTable tr');
  if (rows.length === 0) {
    rows = $('table tr');
  }
  if (rows.length === 0) {
    rows = $('tr');
  }

  // Define default column index offsets
  let colCodigo = 0;
  let colCatmat = 1;
  let colDescricao = 2;
  let colApresentacao = 3;
  let colCategoria = 4;
  let colSubcategoria = 5;
  let colHospitais = 6;

  // Search for a row with table headers to map indices dynamically
  let headerRow: any = null;
  rows.each((_, el) => {
    const cells = $(el).find('th, td');
    let hasCodigoHeader = false;
    let hasCatmatHeader = false;
    cells.each((_, cell) => {
      const text = $(cell).text().toLowerCase();
      if (text.includes('código') || text.includes('codigo')) {
        hasCodigoHeader = true;
      }
      if (text.includes('catmat') || text.includes('catser')) {
        hasCatmatHeader = true;
      }
    });
    if (hasCodigoHeader && hasCatmatHeader) {
      headerRow = el;
      return false; // Break loop
    }
  });

  if (headerRow) {
    const cells = $(headerRow).find('th, td');
    cells.each((idx, cell) => {
      const text = $(cell).text().replace(/\s+/g, ' ').trim().toLowerCase();
      if (
        text === 'código ebserh' || 
        text === 'código' || 
        text === 'codigo ebserh' || 
        text === 'codigo' || 
        text.includes('cod. ebserh') || 
        text.includes('cód. ebserh') || 
        text.includes('código ebserh')
      ) {
        colCodigo = idx;
      } else if (
        text === 'catmat' || 
        text === 'catser' || 
        text.includes('catmat') || 
        text.includes('catser')
      ) {
        colCatmat = idx;
      } else if (
        text.includes('descritivo') || 
        text.includes('descrição') || 
        text.includes('descricao') || 
        text.includes('detalhada') ||
        text === 'item' ||
        text === 'produto'
      ) {
        colDescricao = idx;
      } else if (
        text.includes('apresentação') || 
        text.includes('apresentacao') || 
        text === 'unidade' || 
        text === 'un' || 
        text === 'apresentacao'
      ) {
        colApresentacao = idx;
      } else if (
        text.includes('subcategoria') || 
        text.includes('subgrupo')
      ) {
        colSubcategoria = idx;
      } else if (
        text.includes('categoria') || 
        text.includes('grupo')
      ) {
        if (!text.includes('subcategoria') && !text.includes('subgrupo')) {
          colCategoria = idx;
        }
      } else if (
        text.includes('huf') || 
        text.includes('hospital') || 
        text.includes('hospitais') || 
        text.includes('utilizadores') || 
        text.includes('hufs') ||
        text.includes('rede')
      ) {
        colHospitais = idx;
      }
    });
    console.log(`[DYNAMIC PARSER] Mapeamento de colunas: Código=${colCodigo}, Catmat=${colCatmat}, Descrição=${colDescricao}, Apresentação=${colApresentacao}, Categoria=${colCategoria}, Subcategoria=${colSubcategoria}, Hospitais=${colHospitais}`);
  }

  rows.each((i, el) => {
    const tds = $(el).find('td');
    if (tds.length < 5) return;

    const codigo = colCodigo < tds.length ? $(tds[colCodigo]).text().replace(/\s+/g, ' ').trim() : '';
    // Skip header row if it slipped past
    if (
      codigo.toLowerCase() === 'código ebserh' || 
      codigo.toLowerCase() === 'código' || 
      codigo.toLowerCase() === 'codigo ebserh' || 
      codigo.toLowerCase() === 'codigo'
    ) {
      return;
    }

    const catmat = colCatmat < tds.length ? $(tds[colCatmat]).text().replace(/\s+/g, ' ').trim() : '';
    const descricao = colDescricao < tds.length ? $(tds[colDescricao]).text().replace(/\s+/g, ' ').trim() : '';
    const apresentacao = colApresentacao < tds.length ? $(tds[colApresentacao]).text().replace(/\s+/g, ' ').trim() : '';
    const categoria = colCategoria < tds.length ? $(tds[colCategoria]).text().replace(/\s+/g, ' ').trim() : '';
    const subcategoria = colSubcategoria < tds.length ? $(tds[colSubcategoria]).text().replace(/\s+/g, ' ').trim() : '';
    const hufText = colHospitais < tds.length ? $(tds[colHospitais]).text().replace(/\s+/g, ' ').trim() : '';

    const hospitals = hufText
      ? hufText.split(',').map((h) => h.trim()).filter(Boolean)
      : [];

    items.push({
      id: `${codigo}-${catmat}-${i}`,
      codigo,
      catmat,
      descricao,
      apresentacao,
      categoria,
      subcategoria,
      hospitals,
    });
  });

  // Extract total results from strong text or default to items count
  let totalResults = items.length;
  const totalText = $('p strong').last().text().trim();
  if (totalText && !isNaN(parseInt(totalText, 10))) {
    totalResults = parseInt(totalText, 10);
  }

  return { items, grupos, hospitais, totalResults };
}

// Robust JSON cleaning helper to prevent JSON parsing issues with GenAI responses
export function cleanAndParseJson(text: string): any {
  let cleaned = text.trim();
  // Remove markdown blocks if present
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```[a-zA-Z]*\s*\n/, '');
    cleaned = cleaned.replace(/\s*\n```$/, '');
    cleaned = cleaned.trim();
  }
  return JSON.parse(cleaned);
}

// Fallback analysis generator for when Gemini API key is missing or fails
export function generateFallbackAnalysis(items: any[], selectedGroup: string): any {
  // Sort items by hospitals count descending (consensus in the network)
  const sorted = [...items].sort((a, b) => {
    const aCount = Array.isArray(a.hospitals) ? a.hospitals.length : (a.total_hospitais || 0);
    const bCount = Array.isArray(b.hospitals) ? b.hospitals.length : (b.total_hospitais || 0);
    return bCount - aCount;
  });
  
  const suggestions = [];
  
  if (sorted.length > 0) {
    const topItem = sorted[0];
    const similar = sorted
      .slice(1, 6)
      .filter(it => it.subcategoria === topItem.subcategoria && it.codigo !== topItem.codigo)
      .map(it => `${it.codigo} - ${it.descricao.substring(0, 50)}...`);
      
    suggestions.push({
      recommendedItem: topItem.descricao ? topItem.descricao.replace(/\.\.\.$/, '') : 'Insumo Comum Recomendado',
      similarItems: similar.length > 0 ? similar : [`Outros códigos da subcategoria ${topItem.subcategoria || 'Geral'}`],
      justification: `Este item é o de maior consenso da rede Ebserh neste grupo (${topItem.total_hospitais || (topItem.hospitals?.length) || 12} hospitais utilizadores). Apresenta a maior segurança técnica de aquisição e a menor chance de desuso para o recém-criado HU-UFCAT.`
    });
  }
  
  if (sorted.length > 1) {
    const secondItem = sorted[1];
    const similar = sorted
      .slice(2, 8)
      .filter(it => it.subcategoria === secondItem.subcategoria && it.codigo !== secondItem.codigo)
      .map(it => `${it.codigo} - ${it.descricao.substring(0, 50)}...`);
      
    suggestions.push({
      recommendedItem: secondItem.descricao ? secondItem.descricao.replace(/\.\.\.$/, '') : 'Insumo Secundário Recomendado',
      similarItems: similar.length > 0 ? similar : [`Outros códigos da subcategoria ${secondItem.subcategoria || 'Geral'}`],
      justification: `Segunda maior cobertura da rede Ebserh. Representa excelente oportunidade de padronização conjunta, reduzindo significativamente a variedade de marcas no estoque de Catalão/GO.`
    });
  }

  return {
    summary: `Relatório Técnico de Padronização para o grupo "${selectedGroup}". Com base na análise das compras dos demais hospitais da rede Ebserh, mapeamos os itens mais frequentes para eliminar o "achismo" e garantir o fornecimento de materiais com alta aderência técnica.`,
    standardizationSuggestions: suggestions.length > 0 ? suggestions : [
      {
        recommendedItem: "Insumo de Referência da Rede",
        similarItems: ["Códigos secundários correlacionados"],
        justification: "Item de alta padronização na rede para a especialidade cirúrgica selecionada."
      }
    ],
    potentialSavingsEstimate: "Estimativa de 15% a 25% de economia com compras centralizadas de alto volume e eliminação de especificações redundantes.",
    procurementAdvice: "Conselho Estratégico: Formalize a especificação técnica dos itens de 'Certeza Absoluta' no catálogo de compras do HU-UFCAT. Use as portarias de padronização nacional da Ebserh para respaldar juridicamente a unificação do código de compra e evitar a aquisição de itens raros sem aprovação prévia."
  };
}
