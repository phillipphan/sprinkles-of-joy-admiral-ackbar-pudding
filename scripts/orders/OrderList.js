import { authHelper } from "../auth/authHelper.js"
import { getCustomer } from "../customers/CustomerProvider.js"
import { Order } from "./Order.js"
import { getOrders, useOrders } from "./OrderProvider.js"
import { getProducts, useProducts } from "../products/ProductProvider.js"
import { getOrderProducts, useOrderProducts } from "./OrderProductProvider.js"

const eventHub = document.querySelector("#container")
const contentContainer = document.querySelector(".userOrders")

let customerOrders = []

export const OrderList = () => {
  if (authHelper.isUserLoggedIn()) {

    getOrders()
      .then(getProducts)
      .then(getOrderProducts)
      .then(() => {
        const orderProducts = useOrderProducts()
        const products = useProducts()

        customerOrders = useOrders()
        customerOrders = customerOrders.filter(order => order.customerId === parseInt(sessionStorage.sojCustomerId))

        const orderHistory = customerOrders.map(order => {
          let matchingProducts = orderProducts.filter(op => op.orderId === order.id)
          matchingProducts = matchingProducts.map(op => {
            return products.find(product => product.id === op.productId)
          })

          let totalPrice = 0
          matchingProducts.map(product => totalPrice += product.price)

          return Order(order, matchingProducts, totalPrice)
        }).join("")

        render(orderHistory)
      })
  }
}

const render = (ordersHtmlRepresentation) => {

  contentContainer.innerHTML = `
    <div id="orders__modal" class="modal--parent">
      <div class="modal--content">
        <h3>Previous Orders</h3>
        <div>
        <h5>Ordered on</h5>
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

eventHub.addEventListener("click", event => {
  if (event.target.id === "modal--close") {
    closeModal()
  }
})

const closeModal = () => {
  contentContainer.innerHTML = ""
}
