import React, {useState, useContext, useRef} from 'react'

// Context
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const {filterContacts, clearFilter } = contactContext;
    const text = useRef('');
    const onChange = e => {
        const now = text.current.value;
        if(now === ''){
            clearFilter();
        }else{
            filterContacts(now);
        }
    };
  return (
    <div className="container">
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">Filter Contacts</span>
            </div>
            <input 
                type="text"
                ref={text}
                className="form-control"
                onChange={onChange}
            />
        </div>
    </div>
  )
}

export default ContactFilter
