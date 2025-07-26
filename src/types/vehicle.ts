/**
 * 
 */
export class Vehicle {
    private vin: string;
    private make: string;
    private model: string;
    private manufactureDate: Date;
    private registrationNumber: string;

    /**
     * 
     * @param vin 
     * @param make 
     * @param model 
     * @param manufactureDate 
     */
    constructor(vin: string, make: string, model: string, manufactureDate: Date) {
        this.vin = vin;
        this.make = make;
        this.model = model;
        this.manufactureDate = manufactureDate;
        this.registrationNumber = "";
    }
}