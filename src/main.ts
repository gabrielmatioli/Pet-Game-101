import {Player} from './player.ts'
import {display, clear, purchasePet, purchasePetFood, changeColor, produceError} from "./functions.ts";
import {Pet} from "./pets.ts";
import {white} from "cli-color";
import promptSync from "prompt-sync";
const prompt = promptSync()

// Player Creation
display("pc")
let name = prompt(white("Enter your name: ")) as string
while(name.length < 1){
    produceError("Invalid name")
    name = prompt(white("Enter your name: ")) as string
}

const mainPlayer = new Player(name)

while(true){

    // Main Menu

    try{

        clear()
        display("main")
        const menuChoice = prompt(white("Choice: ")) as string

        switch(menuChoice){

            case "1":

                // Pet Store

                clear()
                display("ps", mainPlayer)
                const petStoreChoice = prompt(white("Choice: ")) as string;

                if(petStoreChoice.length < 1){
                    produceError("Invalid choice")
                    break
                }

                if(petStoreChoice.toUpperCase() === "F"){
                    const msg = purchasePetFood(mainPlayer)
                    console.log(msg)
                }
                else{
                    const msg = purchasePet(mainPlayer, Number(petStoreChoice))
                    console.log(msg)
                }

                break

            case "2":

                // Manage Pet

                if(mainPlayer.pets.length >= 1){
                    clear()
                    display("mp", mainPlayer)
                    const managePetChoice = prompt(white("Choice: ")) as string;

                    if(managePetChoice.length < 1){
                        console.log(changeColor("red", false, "Invalid choice"))
                        break
                    }
                    const chosenPet: Pet = mainPlayer.pets[Number(managePetChoice) - 1]

                    if(chosenPet !== undefined){
                        let managingPet = true
                        while(managingPet){

                            clear()
                            display("mpp", mainPlayer, chosenPet)
                            const managePetChoice = prompt(white("Choice: ")) as string;

                            switch(managePetChoice){
                                case "1":
                                    chosenPet.eat()
                                    break
                                case "2":
                                    chosenPet.play()
                                    break
                                case "3":
                                    chosenPet.speak()
                                    break
                                case "4":
                                    managingPet = false
                                    break
                                default:
                                    produceError("Invalid choice")
                                    break

                            }
                        }
                    }
                    else {
                        produceError("Invalid choice")
                    }

                }
                else {
                    produceError("No pets available")
                }

                break

            case "3":

                // Player Stats

                clear()
                display("p", mainPlayer)

                break

            default:
                produceError("Invalid choice")

                break
        }
    }
    catch (e) {

        console.log(e)
        break

    }
}



