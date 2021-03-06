import { renderCats } from "./cats.js"

const contentTarget = document.getElementById("cats")
const catPicTarget = document.querySelector(".cat__container")

//declare an empty array for cats to live

let cats = [];

// returns cats as objects
export const useCats = () => cats


//function to get cats from API
export const getCats = () => {
    return fetch("https://api.thecatapi.com/v1/breeds?api_key=b7417677-f0a2-4fce-b5fe-cefd4bb44aa0")
    .then(response => response.json())
    .then(catsArray => cats = catsArray)
    .then(console.log(cats))
    
}

let catURL = ""
export const randomCat = (breed) => {
    
    return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed}`)
        .then(response => response.json())
        .then(cat => catURL = cat[0].url)
        .then(() => {
            catPicTarget.innerHTML += renderCats(catURL)
        })
    }