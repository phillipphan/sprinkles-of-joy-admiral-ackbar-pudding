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

let users = []


export const getReview = (reviewId) => {
    getReviews()
    .then(getCustomers)
    .then(getProducts)
    .then(() => {
        
        const allProducts = useProducts()
        const allReviews = useReviews()
        const thisReview = allReviews.find(rev => rev.id === parseInt(reviewId))
        const userId = authHelper.getCurrentUserId()
        users = useCustomers()
        const user = users.find(cust => cust.id === parseInt(userId)).name
        renderEditReview(allProducts, thisReview, user)
    })

}


eventHub.addEventListener("editReview", customEvent => {
    const reviewId = customEvent.detail.selectedReview
    
    getReview(reviewId)
    

})

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
            <option value="1">&#9733 &#9734 &#9734 &#9734 &#9734</option>
            <option value="2">&#9733 &#9733 &#9734 &#9734 &#9734</option>
            <option value="3">&#9733 &#9733 &#9733 &#9734 &#9734</option>
            <option value="4">&#9733 &#9733 &#9733 &#9733 &#9734</option>
            <option value="5">&#9733 &#9733 &#9733 &#9733 &#9733</option>
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