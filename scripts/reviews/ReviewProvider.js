import { bakeryAPI } from "../Settings.js"
// import { saveOrderProducts } from "./OrderProductProvider.js"

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