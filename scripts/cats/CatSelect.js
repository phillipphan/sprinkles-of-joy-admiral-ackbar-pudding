//import statement for useCats & getCats

import { useCats, getCats, randomCat } from "../cats/catProvider.js"

//define eventHub & querySelector()
const eventHub = document.querySelector(".mainContainer")

//define contentTarget & querySelector() that references where on the DOM <select> will be rendered
const contentTarget = document.getElementById("cats")
const catPicTarget = document.querySelector(".cat__container")


//Listen for a change on eventHub. If eventListener detects a change, changeEvent function runs
eventHub.addEventListener("change", changeEvent => {
    
    if (changeEvent.target.id === "catDropdown") {
        
        
        const selectedCat = changeEvent.target.value

        //create new custom event to be dispatched
        catPicTarget.innerHTML = ""
        const catSelectedCustomEvent = randomCats(selectedCat)
        
    }
})

//function to give cat objects to render()
export const CatSelect = () => {
    
    getCats()
        .then(() => {
            const cats = useCats()
            render(cats)
        })
}

//funtion to render list on DOM
const render = catCollection => {
    
    contentTarget.innerHTML = `
        <select id="catDropdown">
            <option value="0">Please choose a cat...</option>
            ${catCollection.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join("")}  
        </select>
        `

}


const randomCats = (breed) => {
  for (let i=0; i<5; i++){
    console.log(randomCat(breed))
  }
}
