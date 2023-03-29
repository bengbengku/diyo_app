export interface ProductsInterface {
  name: string;
  image: string;
  price: number;
  category: "coffee" | "non-coffee" | "food" | "dessert";
  count: number;
}
