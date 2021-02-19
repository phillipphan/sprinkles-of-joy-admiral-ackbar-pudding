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

let userId = []
let userName = []
let products = []




//function that pulls all reviews by current user
export const reviewEditForm = () => {
    getReviews()
    .then(getCustomers)
    .then(getProducts)
    .then(() => {
        
        // userName = getCustomer(authHelper.getCurrentUserId())
        userId = authHelper.getCurrentUserId()
        products = useProducts()
        let allReviews = useReviews()

        const reviews = allReviews.filter(
            rev => rev.userId === parseInt(userId)
        )
        
        renderEditReview(userId, products, reviews)  
    }) 
    
}

//renders HTML for reviews
export const renderEditReview = (userId, products, reviews) => {
    
    contentTarget.innerHTML = `
    <div id="reviews__modal" class="modal--parent">
    <div class="modal--content">
    <h2>My Reviews</h2>
    <h3>${userName}</h3>
    <div>${reviews.map(rev => {
        return `<div class="review">
        <div class="date">${rev.date}</div>
        <p>${rev.productName}</p>
        <p>${rev.text}</p>
        <p>${rev.rating}/5</p>
        <button id="deleteReview--${rev.id}">Delete Review</button>
        <button id="editReview--${rev.id}">Edit Review</button>
        </div>
        `
    }                
      ).join("")}
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
                selectedReview: idSuffix
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