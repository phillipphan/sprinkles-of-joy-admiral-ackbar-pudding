//import statements
import { reviewEditForm } from "./reviewDelete.js"
import { reviewForm } from "./ReviewForm.js"


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


const editReviewsToDom = (user, allUsers, allReviews, allproducts) => {
    // debugger

    
    const currentUser = allUsers.find(
        cu => cu.id === userId
    )
}