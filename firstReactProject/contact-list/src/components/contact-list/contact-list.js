import Header from "../header/header";
import ContactItem from "./contact-item/contact-item";
import React from "react";

// A list where is contained contactes of people
const ContactList = ({ List, onDelete }) => { /* in {} to get list of elements not an object */
  // console.log("ContactList ", List);
  const item = List.map(contact => {
    // console.log("contact ", contact);
    // return <ContactItem {...contact}/>; //returns array of props
    return <ContactItem key={contact.id} {...contact} onDelete={() => onDelete(contact.id)}/>;
  });
  return (
    <>
          <div className="ac-custom ac-checkbox ac-checkmark">
            <div className="input-group">
              <input
                type="text"
                className="contacts-list-search"
                placeholder="Search"
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
          {item.length > 0 ? item : <div id="empty-contactList-info">No contacts found.</div>}
    </>
  );
};

export default ContactList;
