import React, { useState, useEffect, useMemo } from 'react';
import {
  Database,
  Search,
  Building2,
  Tag,
  Activity,
  FileText,
  Sparkles,
  Plus,
  RefreshCw,
  FileSpreadsheet,
  Layers,
  ShieldAlert,
  Check,
  CheckCircle,
  TrendingUp,
  BarChart3,
  HelpCircle,
  HeartHandshake,
  X,
  ChevronRight,
  Download,
  AlertTriangle,
  FileCode,
  ArrowRightLeft,
  Users,
  Zap
} from 'lucide-react';
import { Insumo, SelectOption, ScrapingResult, GroupMapping, AIAnalysisResponse } from './types';

// The 11 clinical groups defined in user prompt, mapped to appropriate search queries and keywords
const CLINICAL_GROUPS: GroupMapping[] = [
  {
    id: 'cme',
    name: 'CME (Central de Materiais)',
    description: 'Insumos para esterilização, limpeza e autoclave.',
    icon: 'Layers',
    scrapperGroup: 'Insumos para CME',
    keywords: ['cme', 'autoclave', 'esteriliz', 'limpeza', 'indicador', 'fita', 'enzimático', 'grau cirúrgico']
  },
  {
    id: 'centro_cirurgico',
    name: 'Centro Cirúrgico',
    description: 'Instrumentais, fios de sutura, paramentação e adesivos.',
    icon: 'Activity',
    scrapperGroup: 'Instrumental Cirúrgico',
    keywords: ['cirúrgic', 'pinça', 'afastador', 'adesivo cirúrgico', 'fio', 'sutura', 'agulha', 'gaze', 'compressa', 'balão oclusor', 'cânula', 'dreno', 'tampa']
  },
  {
    id: 'raio_x_fixo',
    name: 'Raio-X Fixo',
    description: 'Acessórios e insumos para diagnóstico radiográfico fixo.',
    icon: 'FileText',
    scrapperGroup: 'Insumos para Diagnóstico por Imagem',
    keywords: ['raio-x', 'raio x', 'radiolog', 'chapa', 'filme', 'imagem', 'contraste', 'radiográfico']
  },
  {
    id: 'ultrassonografia',
    name: 'Ultrassonografia Portátil',
    description: 'Gel, transdutores, agulhas ecogênicas e sondas guiadas.',
    icon: 'Activity',
    scrapperGroup: 'Insumos para Diagnóstico por Imagem',
    keywords: ['ultrassom', 'ultrassonografia', 'ecograf', 'portátil', 'eco', 'transdutor', 'chiba', 'agulha core', 'agulha de biópsia', 'agulha de aspiração']
  },
  {
    id: 'endoscopia',
    name: 'Endoscopia Digestiva',
    description: 'Sondas de gastrostomia, pinças e adaptadores endoscópicos.',
    icon: 'Search',
    scrapperGroup: 'Insumos Endoscópicos',
    keywords: ['endoscóp', 'endoscopia', 'gastrostomia', 'gastro', 'peg', 'varizes esofágicas', 'anel para ligadura', 'boca', 'abridor de boca']
  },
  {
    id: 'broncoscopia',
    name: 'Broncoscopia',
    description: 'Agulhas aspirativas transbrônquicas, pinças especiais e materiais respiratórios.',
    icon: 'Activity',
    scrapperGroup: 'Material Respiratório',
    keywords: ['bronco', 'broncoscopia', 'broncoscópic', 'canal de biópsia', 'aspiração transbrônquica']
  },
  {
    id: 'nefrologia',
    name: 'Nefro / Hemodiálise',
    description: 'Insumos para hemodiálise e diálise peritoneal beira-leito.',
    icon: 'RefreshCw',
    scrapperGroup: 'Insumos Hemodialíticos e Nefrológicos',
    keywords: ['hemodiál', 'hemodialítico', 'nefrol', 'diálise', 'renal', 'tenckhoff', 'fístula', 'arterio venosa', 'substituição', 'peritoneal', 'adaptador']
  },
  {
    id: 'transfusional',
    name: 'Agência Transfusional',
    description: 'Insumos para hemoterapia, bolsas de sangue e imunohematologia.',
    icon: 'Layers',
    scrapperGroup: 'Hematologia, Imumologia e Imunohematologia',
    keywords: ['sangue', 'transfus', 'bolsa de sangue', 'hemácia', 'plaqueta', 'imunohematologia', 'anticorpo', 'citometria', 'coleta', 'coleta de sangue']
  },
  {
    id: 'nutricao',
    name: 'Nutrição Enteral/Parenteral',
    description: 'Fórmulas infantis, equipos, bicos de mamadeira e sondários.',
    icon: 'Tag',
    scrapperGroup: 'Fórmulas nutricionais e insumos para sondário e lactário',
    keywords: ['nutriç', 'enteral', 'parenteral', 'sonda', 'fórmula', 'mamadeira', 'bico', 'copo dosador', 'alimentação']
  },
  {
    id: 'raio_x_movel',
    name: 'Raio-X Móvel',
    description: 'Chapas radiográficas móveis, biombos e equipamentos portáteis.',
    icon: 'FileText',
    scrapperGroup: 'Insumos para Diagnóstico por Imagem',
    keywords: ['raio-x móvel', 'raio x móvel', 'móvel', 'c-arm', 'radiologia móvel', 'portátil']
  },
  {
    id: 'eeg',
    name: 'Eletroencefalografia EEG',
    description: 'Agulhas monopolares, eletrodos e pastas condutoras de neurologia.',
    icon: 'Activity',
    scrapperGroup: 'Material de Neurologia',
    keywords: ['eeg', 'eletroencefal', 'eletrodo', 'neurolog', 'monopolar', 'eletromiografia', 'pasta condutora']
  }
];

const DEFAULT_HOSPITAIS = [
  { value: "CH-UFC", label: "CH-UFC" },
  { value: "CH-UFRJ", label: "CH-UFRJ" },
  { value: "CHC-UFPR", label: "CHC-UFPR" },
  { value: "CHU-UFPA", label: "CHU-UFPA" },
  { value: "HC-UFG", label: "HC-UFG" },
  { value: "HC-UFMG", label: "HC-UFMG" },
  { value: "HC-UFPE", label: "HC-UFPE" },
  { value: "HC-UFTM", label: "HC-UFTM" },
  { value: "HC-UFU", label: "HC-UFU" },
  { value: "HDT-UFT", label: "HDT-UFT" },
  { value: "HE-UFPel", label: "HE-UFPel" },
  { value: "HU-FURG", label: "HU-FURG" },
  { value: "HU-UFCAT", label: "HU-UFCAT" },
  { value: "HU-UFGD", label: "HU-UFGD" },
  { value: "HU-UFJF", label: "HU-UFJF" },
  { value: "HU-UFMA", label: "HU-UFMA" },
  { value: "HU-UFPI", label: "HU-UFPI" },
  { value: "HU-UFRR", label: "HU-UFRR" },
  { value: "HU-UFS", label: "HU-UFS" },
  { value: "HU-UFSC", label: "HU-UFSC" },
  { value: "HU-UFSCAR", label: "HU-UFSCAR" },
  { value: "HU-UNIFAP", label: "HU-UNIFAP" },
  { value: "HU-UNIVASF", label: "HU-UNIVASF" },
  { value: "HUAB-UFRN", label: "HUAB-UFRN" },
  { value: "HUAC-UFCG", label: "HUAC-UFCG" },
  { value: "HUAP-UFF", label: "HUAP-UFF" },
  { value: "HUB-UnB", label: "HUB-UnB" },
  { value: "HUCAM-UFES", label: "HUCAM-UFES" },
  { value: "HUGG-UNIRIO", label: "HUGG-UNIRIO" },
  { value: "HUGV-UFAM", label: "HUGV-UFAM" },
  { value: "HUJB-UFCG", label: "HUJB-UFCG" },
  { value: "HUJM-UFMT", label: "HUJM-UFMT" },
  { value: "HUL-UFS", label: "HUL-UFS" },
  { value: "HULW-UFPB", label: "HULW-UFPB" },
  { value: "HUMAP-UFMS", label: "HUMAP-UFMS" },
  { value: "HUOL-UFRN", label: "HUOL-UFRN" },
  { value: "HUPAA-UFAL", label: "HUPAA-UFAL" },
  { value: "HUPES-UFBA", label: "HUPES-UFBA" },
  { value: "HUSM-UFSM", label: "HUSM-UFSM" },
  { value: "MCO-UFBA", label: "MCO-UFBA" },
  { value: "MEJC-UFRN", label: "MEJC-UFRN" }
];

