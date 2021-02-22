import { authHelper } from "../auth/authHelper.js"

const eventHub = document.querySelector("#container")

const reviewSection = (reviews) => {
    if (reviews.length < 1){
        return
    } else {
        return `
        <h4>Reviews</h4>
        ${reviews.map(rev => {
            return `
            <div class="review">
                <p>${rev.text}</p>
                <p>${rev.rating}/5</p>
            </div>
            `
        }).join("")}
        `
    }
}

export const Product = (product, category, reviews) => {
    return `
      <section class="baked_good">
          <header class="baked_good__header">
              <h3>${product.name}</h3>
              <p>$${product.price}</p>
          </header>
          <div>
              <button id="addProduct--${product.id}">Add to Cart</button>
              <p>${product.description} [${category.name}]</p>
              <div class="reviews">
              ${reviewSection(reviews)}
              </div>
          </div>
      </section>
  `
}

eventHub.addEventListener("click", evt => {
    if (evt.target.id.startsWith("addProduct--")) {
        const [prefix, productId] = evt.target.id.split("--")
        const addProductEvent = new CustomEvent("addToCart", {
            detail: {
                "addedProduct": parseInt(productId)
            }
        })
        eventHub.dispatchEvent(addProductEvent)
    }
})
