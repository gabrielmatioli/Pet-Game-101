import {Gender, Success} from "./types.ts";
import {changeColor} from "./functions.ts";

export abstract class Pet {

    static animalCount = 0;
    static levelThreshold: number = 100

    name: string;
    species: string;
    gender: Gender;
    sound: string;

    hunger: number = 100
    level: number = 0
    XP: number = 0

    protected constructor(name: string, species: string, gender: Gender, sound: string) {

        this.name = name;
        this.species = species;
        this.gender = gender;
        this.sound = sound;

        Pet.animalCount++;

    }

    speak(): void {

        console.log("──────────────────")
        console.log(`${changeColor("yellow", false, `${this.name}: ${this.sound}!`)}`);
        console.log("──────────────────")

    }

    levelUp(): void {

        while(this.XP >= ((this.level + 1) * Pet.levelThreshold)){
            console.log("──────────────────")
            console.log(`${changeColor("yellow", false, "Level  UP!  🎉")}`);
            console.log(`${changeColor("yellow", false, `New pet level: ${this.level + 1}`)}`);
            console.log("──────────────────")
            this.level += 1;

        }

    }

    eat(food: number): Success{

        if(this.hunger < 100 && food >= 1){

            console.log("──────────────────")
            console.log(`${changeColor("green", false, `${this.name} has been fed!`)}`);
            this.hunger = 100;
            console.log(`${changeColor("green", false, `New hunger: ${this.hunger}`)}`);
            console.log("──────────────────")

            const XPGained = Math.floor(Math.random() * 25) + 1
            this.XP += XPGained

            this.levelUp()
            return true
        }
        else if(food < 1){

            console.log("──────────────────")
            console.log(`${changeColor("red", false, 'Not enough pet food!')}`);
            console.log("──────────────────")
            return false

        }
        else if(this.hunger === 100){

            console.log("──────────────────")
            console.log(`${changeColor("red", false, `${this.name} is full!`)}`);
            console.log("──────────────────")
            return false

        }
        return false

    }

    play(): void {

        if(this.hunger >= 35){

            const hoursPlayed = Math.floor(Math.random() * 10) + 1

            console.log("──────────────────")
            console.log(`${changeColor("green", false, `${this.name} played for ${hoursPlayed} hours`)}`);
            this.hunger = Math.max(0, this.hunger - hoursPlayed * 3);
            console.log(`${changeColor("green", false, `New hunger: ${this.hunger}`)}`);
            console.log("──────────────────")

        }
        else{
            console.log("──────────────────")
            console.log(`${changeColor("red", false, `${this.name} has no energy to play!`)}`);
            console.log(`${changeColor("red", false, `Feed ${this.name}! to continue!`)}`);
            console.log("──────────────────")
        }

    }

}

// Available pets

export class Dog extends Pet{

    public constructor(name: string, gender: Gender) {

        super(name, "Dog", gender, "Woof");

    }

}

export class Cat extends Pet{

    public constructor(name: string, gender: Gender) {

        super(name, "Cat", gender, "Meow");

    }

}

export class Fox extends Pet{

    public constructor(name: string, gender: Gender) {

        super(name, "Fox", gender, "FIKOIEWS");

    }

}


