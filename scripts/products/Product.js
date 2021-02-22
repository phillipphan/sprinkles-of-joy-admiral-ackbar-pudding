import { stars } from "../reviews/Reviews.js"



const eventHub = document.querySelector("#container")

const reviewSection = (reviews) => {
    if (reviews.length < 1){
        return ""
    } else {
        return `
        <h4>Reviews</h4>
        ${reviews.map(rev => {
            return `
            <div class="review">
                <div class="date">${rev.date}</div>
                <p>${rev.text}</p>
                <p>${stars(rev.rating)}</p>
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
              <h3>${product.name} [${category.name}]</h3>
              <p>$${product.price}</p>
          </header>
          <div>
              <button id="addProduct--${product.id}">Add to Cart</button>
              <p>${product.description}</p>
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
