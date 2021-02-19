import { saveContact } from "./ContactProvider.js"

const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".contactForm__container")

eventHub.addEventListener("click", e => {
  if (e.target.id === "contactForm"){
    contentTarget.innerHTML = `
      <div id="contactForm__modal" class="modal--parent">
        <div class="modal--content">
          <form id="contactForm__content">
            <label for="email">Email:</label>
            <input type="text" name="email" id="email"><br>
            <label for="phone">Phone Number:</label>
            <input type="number" name="phone" id="phone"><br>
            <label for="message">Message:</label>
            <textarea name="message" id="message" style="resize: none;" rows="13"></textarea><br>
          </form>
          <button id="contactForm__save">Send</button>
          <button id="modal--close">Close</button>
          <div class="modal__message"></div>
        </div>
      </div>
    `
  }
})

eventHub.addEventListener("click", e => {
  if (e.target.id === "modal--close"){
    closeModal()
  }
})

eventHub.addEventListener("click", e => {
  if (e.target.id === "contactForm__save"){
    const newContact = {
      "email": document.getElementById("email").value,
      "phone": document.getElementById("phone").value,
      "message": document.getElementById("message").value
    }

    saveContact(newContact)
    document.querySelector(".modal__message").innerHTML = "Message sent!"
  }
})

const closeModal = () => {
  contentTarget.innerHTML = ""
}