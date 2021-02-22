import { getProducts, useProducts } from "./../products/ProductProvider.js"
import { authHelper } from "../auth/authHelper.js"
import { getStatuses, useStatuses } from "../statuses/StatusProvider.js"
import { saveOrder } from "./OrderProvider.js"

const eventHub = document.querySelector("#container")
const userCart = document.querySelector(".userCart")

let productsInCart = []

export const OpenCart = () => {
  render()
}

const render = () => {
  let cartHTML = ""
  let totalCost = 0

  for (const product of productsInCart) {
    cartHTML += `
      <div class="cart">
        <p>${product.name} (<a href="#" id="removeItem--${productsInCart.indexOf(product)}">Remove</a>)</p>
        
        <p>$${product.price.toFixed(2)}</p>
      </div>
    `
    totalCost += product.price
  }

  userCart.innerHTML = `
    <div>
    <h4>Cart (${productsInCart.length} Item(s))</h4>
    ${cartHTML}
    <hr/>
    <div class="cart">
    <button id="placeOrder">Place Order</button>
    <p>$${totalCost.toFixed(2)}</p>
    </div>
    <div class="cart__warning"></div>
    </div>
  `
}

eventHub.addEventListener("showCustomerCart", e => OpenCart())

eventHub.addEventListener("addToCart", event => {
  const productId = event.detail.addedProduct
  getProducts()
    .then(() => {
      const allProducts = useProducts()
      const productToBeAdded = allProducts.find(prod => prod.id === productId)
      productsInCart.push(productToBeAdded)
      OpenCart()
    })
})

eventHub.addEventListener("click", e => {
  if (e.target.id.startsWith("removeItem--")) {
    const [prefix, index] = e.target.id.split("--")

    productsInCart.splice(index, 1)
    OpenCart()
  }
})

eventHub.addEventListener("click", clickEvent => {
  if (clickEvent.target.id === "placeOrder") {
    if (authHelper.getCurrentUserId() === null){
      document.querySelector(".cart__warning").innerHTML = "You must sign in to place an order!"
    } else {
      if (productsInCart.length < 1) {
        document.querySelector(".cart__warning").innerHTML = "You have no items in your cart!"
      }else {
        const currentCustomerId = parseInt(authHelper.getCurrentUserId())
        getStatuses()
          .then(() => {
            const allStatuses = useStatuses()
            const initialOrderStatus = allStatuses.find(status => status.label.toLowerCase() === "Scheduled".toLowerCase())
    
            const newOrder = {
              "customerId": currentCustomerId,
              "statusId": initialOrderStatus.id,
              "timestamp": Date.now()
            }
            saveOrder(newOrder, productsInCart)
              .then(() => {
                productsInCart = []
                const customEvent = new CustomEvent("showCustomerCart")
                eventHub.dispatchEvent(customEvent)
                document.querySelector(".cart__warning").innerHTML = "Order added!"
              })
          })
      }
    }
  }
})
