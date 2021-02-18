//import statements
import { getCustomers, useCustomers } from "../customers/CustomerProvider.js"
import { saveReview } from "./ReviewProvider.js"

//define eventHub 
const eventHub = document.querySelector(".container")

//define contentTarget that will house reviews
const contentTarget = document.querySelector(".reviews")

eventHub.addEventListener("showNewReviewForm", event => {
    debugger
    
  })
const render = (reviewHTMLRepresentation) => {

    contentTarget.innerHTML = `
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
        
  
        ${criminalCollection.map(criminal => `<option value="${ criminal.id }">${ criminal.name }</option>`).join("")}
        </select><br>
        <button id="saveNote">Save Note</button>
        </article>`
        
    }
    
