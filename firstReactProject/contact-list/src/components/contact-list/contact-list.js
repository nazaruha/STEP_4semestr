import Header from "../header/header";
import ContactItem from "./contact-item/contact-item";
import React from "react";

// A list where is contained contactes of people
const ContactList = ({ List, onDelete, onSelectContact, onGetSearch }) => { /* in {} to get list of elements not an object */
  // console.log("ContactList ", List);
  const item = List.map(contact => {
    // console.log("contact ", contact);
    // return <ContactItem {...contact}/>; //returns array of props
     return <ContactItem key={contact.id} {...contact} onDelete={() => onDelete(contact.id)} onSelectContact={() => onSelectContact(contact.id)}/>;
  });
  return (
    <>
          <div className="ac-custom ac-checkbox ac-checkmark">
            <div className="input-group">
              <input
                type="text"
                className="contacts-list-search"
                placeholder="Search"
                onChange={onGetSearch}
              />
            </div>
            <div className="unit head">
              <div className="field name">
                <div className="check">
                  <input id="cb1" name="cb1" type="checkbox" />
                  <label htmlFor="cb1"></label>
                  <svg
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  ></svg>
                </div>
                Name
              </div>
              <div className="field phone">Phone</div>
              <div className="field email icons">Email</div>
            </div>
          </div>
          {item.length > 0 ? item : <div id="empty-contactList-info">No contacts found.</div>} {/*if there is no contacts left - outputs div with the text 'No contacts found.'*/}
    </>
  );
};

export default ContactList;
