import { ListItem } from '@material-ui/core';
import React from 'react';
import { ListItemText, Button } from "@material-ui/core";
import { db } from "./firebase_config";
import Tooltip from '@material-ui/core/Tooltip';
import './App.css';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

export default function TodoListItem({ todo, is_in_progress, id, priority }) {

    // Toggle the Progress (Done or Not Done yet)
    function toggleInProgress() {
        db.collection("new-todos").doc(id).update({
            is_in_progress: !is_in_progress,
        });
    }

    // Delete the Todo 
    function deleteTodo() {
        db.collection("new-todos").doc(id).delete();
    }

    return (
        <>
            <div
                style={{
                    display: "flex",
                    textDecoration: is_in_progress ? 'none' : 'line-through', // If is marked as Done, make a line-through the text
                }}
            >
                <ListItem>
                    <ListItemText
                        primary={todo}
                        secondary={is_in_progress ? "In Progress" : "Done."} // Change Text According to the Progress 
                    />
                    <ListItemText
                        primary={priority}
                    />
                </ListItem>
                <Tooltip title="Mark Todo as Done" placement="top">
                    <Button
                        onClick={toggleInProgress}
                        >
                        {is_in_progress ? "Done" : "UnDone"}             
                    </Button>
                </Tooltip>
                <Tooltip title="Delete Todo" placement="top">
                    <Button
                        onClick={deleteTodo}
                        style={{ color: "red" }}
                    >
                    <DeleteOutlinedIcon />
                </Button>
                </Tooltip>
            </div>
        </>
    );
}
