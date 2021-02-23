//declare an empty array for cats to live
let cats = [];

// returns cats as objects
export const useCats = () => cats.data.slice();


//function to get cats from API
export const getCats = () => {
    debugger
    return fetch("https://api.thecatapi.com/v1/breeds?api_key=b7417677-f0a2-4fce-b5fe-cefd4bb44aa0")
    .then(response => response.json())
    .then(catsArray => cats = catsArray.name)
    .then(console.log(cats))
    
}
