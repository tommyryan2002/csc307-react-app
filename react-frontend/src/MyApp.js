import Table from './Table';
import Form from './Form';
import axios from 'axios';
import React, {useState, useEffect} from 'react';

function MyApp() {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    fetchAll().then( result => {
       if (result)
          setCharacters(result);
     });
  }, [] ); 
  
  async function fetchAll() {
    try {
      const response = await axios.get('http://localhost:8000/users');
      return response.data.users_list;     
    }
    catch (error){
      //We're not handling errors. Just logging into the console.
      console.log(error); 
      return false;         
    }
  }

  async function makeDeleteCall(id) {
    try {
      console.log("making delete call to id " + id)
      const response = await axios.delete(`http://localhost:8000/users/${id}`);
      return response;
    } 
    catch (error) {
      console.log(error);
      return false;
    }
  }

  async function makePostCall(person) {
    try {
      const response = await axios.post('http://localhost:8000/users', person);
      return response;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  function updateList(person) { 
    makePostCall(person).then( result => {
      if (result && result.status === 201) {
        setCharacters([...characters, result['data']] );
      } else console.log(result);
    });
  }
  
  function removeOneCharacter (index) {
    let char_id = characters[index]['id'];
    console.log("char id to be removed " + char_id);
    makeDeleteCall(char_id).then ( result => {
      if (result && result.status === 204) {
        fetchAll().then( result => {
          if (result)
             setCharacters(result);
        });
      } else {
        console.log("failed delete")
      }
    });
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />                                                                            
    </div>
  )
}

export default MyApp;