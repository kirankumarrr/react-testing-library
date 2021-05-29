import axios from 'axios'
import * as apiCalls from './apiCalls';

describe('apiCalls',()=>{
    describe('signup',()=>{
        it('calls https://60b0c06a1f26610017fff217.mockapi.io/api/users/user',()=>{
            const mockSignUp = jest.fn()
            axios.post = mockSignUp;
            apiCalls.signup()

            const path = mockSignUp.mock.calls[0][0];
            expect(path).toBe('https://60b0c06a1f26610017fff217.mockapi.io/api/users/user')
        })  
    })  

    describe('login',()=>{
        it('calls https://60b0c06a1f26610017fff217.mockapi.io/api/users/login',()=>{
            const mockSignUp = jest.fn()
            axios.post = mockSignUp;
            apiCalls.login()

            const path = mockSignUp.mock.calls[0][0];
            expect(path).toBe('https://60b0c06a1f26610017fff217.mockapi.io/api/users/login')
        })  
    })  
})