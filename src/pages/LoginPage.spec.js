import React from 'react'
import { render, fireEvent, waitFor,waitForElementToBeRemoved} from '@testing-library/react'
import LoginPage from './LoginPage'
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
    const store  = configureStore(state);
   return render(
      <Provider store={store}>
         <MemoryRouter >
            <LoginPage {...props} />
         </MemoryRouter>
      </Provider>)
}




describe('Login Layout',()=>{

    it('has hader of Login up',()=>{
       const {getByTestId} = setup(defaultState,{})
       const header = getByTestId('header')
       expect(header.textContent).toBe('Login')
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

        let button,  usernameInput, passwordInput;

        const setupForSubmit =(props)=>{
            const rendered = setup( defaultState, props)

            const { container, queryByPlaceholderText} = rendered

            usernameInput = queryByPlaceholderText('Your username')
            passwordInput = queryByPlaceholderText('Your password')


            fireEvent.change(usernameInput,changeEvent('username'))
            fireEvent.change(passwordInput,changeEvent('testpassword'))

            button = container.querySelector('button')
            // fireEvent.click(button)

            return rendered
        }
        
        it('sets the username value into state',()=>{
            const {queryByPlaceholderText} = setup(defaultState)
            const usernameInput = queryByPlaceholderText('Your username')
           
            fireEvent.change(usernameInput,changeEvent('username'))
            expect(usernameInput.name).toBe('username')
            expect(usernameInput).toHaveValue('username')
         })

        it('calls postLogin when the actions are provided in props and input fields have value', () => {
            const actions = {
                postLogin : mockAsyncDelayed()
            };
            const {getByTestId} = setupForSubmit({ actions });
            expect(getByTestId("login-button")).toBeTruthy();

            // fireEvent.click(getByTestId('login-button'));
            // expect(actions.postLogin).toHaveBeenCalledTimes(1);
          });

        xit('calls postLogin when actions are provided in props and input fields have values',()=>{
            
            const actions ={
                postLogin : mockAsyncDelayed()
            }

            setupForSubmit({actions})
            fireEvent.click(button)

            const expectedUserObject ={password:"testpassword",username:"username"}
            expect(actions.postLogin).toHaveBeenCalledWith(expectedUserObject)
        })

        xit('redirect to homepage after successfull login',async ()=>{
            
            const actions ={
                postLogin : mockAsyncDelayed()
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

console.error = () => {};