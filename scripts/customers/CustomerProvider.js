import { bakeryAPI } from "../Settings.js"
import { render } from "../customers/CustomerNav.js"
import { authHelper } from "../auth/authHelper.js"


let customers = []

export const useCustomers = () => customers.slice()

export const getCustomers = () => {
  return fetch(`${bakeryAPI.baseURL}/customers`)
    .then(response => response.json())
    .then(parsedResponse => {
      customers = parsedResponse
    })
}
export const getCustomer = (id) => {
  return fetch(`${bakeryAPI.baseURL}/customers/${id}`)
    .then(response => response.json())
}

export const customerLogin = (email, password) => {
  return fetch(`${bakeryAPI.baseURL}/customers?email=${email}&password=${password}`)
    .then(res => res.json())
    .then(user => user.length ? user[0] : false)
}


//function to edit note
export const joinRewards = (id, change) => {
  return fetch(`http://localhost:8088/customers/${id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(change)
  })
      

}


//registers a new user and posts to API
export const saveMember = newUser => {
  return fetch(`${bakeryAPI.baseURL}/customers`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
  })
  .then(response => response.json())
  .then(user => {
    customerLogin(user.email, user.password)
  return user})
  .then(user => authHelper.storeUserInSessionStorage(user.id))
  .then(render(newUser))
}

