//Components
import Header from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import ContactList from "./components/contact-list/contact-list";
import Footer from "./components/footer/footer";
import AddContact from "./components/add-contact/add-contact";
import {Routes, Route, Router } from "react-router-dom";
import React from "react";

class App extends React.Component {
  state = {
    contactList: [
      {
        id: 1,
        name: "Alexander Verdnam",
        phone: "+1-800-600-9898",
        email: "example@gmail.com",
        category: "Work",
        avatar: 54,
        gender: "men"
      },
      {
        id: 2,
        name: "Emma Watson",
        phone: "+1-200-300-9421",
        email: "emmaWatson111@gmail.com",
        category: "Family",
        avatar: 0,
        gender: "women"
      },
      {
        id: 3,
        name: "Bill Watson",
        phone: "+9-200-300-9421",
        email: "billWatson111@gmail.com",
        category: "Family",
        avatar: 99,
        gender: "men"
      },
    ],
  };

  onDelete = (id) => { // gets id of the lements that we clicked
    const {contactList } = this.state;
    const index = contactList.findIndex((i) => i.id === id)
    let tmpList = contactList.slice();
    console.log(tmpList);
    const part1 = tmpList.slice(0, index);
    const part2 = tmpList.slice(index + 1);
    tmpList = [...part1, ...part2];

    this.setState({
      contactList: tmpList,
    })
  }

  render() {
    const { contactList } = this.state; // знайди мені ContactList в state в нашому класі
    // console.log(contactList);
    return (
      <>
      <div className="container bootstrap snippets bootdeys bootdey">
          <div className="row decor-default">
            <Sidebar List={contactList}/>
            <div className="col-lg-10 col-md-8 col-sm-12">
              <div className="contacts-list">
                <Header />
                <Routes>
                  <Route
                    path="/"
                    element={<ContactList onDelete={this.onDelete} List={contactList} />}
                  />
                  <Route path="/add-contact" element={<AddContact />} />
                </Routes>
              </div>
            </div>
          </div>
      </div>

        {/* <div className="container bootstrap snippets bootdeys bootdey">
          <div className="row decor-default">
            <Sidebar List={contactList} />
            <ContactList List={contactList} />
            <Footer />
          </div>
        </div>
        <Routes>
          <Route path="/" element={<ContactList List={contactList}/>}/>
          <Route path="/add-contact" element={<AddContact/>}/>
        </Routes> */}
      </>
    );
  }
}

export default App;
