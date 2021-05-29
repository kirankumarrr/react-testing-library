import React from 'react'
import { render, fireEvent} from '@testing-library/react'
import HomePage from './HomePage'

describe('HomePage Layout',()=>{

    it('has hader of Login up',()=>{
       const {getByTestId} = render(<HomePage />)
       const header = getByTestId('homepage')
       expect(header.textContent).toBe('HomePage')
    })
    
})