import React, { useState } from 'react'
import './Todo.css';
import { List, Avatar, ListItemAvatar,ListItem, ListItemText, Button, Modal,Typography,Box } from '@mui/material';
import { db } from './firebase';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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
          
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Task
            </Typography>
            <input placeholder={props.text.todo} value={input} onChange={event => setInput(event.target.value)}/>
            <button type='submit' onClick={updateTodo}>Update Task</button>
          </Box>

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