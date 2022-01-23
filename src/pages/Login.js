import React, { useReducer } from 'react'
import { Navigate } from 'react-router'

const loginInitialState = {
  email: '',
  password: '',
  errorEmail: '',
  errorPassword: ''
}

export const RESET_DATA = 'RESET_DATA'
export const SET_EMAIL = 'SET_EMAIL'
export const SET_PASSWORD = 'SET_PASSWORD'
export const CHECK_EMAIL_ERROR = 'CHECK_EMAIL_ERROR'
export const CHECK_PASSWORD_ERROR = 'CHECK_PASSWORD_ERROR'
export const SET_SAMPLE_LOGIN_DATA = 'SET_SAMPLE_LOGIN_DATA'

const loginReducer = (state, action) => {
  switch (action.type) {
    case RESET_DATA:
      return loginInitialState
    case SET_EMAIL:
      return { ...state, email: action.payload }
    case SET_PASSWORD:
      return { ...state, password: action.payload }
    case CHECK_EMAIL_ERROR:
      return { ...state, errorEmail: action.payload }
    case CHECK_PASSWORD_ERROR:
      return { ...state, errorPassword: action.payload }
    case SET_SAMPLE_LOGIN_DATA:
      return { ...state, email: 'test@test.com', password: 'test123' }
    default:
      return state
  }
}
export const Login = () => {
  const [loginForm, loginformDispatch] = useReducer(
    loginReducer,
    loginInitialState
  )
  console.table(loginForm)
  const setloginEmail = (e) => {
    if (e.target.value === '' || !/^.+@.+\.com$/.test(e.target.value)) {
      loginformDispatch({
        type: CHECK_EMAIL_ERROR,
        payload: 'Enter a valid email address'
      })
      loginformDispatch({ type: SET_EMAIL, payload: e.target.value })
    } else {
      loginformDispatch({ type: CHECK_EMAIL_ERROR, payload: '' })
      loginformDispatch({ type: SET_EMAIL, payload: e.target.value })
    }
  }

  const setloginPassword = (e) => {
    let passwordEntered = e.target.value
    if (passwordEntered === '' || passwordEntered.length < 6) {
      loginformDispatch({
        type: CHECK_PASSWORD_ERROR,
        payload: 'Password should be more than 6 letters'
      })
      loginformDispatch({ type: SET_PASSWORD, payload: e.target.value })
    } else {
      loginformDispatch({ type: CHECK_PASSWORD_ERROR, payload: '' })
      loginformDispatch({ type: SET_PASSWORD, payload: e.target.value })
    }
  }

  const loginFormHandle = (e) => {
    e.preventDefault()
    
  }
  return (
    <div className='login__form'>
      <h1 className='login__form__heading'>LOGIN</h1>
      <form onSubmit={loginFormHandle} className='login__form__body'>
        <div className='flex__row'>
          <input
            className='form__field'
            placeholder='Enter the email here'
            required
            value={loginForm?.email}
            onChange={(e) => setloginEmail(e)}
          />
          {loginForm?.errorEmail && <p>{loginForm.errorEmail}</p>}
        </div>
        <div className='flex__row'>
          <input
            className='form__field'
            placeholder='Enter the password here'
            required
            type='password'
            value={loginForm?.password}
            onChange={(e) => setloginPassword(e)}
          />
          {loginForm?.errorPassword && <p>{loginForm.errorPassword}</p>}
        </div>
        <button className='btn btn-solid-primary' type='submit'>
          Login
        </button>
        <p onClick={() => loginformDispatch({ type: SET_SAMPLE_LOGIN_DATA })}>
          Click here to sign in as <b>Sample User Data</b>
        </p>
        <p>
          Not a member yet! Please{' '}
          <Navigate to='/signup' replace>
            Sign Up
          </Navigate>
        </p>
      </form>
    </div>
  )
}
