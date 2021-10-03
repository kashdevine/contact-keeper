import React, {useReducer} from 'react';
import {v4 as uuidv4} from 'uuid';
import contactReducer from './ContactReducer';
import contactContext from './ContactContext';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';


const ContactState = props => {
    const intialState = {
        contacts :[
            {
                id: 1,
                name: "Jill Jillson",
                email: "jill@gmail.com",
                phone: "111-444-5555",
                type: "personal"
            },
            {
                id: 2,
                name: "Sara Jillson",
                email: "sara@gmail.com",
                phone: "222-222-2222",
                type: "personal"
            },
            {
                id: 3,
                name: "Henry Hillson",
                email: "iheartme@gmail.com",
                phone: "333-333-3333",
                type: "professional"
            }
        ],

        current: null,
        filtered:null
    };

    const [state, dispatch] = useReducer(contactReducer, intialState);

    // Add Contact
    const addContact = contact => {
        contact.id = uuidv4();
        dispatch({type:ADD_CONTACT, payload:contact})
    }

    // Delete Contact
    const delectContact = id =>{
        dispatch({type:DELETE_CONTACT, payload:id})

    }

    // Set current contact
    const setCurrent = contact =>{
        dispatch({type:SET_CURRENT, payload:contact})
    }

    // Clear current contact
    const clearCurrent = () =>{
        dispatch({type:CLEAR_CURRENT})
    }

    // Update current contact
    const updateContact = contact =>{
        dispatch({type:UPDATE_CONTACT, payload:contact})
    }

    // Filter contacts
    const filterContacts = text =>{
        dispatch({type:FILTER_CONTACTS, payload:text})
    }

    // Clear filter
    const clearfilter = () =>{
        dispatch({type:CLEAR_FILTER})
    }

    return (
        <contactContext.Provider value={{
            contacts:state.contacts,
            current:state.current,
            filtered:state.filtered,
            addContact,
            delectContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearfilter
        }}>
            {props.children}
        </contactContext.Provider>
    )
}

export default ContactState;