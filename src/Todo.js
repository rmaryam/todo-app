import React, { useState } from 'react'
import './Todo.css';
import { List, Avatar, ListItemAvatar,ListItem, ListItemText, Button, Modal,Typography,Box } from '@mui/material';
import { db } from './firebase';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Todo(props) {
    return (
      <>
        <List className='todo__list'>
          <ListItem>
            <ListItemText primary={props.text.todo} />
          </ListItem>
          <EditIcon onClick={props.handleOpenModal} />
          <DeleteIcon onClick={event => db.collection('todos').doc(props.text.id).delete()} />
        </List>
      </>
    )
  }

  export default Todo