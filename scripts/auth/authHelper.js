// Session storage documentation:
// https://javascript.info/localstorage#sessionstorage
// https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage

// Using Chrome DevTools with session storage:
// https://developers.google.com/web/tools/chrome-devtools/storage/sessionstorage

export const authHelper = {
  isUserLoggedIn: () => {
    if (sessionStorage.getItem("sojCustomerId")) {
      return true
    }
    return false
  },
  getCurrentUserId: () => sessionStorage.getItem("sojCustomerId"),
  storeUserInSessionStorage: (userId) => sessionStorage.setItem("sojCustomerId", userId)
}
