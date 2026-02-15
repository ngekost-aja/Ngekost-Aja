export interface Property {
  title: string;
  price: string;
  location: string;
  image: string;
  discount?: string;
  badge?: string;
  rating?: number;
  reviews?: number;
  description?: string;
  features?: string[];
  photos?: string[];
}