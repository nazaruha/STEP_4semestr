import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const GetCategoryColor = (category) => {
  let categoryStyle = "lab lab-warning";
  switch (category) {
    case "Work":
      categoryStyle =  "lab lab-success";
      break;
    case "Family":
      categoryStyle = "lab lab-primary";
      break;
    case "Private":
      categoryStyle = "lab lab-danger";
      break;
    case "Friends":
      categoryStyle = "lab lab-warning";
      break;
    default:
      categoryStyle = "lab lab-warning";
      break;
  }
  return categoryStyle;
}

// This our contact of someone
const ContactItem = ({ name, phone, email, category, avatar, gender, onDelete }) => {
  let categoryStyle = GetCategoryColor(category);
  const photoURL = `https://randomuser.me/api/portraits/${gender}/${avatar}.jpg`; // cool API to get photos for users

  return (
    <div className="unit">
      <div className="field name">
        <div className="check">
          <input id="cb2" name="cb1" type="checkbox" />
          <label htmlFor="cb2"></label>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"></svg>
        </div>
        <div>
          <img src={photoURL} alt="image" className="avatar" /> {name}
        </div>
        <div className={categoryStyle}>{category}</div>
      </div>
      <div className="field phone">{phone}</div>
      <div className="field email">{email}</div>
      <div className="icons">
        <div>
          <FontAwesomeIcon className="edit" icon={faEdit} size="2x" />
        </div>
        <div>
          <FontAwesomeIcon className="delete" icon={faTrash} onClick={onDelete} size="2x" />
        </div>
      </div>
    </div>
  );
};

export default ContactItem;
