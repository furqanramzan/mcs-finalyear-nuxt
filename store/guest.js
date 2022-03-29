export const state = () => ({
  notification: {
    active: false,
    type: null,
    message: null,
  }
})

export const mutations = {
  setNotification(state, value){
    state.notification.active = true
    state.notification.type = value.type
    state.notification.message = value.message
  }
}