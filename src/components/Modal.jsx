import { useState, useEffect } from 'react'

import Message from './Message'
import CloseModal from '../img/close.svg'

const Modal = ({ setModal, animModal, setAnimModal, saveExpense ,expenseEdit, setExpenseEdit }) => {

    const [msg, setMsg] = useState('')
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState ('')
    const [category, setCategory] = useState('')
    const [date, setDate] = useState('')
    const [id, setID] = useState('')

    useEffect(() => {
        if(Object.keys(expenseEdit).length > 0) {
            setName(expenseEdit.name)
            setQuantity(expenseEdit.quantity)
            setCategory(expenseEdit.category)
            setID(expenseEdit.id)
            setDate(expenseEdit.date)
          }
    }, [])

    const closeModal = () => {
        setAnimModal(false)
        setExpenseEdit({})
        setTimeout(() => {
            setModal(false)
        }, 500)
    }

    const handleSubmit = e => {
        e.preventDefault()

        if([ name, quantity, category ].includes('')){
            setMsg('All fields are required!')

            setTimeout(() => {
                setMsg('')
            },3000)
            return
        }

        saveExpense({ name, quantity, category, id, date })
    }

  return (
    <div className="modal">
        <div className="close-modal">
            <img 
                src={ CloseModal } 
                alt="close modal" 
                onClick={ closeModal } />
        </div>

        <form 
            className={`form ${ animModal ? 'anim' : 'close' }`}
            onSubmit={ handleSubmit }>
            <legend>{ expenseEdit.name ? 'Edit expense' : 'New expense' }</legend>
            {msg && <Message type="error">{ msg }</Message>}
            <div className='field'>
                <label htmlFor="name">Expense Name</label>
                <input 
                    id='name'
                    type='text'
                    placeholder='Add the expense name'
                    value={ name } 
                    onChange={ e => setName(e.target.value) } />
            </div>
            <div className='field'>
                <label htmlFor="quantity">Quantity</label>
                <input 
                    id='quantity'
                    type='number'
                    placeholder='Add expense quantity: ex. 400' 
                    value={ quantity }
                    onChange={ e => setQuantity(Number(e.target.value)) }/>
            </div>
            <div className='field'>
                <label htmlFor="category">Category</label>
                <select 
                    id="category"
                    value={ category }
                    onChange={ e => setCategory(e.target.value) }>
                        <option value="">-- Select --</option>
                        <option value="savings">Savings</option>
                        <option value="food">Food</option>
                        <option value="house">House</option>
                        <option value="leisure">Leisure</option>
                        <option value="health">Health</option>
                        <option value="subscriptions">Subscriptions</option>
                        <option value="other">Other</option>
                </select>
            </div>

            <input 
                type="submit" 
                value={ expenseEdit.name ? 'Save changes' : 'Add expense' } />
        </form>
    </div>
  );
}

export default Modal;
