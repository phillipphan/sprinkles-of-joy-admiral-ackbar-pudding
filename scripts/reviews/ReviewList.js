//import statements
import { ProductList } from "../products/ProductList.js"
import { reviewEditForm } from "./reviewDelete.js"
import { reviewForm } from "./ReviewForm.js"
import { deleteReview } from "./ReviewProvider.js"
// import { renderEditReview } from "./ReviewDelete"

//define eventHub 
const eventHub = document.querySelector("#container")


//listener for new review button that displays pop up window
eventHub.addEventListener("showNewReviewForm", customEvent => {
    reviewForm()
})
    

//listener for new review button that displays pop up window
eventHub.addEventListener("showReviews", customEvent => {
    reviewEditForm()
})

eventHub.addEventListener("showReviews", customEvent => {
    reviewEditForm()
})

eventHub.addEventListener("deleteReview", customEvent => {
    debugger
    const reviewId = customEvent.detail.selectedReview
    deleteReview(reviewId)
    reviewEditForm()
    ProductList()

})