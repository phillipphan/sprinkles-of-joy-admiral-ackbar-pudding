import { getProducts, useProducts } from "./ProductProvider.js"
import { getCategories, useCategories } from "../categories/CategoryProvider.js"
import { Product } from "./Product.js"
import { getReviews, useReviews } from "../reviews/ReviewProvider.js"

const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".menu__items")

let bakeryProducts = []
let bakeryCategories = []
let allReviews = []

export const ProductList = () => {
  getProducts()
    .then(getCategories)
    .then(getReviews)
    .then(() => {
      bakeryProducts = useProducts()
      bakeryCategories = useCategories()
      allReviews = useReviews()
      debugger

      render()
    })
}

const render = () => {
  contentTarget.innerHTML = bakeryProducts.map(product => {
    const productCategory = bakeryCategories.find(cat => cat.id === product.categoryId)
    const reviews = allReviews.filter(review => review.productId === product.id)

    return Product(product, productCategory, reviews)
  }).join("")
}