const DEFAULT_GRUPOS = [
  { value: "Acondicionamento e Embalagens Farmacêuticas", label: "Acondicionamento e Embalagens Farmacêuticas" },
  { value: "Agulhas, Seringas E Cateteres (Equipos e Extensores)", label: "Agulhas, Seringas E Cateteres (Equipos e Extensores)" },
  { value: "Fios Cirúrgicos, Clipes e Hemostáticos", label: "Fios Cirúrgicos, Clipes e Hemostáticos" },
  { value: "Fórmulas nutricionais e insumos para sondário e lactário", label: "Fórmulas nutricionais e insumos para sondário e lactário" },
  { value: "Hematologia, Imumologia e Imunohematologia", label: "Hematologia, Imumologia e Imunohematologia" },
  { value: "Instrumental Cirúrgico", label: "Instrumental Cirúrgico" },
  { value: "Insumos Endoscópicos", label: "Insumos Endoscópicos" },
  { value: "Insumos Hemodialíticos e Nefrológicos", label: "Insumos Hemodialíticos e Nefrológicos" },
  { value: "Insumos para CME", label: "Insumos para CME" },
  { value: "Insumos para Diagnóstico por Imagem", label: "Insumos para Diagnóstico por Imagem" },
  { value: "Material de Neurologia", label: "Material de Neurologia" },
  { value: "Material Respiratório", label: "Material Respiratório" }
];

