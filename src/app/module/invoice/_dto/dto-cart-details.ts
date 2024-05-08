import { Product } from "../../product/_model/product";

export class DtoCartDetails{
    cart_id: number = 0;
    gtin: string = "";
    quantity: number = 0;
    product: Product = new Product();
    image: string = "";


}