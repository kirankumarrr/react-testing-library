import React from 'react'

const Input =(props)=>{
    
    let inputClassName = 'form-control'
    
    if(props.hasError!== undefined) {
        !props.hasError ? inputClassName += ' is-valid'  : inputClassName+=' is-invalid'
    }


    return(
        <div>
            {props.label && <label >{props.label}</label> }
            <input className={inputClassName} type={props.type || 'text'} value={props.value} placeholder={props.placeholder} onChange={props.onChange} name={props.name}/>
            {props.error && <span className="invalid-feedback">{props.error}</span>}
        </div>
    )
}

Input.defaultProps ={
    onChange : ()=>{}
}

export default Input