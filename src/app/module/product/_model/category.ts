export class Category {
    category_id: number;
    category: string;
    acronym: string;
    status: string;

    constructor(category_id: number, category: string, acronym: string, status: string) {
        this.category_id = category_id;
        this.category = category;
        this.acronym = acronym;
        this.status = status;
    }
}