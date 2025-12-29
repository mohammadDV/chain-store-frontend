export type SearchSuggestionProduct = {
  id: number;
  title: string;
  amount: number;
  discount: number;
  image: string;
  rate: number;
};

export type SearchSuggestionCategoryParent = {
  id: number;
  title: string;
  parent_id: number;
  image: string;
  parent: SearchSuggestionCategoryParent | null;
};

export type SearchSuggestionCategory = {
  id: number;
  title: string;
  parent_id: number;
  image: string;
  parent: SearchSuggestionCategoryParent | null;
};

export type SearchSuggestionsResponse = {
  products: SearchSuggestionProduct[];
  categories: SearchSuggestionCategory[];
};

