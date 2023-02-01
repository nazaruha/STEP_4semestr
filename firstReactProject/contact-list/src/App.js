import { v4 as uuidv4 } from "uuid";
import { Routes, Route, useSearchParams } from "react-router-dom";
import React from "react";
//Components
import Header from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import ContactList from "./components/contact-list/contact-list";
import Footer from "./components/footer/footer";
import AddContact from "./components/add-contact/add-contact";
import EditContact from "./components/edit-contact/edit-contact";

class App extends React.Component {
  state = {
    contactList: [
      {
        id: uuidv4(),
        name: "Alexander Verdnam",
        phone: "+1-800-600-9898",
        email: "example@gmail.com",
        category: "Work",
        avatar: 54,
        gender: "men",
      },
      {
        id: uuidv4(),
        name: "Emma Watson",
        phone: "+1-200-300-9421",
        email: "emmaWatson111@gmail.com",
        category: "Family",
        avatar: 0,
        gender: "women",
      },
      {
        id: uuidv4(),
        name: "Bill Watson",
        phone: "+9-200-300-9421",
        email: "billWatson111@gmail.com",
        category: "Family",
        avatar: 99,
        gender: "men",
      },
    ],
    selectedContact: null,
  };

  onDelete = (id) => {
    // gets id of the lements that we clicked
    const { contactList } = this.state; // деструктаризація - це тіпа вже можна писати прост contactList, а не this.state.contactList
    const index = contactList.findIndex((i) => i.id === id);
    let tmpList = contactList.slice(); // copy list into tmpList
    console.log(tmpList);
    const part1 = tmpList.slice(0, index);
    const part2 = tmpList.slice(index + 1);
    tmpList = [...part1, ...part2];

    this.setState({
      contactList: tmpList,
    });
  };

  onSelectContact = (id) => {
    const{contactList} = this.state;
    const index = contactList.findIndex((el) => el.id === id)
    const selectedContact = contactList[index];
    console.log(selectedContact);

    this.setState({
      selectedContact: selectedContact
    });
  }

  onAddNewContact = (newContact) => {
    const{contactList} = this.state;
    const tmpList = contactList.slice();
    tmpList.unshift(newContact);

    this.setState ({
      contactList: tmpList,
    });
  }

  onEditContact = (editedContact) => {
    const{contactList} = this.state;
    const index = contactList.findIndex((el) => el.id === editedContact.id);
    const tmpList = contactList.slice();
    tmpList[index] = editedContact;

    this.setState({
      contactList: tmpList
    });
  }

  onGetSearch = (event) => {
    event.preventDefault();

    // const{contactList} = this.state;
    // let{searchedContactList} = this.state;    

    // console.log(searchedContactList);
    // if (event.target.value.length === 0 || event.target.value.trim().length === 0) {
    //   this.setState({
    //     searchedContactList: contactList
    //   })
    //   return;
    // }

    // const tmpList = contactList.slice().filter((el) => el.name.toLowerCase().includes(event.target.value.toLowerCase()));

    // this.setState({
    //   searchedContactList: tmpList
    // });

    let [useSearchParams, setSearchParams] = useSearchParams();
    let contact = setSearchParams.get("contact");

    let [contactData, setContactData] = useState<any>(null);

  }

  render() {
    const { contactList } = this.state; // знайди мені ContactList в state в нашому класі
    // console.log(contactList);
    return (
      <>
        <div className="container bootstrap snippets bootdeys bootdey">
          <div className="row decor-default">
            <Sidebar List={contactList} />
            <div className="col-lg-10 col-md-8 col-sm-12">
              <div className="contacts-list">
                <Header />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <ContactList
                        onDelete={this.onDelete}
                        onSelectContact={this.onSelectContact}
                        onGetSearch={this.onGetSearch}
                        List={contactList}
                      />
                    }
                  />
                  <Route path="/add-contact" element={<AddContact onAddNewContact={this.onAddNewContact}/>} />
                  <Route path="/edit-contact" element={<EditContact selectedContact={this.state.selectedContact} onEditContact={this.onEditContact}/>}/>
                </Routes>
                <Footer />
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
