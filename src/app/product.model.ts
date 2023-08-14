export enum Currency {
  DOLLAR = '$',
  EURO = '€',
  TURKISH_LIRA = '₺',
  POUND_STERLING = '£'
}
export enum Type {
  ELECTRONIC = 'Electronic',
  GARDENING = 'Gardening',
  FURNITURE = 'Furniture',
  FASHION = 'Fashion',
  HOME = 'Home',
  BOOKS = 'Books',
  HEALTH = 'Health',
  TOYS = 'Toys',
  GROCERIES = 'Groceries',
  JEWELRY = 'Jewelry',
  AUTOMOTIVE = 'Automotive'
}
export interface Product {
  id: string;
  name: string;
  description: string;
  type: Type;
  price: number;
  currency: Currency;
  
}
