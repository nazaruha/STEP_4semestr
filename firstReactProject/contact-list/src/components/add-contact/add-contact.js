import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
{
  /*due to this npm (npm i uuid) we can generate random unic id calling func uuidv4() or v4()*/
}
import { Navigate } from "react-router-dom";
{
  /*можна переміститись в любий файл з допомогою navigate*/
}

const AddContact = ({ onAddNewContact }) => {
  const [name, setName] = useState("Marry Joen"); // пукі називається. Це function based state. В основном такий вид state'a юзається, а не як class based component (викор. в App.js)
  const [phone, setPhone] = useState("+(380)-xx-xxx-xx-xx");
  const [email, setEmail] = useState("example@gmail.com");
  const [gender, setGender] = useState("women");
  const [category, setCategory] = useState("Work");
  const [avatar, setAvatar] = useState(0);
  const [isRedirect, setIsRedirect] = useState(false);

  const onGetName = (event) => {
    // console.log("onGetName", event.target.value);
    setName(event.target.value);
  };

  const onGetPhone = (event) => {
    setPhone(event.target.value);
  };

  const onGetEmail = (event) => {
    setEmail(event.target.value);
  };

  const onGetGender = (event) => {
    setGender(event.target.value);
  };

  const onGetCategory = (event) => {
    setCategory(event.target.value);
  };

  const onGetAvatar = (event) => {
    setAvatar(event.target.value);
  };

  const onClickField = (event) => {
    event.target.value = "";
  };

  const onSave = (event) => {
    event.preventDefault();

    const newContact = {
      id: uuidv4(),
      name,
      phone,
      email,
      gender,
      category,
      avatar,
    };

    onAddNewContact(newContact);
    setIsRedirect(true);
  };

  if (isRedirect) {
    return <Navigate to={"/"} />; // returns to the parent page if isRedirect === true
  }

  return (
    <div className="row ms-2">
      <div className="col-7">
        <h2>Add new contact</h2>
        <form
          onSubmit={
            onSave
          } /*This function will be called when is called submit*/
        >
          {" "}
          {/*Save all changes in form and send to the parent class*/}
          <div className="mb-3">
            <div className="form-label">Name</div>
            <input
              type="text"
              className="form-control"
              value={name}
              onClick={onClickField}
              onChange={onGetName}
            />
          </div>
          <div className="mb-3">
            <div className="form-label">Phone</div>
            <input
              type="text"
              className="form-control"
              value={phone}
              onClick={onClickField}
              onChange={onGetPhone}
            />
          </div>
          <div className="mb-3">
            <div className="form-label">Email</div>
            <input
              type="text"
              className="form-control"
              value={email}
              onClick={onClickField}
              onChange={onGetEmail}
            />
          </div>
          <div className="mb-3">
            <div className="form-label">Gender</div>
            <select
              name="gender"
              className="form-select"
              defaultValue={gender}
              onChange={onGetGender}
            >
              <option>men</option>
              <option>women</option>
            </select>
          </div>
          <div className="mb-3">
            <div className="form-label">Category</div>
            <select
              name="category"
              className="form-select"
              defaultValue={category}
              onChange={onGetCategory}
            >
              <option>Work</option>
              <option>Famile</option>
              <option>Private</option>
              <option>Friends</option>
            </select>
          </div>
          <div className="mb-3">
            <div className="form-label">Avatar</div>
            <input
              className="form-control"
              type="number"
              min={0}
              max={99}
              value={avatar}
              onChange={onGetAvatar}
            ></input>
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
      <div className="col-5">
        <h2>User Photo</h2>
        {avatar >= 0 && avatar <= 99 && avatar !== "" ? (
          <img src={`https://randomuser.me/api/portraits/${gender}/${avatar}.jpg`} alt="..." className="img-thumbnail" />
        ) : (
          <p>No photo.</p>
        )}
      </div>
    </div>
  );
};

export default AddContact;
