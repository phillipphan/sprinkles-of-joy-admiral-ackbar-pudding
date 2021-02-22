//import statements
import { authHelper } from "../auth/authHelper.js"
import {  useCustomers, getCustomers } from "../customers/CustomerProvider.js"
import { getProducts, useProducts } from "../products/ProductProvider.js"
import { renderEditReview } from "./ReviewEdit.js"
import { getReviews, useReviews } from "./ReviewProvider.js" 

//define eventHub 
const eventHub = document.querySelector("#container")

//define contentTarget that will house reviews
const contentTarget = document.querySelector(".newReview")


let users = []


//function that pulls all reviews by current user
export const userReviews = () => {
    getReviews()
    .then(getCustomers)
    .then(getProducts)
    .then(() => {
        
        const userId = authHelper.getCurrentUserId()
        users = useCustomers()
        const user = users.find(cust => cust.id === parseInt(userId)).name
        let allProducts = useProducts()
        let allReviews = useReviews()

        const reviews = allReviews.filter(
            rev => rev.userId === parseInt(userId)
        )
     
        renderUserReview(allProducts, reviews, user)  
    }) 
    
}


export const stars = (rating) => {
    if (rating === 1) {
        let starRating = "&#9733 &#9734 &#9734 &#9734 &#9734"
        return starRating
    } else if (rating === 2) {
        let starRating = "&#9733 &#9733 &#9734 &#9734 &#9734"
        return starRating
    } else if (rating === 3) {
        let starRating = "&#9733 &#9733 &#9733 &#9734 &#9734"
        return starRating
    } else if (rating === 4) {
        let starRating = "&#9733 &#9733 &#9733 &#9733 &#9734"
        return starRating
    } else if (rating === 5) {
        let starRating = "&#9733 &#9733 &#9733 &#9733 &#9733"
        return starRating
    }
} 


//renders HTML for reviews
const renderUserReview = (allProducts, reviews, userName) => {
    
    contentTarget.innerHTML = `
    <div id="reviews__modal" class="modal--parent">
    <div class="modal--content">
    <h2>My Reviews</h2>
    <h3>${userName}</h3>
    <div>${reviews.map(rev => {
        return `<div class="review">
        <div class="date" id="date"><b>Date: </b>${rev.date}</div>
        <p id="productName">Product: ${allProducts.find(prod => prod.id === parseInt(rev.productId)).name}</p>
        <p id="reviewText">Review: ${rev.text}</p>
        <p id="rating">Rating: ${stars(rev.rating)}</p>
        <button id="deleteReview--${rev.id}">Delete Review</button>
        <button id="editReview--${rev.id}">Edit Review</button>
        </div>
        `
    }).join("")}
      <button id="modal--close">Close</button>
</div>
    </div>
`
}


//listens for click on edit button in review form
eventHub.addEventListener("click", event => {
    if (event.target.id.startsWith("editReview--")) {
        
        const [idPrefix, idSuffix] = event.target.id.split("--")

        
        
        //create new custom event to be dispatched
        const editReviewCustomEvent = new CustomEvent("editReview", {
            detail: {
                selectedReview: idSuffix,
            }
        })
        //dispatch the custom event
        eventHub.dispatchEvent(editReviewCustomEvent)
      
    }
  })



//listens for click on delete button in review form
eventHub.addEventListener("click", event => {
    if (event.target.id.startsWith("deleteReview--")) {
        const [idPrefix, idSuffix] = event.target.id.split("--")
        
        //create new custom event to be dispatched
        const deleteReviewCustomEvent = new CustomEvent("deleteReview", {
            detail: {
                selectedReview: idSuffix
            }
        })
        //dispatch the custom event
        eventHub.dispatchEvent(deleteReviewCustomEvent)
      
    }
  })

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