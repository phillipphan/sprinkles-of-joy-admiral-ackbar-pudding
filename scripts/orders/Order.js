import { deleteOrder, getOrders, useOrders } from "./OrderProvider.js"
import { OrderList } from "./OrderList.js"

const eventHub = document.querySelector("#container")

export const Order = (customerOrder, orderProducts, totalPrice) => {
  return `
  <div class="previous__order" style="border: 1px dashed black; padding: 10px">
    <div class="order">
      <p>${new Date(customerOrder.timestamp).toLocaleString('en-US')}</p>
      <p>${customerOrder.status.label}</p>
      ${customerOrder.statusId === 1 ? `<button id="deleteOrder--${customerOrder.id}" style="height: 25px">Delete Order</button>` : ""}
    </div>
    <div class="order__products">
      ${orderProducts.map(op => {
        return `
        <div class="order">
          <p>${op.name}</p><p>$${op.price}</p>
        </div>
        `
      }).join("")}
      <hr>
      <div class="order">
        <p>Total:</p><p>${totalPrice}</p>
      </div>
    </div>
  </div><br>
  `
}

eventHub.addEventListener("click", e => {
  if (e.target.id.startsWith("deleteOrder")) {
    const [prefix, id] = e.target.id.split("--")

    const deletedOrder = {
      "isDeleted": true
    }

    deleteOrder(id, deletedOrder)
      .then(OrderList)
  }
})
