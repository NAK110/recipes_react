export interface Recipe {
    id: number;
    name: string;
    ingredients: string;
    instructions: string;
    created_at?: Date;
    updated_at?: Date;
}