import { useEffect, useState } from 'react';
import Todo from './Todo';
import {Button, FormControl, Input, InputLabel } from '@mui/material';
import './App.css';
import { db } from './firebase';
import firebase from 'firebase/compat/app';


function App() {
  const [todos,setTodos] = useState([]);
  const [input,setInput] = useState('');
  useEffect(()=>{
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
    setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
  })
},[]);

  const addTodo = (event) => {
    event.preventDefault();
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('');
  }
  return (
    <div className="App">
      <h1>ToDo App</h1>
      <form>
        
        <FormControl>
          <InputLabel>Write a Task</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)}/>
        </FormControl>
        <Button disabled={!input} type="submit" variant="contained" onClick={addTodo}>Add Task</Button>
        {/* <button type="submit"onClick={addTodo}>Add ToDo</button> */}
      </form>
      <ul>
        {todos.map(todo => (
          <Todo text={todo}/>

        ))}

      </ul>
    </div>
  );
}

export default App;
