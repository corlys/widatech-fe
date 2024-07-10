export type Product = {
  id: string;
  name: string;
  pictureUrl: string;
  stock: number;
  price: number;
};

export type SelectedProduct = {
  product: Product;
  quantity: number;
};
