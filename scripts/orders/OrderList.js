import { authHelper } from "../auth/authHelper.js"
import { getCustomer } from "../customers/CustomerProvider.js"
import { Order } from "./Order.js"
import { getOrders, useOrders } from "./OrderProvider.js"
import { getProducts, useProducts } from "../products/ProductProvider.js"
import { getOrderProducts, useOrderProducts } from "./OrderProductProvider.js"
import { getStatuses, useStatuses } from "../statuses/StatusProvider.js"

const eventHub = document.querySelector("#container")
const contentContainer = document.querySelector(".userOrders")

let customerOrders = []
let orderProducts = []
let products = []

export const OrderList = () => {
  if (authHelper.isUserLoggedIn()) {

    getOrders()
      .then(getProducts)
      .then(getOrderProducts)
      .then(() => {
        orderProducts = useOrderProducts()
        products = useProducts()

        customerOrders = useOrders()
        customerOrders = customerOrders.filter(order => order.customerId === parseInt(authHelper.getCurrentUserId()))

        const orderHistory = customerOrders.map(order => {
          let matchingProducts = orderProducts.filter(op => op.orderId === order.id)
          matchingProducts = matchingProducts.map(op => {
            return products.find(product => product.id === op.productId)
          })

          let totalPrice = 0
          matchingProducts.map(product => totalPrice += product.price)

          return Order(order, matchingProducts, totalPrice.toFixed(2))
        }).join("")

        render(orderHistory)
        renderDropdown()
      })
  }
}

const render = (ordersHtmlRepresentation) => {

  contentContainer.innerHTML = `
    <div id="orders__modal" class="modal--parent">
      <div class="modal--content">
        <h3>Previous Orders</h3>
        <select id="order__status">
          <option value="0">All Orders</option>
        </select>
        <div class="orders__list">
        ${ordersHtmlRepresentation}
        </div>
        <button id="modal--close">Close</button>
      </div>
    </div>
      `
}

eventHub.addEventListener("showPastOrders", () => {
  OrderList()
})

eventHub.addEventListener("change", e => {
  if (e.target.id === "order__status") {
    const customEvent = new CustomEvent("orderListChange", {
      detail: {
        "chosenStatus": parseInt(e.target.value)
      }
    })
    eventHub.dispatchEvent(customEvent)
  }
})

eventHub.addEventListener("orderListChange", e => {
  if (e.detail.chosenStatus === 0){
    OrderList()
  } else {
    const chosenStatus = e.detail.chosenStatus

    let filteredOrderHistory = customerOrders.filter(order => order.statusId === chosenStatus)

    filteredOrderHistory = filteredOrderHistory.map(order => {
      let matchingProducts = orderProducts.filter(op => op.orderId === order.id)
      matchingProducts = matchingProducts.map(op => products.find(product => product.id === op.productId))

      let totalPrice = 0
      matchingProducts.map(product => totalPrice += product.price)

      return Order(order, matchingProducts, totalPrice)
    }).join("")

    document.querySelector(".orders__list").innerHTML = filteredOrderHistory
  }
})

eventHub.addEventListener("click", event => {
  if (event.target.id === "modal--close") {
    closeModal()
  }
})

const closeModal = () => {
  contentContainer.innerHTML = ""
}

const renderDropdown = () => {
  getStatuses()
    .then(() => {
      const statuses = useStatuses()
      document.querySelector("#order__status").innerHTML += `
      ${statuses.map(status => `<option value="${status.id}">${status.label}</option>`).join("")}
      `
    })
}
