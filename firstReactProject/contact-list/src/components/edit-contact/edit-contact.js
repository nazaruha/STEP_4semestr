import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const EditContact = ({selectedContact, onEditContact}) => {
    const[name, setName] = useState(selectedContact.name);
    const[phone, setPhone] = useState(selectedContact.phone);
    const[email, setEmail] = useState(selectedContact.email);
    const[gender, setGender] = useState(selectedContact.gender);
    const[category, setCategory] = useState(selectedContact.category);
    const[avatar, setAvatar] = useState(selectedContact.avatar);
    const [isRedirect, setIsRedirect] = useState(false);

    const onGetName = (event) => {
        setName(event.target.value);
    }

    const onGetPhone = (event) => {
        setPhone(event.target.value);
    }

    const onGetEmail = (event) => {
        setEmail(event.target.value);
    }

    const onGetGender = (event) => {
        setGender(event.target.value);
    }

    const onGetCategory = (event) => {
        setCategory(event.target.value);
    }

    const onGetAvatar = (event) => {
        if (event.target.value < 0 || event.target.value > 99 || (String(event.target.value).length === 2 && String(event.target.value)[0] === '0' )) {
            event.target.value = 0;
        }
        setAvatar(event.target.value);
    }

    const onEdit = (event) => {
        event.preventDefault();

        const editedContact = {
            id: selectedContact.id,
            name,
            phone,
            email,
            gender,
            category,
            avatar,
        }

        onEditContact(editedContact);
        setIsRedirect(true);
    };

    if (isRedirect) {
        return <Navigate to={"/"}/>
    }

    return(
        <>
           <div className="row">
                <div className="col-lg-7 col-md-6">
                    <h2>Edit Contact</h2>
                    <form onSubmit={onEdit}>
                        <div className="mb-3">
                            <div className="form-label">Name</div>
                            <input type="text" className="form-control" value={name} onChange={onGetName}/>
                        </div>

                        <div className="mb-3">
                            <div className="form-label">Phone</div>
                            <input type="text" className="form-control" value={phone} onChange={onGetPhone}/>
                        </div>

                        <div className="mb-3">
                            <div className="form-label">Email</div>
                            <input type="text" className="form-control" value={email} onChange={onGetEmail}/>
                        </div>

                        <div className="mb-3">
                            <div className="form-label">Gender</div>
                            <select className="form-select" defaultValue={gender} onChange={onGetGender}>
                                <option>men</option>
                                <option>women</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <div className="form-label">Category</div>
                            <select className="form-select" defaultValue={category} onChange={onGetCategory}>
                                <option>Work</option>
                                <option>Family</option>
                                <option>Private</option>
                                <option>Friends</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <div className="form-label">Avatar</div>
                            <input type="number" className="form-control" min={0} max={99} value={avatar} onChange={onGetAvatar}/>
                        </div>

                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary">Edit</button>
                        </div>
                    </form>
                </div>
                <div className="col-lg-5 col-md-6">
                    <h2>Contact Photo</h2>
                    <img src={`https://randomuser.me/api/portraits/${gender}/${avatar}.jpg`} alt="..." className="img-thumbnail" />
                </div>
           </div>
        </>
    );

}

export default EditContact;