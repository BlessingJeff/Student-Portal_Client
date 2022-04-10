import "./App.css";
import  { useState, useEffect } from "react";
import Axios from "axios";

function App() {

 const [name, setName] = useState("");
 const [age, setAge] = useState("");
 const [listOfFriends, setListOfFriends] = useState([]);

 const addFriend = () => {
Axios.post("https://student-register-id.herokuapp.com/addfriend", {
  name: name,
 age: age,

}).then(()=> {
  setListOfFriends([
    ...listOfFriends,
    { name: name, age: age },
  ]);
})
 };


 const updateFriend = (id) => {
  const newAge = prompt("Enter new age: ");

  Axios.put("https://student-register-id.herokuapp.com/update", {newAge: newAge, id: id}).then(()=> {
setListOfFriends(listOfFriends.map((val) => {

  return val._id == id ? { _id: id, name: val.name, age: newAge } : val;
}))
 })
};

const deleteFriend = (id) => {
  Axios.delete(`https://student-register-id.herokuapp.com/${id}`).then(() => {
    setListOfFriends(listOfFriends.filter((val) => {
      return val._id != id;
  })
    );
})
};

 useEffect(()=> {
  Axios.get("https://student-register-id.herokuapp.com/read")
.then((response)=> {
  setListOfFriends(response.data);
  })
  .catch(()=> {
    console.log("ERR")
  });
 }, []);

  return (
    <div className="App">
      <div className="inputs">
      <input type="text"  placeholder="Student Name" onChange={(event) => {
            setName(event.target.value);
          }}
          />
      <input type="number"  placeholder="Roll Number (ID)"  onChange={(event) => {
            setAge(event.target.value);
          }}
           />

<button onClick={addFriend}>Add Friend</button>
      </div>
       <div className="listOfFriends">
      {listOfFriends.map((val) => {
          return (
            <div className="friendContainer">
              <div className="friend"> 
          <h3>Student Name: {val.name}</h3> 
          
          <h3>ID: {val.age}</h3> 
           </div>
           <button 
            onClick={() => {
              updateFriend(val._id);
            }}
           >
Update</button>
           <button  id="removeBtn"  onClick={() => {
                  deleteFriend(val._id);
                }}
                >
                  X</button>

            </div>
          );

      })}
      </div>
      </div>
  );
    }
export default App;
