const contentTarget = document.querySelector(".about__container")
const eventHub = document.querySelector("#container")

eventHub.addEventListener("click", e => {
  if (e.target.id === "about"){
    console.log("click")
    contentTarget.innerHTML = `
      <div id="about__modal" class="modal--parent">
        <div id="about__content" class="modal--content">
          <section>Welcome to the best way to purchase baked goods!! There has definitely never been an app like this!!! Create an account and become a rewards member for a good time!!!!</section><br>
          <section><a target="_blank" href="https://github.com/nss-day-cohort-46/sprinkles-of-joy-admiral-ackbar-pudding">GitHub</a></section>
          <section>&copy; Phillip Phan and Caleb James</section><br>
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

const closeModal = () => {
  contentTarget.innerHTML = ""
}