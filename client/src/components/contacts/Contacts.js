import React, { useContext, useEffect } from 'react'
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';
// Context 
import ContactContext from '../../context/contact/contactContext';


// Components
import ContactItem from './ContactItem';
import ContactFilter from './ContactFilter';
import Spinner from '../layouts/Spinner';


const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const { getContacts, contacts, filtered, loading } = contactContext;
    useEffect(() => {
        getContacts();
        // eslint-disable-next-line
    }, []);
    return (
        <div className="container p-3" style={{ position: 'relative' }}>
            <ContactFilter />
            {loading ? (
                <Spinner />
            ) : (
                    contacts.length === 0 ? (
                        <p className="lead">Please Add a Contact</p>
                    ) : (
                            <div className="contacts-div container border border-secondary mb-4" style={{
                                position: 'absolute',
                                height: '30rem',
                                'overflowY': 'scroll'
                            }}>

                                <ul className="list-group">
                                    <TransitionGroup >
                                        {

                                            filtered !== null ? filtered.map(contact => (
                                                <CSSTransition timeout={500} classNames="my-item" key={contact._id}>
                                                    <ContactItem
                                                        contact={contact}
                                                    />
                                                </CSSTransition>

                                            )) :
                                                contacts.map(contact => (
                                                    <CSSTransition timeout={500} classNames="my-item" key={contact._id}>
                                                        <ContactItem
                                                            contact={contact}
                                                        />
                                                    </CSSTransition>
                                                ))
                                        }
                                    </TransitionGroup>
                                </ul>

                            </div>
                        )
                )}
        </div>
    )
}

export default Contacts
