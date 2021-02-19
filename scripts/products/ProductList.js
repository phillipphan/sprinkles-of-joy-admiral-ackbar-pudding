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
      

      render(bakeryProducts, bakeryCategories)
    })
}

const render = (bakeryProducts, bakeryCategories) => {
  contentTarget.innerHTML = bakeryProducts.map(product => {
    const productCategory = bakeryCategories.find(cat => cat.id === product.categoryId)
    const reviews = allReviews.filter(review => review.productId === product.id)

    return Product(product, productCategory, reviews)
  }).join("")
}

eventHub.addEventListener("categorySelected", e => {
  getProducts()
    .then(getCategories)
    .then(() => {
      let chosenCategory = e.detail.selectedCategory
      const products = useProducts()
      const categories = useCategories()

      const filteredProducts = products.filter(product => product.categoryId === parseInt(chosenCategory))
      chosenCategory = categories.filter(cat => cat.id === parseInt(chosenCategory))

      render(filteredProducts, chosenCategory)
    })
})
