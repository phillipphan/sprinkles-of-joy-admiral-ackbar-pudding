//import statements
import { ProductList } from "../products/ProductList.js"
import { userReviews } from "./Reviews.js"
import { reviewForm } from "./ReviewForm.js"
import { deleteReview, editReview } from "./ReviewProvider.js"

// import { renderEditReview } from "./ReviewDelete"

//define eventHub 
const eventHub = document.querySelector("#container")


//listener for new review button that displays pop up window
eventHub.addEventListener("showNewReviewForm", customEvent => {
    reviewForm()
})
    

//listener for My Reviews button that displays user reviews
eventHub.addEventListener("showReviews", customEvent => {
    // const reviewId = customEvent.detail.selectedReview
    userReviews()
})



eventHub.addEventListener("saveEditReview", customEvent => {
    const reviewId = customEvent.detail.selectedReview
    editReview(reviewId)
    userReviews()
    ProductList()

})




eventHub.addEventListener("deleteReview", customEvent => {
    const reviewId = customEvent.detail.selectedReview
    deleteReview(reviewId)
    userReviews()
    ProductList()

})