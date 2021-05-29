import React from 'react'
import { render,cleanup, fireEvent  } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import TopBar from './TopBar'
import { MemoryRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import authReducer from '../../redux/authReducer'
import { createStore } from 'redux';
beforeEach(cleanup);


const loggedInState = {
   id:0,
   displayName :'displayName',
   username:"username",
   password:"testpassword",
   image:'',
   isLoggedIn:true
}

const defaultState = {
   id:0,
   username:'',
   displayName:'',
   image:'',
   password:'',
   isLoggedIn:false
}


const setup =(state = defaultState)=>{
   const store = createStore(authReducer,state)
   return render(
      <Provider store={store}>
         <MemoryRouter >
         <TopBar />
         </MemoryRouter>
      </Provider>)
}

describe('Topbar Layout',()=>{

    it('it has img tag',()=>{
       const { container } = setup()
       const image = container.querySelector('img')
       expect(image).toBeInTheDocument()
       expect(image.src).toContain('flyhigh-logos_black.png')
    })
    
    it('has link to home from logo',()=>{
        const { container } =  setup()
        const image = container.querySelector('img')
        expect(image.parentElement.getAttribute('href')).toBe('/')
     })

     it('has link to singup',()=>{
         const { queryByText } =  setup()
         const singupLink =queryByText('Sign Up')
         expect(singupLink.getAttribute('href')).toBe('/signup')
      })

      it('has link to login',()=>{
         const { queryByText } =  setup()
         const loginLink =queryByText('Login')
         expect(loginLink.getAttribute('href')).toBe('/login')
      })

      it('has link to logout when user looged in',()=>{
         const { queryByText } =  setup(loggedInState)
         const logoutLink =queryByText('Logout')
         expect(logoutLink).toBeInTheDocument()
      })
      it('has link to profile page',()=>{
         const { queryByText } =  setup(loggedInState)
         const profileLink =queryByText('My Profile')
         expect(profileLink.getAttribute('href')).toBe('/username')
      })

      describe('Topbar Interactions',()=>{
         it('display the login and signup links when user clicks logout',()=>{
            const { queryByText } =  setup(loggedInState)
            const logoutLink =queryByText('Logout')
            fireEvent.click(logoutLink)
            const loginLink =queryByText('Login')
            expect(loginLink).toBeInTheDocument()
         })
      })

})