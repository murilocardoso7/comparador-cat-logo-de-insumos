export interface Insumo {
  id: string; // combination of code or unique index
  codigo: string; // Código Ebserh
  catmat: string; // Catmat
  descricao: string; // Descritivo
  apresentacao: string; // Apresentação
  categoria: string; // Categoria
  subcategoria: string; // Subcategoria
  hospitals: string[]; // List of hospitals using this item parsed from HUFs Utilizadores
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface ScrapingResult {
  items: Insumo[];
  grupos: SelectOption[];
  hospitais: SelectOption[];
  totalResults: number;
  source: 'live' | 'fallback' | 'user-upload';
  error?: string;
}

export interface GroupMapping {
  id: string;
  name: string;
  description: string;
  icon: string;
  scrapperGroup: string; // Closest official "grupo" in select
  keywords: string[]; // Text search triggers for smart sub-matching
}

export interface AIAnalysisResponse {
  summary: string;
  standardizationSuggestions: {
    recommendedItem: string;
    similarItems: string[];
    justification: string;
  }[];
  potentialSavingsEstimate: string;
  procurementAdvice: string;
}
