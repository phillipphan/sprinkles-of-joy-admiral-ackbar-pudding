import { getProducts, useProducts } from "../products/ProductProvider.js"
import { getReviews, useReviews } from "./ReviewProvider.js"

//define contentTarget that will house reviews
const contentTarget = document.querySelector(".newReview")

//render current reviews to DOM with related product
const reviewRender = (reviewArray, productArray) => {
    debugger
    contentTarget.innerHTML = reviewArray.map(review => {
        const relatedProduct = productArray.filter(product => product.id === review.productId)

        return`
        <h3>reviews</h3>
        <p>${review.text}</p>
        `
    }).join("")
}

export const reviewList = () => {
    getReviews()
        .then(getProducts)
        .then(() => {
            const allReviews = useReviews()
            const allProducts = useProducts()
            reviewRender(allReviews, allProducts)
        })
}