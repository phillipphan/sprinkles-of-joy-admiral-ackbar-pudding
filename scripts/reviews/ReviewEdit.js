import { authHelper } from "../auth/authHelper.js"
import { getCustomers, useCustomers } from "../customers/CustomerProvider.js"
import { ProductList } from "../products/ProductList.js"
import { getProducts, useProducts } from "../products/ProductProvider.js"
import { editReview, getReviews, useReviews } from "./ReviewProvider.js"
import { userReviews } from "./Reviews.js"


//define eventHub 
const eventHub = document.querySelector("#container")

//define contentTarget that will house reviews
const contentTarget = document.querySelector(".newReview")

//get crrent user name
export const getUser = () => {
    getReviews()
    .then(getCustomers)
    .then(() => {
        
        const userId = authHelper.getCurrentUserId()
        let users = useCustomers()
        const currentUser = users.find(cust => cust.id === parseInt(userId)).name
        console.log(currentUser)
        return currentUser 
    }) 
    
}

//get information from current review to be passed to render function
export const getReview = (reviewId) => {
    getReviews()
    .then(getCustomers)
    .then(getProducts)
    .then(() => {
        
        const allProducts = useProducts()
        const allReviews = useReviews()
        const allUsers = useCustomers()
        
        const thisReview = allReviews.find(rev => rev.id === parseInt(reviewId))
        const userId = authHelper.getCurrentUserId()
        const user = allUsers.find(cust => cust.id === parseInt(userId)).name
        
        
        //renders a modal window that allows users to edit their reviews
        renderEditReview(allProducts, thisReview, user)
    })

}

//listener for "Edit Review" button
eventHub.addEventListener("editReview", customEvent => {
    const reviewId = customEvent.detail.selectedReview
    
    getReview(reviewId)
    

})

const currentRating = (rating) => {
    if (parseInt(rating) === 1) {
        return `
        <option value="1" selected>&#9733 &#9734 &#9734 &#9734 &#9734</option>
        <option value="2">&#9733 &#9733 &#9734 &#9734 &#9734</option>
        <option value="3">&#9733 &#9733 &#9733 &#9734 &#9734</option>
        <option value="4">&#9733 &#9733 &#9733 &#9733 &#9734</option>
        <option value="5">&#9733 &#9733 &#9733 &#9733 &#9733</option>`
    } else if (parseInt(rating) === 2) {
        return `
        <option value="1">&#9733 &#9734 &#9734 &#9734 &#9734</option>
        <option value="2" selected>&#9733 &#9733 &#9734 &#9734 &#9734</option>
        <option value="3">&#9733 &#9733 &#9733 &#9734 &#9734</option>
        <option value="4">&#9733 &#9733 &#9733 &#9733 &#9734</option>
        <option value="5">&#9733 &#9733 &#9733 &#9733 &#9733</option>`
    } else if (parseInt(rating) === 3) {
        return `
        <option value="1">&#9733 &#9734 &#9734 &#9734 &#9734</option>
        <option value="2">&#9733 &#9733 &#9734 &#9734 &#9734</option>
        <option value="3" selected>&#9733 &#9733 &#9733 &#9734 &#9734</option>
        <option value="4">&#9733 &#9733 &#9733 &#9733 &#9734</option>
        <option value="5">&#9733 &#9733 &#9733 &#9733 &#9733</option>`
    } else if (parseInt(rating) === 4) {
        return `
        <option value="1">&#9733 &#9734 &#9734 &#9734 &#9734</option>
        <option value="2">&#9733 &#9733 &#9734 &#9734 &#9734</option>
        <option value="3">&#9733 &#9733 &#9733 &#9734 &#9734</option>
        <option value="4" selected>&#9733 &#9733 &#9733 &#9733 &#9734</option>
        <option value="5">&#9733 &#9733 &#9733 &#9733 &#9733</option>`
    } else if (parseInt(rating) === 5) {
        return `
        <option value="1">&#9733 &#9734 &#9734 &#9734 &#9734</option>
        <option value="2">&#9733 &#9733 &#9734 &#9734 &#9734</option>
        <option value="3">&#9733 &#9733 &#9733 &#9734 &#9734</option>
        <option value="4">&#9733 &#9733 &#9733 &#9733 &#9734</option>
        <option value="5" selected>&#9733 &#9733 &#9733 &#9733 &#9733</option>`
    }
}

//renders HTML for reviews
export const renderEditReview = (allProducts, review, user) => {
    
    contentTarget.innerHTML = `
    <div id="reviews__modal" class="modal--parent">
    <div class="modal--content">
    <h2>My Reviews</h2>
    <h3>${user}</h3>
    <div>
        <div class="review">
        <div class="date"><b>Date: </b>${review.date}</div>
        <p><b>Product: </b>${allProducts.find(prod => prod.id === parseInt(review.productId)).name}</p>
        <label for="rating">Rating::</label><br>
        <select id="rating">
            ${currentRating(review.rating)}
        </select><br>
        <label for="reviewText">Review:</label><br>
        <textarea resize:none rows="20" cols="79" id="reviewText">${review.text}</textarea><br>
        <button id="deleteReview--${review.id}">Delete Review</button>
        <button id="saveEdit--${review.id}">Save Review</button>
    </div>
    <button id="modal--closeEdit">Close</button>
        `
    }                
      




    //listens for click on close button in review form
    eventHub.addEventListener("click", event => {
        if (event.target.id === "modal--closeEdit") {
          userReviews()
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


  // Handle browser-generated click event in component
eventHub.addEventListener("click", event => {
    if (event.target.id.startsWith("saveEdit--")) {
        
        const [idPrefix, idSuffix] = event.target.id.split("--")
        
        //Make a new object representation
        const rating = document.getElementById("rating").value
        const reviewText = document.getElementById("reviewText").value
        const userId = idSuffix
        
        // Key/value pairs here
        const reviewEdit = {
            "rating": parseInt(rating),
            "text": reviewText,
            
        }
        

        // Change API state, change application state and close modal
        editReview(userId, reviewEdit)
        
        closeModal()
        ProductList()
        
    }
})