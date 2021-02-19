export const saveContact = contactObj => {
  return fetch("http://localhost:8088/contactForm", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(contactObj)
  })
}