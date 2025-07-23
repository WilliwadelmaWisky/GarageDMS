/**
 * 
 */
export class Inventory {
    private items: Item[];

    /**
     * 
     */
    constructor() {
        this.items = [];
    }


    /**
     * 
     * @param predicate 
     * @returns 
     */
    public searchBy(predicate: (item: Item) => boolean): Item[] {
        return [];
    }
}

/**
 * 
 * @param id 
 * @returns 
 */
export function matchID(id: string): (item: Item) => boolean { return (item: Item) => item.getID() === id; }

/**
 * 
 */
export class Item {
    private id: string;
    private name: string;
    private value: number;
    private supplierID: string;
    private amount: number;
    private shelfLocation: string;

    /**
     * 
     * @param id 
     * @param name 
     * @param value 
     * @param supplierID 
     */
    constructor(id: string, name: string, value: number, supplierID: string) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.supplierID = supplierID;
        this.amount = 0;
        this.shelfLocation = "";
    }

    /**
     * 
     * @returns 
     */
    public getID(): string { return this.id; }
}

/**
 * 
 */
class Supplier {
    private id: string;
    private name: string;

    /**
     * 
     * @param id 
     * @param name 
     */
    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}
