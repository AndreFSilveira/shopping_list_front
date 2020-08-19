import axios from 'axios'

const userKey = '_user'
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem(userKey)),
  validToken: false,
  userValidations: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'TOKEN_VALIDATED':
      if(action.payload) {
        return { ...state, validToken: true }
      } else {
        localStorage.removeItem(userKey)
        axios.defaults.headers.common['authorization'] = null
        return { ...state, validToken: false, user: null }
      }
    case 'USER_FETCHED':
      localStorage.setItem(userKey, JSON.stringify(action.payload))
      axios.defaults.headers.common['authorization'] = action.payload.token
      return { ...state, user: action.payload, validToken: true }
    case 'USER_VALIDATED':
      return { ...state, userValidations: action.payload || {} }
    default:
      return state
  }
}