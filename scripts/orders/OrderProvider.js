import { bakeryAPI } from "../Settings.js"
import { saveOrderProducts } from "./OrderProductProvider.js"

const eventHub = document.querySelector("#container")

let customerOrders = []

export const useOrders = () => customerOrders.slice()

export const getOrders = () => {
  return fetch(`${bakeryAPI.baseURL}/orders?_expand=status`)
    .then(response => response.json())
    .then(response => {
      customerOrders = response
    })
}

export const saveOrder = (order, productsInOrder) => {
  return fetch(`${bakeryAPI.baseURL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  })
    .then(res => res.json())
    .then(parsedRes => parsedRes.id)
    .then(orderId => {
      const orderProducts = productsInOrder.map(product => {
        return {
          "orderId": orderId,
          "productId": product.id
        }
      })
      return saveOrderProducts(orderProducts)
    })
    .then(() => getOrders())
    .then(dispatchStateChangeEvent)
}

export const deleteOrder = (id) => {
  return fetch(`${bakeryAPI.baseURL}/orders/${id}`, {
    method: "DELETE"
  })
  .then(getOrders)
}