export default function App() {
  // Scraper query state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrupo, setSelectedGrupo] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('');
  const [catmatFilter, setCatmatFilter] = useState('');
  const [codigoFilter, setCodigoFilter] = useState('');

  // UI state
  const [activeClinicalGroupId, setActiveClinicalGroupId] = useState<string | null>(null);
  const [masterData, setMasterData] = useState<Insumo[]>([]);
  const [grupos, setGrupos] = useState<SelectOption[]>(DEFAULT_GRUPOS);
  const [hospitais, setHospitais] = useState<SelectOption[]>(DEFAULT_HOSPITAIS);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState<'live' | 'fallback' | 'user-upload'>('fallback');
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);

  // Manual HTML paste modal / box state
  const [showPasteArea, setShowPasteArea] = useState(false);
  const [pastedHtml, setPastedHtml] = useState('');
  const [pasteError, setPasteError] = useState<string | null>(null);

  // Hospital comparison state (multi-select)
  const [compareHospitals, setCompareHospitals] = useState<string[]>([]);

  // AI Analyst state
  const [aiLoading, setAiLoading] = useState(false);
  const [aiReport, setAiReport] = useState<AIAnalysisResponse | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  // Purchase Simulator and Safe Margin state
  const [simulatedItemCode, setSimulatedItemCode] = useState<string>('');
  const [simulatedMonthlyVolume, setSimulatedMonthlyVolume] = useState<number>(200);
  const [simulatedSafetyBuffer, setSimulatedSafetyBuffer] = useState<number>(20);

  const [hoveredRowCode, setHoveredRowCode] = useState<string | null>(null);

  // Simulated planned items for the new hospital HU-UFCAT
  const [ufcatCatalog, setUfcatCatalog] = useState<string[]>(() => {
    const saved = localStorage.getItem('ufcat_simulated_catalog');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleUfcatItem = (codigo: string) => {
    if (!codigo) return;
    setUfcatCatalog(prev => {
      const next = prev.includes(codigo)
        ? prev.filter(c => c !== codigo)
        : [...prev, codigo];
      localStorage.setItem('ufcat_simulated_catalog', JSON.stringify(next));
      return next;
    });
  };

  // Reactive client-side filtering over the master catalog
  const filteredData = useMemo(() => {
    let result = [...masterData];

    // 1. Filter by Clinical Group Tab (Specialty)
    if (activeClinicalGroupId) {
      const group = CLINICAL_GROUPS.find(g => g.id === activeClinicalGroupId);
      if (group) {
        result = result.filter(item => {
          const desc = item.descricao.toLowerCase();
          const sub = item.subcategoria.toLowerCase();
          const cat = item.categoria.toLowerCase();
          
          const matchesScrapperGroup = 
            sub.includes(group.scrapperGroup.toLowerCase()) || 
            cat.includes(group.scrapperGroup.toLowerCase());
            
          const matchesKeywords = group.keywords.some(keyword => 
            desc.includes(keyword.toLowerCase()) || 
            sub.includes(keyword.toLowerCase())
          );
          
          return matchesScrapperGroup || matchesKeywords;
        });
      }
    }

    // 2. Filter by Grupo Dropdown
    if (selectedGrupo) {
      const filterVal = selectedGrupo.toLowerCase();
      result = result.filter(item => 
        item.subcategoria.toLowerCase().includes(filterVal) ||
        item.categoria.toLowerCase().includes(filterVal)
      );
    }

    // 3. Filter by Hospital Dropdown
    if (selectedHospital) {
      const filterVal = selectedHospital.toLowerCase();
      result = result.filter(item => 
        item.hospitals.some(h => h.toLowerCase() === filterVal)
      );
    }

    // 4. Filter by Catmat Input
    if (catmatFilter) {
      const filterVal = catmatFilter.toLowerCase();
      result = result.filter(item => item.catmat.toLowerCase().includes(filterVal));
    }

    // 5. Filter by Código Ebserh Input
    if (codigoFilter) {
      const filterVal = codigoFilter.toLowerCase();
      result = result.filter(item => item.codigo.toLowerCase().includes(filterVal));
    }

    // 6. Filter by Search Term Input
    if (searchTerm) {
      const filterVal = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.descricao.toLowerCase().includes(filterVal) ||
        item.subcategoria.toLowerCase().includes(filterVal)
      );
    }

    return result;
  }, [masterData, activeClinicalGroupId, selectedGrupo, selectedHospital, catmatFilter, codigoFilter, searchTerm]);

  // Load initial catalog data (scrapes from server)
  const fetchCatalog = async (resetClinicalGroup = false) => {
    setLoading(true);
    setWarningMessage(null);
    if (resetClinicalGroup) {
      setActiveClinicalGroupId(null);
    }

    try {
      const queryParams = new URLSearchParams();
      if (selectedGrupo) queryParams.set('grupo', selectedGrupo);
      if (selectedHospital) queryParams.set('hospital', selectedHospital);
      if (catmatFilter) queryParams.set('catmat', catmatFilter);
      if (codigoFilter) queryParams.set('codigo_ebserh', codigoFilter);
      if (searchTerm) queryParams.set('search', searchTerm);

      const response = await fetch(`/api/scrape?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const result: ScrapingResult = await response.json();
      const rawItems = result.items || [];
      setMasterData(rawItems);
      setTotalResults(result.totalResults || 0);
      setSource(result.source);
      
      if (result.grupos && result.grupos.length > 0) {
        setGrupos(result.grupos);
      }
      if (result.hospitais && result.hospitais.length > 0) {
        const hasHuUfcat = result.hospitais.some(h => h.value === "HU-UFCAT");
        if (!hasHuUfcat) {
          const updatedHospitais = [...result.hospitais];
          const insertIdx = updatedHospitais.findIndex(h => h.value > "HU-UFCAT");
          if (insertIdx !== -1) {
            updatedHospitais.splice(insertIdx, 0, { value: "HU-UFCAT", label: "HU-UFCAT" });
          } else {
            updatedHospitais.push({ value: "HU-UFCAT", label: "HU-UFCAT" });
          }
          setHospitais(updatedHospitais);
        } else {
          setHospitais(result.hospitais);
        }
      }
      if (result.error) {
        setWarningMessage(result.error);
      }
    } catch (err: any) {
      console.error('Fetch error:', err);
      setWarningMessage('Não foi possível conectar ao backend de scraping. Verifique se o servidor está ativo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalog();
  }, []);

  // Handle manual raw HTML parse
  const handleParseHtml = async () => {
    if (!pastedHtml.trim()) {
      setPasteError('Por favor, cole o código fonte HTML primeiro.');
      return;
    }
    setLoading(true);
    setPasteError(null);

    try {
      const res = await fetch('/api/parse-html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html: pastedHtml }),
      });

      if (!res.ok) {
        throw new Error('Falha ao enviar e processar o HTML.');
      }

      const result: ScrapingResult = await res.json();
      const rawItems = result.items || [];
      setMasterData(rawItems);
      setTotalResults(rawItems.length || 0);
      setSource('user-upload');
      if (result.grupos && result.grupos.length > 0) setGrupos(result.grupos);
      if (result.hospitais && result.hospitais.length > 0) {
        const hasHuUfcat = result.hospitais.some(h => h.value === "HU-UFCAT");
        if (!hasHuUfcat) {
          const updatedHospitais = [...result.hospitais];
          const insertIdx = updatedHospitais.findIndex(h => h.value > "HU-UFCAT");
          if (insertIdx !== -1) {
            updatedHospitais.splice(insertIdx, 0, { value: "HU-UFCAT", label: "HU-UFCAT" });
          } else {
            updatedHospitais.push({ value: "HU-UFCAT", label: "HU-UFCAT" });
          }
          setHospitais(updatedHospitais);
        } else {
          setHospitais(result.hospitais);
        }
      }
      setShowPasteArea(false);
      setPastedHtml('');
      setActiveClinicalGroupId(null);
    } catch (err: any) {
      setPasteError(`Erro: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Quick Action for Clinical Group Tabs - 100% Client-Side Responsive Filtering
  const handleClinicalGroupSelect = (group: GroupMapping) => {
    setActiveClinicalGroupId(group.id);
    // Clear other secondary filters to focus purely on this clinical group
    setSelectedGrupo('');
    setSelectedHospital('');
    setSearchTerm('');
    setCatmatFilter('');
    setCodigoFilter('');
  };

  // Reset all filters to initial state
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedGrupo('');
    setSelectedHospital('');
    setCatmatFilter('');
    setCodigoFilter('');
    setActiveClinicalGroupId(null);
    setAiReport(null);
    fetchCatalog(true);
  };

  // Hospital statistics derived from filtered items
  const stats = useMemo(() => {
    const totalItems = filteredData.length;
    
    // Count occurrences of each item to identify the most common (universal) ones
    const mostCommonItems = [...filteredData]
      .map(item => {
        const hasUfcatSimulated = ufcatCatalog.includes(item.codigo);
        let itemHospitals = [...item.hospitals];
        const hasUfcatReal = itemHospitals.includes("HU-UFCAT");
        if (hasUfcatSimulated && !hasUfcatReal) {
          itemHospitals.push("HU-UFCAT");
        } else if (!hasUfcatSimulated && hasUfcatReal) {
          // If not simulated, only keep it if they uploaded a real catalog that has it
        }
        return {
          ...item,
          hospitals: itemHospitals,
          hospitalsCount: itemHospitals.length,
          coveragePercent: Math.round((itemHospitals.length / Math.max(1, hospitais.length - 1)) * 100) // Exclude "Todas/Sede"
        };
      })
      .sort((a, b) => b.hospitalsCount - a.hospitalsCount);

    // List of unique hospitals across current items
    const allActiveHospitalsMap: Record<string, number> = {};
    filteredData.forEach(item => {
      const hasUfcatSimulated = ufcatCatalog.includes(item.codigo);
      let itemHospitals = [...item.hospitals];
      if (hasUfcatSimulated && !itemHospitals.includes("HU-UFCAT")) {
        itemHospitals.push("HU-UFCAT");
      }
      itemHospitals.forEach(h => {
        allActiveHospitalsMap[h] = (allActiveHospitalsMap[h] || 0) + 1;
      });
    });

    const activeHospitalsList = Object.entries(allActiveHospitalsMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    return {
      totalItems,
      mostCommonItems,
      activeHospitalsList
    };
  }, [filteredData, hospitais, ufcatCatalog]);

  // Personalized workspace metrics for HU-UFCAT
  const huUfcatStats = useMemo(() => {
    const totalInActiveGroup = filteredData.length;
    const padronizadosNoUfcat = filteredData.filter(item => item.hospitals.includes("HU-UFCAT") || ufcatCatalog.includes(item.codigo));
    const ausentesNoUfcat = filteredData.filter(item => !item.hospitals.includes("HU-UFCAT") && !ufcatCatalog.includes(item.codigo));
    
    // Highly common in Ebserh (>30% coverage) but missing at HU-UFCAT (Opportunities!)
    const opportunities = ausentesNoUfcat.filter(item => {
      const itemHospitals = item.hospitals;
      const coverage = Math.round((itemHospitals.length / Math.max(1, hospitais.length - 1)) * 100);
      return coverage >= 30; // 30% or more coverage
    }).sort((a, b) => b.hospitals.length - a.hospitals.length);

    // Certainty levels for items in the active group based on Ebserh consensus
    let certezaAbsolutaTotal = 0;
    let certezaAbsolutaAusentes = 0;
    let certezaModeradaTotal = 0;
    let certezaModeradaAusentes = 0;
    let baixaPrioridadeTotal = 0;
    let baixaPrioridadeAusentes = 0;

    filteredData.forEach(item => {
      const itemHospitals = item.hospitals;
      const coverage = Math.round((itemHospitals.length / Math.max(1, hospitais.length - 1)) * 100);
      const isAbsent = !itemHospitals.includes("HU-UFCAT") && !ufcatCatalog.includes(item.codigo);
      
      if (coverage >= 50) {
        certezaAbsolutaTotal++;
        if (isAbsent) certezaAbsolutaAusentes++;
      } else if (coverage >= 20) {
        certezaModeradaTotal++;
        if (isAbsent) certezaModeradaAusentes++;
      } else {
        baixaPrioridadeTotal++;
        if (isAbsent) baixaPrioridadeAusentes++;
      }
    });

    return {
      totalInActiveGroup,
      padronizadosCount: padronizadosNoUfcat.length,
      ausentesCount: ausentesNoUfcat.length,
      opportunities,
      percentAlignment: totalInActiveGroup > 0 
        ? Math.round((padronizadosNoUfcat.length / totalInActiveGroup) * 100) 
        : 0,
      certezaAbsolutaTotal,
      certezaAbsolutaAusentes,
      certezaModeradaTotal,
      certezaModeradaAusentes,
      baixaPrioridadeTotal,
      baixaPrioridadeAusentes
    };
  }, [filteredData, hospitais, ufcatCatalog]);

  // Selected simulated item based on active selection or falling back to the first available item
  const selectedSimulatedItem = useMemo(() => {
    if (!stats.mostCommonItems || stats.mostCommonItems.length === 0) return null;
    const found = stats.mostCommonItems.find(item => item.codigo === simulatedItemCode);
    return found || stats.mostCommonItems[0];
  }, [simulatedItemCode, stats.mostCommonItems]);

  // Derived simulator metrics for purchase margin
  const simulatorMetrics = useMemo(() => {
    if (!selectedSimulatedItem) return null;
    
    const coverage = selectedSimulatedItem.coveragePercent;
    
    // Determine confidence/viability tier
    let tier: 'gold' | 'viable' | 'demand' = 'demand';
    let tierLabel = 'Uso Especializado (Margem sob Demanda)';
    let tierColor = 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    let economyRange = '5% a 15%';
    let riskLevel = 'Médio a Alto (Risco de ociosidade, estoque parado ou custo de compra isolada)';
    let recommendation = 'Adesão pontual sob demanda. Recomendamos avaliar se existem insumos mais populares na rede antes de iniciar o processo de licitação individual para evitar custos de sobrepreço.';

    if (coverage >= 70) {
      tier = 'gold';
      tierLabel = 'Margem Padrão Ouro (Compra Altamente Segura e Viável)';
      tierColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      economyRange = '30% a 45%';
      riskLevel = 'Mínimo (Insumo universal amplamente consolidado e aceito na rede Ebserh)';
      recommendation = 'Compra altamente segura e viável. Perfeito para aderir a Atas de Registro de Preços (ARP) vigentes compartilhadas na rede. Isso gera economia administrativa máxima e reduz o tempo de aquisição.';
    } else if (coverage >= 30) {
      tier = 'viable';
      tierLabel = 'Margem Zona Viável (Compra Recomendada)';
      tierColor = 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      economyRange = '15% a 25%';
      riskLevel = 'Baixo (Item bem distribuído entre hospitais regionais da rede)';
      recommendation = 'Compra recomendada com boa segurança. Viável para padronização local ou em consórcios hospitalares. Oferece uma margem de segurança adequada para procedimentos cirúrgicos recorrentes.';
    }

    const baseQuantity = Number(simulatedMonthlyVolume) || 0;
    const safetyBufferUnits = Math.round(baseQuantity * (Number(simulatedSafetyBuffer) / 100));
    const totalRecommendedLot = baseQuantity + safetyBufferUnits;

    return {
      tier,
      tierLabel,
      tierColor,
      economyRange,
      riskLevel,
      recommendation,
      baseQuantity,
      safetyBufferUnits,
      totalRecommendedLot
    };
  }, [selectedSimulatedItem, simulatedMonthlyVolume, simulatedSafetyBuffer]);

  // Compare selected hospitals intersection/exclusive
  const comparisonResults = useMemo(() => {
    if (compareHospitals.length < 2) return null;

    // Filter items used by at least one of the compared hospitals
    const itemsWithSelectedHospitals = filteredData.filter(item =>
      item.hospitals.some(h => compareHospitals.includes(h))
    );

    // Intersection: items used by ALL selected hospitals
    const intersection = itemsWithSelectedSummary(itemsWithSelectedHospitals, compareHospitals, 'intersection');

    // Differences: items used by some but not all
    const discrepancies = itemsWithSelectedSummary(itemsWithSelectedHospitals, compareHospitals, 'difference');

    return {
      intersection,
      discrepancies,
      totalCount: itemsWithSelectedHospitals.length
    };
  }, [filteredData, compareHospitals]);

  function itemsWithSelectedSummary(items: Insumo[], compared: string[], type: 'intersection' | 'difference') {
    return items.filter(item => {
      const matchCount = compared.filter(h => item.hospitals.includes(h)).length;
      if (type === 'intersection') {
        return matchCount === compared.length;
      } else {
        return matchCount > 0 && matchCount < compared.length;
      }
    });
  }

  // Request AI Standardization Analysis
  const handleAIAnalysis = async () => {
    if (filteredData.length === 0) {
      setAiError('Nenhum insumo disponível nos filtros atuais para analisar.');
      return;
    }
    setAiLoading(true);
    setAiError(null);
    setAiReport(null);

    // Send the top 30 items currently listed for deep comparative analysis
    const sampleToAnalyze = stats.mostCommonItems.slice(0, 30);

    const activeGroupName = activeClinicalGroupId 
      ? CLINICAL_GROUPS.find(g => g.id === activeClinicalGroupId)?.name 
      : 'Todos os Insumos';

    try {
      const res = await fetch('/api/ai-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: sampleToAnalyze,
          selectedGroup: activeGroupName
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Falha ao processar análise inteligente.');
      }

      const report: AIAnalysisResponse = await res.json();
      setAiReport(report);
    } catch (err: any) {
      setAiError(err.message || 'Erro de rede ao conectar com a API do Gemini.');
    } finally {
      setAiLoading(false);
    }
  };

  // Toggle hospital for comparison
  const toggleHospitalToCompare = (hName: string) => {
    setCompareHospitals(prev =>
      prev.includes(hName) ? prev.filter(x => x !== hName) : [...prev, hName].slice(0, 4) // Max 4 for readability
    );
  };

  // Export to CSV helper
  const handleExportCSV = () => {
    const headers = ['Código Ebserh', 'CATMAT', 'Descrição', 'Apresentação', 'Categoria', 'Subcategoria', 'Hospitais Utilizadores', 'Qtd Hospitais'];
    const rows = stats.mostCommonItems.map(item => [
      item.codigo,
      item.catmat,
      `"${item.descricao.replace(/"/g, '""')}"`,
      item.apresentacao,
      item.categoria,
      item.subcategoria,
      `"${item.hospitals.join(', ')}"`,
      item.hospitalsCount
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' 
      + [headers.join(';'), ...rows.map(e => e.join(';'))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `catalogo_ebserh_comparativo_${activeClinicalGroupId || 'geral'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      id="app" 
      className="min-h-screen bg-slate-50 text-slate-900 transition-all duration-300 font-sans text-sm tracking-normal"
    >
      {/* Top Banner / Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-600 rounded-xl text-white shadow-xs">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                Suprimentos HU-UFCAT
                <span className="text-xs font-normal px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-mono">
                  EXCLUSIVO HU-UFCAT
                </span>
              </h1>
              <p className="text-xs text-slate-500">
                Comparador Inteligente de Insumos da Rede Ebserh adaptado para o Hospital de Catalão
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Database source status badge */}
            <div 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border bg-white shadow-2xs border-slate-200"
              title="Origem atual dos dados: O sistema tenta conexão automática com o SPIA nacional, mas se houver lentidão ou bloqueio, ativa o banco de contingência local de segurança."
            >
              <span className={`w-2.5 h-2.5 rounded-full ${
                source === 'live' ? 'bg-emerald-500 animate-pulse' : source === 'user-upload' ? 'bg-blue-500 animate-pulse' : 'bg-amber-500'
              }`} />
              <span className="text-slate-700 text-[11px] font-bold">
                {source === 'live' ? 'SPIA Ao Vivo (Automático)' : source === 'user-upload' ? 'HTML Colado (Manual)' : 'Contingência Ebserh'}
              </span>
            </div>

            <button
              id="btn-upload-html"
              onClick={() => setShowPasteArea(!showPasteArea)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              <FileCode className="w-4 h-4 text-slate-500" />
              Cole HTML SPIA
            </button>

            <button
              id="btn-export-csv"
              disabled={filteredData.length === 0}
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
            >
              <Download className="w-4 h-4" />
              Exportar CSV
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Connection Warning Message */}
        {warningMessage && (
          <div className={`p-4 rounded-xl border flex items-start gap-3 shadow-2xs ${
            source === 'fallback' 
              ? 'bg-blue-50/50 border-blue-200 text-blue-900' 
              : 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
          }`}>
            <Database className={`w-5 h-5 shrink-0 mt-0.5 ${
              source === 'fallback' ? 'text-blue-600' : 'text-emerald-600'
            }`} />
            <div className="text-xs">
              <span className="font-semibold block mb-0.5">Status do Banco de Dados Ebserh:</span>
              {warningMessage}
            </div>
          </div>
        )}

        {/* PERSONALIZED HU-UFCAT WORKSPACE HEADER */}
        <div className="bg-emerald-900/5 border border-emerald-500/15 rounded-2xl p-5 flex flex-col md:flex-row gap-5 items-stretch justify-between shadow-xs">
          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" />
                Unidade de Referência Ativa
              </span>
              <span className="px-2.5 py-0.5 bg-slate-900 text-emerald-400 border border-slate-800 rounded-md text-[10px] font-bold font-mono">
                HU-UFCAT (Catalão/GO)
              </span>
            </div>
            
            <div>
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                Painel do Gestor de Suprimentos — HU-UFCAT
              </h2>
              <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                Este espaço monitora a aderência do seu hospital aos padrões da rede Ebserh na especialidade ativa: <strong className="text-slate-950 font-bold">{activeClinicalGroupId ? CLINICAL_GROUPS.find(g => g.id === activeClinicalGroupId)?.name : "Geral"}</strong>. Identifique redundâncias e compre com segurança.
              </p>
            </div>

            {/* Progress bar to show alignment */}
            <div className="space-y-1.5 max-w-md bg-white/70 p-3.5 rounded-xl border border-gray-200/60 shadow-3xs">
              <div className="flex justify-between text-[11px] font-bold text-gray-700">
                <span>Alinhamento de Padronização:</span>
                <span className="text-emerald-700 font-extrabold font-mono">{huUfcatStats.percentAlignment}%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${huUfcatStats.percentAlignment}%` }}
                />
              </div>
              <p className="text-[10px] text-gray-500 font-medium">
                {huUfcatStats.padronizadosCount} de {huUfcatStats.totalInActiveGroup} insumos do grupo estão presentes no HU-UFCAT.
              </p>
            </div>
          </div>

          {/* Quick Opportunity Actions */}
          <div className="md:w-80 bg-white border border-gray-200/80 rounded-xl p-4 flex flex-col justify-between gap-3 shadow-2xs">
            <div className="space-y-1">
              <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1 text-emerald-700">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                Oportunidades de Compra
              </h3>
              <p className="text-[10px] text-gray-500 leading-tight">
                Insumos populares na rede com alto potencial de desconto coletivo ausentes no HU-UFCAT:
              </p>
            </div>

            <div className="space-y-1.5 flex-1 overflow-y-auto max-h-[140px] pr-1 scrollbar-thin">
              {huUfcatStats.opportunities.length > 0 ? (
                huUfcatStats.opportunities.slice(0, 3).map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSimulatedItemCode(item.codigo);
                      // Scroll beautifully to the simulator
                      const el = document.getElementById('simulator-item-select');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className="w-full text-left p-2 bg-gray-50 hover:bg-emerald-50/60 hover:border-emerald-200 border border-gray-100 rounded-lg transition group flex items-start gap-2"
                  >
                    <span className="w-4 h-4 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded flex items-center justify-center font-bold font-mono text-[9px] group-hover:bg-emerald-500 group-hover:text-white shrink-0 mt-0.5">
                      +
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-semibold text-gray-800 truncate leading-snug group-hover:text-emerald-950">
                        {item.descricao}
                      </p>
                      <div className="flex items-center justify-between text-[9px] text-gray-400 mt-0.5 font-mono">
                        <span>EBS: {item.codigo}</span>
                        <span className="text-emerald-600 font-bold">({item.hospitals.length} HUs)</span>
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="py-4 text-center text-[10px] text-gray-400 italic">
                  Excelente! Seu hospital já está 100% alinhado com os itens mais frequentes da especialidade.
                </div>
              )}
            </div>
            
            <div className="text-[9px] text-gray-400 border-t border-gray-100 pt-1.5 italic text-center">
              Clique em (+) para simular o lote de compra ideal.
            </div>
          </div>
        </div>

        {/* INDICADOR DE CERTEZA NA COMPRA (DADOS CONTRA O ACHISMO) */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 space-y-4 shadow-3xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-blue-200/60 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1 bg-blue-600 text-white rounded-lg">
                <CheckCircle className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-wide">
                  Indicador de Certeza na Compra — Dados Contra o Achismo
                </h3>
                <p className="text-[11.5px] text-slate-600 mt-0.5">
                  Como o <strong>HU-UFCAT é um hospital novo</strong>, criamos esta métrica de rede para dar segurança máxima à sua equipe de suprimentos. Elimine o palpite (&ldquo;achismo&rdquo;) baseando-se no consenso real dos outros hospitais Ebserh:
                </p>
              </div>
            </div>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
              Análise Confiável de Rede
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Certeza Absoluta Card */}
            <div className="bg-white p-4 rounded-xl border border-blue-100 flex flex-col justify-between shadow-3xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
                  <h4 className="font-bold text-xs text-slate-900">1. Certeza Absoluta (Mais de 50% dos HUs)</h4>
                </div>
                <p className="text-[11.5px] text-slate-600 mt-2 leading-relaxed">
                  Insumos já amplamente validados pela rede. São compras seguras e obrigatórias para estruturar a especialidade ativa no HU-UFCAT sem riscos de erro ou desuso.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Nesta especialidade:</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {huUfcatStats.certezaAbsolutaTotal} itens ({huUfcatStats.certezaAbsolutaAusentes} ausentes no HU)
                </span>
              </div>
            </div>

            {/* Certeza Moderada Card */}
            <div className="bg-white p-4 rounded-xl border border-blue-100 flex flex-col justify-between shadow-3xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
                  <h4 className="font-bold text-xs text-slate-900">2. Certeza Moderada (20% a 50% dos HUs)</h4>
                </div>
                <p className="text-[11.5px] text-slate-600 mt-2 leading-relaxed">
                  Itens complementares importantes adotados por parte expressiva da rede. Recomendado verificar o perfil cirúrgico específico do HU-UFCAT antes de licitar.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Nesta especialidade:</span>
                <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  {huUfcatStats.certezaModeradaTotal} itens ({huUfcatStats.certezaModeradaAusentes} ausentes no HU)
                </span>
              </div>
            </div>

            {/* Baixa Prioridade Card */}
            <div className="bg-white p-4 rounded-xl border border-blue-100 flex flex-col justify-between shadow-3xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-slate-400 shrink-0" />
                  <h4 className="font-bold text-xs text-slate-900">3. Baixa Prioridade (Menos de 20% dos HUs)</h4>
                </div>
                <p className="text-[11.5px] text-slate-600 mt-2 leading-relaxed">
                  Itens específicos ou pouco comuns de outras praças. No início do hospital, evite comprar estes itens de imediato para não imobilizar capital em estoque sem giro rápido.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Nesta especialidade:</span>
                <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                  {huUfcatStats.baixaPrioridadeTotal} itens ({huUfcatStats.baixaPrioridadeAusentes} ausentes no HU)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Source Upload Panel */}
        {showPasteArea && (
          <div className="bg-white border border-blue-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <div className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-sm text-gray-900">Análise de Código-Fonte Local</h3>
              </div>
              <button onClick={() => setShowPasteArea(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 space-y-2.5">
              <p className="font-bold text-slate-900 flex items-center gap-1.5">
                <span>💡</span> Como o sistema obtém os dados? Tire suas dúvidas:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-[11.5px] text-slate-700">
                <li>
                  <strong className="text-slate-900">O sistema já puxa sozinho?</strong> 
                  <br />
                  <span className="text-slate-600"><strong>Sim, de forma automática!</strong> Sempre que você filtra ou pesquisa, o sistema tenta fazer a requisição direta ao SPIA nacional ao vivo em segundo plano.</span>
                </li>
                <li>
                  <strong className="text-slate-900">Por que o botão &ldquo;Cole HTML&rdquo; existe?</strong>
                  <br />
                  <span className="text-slate-600">O portal do SPIA Ebserh original é instável, bloqueado por CAPTCHAs governamentais ou firewalls de intranet. Se nossa requisição automática de fundo falhar, o sistema ativa imediatamente nossa <strong>Base de Contingência Offline de Segurança</strong> para o sistema nunca parar de funcionar.</span>
                </li>
                <li>
                  <strong className="text-slate-900">Preciso colar sempre?</strong>
                  <br />
                  <span className="text-slate-600"><strong>Não!</strong> Só cole se você estiver pesquisando algo muito específico no portal oficial e quiser trazer aquela busca exata de forma garantida em tempo real para o simulador.</span>
                </li>
              </ul>
              <div className="pt-2 text-[11px] text-slate-600 border-t border-amber-200/50">
                <strong>Como copiar do SPIA:</strong> Na tela de resultados do catálogo SPIA oficial, aperte <kbd className="bg-white px-1 py-0.5 rounded border border-gray-300 font-mono font-bold">Ctrl + U</kbd> (ou clique com o botão direito e vá em &ldquo;Exibir código-fonte&rdquo;), copie tudo com <kbd className="bg-white px-1 py-0.5 rounded border border-gray-300 font-mono font-bold">Ctrl + A</kbd> e <kbd className="bg-white px-1 py-0.5 rounded border border-gray-300 font-mono font-bold">Ctrl + C</kbd>, e cole no campo abaixo.
              </div>
            </div>

            <textarea
              id="txt-html-paste"
              rows={4}
              value={pastedHtml}
              onChange={(e) => setPastedHtml(e.target.value)}
              placeholder="Cole o código HTML da página do Catálogo Ebserh aqui..."
              className="w-full text-xs font-mono p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {pasteError && <p className="text-xs text-red-600">{pasteError}</p>}
            <div className="flex flex-col sm:flex-row justify-end gap-2">
              <button
                onClick={() => setShowPasteArea(false)}
                className="w-full sm:w-auto order-2 sm:order-1 px-4 py-2 border border-gray-300 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 transition shrink-0"
              >
                Cancelar
              </button>
              <button
                onClick={handleParseHtml}
                className="w-full sm:w-auto order-1 sm:order-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition shrink-0 shadow-sm"
              >
                Analisar Código Fonte
              </button>
            </div>
          </div>
        )}

        {/* 11 Clinical Group Quick Navigation (Abas Clínicas Rápidas) */}
        <section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-gray-900 tracking-tight flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-600" />
                Abas de Agrupamento Clínico Ebserh
              </h2>
              <p className="text-xs text-gray-500">
                Filtros e comparadores pré-programados para as 11 especialidades prioritárias
              </p>
            </div>
            {activeClinicalGroupId && (
              <button
                onClick={handleClearFilters}
                className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1"
              >
                Remover Filtro Especialidade <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {CLINICAL_GROUPS.map((group) => {
              const isActive = activeClinicalGroupId === group.id;
              return (
                <button
                  key={group.id}
                  onClick={() => handleClinicalGroupSelect(group)}
                  className={`p-3 text-left rounded-xl border transition flex flex-col justify-between h-24 ${
                    isActive
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 text-emerald-950 shadow-xs'
                      : 'bg-gray-50 hover:bg-gray-100/80 border-gray-200 text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`p-1.5 rounded-lg ${isActive ? 'bg-emerald-600 text-white' : 'bg-white border border-gray-200 text-gray-500'}`}>
                      <Activity className="w-3.5 h-3.5" />
                    </span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold leading-tight line-clamp-1">{group.name}</h4>
                    <p className="text-[10px] text-gray-500 leading-snug line-clamp-1">{group.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Query Filter and Live Console - Left Pane */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-2xs space-y-4">
              <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                <h3 className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
                  <Search className="w-4 h-4 text-emerald-600" />
                  Painel de Busca SPIA
                </h3>
                <span className="text-[10px] text-gray-500 font-mono">Filtros Avançados</span>
              </div>

              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Pesquisar Descrição</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                      id="input-search"
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Ex: Agulha, Seringa, Pinça..."
                      className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Catmat</label>
                    <input
                      id="input-catmat"
                      type="text"
                      value={catmatFilter}
                      onChange={(e) => setCatmatFilter(e.target.value)}
                      placeholder="Número Catmat"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Código Ebserh</label>
                    <input
                      id="input-codigo"
                      type="text"
                      value={codigoFilter}
                      onChange={(e) => setCodigoFilter(e.target.value)}
                      placeholder="Código EBS"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Grupo do Insumo</label>
                  <select
                    id="select-grupo"
                    value={selectedGrupo}
                    onChange={(e) => setSelectedGrupo(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="">Todas as Categorias</option>
                    {grupos.length > 0 ? (
                      grupos.map((g, idx) => (
                        <option key={idx} value={g.value}>
                          {g.label}
                        </option>
                      ))
                    ) : (
                      <option value="Insumos para CME">Insumos para CME</option>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Filtrar por Hospital Único</label>
                  <select
                    id="select-hospital"
                    value={selectedHospital}
                    onChange={(e) => setSelectedHospital(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="">Todos os Hospitais</option>
                    {hospitais.length > 0 ? (
                      hospitais.map((h, idx) => (
                        <option key={idx} value={h.value}>
                          {h.label}
                        </option>
                      ))
                    ) : (
                      <option value="HU-UFSC">HU-UFSC</option>
                    )}
                  </select>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    id="btn-clear"
                    onClick={handleClearFilters}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 text-xs font-medium rounded-xl hover:bg-gray-50 transition"
                  >
                    Limpar
                  </button>
                  <button
                    id="btn-filter"
                    onClick={() => fetchCatalog(false)}
                    className="flex-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-xl transition shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                    Filtrar Catálogo
                  </button>
                </div>
              </div>
            </div>

            {/* Network Statistics & Common Items Indicator */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-2xs space-y-4">
              <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                <h3 className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  Métricas de Repetição
                </h3>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded">Rede</span>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-xl flex items-center justify-between">
                  <span className="text-xs text-gray-500">Insumos Carregados</span>
                  <span className="text-sm font-bold text-gray-900">{stats.totalItems}</span>
                </div>

                <div className="p-3 bg-gray-50 rounded-xl flex items-center justify-between">
                  <span className="text-xs text-gray-500">Média de Reuso (HUs)</span>
                  <span className="text-sm font-bold text-gray-900">
                    {(
                      stats.mostCommonItems.reduce((acc, curr) => acc + curr.hospitalsCount, 0) /
                      Math.max(1, stats.totalItems)
                    ).toFixed(1.5)} HUs / item
                  </span>
                </div>

                {/* Top universal item preview */}
                {stats.mostCommonItems.length > 0 && (
                  <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl space-y-1.5">
                    <span className="text-[10px] uppercase tracking-wider text-emerald-800 font-bold block">
                      Insumo Mais Comum Filtrado
                    </span>
                    <p className="text-xs text-gray-800 font-semibold line-clamp-2">
                      {stats.mostCommonItems[0].descricao}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-emerald-700">
                      <span>Catmat: {stats.mostCommonItems[0].catmat}</span>
                      <span className="font-bold">Utilizado em {stats.mostCommonItems[0].hospitalsCount} HUs</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Smart Hospital Multi-Select Comparer */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-2xs space-y-4">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
                  <ArrowRightLeft className="w-4 h-4 text-emerald-600" />
                  Comparador Direto de Hospitais
                </h3>
                <p className="text-[11px] text-gray-500 mt-1">
                  Selecione até 4 hospitais para identificar itens comuns e discrepâncias.
                </p>
              </div>

              {/* Multi-select check list */}
              <div className="max-h-36 overflow-y-auto pr-1 space-y-1 text-xs border border-gray-150 rounded-lg p-2.5">
                {stats.activeHospitalsList.map((h) => {
                  const isChecked = compareHospitals.includes(h.name);
                  return (
                    <label key={h.name} className="flex items-center gap-2 py-1 px-1.5 rounded hover:bg-gray-100 cursor-pointer transition">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleHospitalToCompare(h.name)}
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="font-medium text-gray-800">{h.name}</span>
                      <span className="ml-auto text-[10px] text-gray-400">({h.count} itens)</span>
                    </label>
                  );
                })}
              </div>

              {compareHospitals.length >= 2 ? (
                <div className="space-y-3 pt-2">
                  <div className="p-3 bg-emerald-50 text-emerald-950 rounded-xl space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold">Intersecção ({comparisonResults?.intersection.length} itens)</span>
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-[11px] text-emerald-800 leading-snug">
                      Estes itens estão padronizados e são compartilhados por todos os hospitais selecionados.
                    </p>
                  </div>

                  <div className="p-3 bg-amber-50 text-amber-950 rounded-xl space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold">Divergências ({comparisonResults?.discrepancies.length} itens)</span>
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                    </div>
                    <p className="text-[11px] text-amber-800 leading-snug">
                      Itens que apenas alguns dos hospitais selecionados utilizam. Excelente oportunidade de unificação.
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-[11px] text-gray-400 text-center py-2">
                  Selecione pelo menos 2 hospitais para ver o relatório cruzado de intersecção.
                </p>
              )}
            </div>

          </div>

          {/* Catalog Listing and AI Report - Right Pane */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Specialty Automatic Ranking and Comparison Dashboard */}
            {activeClinicalGroupId && (
              <div className="bg-emerald-950 border border-emerald-800 rounded-2xl p-5 text-white shadow-md space-y-5 relative overflow-hidden">
                <div className="absolute right-0 top-0 -mt-6 -mr-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-800/60 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-emerald-800 rounded-xl text-emerald-300">
                      <BarChart3 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-emerald-50 leading-tight">
                        Ranking & Comparador de Insumos Comuns
                      </h3>
                      <p className="text-[11px] text-emerald-300">
                        Especialidade: <span className="font-bold text-white">{CLINICAL_GROUPS.find(g => g.id === activeClinicalGroupId)?.name}</span>
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-800 text-emerald-200 border border-emerald-700 font-bold px-2.5 py-1 rounded-full font-mono self-start sm:self-center">
                    Comparação de Hospitais
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left Column: Top Ranked Items (Os mais comuns) */}
                  <div className="bg-emerald-900/30 border border-emerald-800/40 p-4 rounded-xl space-y-3">
                    <h4 className="text-xs font-bold text-emerald-200 uppercase tracking-wider flex items-center gap-1.5 border-b border-emerald-800/40 pb-1.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                      Insumos mais Populares (Mais Repetidos)
                    </h4>
                    
                    {stats.mostCommonItems.length > 0 ? (
                      <div className="space-y-3">
                        {stats.mostCommonItems.slice(0, 3).map((item, index) => (
                          <div key={item.id || index} className="space-y-1">
                            <div className="flex items-center justify-between text-xs gap-2">
                              <span className="font-semibold text-emerald-50 truncate max-w-[180px]" title={item.descricao}>
                                {index + 1}. {item.descricao}
                              </span>
                              <span className="text-emerald-300 font-bold font-mono shrink-0">
                                {item.hospitalsCount} HUs ({item.coveragePercent}%)
                              </span>
                            </div>
                            <div className="w-full bg-emerald-950/60 border border-emerald-800/40 rounded-full h-2 overflow-hidden">
                              <div 
                                className="bg-emerald-400 h-2 rounded-full transition-all duration-500" 
                                style={{ width: `${item.coveragePercent}%` }}
                              />
                            </div>
                            <div className="flex justify-between items-center text-[9px] text-emerald-400 font-mono">
                              <span>EBS: {item.codigo}</span>
                              <span>CATMAT: {item.catmat}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-emerald-300 italic py-4">Nenhum insumo correspondente encontrado nesta especialidade.</p>
                    )}
                  </div>

                  {/* Right Column: Standardization Opportunities */}
                  <div className="bg-emerald-900/30 border border-emerald-800/40 p-4 rounded-xl flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="text-xs font-bold text-emerald-200 uppercase tracking-wider flex items-center gap-1.5 border-b border-emerald-800/40 pb-1.5 mb-2">
                        <Users className="w-3.5 h-3.5" />
                        Oportunidade de Unificação Sede / HUs
                      </h4>
                      {stats.mostCommonItems.length > 0 ? (
                        <div className="text-xs text-emerald-100 leading-relaxed space-y-2">
                          <p>
                            O item mais comum nesta especialidade é o <strong className="text-emerald-300">Cód: {stats.mostCommonItems[0].codigo}</strong>, 
                            adotado por <strong className="text-white">{stats.mostCommonItems[0].hospitalsCount} hospitais</strong>.
                          </p>
                          <p className="text-[10px] text-emerald-300 leading-snug">
                            Hospitais fora do padrão que podem aderir a este item de maior volume:
                          </p>
                          {/* List some hospitals NOT using this item */}
                          <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto pt-1">
                            {(() => {
                              const utilizedSet = new Set(stats.mostCommonItems[0].hospitals);
                              const allHUs = hospitais.filter(h => h.value !== '').map(h => h.value);
                              const nonUtilized = allHUs.filter(h => !utilizedSet.has(h));
                              return nonUtilized.length > 0 ? (
                                nonUtilized.slice(0, 10).map((h, i) => (
                                  <span key={i} className="px-1.5 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded text-[9px] font-mono">
                                    {h}
                                  </span>
                                ))
                              ) : (
                                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                                  <Check className="w-3 h-3" /> 100% de adesão na rede Ebserh!
                                </span>
                              );
                            })()}
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-emerald-300 italic py-4">Sem dados de amostragem suficientes.</p>
                      )}
                    </div>

                    <div className="pt-2 border-t border-emerald-850 flex items-center justify-between text-xs text-emerald-300 font-medium">
                      <span>Nível de Coesão da Especialidade:</span>
                      <strong className="text-white font-mono text-sm">
                        {stats.mostCommonItems.length > 0 
                          ? `${Math.round((stats.mostCommonItems.reduce((acc, c) => acc + c.hospitalsCount, 0) / (stats.mostCommonItems.length * Math.max(1, hospitais.length - 1))) * 100)}%`
                          : '0%'
                        }
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Hospital-by-Hospital Comparison Matrix */}
                {stats.mostCommonItems.length > 0 && (
                  <div className="bg-emerald-950/80 border border-emerald-800/60 rounded-xl p-3.5 space-y-2.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="text-xs font-bold text-emerald-200 uppercase tracking-wider flex items-center gap-1.5">
                        <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-400" />
                        Matriz de Comparação de Uso por Hospital (Top 3 Insumos)
                      </h4>
                      <span className="text-[9px] text-emerald-300 font-mono">Verde = Utiliza | Amarelo = Oportunidade de Padronizar</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-[10px] border-collapse">
                        <thead>
                          <tr className="border-b border-emerald-800/60 text-emerald-300 font-bold uppercase tracking-wider">
                            <th className="py-2 px-2 w-36">Hospital (HUF)</th>
                            {stats.mostCommonItems.slice(0, 3).map((item, idx) => (
                              <th key={idx} className="py-2 px-2 max-w-[140px] truncate" title={item.descricao}>
                                {item.codigo} ({item.catmat})
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-emerald-900/30">
                          {hospitais.filter(h => h.value !== '').slice(0, 10).map((h, hIdx) => {
                            return (
                              <tr key={hIdx} className="hover:bg-emerald-900/20 transition">
                                <td className="py-2 px-2 font-semibold text-emerald-100">{h.label}</td>
                                {stats.mostCommonItems.slice(0, 3).map((item, iIdx) => {
                                  const uses = item.hospitals.includes(h.value);
                                  return (
                                    <td key={iIdx} className="py-2 px-2">
                                      {uses ? (
                                        <span className="inline-flex items-center gap-0.5 text-emerald-300 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> Utiliza
                                        </span>
                                      ) : (
                                        <span className="inline-flex items-center gap-0.5 text-amber-300 font-medium bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full hover:bg-amber-500/20 transition">
                                          <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" /> Oportunidade
                                        </span>
                                      )}
                                    </td>
                                  );
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* SAFE PURCHASING MARGIN & SIMULATOR FOR PROCUREMENT */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                  <div className="border-b border-slate-800 pb-3">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      Simulador de Lote de Compra & Margem Segura para seu Hospital
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Determine a quantidade ideal para adquirir para sua unidade com base no consenso da rede Ebserh nesta especialidade.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Simulator Inputs */}
                    <div className="space-y-3.5 bg-slate-950/40 p-4 border border-slate-800/60 rounded-xl">
                      <h5 className="text-[11px] font-bold text-slate-300 uppercase tracking-wide">Configurações de Demanda</h5>
                      
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-400 mb-1">Insumo Clínico da Especialidade</label>
                        <select
                          id="simulator-item-select"
                          value={simulatedItemCode}
                          onChange={(e) => setSimulatedItemCode(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg text-xs py-1.5 px-2.5 text-slate-100 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        >
                          {stats.mostCommonItems.slice(0, 10).map((item, idx) => (
                            <option key={idx} value={item.codigo} className="bg-slate-900 text-slate-100 text-xs">
                              {item.descricao.slice(0, 35)}... ({item.codigo})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-slate-400 mb-1">
                          Consumo Mensal Estimado: <span className="text-emerald-400 font-bold font-mono">{simulatedMonthlyVolume}</span> un.
                        </label>
                        <input
                          id="simulator-volume-slider"
                          type="range"
                          min="10"
                          max="2000"
                          step="10"
                          value={simulatedMonthlyVolume}
                          onChange={(e) => setSimulatedMonthlyVolume(Number(e.target.value))}
                          className="w-full accent-emerald-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                        />
                        <div className="flex justify-between text-[9px] text-slate-500 font-mono mt-0.5">
                          <span>10 un</span>
                          <span>1.000 un</span>
                          <span>2.000 un</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-slate-400 mb-1">
                          Margem de Segurança (Estoque): <span className="text-emerald-400 font-bold font-mono">+{simulatedSafetyBuffer}%</span>
                        </label>
                        <select
                          id="simulator-buffer-select"
                          value={simulatedSafetyBuffer}
                          onChange={(e) => setSimulatedSafetyBuffer(Number(e.target.value))}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg text-xs py-1.5 px-2 text-slate-100 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        >
                          <option value="10">10% - Estrito (Demanda estável)</option>
                          <option value="15">15% - Moderado (Padrão Ebserh)</option>
                          <option value="20">20% - Recomendado (Segurança ideal)</option>
                          <option value="30">30% - Alto (Flutuação sazonal)</option>
                          <option value="50">50% - Crítico (Alto risco de desabastecimento)</option>
                        </select>
                      </div>
                    </div>

                    {/* Simulator Results & Strategy */}
                    {simulatorMetrics && selectedSimulatedItem && (
                      <div className="md:col-span-2 space-y-4 flex flex-col justify-between">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Recommended Purchase Lot Card */}
                          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-2 text-center sm:text-left">
                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Lote de Compra Seguro</span>
                            <div className="text-3xl font-extrabold text-white tracking-tight font-mono">
                              {simulatorMetrics.totalRecommendedLot} <span className="text-xs font-normal text-emerald-300">unidades</span>
                            </div>
                            <p className="text-[10px] text-emerald-300 font-medium">
                              Consumo Base: {simulatorMetrics.baseQuantity} un | Margem: +{simulatorMetrics.safetyBufferUnits} un
                            </p>
                          </div>

                          {/* Network Viability Tier Card */}
                          <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Grau de Viabilidade Ebserh</span>
                            <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${simulatorMetrics.tierColor}`}>
                              {simulatorMetrics.tierLabel}
                            </span>
                            <p className="text-[10px] text-slate-400 leading-normal">
                              Adotado por <strong className="text-white">{selectedSimulatedItem.hospitalsCount} dos {hospitais.filter(h => h.value !== '').length}</strong> hospitais ativos consultados ({selectedSimulatedItem.coveragePercent}%).
                            </p>
                          </div>
                        </div>

                        {/* Direct Purchasing Intelligence Matrix */}
                        <div className="bg-slate-950/80 p-3.5 border border-slate-800 rounded-xl space-y-2">
                          <h6 className="text-[10px] font-bold text-slate-300 uppercase tracking-wide flex items-center justify-between">
                            <span>Diretrizes Estratégicas de Aquisição</span>
                            <span className="text-emerald-400 lowercase font-mono">economize na rede</span>
                          </h6>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300 font-sans">
                            <div className="space-y-0.5">
                              <span className="text-slate-500 text-[10px] block font-medium">Potencial de Desconto de Escala:</span>
                              <strong className="text-emerald-400 text-xs font-bold">{simulatorMetrics.economyRange}</strong>
                            </div>
                            <div className="space-y-0.5">
                              <span className="text-slate-500 text-[10px] block font-medium">Risco Técnico de Ociosidade:</span>
                              <strong className="text-white text-xs font-semibold">{simulatorMetrics.riskLevel}</strong>
                            </div>
                          </div>
                          <p className="text-[10px] text-slate-400 leading-relaxed border-t border-slate-800/60 pt-2 mt-1 font-sans">
                            {simulatorMetrics.recommendation}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Justificativa Técnica Pronta para Copiar / Memorando de Compra */}
                  {selectedSimulatedItem && simulatorMetrics && (
                    <div className="p-4 bg-slate-950/90 border border-emerald-500/15 rounded-xl space-y-2.5 relative">
                      <div className="absolute right-3 top-3 flex items-center gap-1.5 text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded uppercase font-bold font-mono">
                        <Check className="w-3 h-3" /> Ficha Técnica de Dispensa / Licitação
                      </div>
                      <h5 className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Ficha de Planejamento de Abastecimento</h5>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px] text-slate-300 border-b border-slate-800/60 pb-2.5">
                        <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                          <span className="text-slate-500 text-[9px] block uppercase font-mono">Código Ebserh</span>
                          <strong className="text-white font-mono text-xs">{selectedSimulatedItem.codigo}</strong>
                        </div>
                        <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                          <span className="text-slate-500 text-[9px] block uppercase font-mono">Catmat</span>
                          <strong className="text-white font-mono text-xs">{selectedSimulatedItem.catmat}</strong>
                        </div>
                        <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                          <span className="text-slate-500 text-[9px] block uppercase font-mono">Quantidade Sugerida</span>
                          <strong className="text-white font-mono text-xs">{simulatorMetrics.totalRecommendedLot} unidades</strong>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-slate-500 text-[9px] block uppercase font-mono font-semibold">Justificativa Técnica de Padronização para Burocracia:</span>
                        <p className="text-[10.5px] text-slate-300 italic bg-slate-900/40 p-2.5 rounded border border-slate-800/50 leading-relaxed font-sans">
                          &ldquo;A aquisição de {simulatorMetrics.totalRecommendedLot} unidades do insumo &lsquo;{selectedSimulatedItem.descricao}&rsquo; (EBS: {selectedSimulatedItem.codigo} | CATMAT: {selectedSimulatedItem.catmat}) está alinhada ao padrão corporativo da rede Ebserh na especialidade {CLINICAL_GROUPS.find(g => g.id === activeClinicalGroupId)?.name}, uma vez que o item possui adesão em {selectedSimulatedItem.coveragePercent}% dos hospitais universitários ativos, apresentando alto nível de coesão técnica e oferecendo condições viáveis para compras conjuntas ou adesão à Ata de Registro de Preços vigentes, minimizando riscos de ociosidade.&rdquo;
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* AI standardization engine pane using Gemini */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white shadow-md relative overflow-hidden">
              <div className="absolute right-0 top-0 -mt-4 -mr-4 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-[10px] uppercase font-bold tracking-wider">
                    Estratégia de Aquisições
                  </span>
                  <h3 className="font-bold text-base flex items-center gap-1.5">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                    Estudo de Padronização com Inteligência Artificial
                  </h3>
                  <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                    Compara os insumos clínicos listados e gera propostas automáticas de padronização,
                    mapeando sinônimos, analisando equivalências e sugerindo economias de escala.
                  </p>
                </div>

                <button
                  id="btn-ai-analyze"
                  onClick={handleAIAnalysis}
                  disabled={aiLoading || filteredData.length === 0}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-semibold text-xs rounded-xl transition flex items-center justify-center gap-2 self-start md:self-center"
                >
                  {aiLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Gerar Relatório IA
                    </>
                  )}
                </button>
              </div>

              {aiError && (
                <div className="mt-4 p-3.5 bg-red-950/50 border border-red-900/60 rounded-xl text-xs text-red-300 flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold block">Falha no Processamento:</span>
                    {aiError}
                  </div>
                </div>
              )}

              {aiReport ? (
                <div className="mt-5 space-y-4 text-xs">
                  <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2">
                    <span className="text-[10px] uppercase font-extrabold text-emerald-400 tracking-wider">
                      Resumo da Amostragem Atual
                    </span>
                    <p className="text-slate-200 leading-relaxed">{aiReport.summary}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2">
                      <span className="text-[10px] uppercase font-extrabold text-blue-400 tracking-wider">
                        Economia Estimada por Volume
                      </span>
                      <p className="text-lg font-bold text-white">{aiReport.potentialSavingsEstimate}</p>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        Projeção baseada na consolidação de termos redundantes em compras conjuntas por adesão ao SRP.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2">
                      <span className="text-[10px] uppercase font-extrabold text-amber-400 tracking-wider">
                        Diretrizes e Consonância Legal
                      </span>
                      <p className="text-slate-200 leading-relaxed font-serif italic">"{aiReport.procurementAdvice}"</p>
                    </div>
                  </div>

                  {aiReport.standardizationSuggestions && aiReport.standardizationSuggestions.length > 0 && (
                    <div className="space-y-3">
                      <span className="text-[10px] uppercase font-extrabold text-emerald-400 tracking-wider block">
                        Recomendações Práticas de Unificação de Itens
                      </span>
                      <div className="space-y-2">
                        {aiReport.standardizationSuggestions.map((suggestion, index) => (
                          <div key={index} className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">
                                {index + 1}
                              </span>
                              <h4 className="font-bold text-slate-100 text-xs">
                                Recomendado: {suggestion.recommendedItem}
                              </h4>
                            </div>
                            <div className="pl-7 space-y-1.5">
                              <p className="text-slate-300 leading-relaxed">{suggestion.justification}</p>
                              <div className="flex flex-wrap gap-1.5 items-center">
                                <span className="text-slate-450 text-[10px]">Agrupa os seguintes equivalentes:</span>
                                {suggestion.similarItems.map((similar, idx) => (
                                  <span key={idx} className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px] font-mono border border-slate-700">
                                    {similar}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                !aiLoading && (
                  <div className="mt-5 py-6 text-center border border-dashed border-slate-800 rounded-xl">
                    <p className="text-xs text-slate-400">
                      Nenhum estudo gerado ainda. Clique em "Gerar Relatório IA" para analisar a compatibilidade dos insumos listados.
                    </p>
                  </div>
                )
              )}
            </div>

            {/* Main supply list catalog layout */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-2xs overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50">
                <div>
                  <h3 className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                    Insumos Padronizados Encontrados
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Exibindo <span className="font-semibold text-gray-800">{filteredData.length}</span> itens padronizados na rede Ebserh
                  </p>
                </div>

                <div className="text-xs font-medium text-gray-500">
                  Total Geral do Catálogo: <strong className="text-gray-900">{totalResults}</strong> resultados
                </div>
              </div>

              {filteredData.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                        <th className="px-4 py-3 text-[11px] text-left uppercase tracking-wider">EBS / CATMAT</th>
                        <th className="px-4 py-3 text-[11px] max-w-sm text-left uppercase tracking-wider">Descrição Detalhada do Item</th>
                        <th className="px-4 py-3 text-[11px] w-24 text-left uppercase tracking-wider">Apresentação</th>
                        <th className="px-4 py-3 text-[11px] w-44 text-left uppercase tracking-wider">Subcategoria</th>
                        <th className="px-4 py-3 text-[11px] w-48 text-left uppercase tracking-wider">HUs Utilizadores</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {stats.mostCommonItems.map((item, idx) => {
                        const isHovered = hoveredRowCode === item.codigo;
                        return (
                          <tr 
                            key={item.id || idx} 
                            onMouseEnter={() => setHoveredRowCode(item.codigo)}
                            onMouseLeave={() => setHoveredRowCode(null)}
                            className={`transition-all duration-150 relative ${
                              isHovered 
                                ? 'bg-amber-100/70 border-l-4 border-amber-500 shadow-3xs' 
                                : 'hover:bg-slate-50 bg-white'
                            }`}
                          >
                            <td className="px-4 py-3.5 text-xs font-mono space-y-1">
                              <span className="block font-bold text-emerald-800 text-[11px] bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded w-max">
                                {item.codigo}
                              </span>
                              <span className="block text-[10px] text-slate-500">
                                CATMAT: {item.catmat}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 text-xs max-w-sm">
                              <p className="text-slate-900 font-semibold leading-relaxed mb-1">{item.descricao}</p>
                              <div className="flex flex-wrap gap-1.5 items-center">
                                <span className="inline-flex items-center gap-1 text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                                  <Tag className="w-3 h-3" />
                                  {item.categoria}
                                </span>
                                {item.hospitals.includes("HU-UFCAT") ? (
                                  <button
                                    onClick={() => toggleUfcatItem(item.codigo)}
                                    title="Clique para remover do plano de compras"
                                    className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 hover:border-emerald-300 px-2.5 py-0.5 rounded-full font-bold transition cursor-pointer"
                                  >
                                    <Check className="w-3 h-3 text-emerald-600 animate-pulse" />
                                    Planejado para HU-UFCAT
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => toggleUfcatItem(item.codigo)}
                                    title="Clique para planejar compra para o HU-UFCAT"
                                    className="inline-flex items-center gap-1 text-[10px] text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 hover:border-amber-300 px-2.5 py-0.5 rounded-full font-bold transition cursor-pointer"
                                  >
                                    <Plus className="w-3 h-3 text-amber-500" />
                                    Planejar Compra para HU-UFCAT
                                  </button>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3.5 text-xs">
                              <span className="px-2 py-1 bg-slate-100 text-slate-700 text-[10px] font-semibold rounded uppercase tracking-wider">
                                {item.apresentacao}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 text-xs text-slate-600 leading-snug">
                              {item.subcategoria}
                            </td>
                            <td className="px-4 py-3.5 space-y-1.5">
                              <div className="flex items-center gap-1.5 text-xs">
                                <span className="text-[11px] font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                                  {item.hospitalsCount} HUs
                                </span>
                                <span className="text-[10px] text-slate-500 font-mono">
                                  ({item.coveragePercent}% rede)
                                </span>
                              </div>
                              
                              {/* Comma-separated list with bold highlighted selected ones */}
                              <div className="flex flex-wrap gap-1">
                                {item.hospitals.map((h, i) => {
                                  const isCompared = compareHospitals.includes(h);
                                  return (
                                    <span
                                      key={i}
                                      onClick={() => toggleHospitalToCompare(h)}
                                      title="Clique para adicionar ao Comparador"
                                      className={`text-[9px] px-1.5 py-0.5 rounded transition cursor-pointer font-semibold ${
                                        isCompared
                                          ? 'bg-blue-600 text-white font-bold ring-2 ring-blue-300'
                                          : h === 'HU-UFCAT'
                                            ? 'bg-emerald-600 text-white font-bold ring-2 ring-emerald-300'
                                            : 'bg-slate-100 text-slate-600 hover:bg-emerald-100 hover:text-emerald-800'
                                      }`}
                                    >
                                      {h}
                                    </span>
                                  );
                                })}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-16 text-center space-y-3">
                  <div className="p-3 bg-gray-100 rounded-full inline-block text-gray-400">
                    <Search className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Nenhum Insumo Encontrado</h4>
                    <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1 leading-relaxed">
                      Não existem insumos correspondentes aos termos ou categorias aplicados atualmente.
                      Tente alterar os termos ou use o botão "Limpar" para recomeçar.
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </main>

      {/* Footer copyright */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-5 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} Comparador SPIA Ebserh — Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
