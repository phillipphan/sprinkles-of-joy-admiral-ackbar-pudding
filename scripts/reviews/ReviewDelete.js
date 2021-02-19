//import statements
import { authHelper } from "../auth/authHelper.js"
import { getCustomer, getCustomers, useCustomers } from "../customers/CustomerProvider.js"
import { ProductList } from "../products/ProductList.js"
import { getProducts, useProducts } from "../products/ProductProvider.js"
import { getReviews, saveReview, useReviews } from "../reviews/ReviewProvider.js" 

//define eventHub 
const eventHub = document.querySelector("#container")

//define contentTarget that will house reviews
const contentTarget = document.querySelector(".newReview")

let user = []
let products = []
let reviews = []

//function that pulls all reviews by current user
export const reviewEditForm = () => {
    getReviews()
    .then(getProducts)
    .then(() => {
        
        user = authHelper.getCurrentUserId()
        products = useProducts()
        reviews = useReviews()
        renderEditReview(user, products, reviews)  
    }) 
    
}

//renders HTML for reviews
const renderEditReview = (user, products, reviews) => {
    
    contentTarget.innerHTML = `
    <div id="reviews__modal" class="modal--parent">
    <div class="modal--content">
    <h2>My Reviews</h2>
    <h3>${user}</h3>
    <div>${reviews.map(rev => {
        return `<div class="review">
        <div class="date">${rev.date}</div>
        <p>${rev.productId}</p>
        <p>${rev.text}</p>
        <p>${rev.rating}/5</p>
        <button id="deleteReview--${rev.id}">Delete Review</button>
        </div>
        `
    }                
      ).join("")}
      <button id="modal--close">Close</button>
</div>
    </div>
`
}

//listens for click on close button in review form
eventHub.addEventListener("click", event => {
    if (event.target.id === "modal--close") {
      closeModal()
    }
  })

//function to close review form
const closeModal = () => {
    contentTarget.innerHTML = ""
  }