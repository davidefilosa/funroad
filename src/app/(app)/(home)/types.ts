export type Category = {
  id: string;
  name: string;
  slug: string;
  color?: string;
  parent?: string; // ID of the parent category
  subcategories?: Category[]; // IDs of subcategories
};
