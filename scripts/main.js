console.log("Welcome to Sprinkles of Joy!")

import "./customers/RegisterForm.js"
import "./orders/OpenCart.js"
import "./orders/OrderList.js"
import "./contactForm/ContactForm.js"
import "./reviews/ReviewList.js"
import "./about/about.js"


import { CustomerNav } from "./customers/CustomerNav.js"
import { CategorySelect } from "./categories/CategorySelect.js"
import { LoginForm } from "./customers/LoginForm.js"
import { ProductList } from "./products/ProductList.js"
import { CatSelect } from "./cats/CatSelect.js"
import { getCats, useCats } from "./cats/CatProvider.js"




LoginForm()
CustomerNav()
CategorySelect()
ProductList()
CatSelect()
