export type Name = {
  pt: string;
};

export type Description = {
  pt: string;
};

export type Handle = {
  pt: string;
};

export type SeoTitle = {
  pt: string | null;
};

export type SeoDescription = {
  pt: string | null;
};

export type InventoryLevel = {
  id: number;
  variant_id: number;
  location_id: string;
  stock: number | null;
};

export type Variant = {
  id: number;
  image_id: number | null;
  product_id: number;
  position: number;
  price: string;
  compare_at_price: string;
  promotional_price: string | null;
  stock_management: boolean;
  stock: number | null;
  weight: string;
  width: string;
  height: string;
  depth: string;
  sku: string;
  values: any[]; // Replace with actual type
  barcode: string;
  mpn: string;
  age_group: string | null;
  gender: string | null;
  created_at: string;
  updated_at: string;
  cost: string | null;
  inventory_levels: InventoryLevel[];
};

export type Image = {
  id: number;
  product_id: number;
  src: string;
  position: number;
  alt: any[]; // Replace with actual type
  created_at: string;
  updated_at: string;
};

export type Product = {
  id: number;
  name: Name;
  description: Description;
  handle: Handle;
  attributes: any[]; // Replace with actual type
  published: boolean;
  free_shipping: boolean;
  requires_shipping: boolean;
  canonical_url: string;
  video_url: string | null;
  seo_title: SeoTitle;
  seo_description: SeoDescription;
  brand: string | null;
  created_at: string;
  updated_at: string;
  variants: Variant[];
  tags: string;
  images: Image[];
  categories: any[]; // Replace with actual type
};

export type ProductList = Product[];

export type ProductListResponseDTO = ProductList;
