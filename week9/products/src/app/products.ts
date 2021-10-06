export class Products {
    objectid: string;
    id: number;
    name: string;
    description: string;
    price: number;
    units: number;

    constructor(objectid: string, id:number, name:string, description:string, price:number, units:number){
        this.objectid = objectid;
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.units = units;
    }
}