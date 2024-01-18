import { useEffect, useState } from 'react';
import Todo from './Todo';
import './App.css';
import { db } from './firebase';
import firebase from 'firebase/compat/app';
import {Button, Modal,Typography,Box, FormControl, Input, InputLabel} from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function App() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalInput, setModalInput] = useState({ id: '', todo: '' });
  
    useEffect(() => {
      db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
        setTodos(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data().todo })))
      })
    }, []);
  
    const addTodo = (event) => {
      event.preventDefault();
      db.collection('todos').add({
        todo: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      setInput('');
    }
  
    const handleOpenModal = (todo) => {
      setModalInput({ id: todo.id, todo: todo.todo });
      setModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setModalOpen(false);
    };
  
    const updateTodo = () => {
      db.collection('todos').doc(modalInput.id).set({
        todo: modalInput.todo
      }, { merge: true })
      setModalOpen(false);
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
            <Todo
              key={todo.id}
              text={todo}
              handleOpenModal={() => handleOpenModal(todo)}
            />
          ))}
        </ul>
  
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Task
            </Typography>
            <input
              placeholder={modalInput.todo}
              value={modalInput.todo}
              onChange={event => setModalInput({ ...modalInput, todo: event.target.value })}
            />
            <button type='submit' onClick={updateTodo}>Update Task</button>
          </Box>
        </Modal>
      </div>
    );
  }
  
  export default App;