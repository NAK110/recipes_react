export interface Recipe {
    id: number;
    name: string;
    ingredients: string | string[]; // Backend supports both formats
    instructions: string | string[]; // Backend supports both formats
    created_at?: Date;
    updated_at?: Date;
}