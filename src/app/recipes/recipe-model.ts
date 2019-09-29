import { Ingredient } from '../shared/ingredients.model';

export class Recipe {
    public name: String;
    public decription: string;
    public imagePath: string;
    public ingredients:Ingredient[];


    constructor(name: string, desc: string, imagePath: string,ingredients:Ingredient[]) {
        this.name = name;
        this.decription = desc;
        this.imagePath = imagePath;
        this.ingredients=ingredients;
    }
}