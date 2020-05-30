import React, {useContext, useEffect} from 'react'

// Context 
import ContactContext from '../../context/contact/contactContext';


// Components
import ContactItem from './ContactItem';
import ContactFilter from './ContactFilter';
import Spinner from '../layouts/Spinner';


const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const {getContacts, contacts, filtered, loading} = contactContext;
    useEffect(()=>{
        getContacts();
        // eslint-disable-next-line
    }, []);
  return (
    <div className="container p-3" style={{position: 'relative'}}>
        <ContactFilter/>
        {loading ? (
            <Spinner/>
            ): (
                contacts.length === 0 ? (
                <p className="lead">Please Add a Contact</p>
            ):(
        <div className="contacts-div container border border-secondary mb-4" style={{
                position:'absolute',
                height: '30rem',
                'overflowY': 'scroll'
            }}>
            <ul className="list-group">
            {
                filtered !== null ? filtered.map(contact=>(
                    <ContactItem
                        key={contact._id}
                        contact={contact}
                    />
                )):
                contacts.map(contact=>(
                    <ContactItem
                        key={contact._id}
                        contact={contact}
                    />
                ))
            }
            </ul>
        </div>
            )
            )}
    </div>
  )
}

export default Contacts
