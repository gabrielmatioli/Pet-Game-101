import {Pet, Gender} from "./pets.ts";
import {randomGender} from "./functions.ts";

export class Player {

    name: string;
    money: number = 500
    petFood: number = 0     // temporarily deactivated
    pets: Pet[] = []

    public constructor(name: string) {
        this.name = name
    }

    buyPet(petClass: new (name: string, gender: Gender) => Pet, petName: string, price: number): void {
        const chosenGender = randomGender()

        const chosenPet = new petClass(petName, chosenGender)
        this.pets.push(chosenPet)
        this.money -= price
    }

}
