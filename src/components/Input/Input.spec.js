import React from 'react'
import { render,cleanup, fireEvent  } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Input from './Input'


beforeEach(cleanup);

describe('Input Layout',()=>{

    it('it has input item',()=>{
       const { container } = render(<Input />)
       const input = container.querySelector('input')
       expect(input).toBeInTheDocument()
    })

    it('name attribute is mandatory for updating the state value dynamically',()=>{
        const nameAttribute = "Test Label"
        const { container } = render(<Input name={nameAttribute}/>)
       const input = container.querySelector('input')
       expect(input.name).toBe(nameAttribute)
    })

    it('display the lable provided in props',()=>{
        const labelValue = "Test Label"
        const { queryByText } = render(<Input label={labelValue}/>)
        const label = queryByText(labelValue)
        expect(label).toBeInTheDocument()
     })

     it('does not display the lable when not provided in props',()=>{
        const { container } = render(<Input />)
        const label = container.querySelector('label')
        expect(label).not.toBeInTheDocument()
     })
     
     it('text type has input when type is not provided : by default "TEXT',()=>{
        const { container } = render(<Input />)
        const input = container.querySelector('input')
       expect(input.type).toBe('text')
     })

     it('when type is provied need to update it',()=>{
        const { container } = render(<Input type="password"/>)
        const input = container.querySelector('input')
       expect(input.type).toBe('password')
     })

     it('has value for input when it is provied as prop',()=>{
        const { container } = render(<Input value="value"/>)
        const input = container.querySelector('input')
       expect(input.value).toBe('value')
     })
     it('has placeholder for input when it is provied as prop',()=>{
        const { container } = render(<Input placeholder="value"/>)
        const input = container.querySelector('input')
       expect(input.placeholder).toBe('value')
     })

     it('has onChange for input when it is provied as prop',()=>{
         const onChange=jest.fn()
        const { container } = render(<Input onChange={onChange}/>)
        const input = container.querySelector('input')
        fireEvent.change(input,{target:{value:'test'}})
       expect(onChange).toHaveBeenCalledTimes(1)
     })

     it('has default style when hasError property is false',()=>{
        const { container } = render(<Input hasError={false} />)
        const input = container.querySelector('input')
        expect(input.className).toBe('form-control is-valid')
     })

     it('has error style when hasError property is true',()=>{
        const { container } = render(<Input hasError={true} />)
        const input = container.querySelector('input')
        expect(input.className).toBe('form-control is-invalid')
     })

     it('display error message when it is provided',()=>{
         const errorMessage = 'Cannot be null'
        const { queryByText } = render(<Input hasError={true} error={errorMessage} />)
        expect(queryByText(errorMessage)).toBeInTheDocument()
     })

     it('dont not display error message when it is not provided',()=>{
        const errorMessage = 'Cannot be null'
       const { queryByText } = render(<Input  />)
       expect(queryByText(errorMessage)).not.toBeInTheDocument()
    })

    
})