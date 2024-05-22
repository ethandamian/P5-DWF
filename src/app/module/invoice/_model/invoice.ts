import { Item } from "./item";

export class Invoice {
    created_at: string = "";
    invoice_id: number = 0;
    items: Item[] = [];
    rfc: string = "";
    subtotal: number = 0;
    taxes: number = 0;
    total: number = 0;
}