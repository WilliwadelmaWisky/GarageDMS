import { Inventory } from "./inventory.js";
import { Vehicle } from "./vehicle.js";

/**
 * 
 */
class Garage {
    private inventory: Inventory;
    private vehicles: Vehicle[];

    /**
     * 
     */
    constructor() {
        this.inventory = new Inventory();
        this.vehicles = [];
    }
}