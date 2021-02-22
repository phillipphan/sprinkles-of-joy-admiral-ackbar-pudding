//import statements
import { authHelper } from "../auth/authHelper.js"
import { getCustomer, getCustomers, useCustomers } from "../customers/CustomerProvider.js"
import { ProductList } from "../products/ProductList.js"
import { getProducts, useProducts } from "../products/ProductProvider.js"
import { saveReview } from "../reviews/ReviewProvider.js" 

//define eventHub 
const eventHub = document.querySelector("#container")

//define contentTarget that will house reviews
const contentTarget = document.querySelector(".newReview")

let allProducts = []
const products = getProducts()
    .then(() => {
        allProducts = useProducts()})


//function that pulls all products to be inserted into dropdown in review form
export const reviewForm = () => {
    getProducts()
    .then(() => {
            let productArray = useProducts()
            renderReviewForm(productArray)
        })
}






//renders HTML for reviews
const renderReviewForm = (productArray) => {
    
    contentTarget.innerHTML = `
    <div id="reviews__modal" class="modal--parent">
    <div class="modal--content">
    <h2>Leave a review</h2>
    <div>
        <h3 id="dropdownTitle">Product</h3>
        <select id="productDropdown">
        ${productArray.map(product => `<option value="${ product.id }">${ product.name }</option>`).join("")}
        </select><br>
        <label for="reviewDate">Date:</label><br>
        <input type="date" id="reviewDate"><br>
        <label for="rating">Rating::</label><br>
        <select id="rating">
            <option value="1">&#9733 &#9734 &#9734 &#9734 &#9734</option>
            <option value="2">&#9733 &#9733 &#9734 &#9734 &#9734</option>
            <option value="3">&#9733 &#9733 &#9733 &#9734 &#9734</option>
            <option value="4">&#9733 &#9733 &#9733 &#9733 &#9734</option>
            <option value="5">&#9733 &#9733 &#9733 &#9733 &#9733</option>
        </select><br>
        <label for="reviewText">Review:</label><br>
        <textarea rows="10" cols="85" id="reviewText"></textarea><br>
    </div>
    <button id="submitReview">Submit Review</button>
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


  // Handle browser-generated click event in component
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitReview") {
        
        //Make a new object representation of a note
        
        
        console.log('allProducts: ', allProducts);
        console.log(typeof(allProducts))
        const product = document.getElementById("productDropdown").value
        const reviewDate = document.getElementById("reviewDate").value
        const rating = document.getElementById("rating").value
        const reviewText = document.getElementById("reviewText").value
        const user = authHelper.getCurrentUserId()
        
        // Key/value pairs here
        const newReview = {
            "productId": parseInt(product),
            "date": reviewDate,
            "rating": parseInt(rating),
            "text": reviewText,
            "userId": parseInt(user)
        }
        

        // Change API state, change application state and close modal
        saveReview(newReview)
        closeModal()
        ProductList()
        
    }
})