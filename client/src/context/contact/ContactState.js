import React, {useReducer} from 'react';
import axios from 'axios';
import contactReducer from './ContactReducer';
import contactContext from './ContactContext';
import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
} from '../types';


const ContactState = props => {
    const intialState = {
        contacts :[],
        current: null,
        filtered:null,
        loading:true,
        error:null
    };

    const [state, dispatch] = useReducer(contactReducer, intialState);

    //Get Contacts
    const getContacts= async () => {

        try {
            const res = await axios.get('/api/contacts');
            console.log(res.data);
            dispatch({
                type: GET_CONTACTS, 
                payload: res.data
            })

        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err
            })
        }

    }
    // Add Contact
    const addContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/contacts', contact, config);

            dispatch({
                type: ADD_CONTACT, 
                payload: res.data
            })

        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err
            })
        }

    }

    // Delete Contact
    const delectContact = async id =>{

        try {
            const res = await axios.delete(`/api/contacts/${id}`);

            dispatch({
                type:DELETE_CONTACT, 
                payload:id
            })


        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.reponse.msg
            })
        }

    }
    
    // Update current contact
    const updateContact = async contact =>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
            
            dispatch({
                type:UPDATE_CONTACT, 
                payload:res.data
            })

        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }

    }
    // Clear Contacts
    const clearContacts = () =>{
        dispatch({type:CLEAR_CONTACTS})
    }

    // Set current contact
    const setCurrent = contact =>{
        dispatch({type:SET_CURRENT, payload:contact})
    }

    // Clear current contact
    const clearCurrent = () =>{
        dispatch({type:CLEAR_CURRENT})
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
            loading:state.loading,
            error:state.error,
            getContacts,
            addContact,
            delectContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearfilter,
            clearContacts
        }}>
            {props.children}
        </contactContext.Provider>
    )
}

export default ContactState;