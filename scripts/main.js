console.log("Welcome to Sprinkles of Joy!")

import "./customers/RegisterForm.js"
import "./orders/OpenCart.js"
import "./orders/OrderList.js"
import "./contactForm/ContactForm.js"
import "./reviews/ReviewList.js"
import "./about/about.js"
import "./cats/CatSelect.js"

import { CustomerNav } from "./customers/CustomerNav.js"
import { CategorySelect } from "./categories/CategorySelect.js"
import { LoginForm } from "./customers/LoginForm.js"
import { ProductList } from "./products/ProductList.js"
import { CatSelect } from "./cats/CatSelect.js"
import { getCats, randomCat, useCats } from "./cats/CatProvider.js"




LoginForm()
CustomerNav()
CategorySelect()
ProductList()
CatSelect()

// const randomCats = (breed) => {
//   for (let i=0; i<5; i++){
//     console.log(randomCat(breed))
//   }
// }

// randomCats("beng")
// // randomCats("beng")
// // randomCats("beng")
// // randomCats("beng")