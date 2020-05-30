import React, {useContext} from 'react'

// Context 
import ContactContext from '../../context/contact/contactContext';


const ContactItem = ({contact}) => {
    const contactContext = useContext(ContactContext);
    const {deleteContact, setCurrent} = contactContext;
    const {name, email, phone, type, _id}= contact;

    const onDelete = () => {
        deleteContact(_id);
    };

  return (
    <li className="list-group-item bg-light my-2 border">
        <span 
            className={'badge badge-'+ 
                (type==='personal'?'primary':'success') + 
                ' float-right'} 
            style={{fontSize:'1em', textTransform:'capitalize', fontWeight:'400'}}>
            {type}</span>
        <p 
            className="text-primary lead"
            style={{fontWeight:'500', textTransform:'capitalize'}}> {name} </p>
        <p><i className="fas fa-envelope"></i>{'  '}{email}</p>
        <p><i className="fas fa-phone"></i>{'  '}{phone}</p>
        <p>
            <button 
                className="btn btn-sm btn-dark"
                onClick={()=>setCurrent(contact)}
                >Edit</button>
            <button 
                className="btn btn-sm btn-danger ml-3"
                onClick={onDelete}
                >Delete</button>
        </p>
    </li>
  )
}

export default ContactItem
