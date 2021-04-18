import './App.css';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { db } from './firebase_config';
import firebase from 'firebase';
import TodoListItem from './Todo';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';

function App() {

  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [priority, setPriority] = useState('');
  const handleChange = (event) => {
    setPriority(event.target.value);
  };

  useEffect(() => {
    getTodos();
  }, []); // will run only on lunch

  // Get All Todos Information From Firebase
  function getTodos() {
    db.collection("new-todos").onSnapshot(function (querySnapshot) {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          is_in_progress: doc.data().is_in_progress,
          priority: doc.data().priority,
        }))
      );
    });
  }

  // Simply add the Todo task to DB
  function addTodo(e) {
    e.preventDefault();

    db.collection("new-todos").add({
      is_in_progress: true,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      todo: todoInput,
      priority: priority,
    });
  }

  // Mark all Todos that still on progress as Done
  function markAsDone() {
    db.collection("new-todos").where("is_in_progress", "==", true)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.update({
            is_in_progress: false
          });
          console.log("Update Succesfully");
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }
  return (

    <div className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <Paper variant="outlined"
        style={{
            marginTop: "10px",
            textAlign: "center",
              padding: "50px"
        }}>
          <h1>Todo</h1>
          <form>
            <TextField
              id="standard-basic"
              label="Write a Todo Task"
              value={todoInput}
              onChange={(e) => {
                setTodoInput(e.target.value);
                console.log(todoInput);
              }}
            />
            <FormControl variant="filled" className="formControl">
              <InputLabel>Priority</InputLabel>
              <Select
                value={priority}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Normal"}>Normal</MenuItem>
                <MenuItem value={"High"}>High</MenuItem>
                <MenuItem value={"Urgent"}>Urgent</MenuItem>
              </Select>
            </FormControl>

            <Button type="submit" variant="contained" color="primary" onClick={addTodo}>
              Add
        </Button>

          </form>
          <Button style={{ marginTop: "20px" }} variant="contained" color="secondary" id={"donebtn"} onClick={markAsDone}>
            check everything, I need a beer
      </Button>
          <div
            style={{ width: "45vw", marginTop: "25px" }}>
            {todos.map((todo) => (
              <>
                <Paper variant="outlined" style={{ marginTop: "10px" }}>
                  <TodoListItem
                    todo={todo.todo}
                    is_in_progress={todo.is_in_progress}
                    id={todo.id}
                    priority={todo.priority}
                  />
                </Paper>
              </>
            ))}
          </div>
        </Paper>

    </div>
  );
}

export default App;
