import { bakeryAPI } from "../Settings.js"


const eventHub = document.querySelector("#container")

let customerReviews = []

export const useReviews = () => customerReviews.slice()

export const getReviews = () => {
  return fetch(`${bakeryAPI.baseURL}/reviews`)
    .then(response => response.json())
    .then(response => {
        customerReviews = response
    })
}


//function to edit note
export const editReview = (id, reviewEdit) => {
    return fetch(`http://localhost:8088/reviews/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reviewEdit)
    })
        .then(getReviews)
        .then(dispatchStateChangeEvent)

}


//saves current review and posts to API
export const saveReview = entry => {
    return fetch(`${bakeryAPI.baseURL}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entry)
    })
    .then(getReviews)
    .then(dispatchStateChangeEvent)
}


//put new reviews on the DOM once they've been submitted or deleted
const dispatchStateChangeEvent = () => {
    const reviewStateChangedEvent = new CustomEvent("reviewStateChanged")

    eventHub.dispatchEvent(reviewStateChangedEvent)
}

//function to delete note
export const deleteReview = id => {
    return fetch(`http://localhost:8088/reviews/${id}`, {
        method: "DELETE"
    })
        .then(getReviews)
        .then(dispatchStateChangeEvent)

}