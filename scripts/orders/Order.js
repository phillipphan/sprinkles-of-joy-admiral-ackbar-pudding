import { deleteOrder } from "./OrderProvider.js"
import { OrderList } from "./OrderList.js"

const eventHub = document.querySelector("#container")

export const Order = (customerOrder, orderProducts, totalPrice) => {
  return `
  <div class="previous__order">
    <div class="order">
      <p>${new Date(customerOrder.timestamp).toLocaleString('en-US')}</p>
      <p>${customerOrder.status.label}</p>
      ${customerOrder.statusId === 1 ? `<button id="deleteOrder--${customerOrder.id}">Delete Order</button>` : ""}
    </div>
    <div class="order__products">
      ${orderProducts.map(op => {
        return `<p>${op.name}</p><p>$${op.price}</p>`
      }).join("")}<br>
      <p>Total: ${totalPrice}</p><br>
    </div>
  </div>
  `
}

eventHub.addEventListener("click", e => {
  if (e.target.id.startsWith("deleteOrder")) {
    const [prefix, id] = e.target.id.split("--")

    deleteOrder(id)
      .then(OrderList())
  }
})
