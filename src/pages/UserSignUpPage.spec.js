import React from 'react'
import { render, fireEvent, waitFor  } from '@testing-library/react'
import UserSignUpPage from './UserSignUpPage'
import { Provider } from 'react-redux'
import { MemoryRouter} from 'react-router-dom'
import configureStore from '../redux/configureStore'
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


const setup =(state = defaultState,props)=>{
   const store = configureStore()
   return render(
      <Provider store={store}>
         <MemoryRouter >
            <UserSignUpPage {...props} />
         </MemoryRouter>
      </Provider>)
}



describe('Layout',()=>{

    it('has hader of Sign up',()=>{
       const {getByTestId} = setup(defaultState)
       const header = getByTestId('user-sign-up-header')
       expect(header.textContent).toBe('Sign Up')
    })

    it('has input for display name',()=>{
        const {queryByPlaceholderText} = setup(defaultState)
        const displayNameInput = queryByPlaceholderText('Your display name')
        expect(displayNameInput).toBeInTheDocument()
     })

     it('has input for username',()=>{
        const {queryByPlaceholderText} = setup(defaultState)
        const userNameInput = queryByPlaceholderText('Your username')
        expect(userNameInput).toBeInTheDocument()
     })

     it('has input for password',()=>{
        const {queryByPlaceholderText} = setup(defaultState)
        const passwordInput = queryByPlaceholderText('Your password')
        expect(passwordInput).toBeInTheDocument()
     })

     it('has password type for password input',()=>{
        const {queryByPlaceholderText} = setup(defaultState)
        const passwordInput = queryByPlaceholderText('Your password')
        expect(passwordInput.type).toBe('password')
     })

     it('has input for password repeat',()=>{
        const {queryByPlaceholderText} = setup(defaultState)
        const passwordInput = queryByPlaceholderText('Repeat your password')
        expect(passwordInput).toBeInTheDocument()
        expect(passwordInput.type).toBe('password')
     })

     it('has submit button',()=>{
        const {container} = setup(defaultState)
        const button = container.querySelector('button')
        expect(button).toBeInTheDocument()
        expect(button.textContent).toBe('Sign Up')
     })
     describe('Interactions',()=>{
        const changeEvent =(content)=> {
            return {
                 target:{
                     value:content
                 }
            } 
         }

         const mockAsyncDelayed =()=>{
             return jest.fn().mockResolvedValueOnce(()=>{
                return new Promise((resolve,reject)=>{
                    setTimeout(()=>{
                        resolve({})
                    },3000)
                })
            })
         }

         let button, displayNameInput, usernameInput,passwordInput,repeatPasswordInput;

         const setupForSubmit =(props)=>{
            const rendered = setup(defaultState,props)

            const { container, queryByPlaceholderText} = rendered

            displayNameInput = queryByPlaceholderText('Your display name')
            usernameInput = queryByPlaceholderText('Your username')
            passwordInput = queryByPlaceholderText('Your password')
            repeatPasswordInput = queryByPlaceholderText('Repeat your password')
   

            fireEvent.change(displayNameInput,changeEvent('displayName'))
            fireEvent.change(usernameInput,changeEvent('username'))
            fireEvent.change(passwordInput,changeEvent('testpassword'))
            fireEvent.change(repeatPasswordInput,changeEvent('testpassword'))

            button = container.querySelector('button')
            // fireEvent.click(button)

            return rendered
         }
        


        it('sets the displayName value into state',()=>{
            const {queryByPlaceholderText} = setup(defaultState)
            const displayNameInput = queryByPlaceholderText('Your display name')
           
            fireEvent.change(displayNameInput,changeEvent('myname'))
            expect(displayNameInput.name).toBe('displayName')
            expect(displayNameInput).toHaveValue('myname')
         })

         it('sets the username value into state',()=>{
            const {queryByPlaceholderText} = setup(defaultState)
            const usernameInput = queryByPlaceholderText('Your username')
           
            fireEvent.change(usernameInput,changeEvent('username'))
            expect(usernameInput.name).toBe('username')
            expect(usernameInput).toHaveValue('username')
         })

         it('sets the password value into state',()=>{
            const {queryByPlaceholderText} = setup(defaultState)
            const passwordInput = queryByPlaceholderText('Your password')
           
            fireEvent.change(passwordInput,changeEvent('test'))
            expect(passwordInput.name).toBe('password')
            expect(passwordInput).toHaveValue('test')
         })

         it('sets the repeat-password value into state',()=>{
            const {queryByPlaceholderText} = setup(defaultState)
            const repeatPasswordInput = queryByPlaceholderText('Repeat your password')
           
            fireEvent.change(repeatPasswordInput,changeEvent('testRepeat'))
            expect(repeatPasswordInput.name).toBe('passwordRepeat')
            expect(repeatPasswordInput).toHaveValue('testRepeat')
         })

         it('When clicking it calls postSignUp, when the fields are valid and the actions are provided',()=>{
            const actions = {
                postSignup : jest.fn().mockResolvedValueOnce({})
            }
            setupForSubmit({actions});
            fireEvent.click(button)
            expect(actions.postSignup).toHaveBeenCalledTimes(1)
         })

         it('does not throw exception when clicking the button when action not provided',()=>{
            setupForSubmit()
            expect(()=>fireEvent.click(button)).not.toThrow()
         })

         it('calls post when fields are valid',()=>{
            const actions = {
                postSignup : jest.fn().mockResolvedValueOnce({})
            }
            setupForSubmit({actions});
            fireEvent.click(button)

            const expectedUserObject ={
                displayName :'displayName',username:"username",password:"testpassword",passwordRepeat:"testpassword"
            }
            expect(actions.postSignup).toHaveBeenCalledWith(expectedUserObject)
         })

         
         
         it('display spinner when there is an ongoing api call',()=>{
            const actions = {
                postSignup : mockAsyncDelayed()
            }
            const { queryByText } = setupForSubmit({actions});
            fireEvent.click(button)
            const spinner = queryByText('Loading...')
            expect.assertions(1)
            expect(spinner).toBeInTheDocument()
         })

         it('hide spinner when there is an ongoing api call comeplete', async()=>{
            const actions = {
                postSignup : mockAsyncDelayed()
            }
            const { queryByText } = setupForSubmit({actions});
            fireEvent.click(button)
            const spinner = queryByText('Loading...')
            expect(spinner).toBeInTheDocument()
            // await waitForDomChange()

            await waitFor(() =>expect(spinner).not.toBeInTheDocument())
         })

         it('hide spinner when there is an ongoing api call failed', async()=>{
            const actions = {
                postSignup1 : jest.fn().mockResolvedValueOnce(()=>{
                    return new Promise((resolve,reject)=>{
                        setTimeout(()=>{
                            reject({})
                        },300)
                    })
                }),
                postSignup: jest.fn().mockImplementation(() => {
                  return Promise.reject({});
              })
            }
            const { queryByText } = setupForSubmit({actions});
            fireEvent.click(button)

            // await waitForDomChange()

            const spinner = queryByText('Loading...')
            await waitFor(() => expect(spinner).not.toBeInTheDocument())
         })
         describe('Validations',()=>{
            xit("display validation error for displayName when error is received for the fied",()=>{})
         })

         it('redirect to homepage after successfull singup',async ()=>{
            
            const actions ={
                postSignup : jest.fn().mockResolvedValue({
                  data: { message:'User saved'}
                }),
               postLogin : jest.fn().mockResolvedValue({
                  //login request
                  data: {
                    displayName: 'displayName',
                    username: "username",
                    password: "testpassword",
                    image: '',
                  }
               })
            }

            const history ={
                push:jest.fn()
            }

            setupForSubmit({actions,history})
            fireEvent.click(button)

            await waitFor(()=> expect(history.push).toHaveBeenCalledWith('/'))

           
        })
     })
})

//this will stop showing errors
console.error = () => {};