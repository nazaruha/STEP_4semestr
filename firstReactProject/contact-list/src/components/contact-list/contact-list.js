import React from "react";
import ContactItem from "../contact-item/contact-item";

// A list where is contained contactes of people
const ContactList = () => {
    return (
        <h1>
            <ContactItem/>
            <ContactItem/>
            <ContactItem/>
            <ContactItem/>
        </h1>
    )
}

export default ContactList;