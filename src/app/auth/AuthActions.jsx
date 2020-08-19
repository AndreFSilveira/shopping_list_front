import cogoToast from 'cogo-toast';
import axios from 'axios'

export function getCurrentUser(){
  return JSON.parse(localStorage.getItem('_user'));
}

export function login(values, history) {
  return dispatch => {
    axios.post(`${process.env.REACT_APP_API_URL}/users/sign_in`, values)
      .then(resp => {
        loginUser(resp, dispatch, history)
      }).catch(e => {
        validationError(e.response.data.errors, "Usuário ou senha inválidos", dispatch)
    })
  }
}

export function signup(values, history) {
  return dispatch => {
    axios.post(`${process.env.REACT_APP_API_URL}/users/sign_up`, values)
      .then(resp => {
        axios.post(`${process.env.REACT_APP_API_URL}/users/sign_in`, values).then(resp => loginUser(resp, dispatch, history))
      }).catch(e => {
      validationError(e.response.data.errors, "Ocorreram erros no cadastro", dispatch)
    })
  }
}

export function logout(history) {
  return dispatch => {
    axios.delete(`${process.env.REACT_APP_API_URL}/users/sign_out`)
      .then(resp => {
        dispatch([
          {type: 'TOKEN_VALIDATED', payload: false}
        ])
        cogoToast.success("Você saiu da aplicação")
        history.push('/')
      })
  }
}


export function validateToken(token) {
  return dispatch => {
    if(token) {
      axios.get(`${process.env.REACT_APP_API_URL}/check_token`, {headers: {authorization: token}})
        .then(resp => {
          dispatch({type: 'TOKEN_VALIDATED', payload: true})
        }).catch(e => dispatch({type: 'TOKEN_VALIDATED', payload: false}))
    } else {
      dispatch({type: 'TOKEN_VALIDATED', payload: false})
    }
  }
}

function validationError(payload, message, dispatch){
  dispatch([
    {type: 'USER_VALIDATED', payload}
  ])
  cogoToast.error(message)
}

function loginUser(resp, dispatch, history){
  const user = { ...resp.data, token: resp.headers.authorization }
  dispatch([
    {type: 'USER_FETCHED', payload: user}
  ])
  cogoToast.success("Autenticado com sucesso.")
  history.push('/')
}