import React, { useState } from 'react';
import contactsData from './contacts.json';
import '../src/App.css';

function App() {
  const [contacts, setContacts] = useState(contactsData);

  function filterFunction(contacts) {  //function takes an array of contacts as a parameter
    let newArray = [];   //a empty array is created
    for (let i = 0; i < 5; i++) { //for iterate over the first 5 elements of the array
      newArray.push(contacts[i]);  //each element is pushed into the newArray
    }
    return newArray;
  }

  let filteredContacts = filterFunction(contacts);  // function returns a new array containing the first five elements

  function addRandomContact() {
    const randomIndex = Math.floor(Math.random() * (contactsData.length - 5)) + 5;  //exclude the first five elements of the contactsData array, ensuring that a new contact is selected
    const randomActor = contactsData[randomIndex];  //random actor is added to the filteredContacts array by creating a new array
    filteredContacts = [...filteredContacts, randomActor]
    setContacts( filteredContacts);  // updates the state and include the new contact
  }

  function sortByPopularity() {
    const updatedContacts = [...filteredContacts];  //new array created
    updatedContacts.sort((a, b) => b.popularity - a.popularity);  //compares the popularity property of each contact, and sorts the array in descending order based on popularity
    const finalContacts = updatedContacts.slice(0, 5);  //extracts the first five contacts from the array
    setContacts(finalContacts); //set list contacts by most popular
  }
  

  function sortByName() {
    const sortedContacts = [...filteredContacts].sort((a, b) => a.name.localeCompare(b.name));  //contacts being sorted in alphabetical order based on their names using sort methode
    setContacts(sortedContacts); //new array based on contacts name
  }

  function deleteContact(id) {  //delete contact by Id
    const updatedContacts = contacts.filter(contact => contact.id !== id);  //filter create new array without the one contact that Id match
    setContacts(updatedContacts);  //new array, don't include the one deleted by Id
  }


  return (
    <div className="App">
      <div className='buttonsList'>
      <button className='buttonAdd' onClick={addRandomContact}>Add Random Contact</button>
      <button className='buttonSortP' onClick={sortByPopularity}>Sort by popularity</button>
      <button className='buttonSortN'  onClick={sortByName}>Sort by name</button>
      </div>
     
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar?</th>
            <th>Won Emmy?</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.map((contact) => (  //function iterates over each contact and returns new array
            <tr key={contact.id}>  
            {/* key used to assign a unique identifire to each contact */}
              <td>
                <img className='imageF1' src={contact.pictureUrl} alt={contact.name} />
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed(2)}</td>
              <td>{contact.wonOscar ? '🏆' : ''}</td>
              <td>{contact.wonEmmy ? '🏆' : ''}</td>
              <td>
                <button onClick={() => deleteContact(contact.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;