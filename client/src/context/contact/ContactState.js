import React, {useReducer} from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import axios from 'axios';
import {
    ADD_CONTACT,
    GET_CONTACTS,
    UPDATE_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CLEAR_CONTACTS,
    CONTACT_ERROR
} from '../types';

const ContactState = props =>  {
    const initialState = {
        contacts: [],
        current: null,
        filtered: null,
        error:null,
        loading: true
    };
    const [state, dispatch] = useReducer(contactReducer, initialState);


    // GET CONTACTS
    const getContacts = async () => {
        try {
            const res = await axios.get('/api/contacts');
            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            });
        } catch (e) {
            dispatch({
                type: CONTACT_ERROR,
                payload: e.response.data.msg
            });
        }
    };
    // ADD CONTACT
    const addContact = async contact => {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.post('/api/contacts', contact, config);
            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            });
        } catch (e) {
            dispatch({
                type: CONTACT_ERROR,
                payload: e.response.data.msg
            });
        }
    };
    // UPDATE CONTACT
    const updateContact = async(contact) => {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        };
        try {
            dispatch({
                type: UPDATE_CONTACT,
                payload: contact
            });
            await axios.put(`/api/contacts/${contact._id}`, contact, config);
        } catch (e) {
            dispatch({
                type: CONTACT_ERROR,
                payload: e.response.data.msg
            });
        }
    };
    // DELETE CONTACT
    const deleteContact = async(id) => {
        dispatch({
            type: DELETE_CONTACT,
            payload: id
        });
        clearCurrent();
        await axios.delete(`/api/contacts/${id}`);
    };
    // SET CURRENT
    const setCurrent = (contact) => {
        dispatch({
            type: SET_CURRENT,
            payload: contact
        });
    };

    // CLEAR CURRENT
    const clearCurrent = () => {
        dispatch({
            type: CLEAR_CURRENT
        });
    };
    // FILTER CONTACTS
    const filterContacts = text => {
        dispatch({
            type:FILTER_CONTACTS,
            payload: text
        });
    };
    // CLEAR Filter
    const clearFilter = () => {
        dispatch({
            type: CLEAR_FILTER
        });
    };
    // CLEAR CONTACTS
    const clearContacts = () => {
        dispatch({
            type: CLEAR_CONTACTS
        });
    }
    return(
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                loading: state.loading,
                addContact,
                updateContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                filterContacts,
                clearFilter,
                getContacts,
                clearContacts 
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )
};

export default ContactState;
