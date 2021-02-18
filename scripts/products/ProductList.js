import { getProducts, useProducts } from "./ProductProvider.js"
import { getCategories, useCategories } from "../categories/CategoryProvider.js"
import { Product } from "./Product.js"

const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".menu__items")

export const ProductList = () => {
  getProducts()
    .then(getCategories)
    .then(() => {
      const bakeryProducts = useProducts()
      const bakeryCategories = useCategories()
      render(bakeryProducts, bakeryCategories)
    })
}

const render = (bakeryProducts, bakeryCategories) => {
  contentTarget.innerHTML = bakeryProducts.map(product => {
    const productCategory = bakeryCategories.find(cat => cat.id === product.categoryId)

    return Product(product, productCategory)
  }).join("")
}

eventHub.addEventListener("categorySelected", e => {
  getProducts()
    .then(getCategories)
    .then(() => {
      let chosenCategory = e.detail.selectedCategory
      const bakeryProducts = useProducts()
      const bakeryCategories = useCategories()

      const filteredProducts = bakeryProducts.filter(product => product.categoryId === parseInt(chosenCategory))
      chosenCategory = bakeryCategories.filter(cat => cat.id === parseInt(chosenCategory))

      render(filteredProducts, chosenCategory)
    })
})
