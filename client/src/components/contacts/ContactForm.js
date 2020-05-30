import React, {useState, useContext, useEffect} from 'react'

// Context 
import ContactContext from '../../context/contact/contactContext';
import AlertContext from '../../context/alert/alertContext';


const ContactFrom = () => {
    const contactContext = useContext(ContactContext);
    const alertContext = useContext(AlertContext);
    const {addContact, current, updateContact, clearCurrent} = contactContext;

    const [input, setInput] = useState({
        name: '',
        email:'',
        phone:'',
        type:'personal'
    });

    useEffect(()=>{
        if(current===null){
            setInput({
                name: '',
                email:'',
                phone:'',
                type:'personal'
            });
        }else{
            setInput(current);
        }
    }, [current]);


    const {name, email, phone, type}= input;


    const onChange = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = e => {
        e.preventDefault();
        if(name==='' || email==='' || phone===''){
            alertContext.setAlert('Please enter all fields', 'danger');
        }else{
            if(current === null){
                addContact(input);
            }else{
                updateContact({
                    name,
                    email,
                    phone,
                    _id: current._id,
                    type
                });
            }
            clearCurrent();
        }
        setInput({
            name: '',
            email:'',
            phone:'',
            type:'personal'
        });
    };


  return (
    <div className="container p-3">
         <form onSubmit={onSubmit}>
            <p className="h2 mb-3 text-center">{current===null?'Add Contact':'Update Contact'}</p>
            <div className="form-group">
                <label>Full Name</label>
                <input
                    required 
                    name="name"
                    value={name}
                    onChange={onChange}
                    type="text"
                    className="form-control"/>
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    className="form-control" />
            </div>
            <div className="form-group">
                <label>Phone Number</label>
                <input
                    required 
                    type="text"
                    name="phone"
                    onChange={onChange}
                    value={phone}
                    className="form-control" />
            </div>
            <div className="form-check form-check-inline">
                <input 
                    className="form-check-input"
                    type="radio" 
                    name="type"
                    value="personal"
                    checked={type==="personal"}
                    onChange={onChange}    
                    />
                <label className="form-check-label">Personal</label>
            </div>
            <div className="form-check form-check-inline">
                <input 
                    className="form-check-input"
                    type="radio" 
                    name="type"
                    value="professional"
                    checked={type === "professional"}
                    onChange={onChange}    
                    />
                <label className="form-check-label">Professional</label>
            </div>
            <button 
                type="submit"
                className="btn btn-sm btn-primary d-block mt-3"
                >{current===null?'Add Contact':'Update Contact'}</button>
        </form>
    </div>
  )
}

export default ContactFrom
