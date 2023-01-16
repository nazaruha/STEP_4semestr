//Components
import Sidebar from "./components/sidebar/sidebar";
import ContactList from "./components/contact-list/contact-list";
import Footer from "./components/footer/footer";
import React from "react";

class App extends React.Component {
  state = {
    contactList : [
      {
        "id": 1,
        "name": "Alexander Verdnam",
        "phone": "+1-800-600-9898",
        "email": "example@gmail.com",
        "category": "Work",
        "avatar": "https://bootdey.com/img/Content/avatar/avatar1.png"
      },
      {
        "id": 2,
        "name": "Emma Watson",
        "phone": "+1-200-300-9421",
        "email": "emmaWatson111@gmail.com",
        "category": "Family",
        "avatar": "https://bootdey.com/img/Content/avatar/avatar3.png"
      }
    ],
  }

  render() {
    const {contactList} = this.state; // знайди мені ContactList в state в нашому класі
    // console.log(contactList);
    return (
      <>
        <div className="container bootstrap snippets bootdeys bootdey">
          <div className="row decor-default">
            <Sidebar List={contactList}/>
            <ContactList List={contactList}/>
            <Footer />
          </div>
        </div>
      </>
    );
  }
}

export default App;
