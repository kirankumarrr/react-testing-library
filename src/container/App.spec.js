import React from 'react'
import { render, fireEvent,waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import axios from 'axios'
import { Provider } from 'react-redux'
import configureStore from '../redux/configureStore'


const loggedInState = {
  id: 0,
  displayName: 'displayName',
  username: "username",
  password: "testpassword",
  image: '',
  isLoggedIn: true
}

const defaultState = {
  id: 0,
  username: '',
  displayName: '',
  image: '',
  password: '',
  isLoggedIn: false
}


const setup = (path) => {
  const store  = configureStore();
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </Provider>)
}

const changeEvent = (content) => {
  return {
    target: {
      value: content
    }
  }
}


describe('App Layout', () => {

  it('displays homepage when url is /', () => {
    const { getByTestId } = setup('/')
    const homepage = getByTestId('homepage')
    expect(homepage).toBeInTheDocument()
  })

  it('displays LoginPage when url is /login', () => {
    const { getByTestId } = setup('/login')
    const LoginPageHeader = getByTestId('header')
    expect(LoginPageHeader).toBeInTheDocument()
  })


  it('displays only LoginPage when url is /login', () => {
    const { container, queryByTestId } = setup('/login')
    expect(queryByTestId('homepage')).not.toBeInTheDocument()
    const navigation = container.querySelector('nav')
    expect(navigation).toBeInTheDocument()
  })

  it('displays UserSignUpPage when url is /signup', () => {
    const { container, queryByTestId } = setup('/signup')
    expect(queryByTestId('user-sign-up-header')).toBeInTheDocument()
    expect(queryByTestId('user-sign-up-header')).toHaveTextContent('Sign Up')
    const navigation = container.querySelector('nav')
    expect(navigation).toBeInTheDocument()
  })

  it('display userpage when url is other than /,/login or /signup', () => {
    const { container, queryByTestId } = setup('/user1')
    expect(queryByTestId('userpage')).toBeInTheDocument()
    const navigation = container.querySelector('nav')
    expect(navigation).toBeInTheDocument()
  })

  it('display topbar when url is /', () => {
    const { container } = setup('/')
    const navigation = container.querySelector('nav')
    expect(navigation).toBeInTheDocument()
  })

  it('display My Profile on TopBar after login success', async () => {
    const { container, queryByPlaceholderText, queryByText } = setup('/login')

    let button, usernameInput, passwordInput;

    usernameInput = queryByPlaceholderText('Your username')
    passwordInput = queryByPlaceholderText('Your password')


    fireEvent.change(usernameInput, changeEvent('username'))
    fireEvent.change(passwordInput, changeEvent('testpassword'))

    button = container.querySelector('button')

    axios.post = jest.fn().mockResolvedValue({
      data: {
        displayName: 'displayName',
        username: "username",
        password: "testpassword",
        image: '',
      }
    })
    fireEvent.click(button)

    await waitFor(()=>expect(queryByText('My Profile')).toBeInTheDocument())
  })


  it('display My Profile on TopBar after signup success', async () => {
    const { container, queryByPlaceholderText, queryByText } = setup('/signup')

    let button, displayNameInput, usernameInput,passwordInput,repeatPasswordInput;

    displayNameInput = queryByPlaceholderText('Your display name')
    usernameInput = queryByPlaceholderText('Your username')
    passwordInput = queryByPlaceholderText('Your password')
    repeatPasswordInput = queryByPlaceholderText('Repeat your password')


    fireEvent.change(displayNameInput,changeEvent('displayName'))
    fireEvent.change(usernameInput,changeEvent('username'))
    fireEvent.change(passwordInput,changeEvent('testpassword'))
    fireEvent.change(repeatPasswordInput,changeEvent('testpassword'))

    button = container.querySelector('button')
    //first doing signup
    axios.post = jest.fn().mockResolvedValue({
      data: { message:'User saved'}
    }).mockResolvedValue({
      //login request
      data: {
        displayName: 'displayName',
        username: "username",
        password: "testpassword",
        image: '',
      }
    })
    fireEvent.click(button)

    await waitFor(()=>expect(queryByText('My Profile')).toBeInTheDocument())
  })
})