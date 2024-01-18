import React, { useState } from 'react'
import './Todo.css';
import { List, Avatar, ListItemAvatar,ListItem, ListItemText, Button, Modal } from '@mui/material';
import { db } from './firebase';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';



function Todo(props) {
  const [open,setOpen] = useState(false);
  const [input,setInput] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const updateTodo = () => {
    db.collection('todos').doc(props.text.id).set({
      todo: input
    },{merge: true})
    setOpen(false);
  }
  
  return (
    <>
      <Modal
        open={open}
        onClose={e => setOpen(false)}
      > 
        <div>
          <h1>Edit ToDo</h1>
          <input placeholder={props.text.todo} value={input} onChange={event => setInput(event.target.value)}/>
          <button onClick={updateTodo}>Update Todo</button>
          
        </div> 
      </Modal>
    
      <List className='todo__list'>
          <ListItem>
              <ListItemText primary={props.text.todo}/>
          </ListItem>
          <EditIcon onClick={e => setOpen(true)}/>
          <DeleteIcon onClick={event => db.collection('todos').doc(props.text.id).delete()} />
      </List>

    </>

  )
}

export default Todo