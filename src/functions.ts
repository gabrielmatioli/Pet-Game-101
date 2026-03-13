import {Cat, Dog, Fox, Pet, Gender} from "./pets.ts";
import {Player} from "./player.ts";
import cliColor from "cli-color"
const clc = cliColor
import promptSync from "prompt-sync";
const prompt = promptSync()

type availableSections = "pc" | "main" | "ps" | "mp" | "mpp" | "p"
type Color = "red" | "green" | "yellow" | "blue" | "white";

const petStoreFoodPrice: number = 50
const petStore = [
    { species: "Dog", price: 100, Class: Dog, emoji: "🐶"},
    { species: "Cat", price: 200, Class: Cat, emoji: "🐱"},
    { species: "Fox", price: 300, Class: Fox, emoji: "🦊"},
];

const cliColors = {
    red: {bright: cliColor.redBright, notBright: cliColor.red},
    green: {bright: cliColor.greenBright, notBright: cliColor.green},
    yellow: {bright: cliColor.yellowBright, notBright: cliColor.yellow},
    blue: {bright: cliColor.blueBright, notBright: cliColor.blue},
    white: {bright: cliColor.whiteBright, notBright: cliColor.white}
};

export function changeColor(color: Color, bright: boolean, text: string): string{
    return bright ? cliColors[color].bright(text) : cliColors[color].notBright(text)
}

// helper so white text is easier to print
function white(text: string): string {
    return changeColor("white", true, text)
}

export function display(option: availableSections, player?: Player, pet?: Pet): void {
    switch (option) {
        case "pc":

            console.log(white("──────────────────"))
            console.log(changeColor("blue", true, "PLAYER  CREATION"))
            console.log(white("──────────────────"))
            break

        case "main":

            console.log(white("──────────────────"))
            console.log(changeColor("blue", true, "PET GAME 101"))
            console.log(white("──────────────────"))
            console.log(white("1 ➜ 🐶 PET STORE "))
            console.log(white("2 ➜ 🦴 MANAGE PETS "))
            console.log(white("3 ➜ 👤 PLAYER \n"))
            break

        case "ps":

            console.log(white(`AVAILABLE BALANCE 💸: $${player?.money}`))
            console.log(white("──────────────────"))
            console.log(changeColor("blue", true, "PET  STORE"))
            console.log(white("──────────────────"))
            console.log(white(`PETS SOLD 🐾: ${Pet.animalCount}`))
            for(let i = 0; i < petStore.length; i++){
                console.log(white(`${i + 1} ➜ ${petStore[i].emoji} ${petStore[i].species} | $${petStore[i].price}`))
            }
            console.log(white(`F ➜ 10 Pet Food | $${petStoreFoodPrice}\n`))
            break

        case "mp":

            console.log(white("──────────────────"))
            console.log(changeColor("blue", true, "MANAGE  PETS"))
            console.log(white("──────────────────"))
            if(typeof player !== "undefined"){
                for(let i = 0; i < player.pets.length; i++){
                    console.log(white(`${i + 1} • ${player.pets[i].name}`))
                }
                console.log(" ")
            }
            break

        case "mpp":

            if(typeof pet !== "undefined"){
                console.log(white(`SELECTED PET: ${pet.name}`))
                console.log(white("──────────────────"))
                console.log(changeColor("blue", true, "PET OPTIONS"))
                console.log(white("──────────────────"))
                console.log(white("PET STATS:"))
                console.log(white("─────────"))
                console.log(white(`PET LVL: ${pet.level}`))
                console.log(white(`PET XP: ${pet.XP}`))
                console.log(white(`PET SPECIES: ${pet.species}`))
                console.log(white(`PET GENDER: ${pet.gender}\n`))
                console.log(white(`XP UNTIL LEVEL UP: ${((pet.level + 1) * Pet.levelThreshold) - pet.XP}`))
                console.log(white("──────────────────"))
                console.log(white("1 ➜ 🍽️ EAT "))
                console.log(white("2 ➜ 🚀 PLAY "))
                console.log(white("3 ➜ 🗣 SPEAK "))
                console.log(white("4 ➜ 🚪 QUIT \n"))
            }

            break
        case "p":

            if(typeof player !== "undefined"){
                console.log(white("──────────────────"))
                console.log(changeColor("blue", true, "PLAYER STATS"))
                console.log(white("──────────────────"))
                console.log(white(`🪪 Name ➜ ${player.name}`))
                console.log(white(`💸 Money ➜ $${player.money}`))
                console.log(white(`🐶 # of Pets ➜ ${player.pets.length}`))
                console.log(white(`🍽️ Pet Food Available ➜ ${player.petFood}`))
            }

            break
    }

}

export function produceError(text: string): void{
    console.log(`${changeColor("red", true, text)}`)
}


export function purchasePetFood(player: Player): string{

    if(player.money >= petStoreFoodPrice){

        player.money -= petStoreFoodPrice
        player.petFood += 10

        return changeColor("green", false, "Purchased Successfully: Pet Food")
    }
    else {
        return changeColor("red", false, "Purchase Failed: Not enough money")
    }
}

export function purchasePet(player: Player, choice: number): string{

    if(!petStore[Number(choice) - 1]?.price){
        return changeColor("red", false, "Invalid choice")
    }

    const petName = prompt(white("Pet Name: ")) as string;

    if (player.money >= petStore[Number(choice) - 1].price) {
        const petClass = petStore[Number(choice) - 1].Class
        player.buyPet(petClass, petName, petStore[Number(choice) - 1].price)

        return changeColor("green", false, "Purchased Successfully: Pet")
    }
    else {
        return changeColor("red", false, "Purchased Failed: Not enough money")
    }
}

export function clear(): void{
    for(let i = 0; i < 10; i++){
        console.log("\n")
    }
}

export function randomGender(): Gender {
    return Math.random() < 0.5 ? "Female" : "Male";
}

