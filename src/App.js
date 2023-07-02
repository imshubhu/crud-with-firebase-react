import "./styles.css";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZbDkT91wSMpxNmb1HrHLKHOuHIjd1C2U",
  authDomain: "crud-34399.firebaseapp.com",
  projectId: "crud-34399",
  storageBucket: "crud-34399.appspot.com",
  messagingSenderId: "885184486154",
  appId: "1:885184486154:web:68872f68a5178fb28178f3"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export default function App() {
  const [people, setPeople] = useState([]);
  const [input, setInput] = useState({ name: "", age: 0, hobby: "" });
  const db = getFirestore();

  const colRef = collection(db, "people");

  useEffect(() => {
    // FireStore Database
    // getDocs(colRef).then((snapShot) => {
    //   let array = [];
    //   snapShot.docs.forEach((element) => {
    //     array.push({ ...element.data(), id: element.id });
    //   });
    //   console.log(array);
    //   setPeople(() => [...array]);
    // });

    // Real Time Database
    onSnapshot(colRef, (snapShot) => {
      let array = [];
      snapShot.docs.forEach((element) => {
        array.push({ ...element.data(), id: element.id });
      });
      console.log(array);
      setPeople(() => [...array]);
    })

  }, []);

  function create(e) {
    console.log(e);
    e.preventDefault();
    addDoc(colRef, {
      ...input
    })
      .then((res) => {
        setInput(() => ({ name: "", age: 0, hobby: "" }));
      })
      .catch((err) => console.log("err", err));
  }

  function handleInput(e) {
    e.preventDefault();
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function deletePeople(id) {
    const docRef = doc(db, "people", id);
    deleteDoc(docRef);
  }

  return (
    <div className="App">
      <h1>Crud With Firebase</h1>

      <form className="add">
        <label htmlFor="name">Name:</label>
        &nbsp;
        <input
          type="text"
          id="name"
          onChange={(e) => handleInput(e)}
          value={input.name}
          name="name"
        />
        <br />
        <label htmlFor="age">Age:</label>
        &nbsp;
        <input
          type="number"
          id="age"
          name="age"
          onChange={(e) => handleInput(e)}
          value={input.age}
        />
        <br />
        <label htmlFor="hobby">Hobby:</label>
        &nbsp;
        <input
          type="text"
          id="hobby"
          name="hobby"
          onChange={(e) => handleInput(e)}
          value={input.hobby}
        />
        <br />
        <button onClick={(e) => create(e)}>Create</button>
      </form>
      <br />
      <br />
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Hobby</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {people &&
            people.map((elm, i) => (
              <tr key={i}>
                <td>{elm.name}</td>
                <td>{elm.age}</td>
                <td>{elm.hobby.toString()}</td>
                <td>
                  <button onClick={() => deletePeople(elm.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
