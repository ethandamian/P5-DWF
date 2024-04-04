export class Category {
    category_id: number;
    category: string;
    acronym: string;
    status: number;

    constructor(category_id: number, category: string, acronym: string, status: number) {
        this.category_id = category_id;
        this.category = category;
        this.acronym = acronym;
        this.status = status;
    }
}