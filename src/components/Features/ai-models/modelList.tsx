'use client'

import {List, ListItem, ListItemText} from "@mui/material";
import {ModelsContext} from "@/store/models-context";
import React, {use} from "react";

export default function ModelList() {
    const {models} = use(ModelsContext);

    return (
        <>
            <List>
                {models.map((model, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={model.name} secondary={`parameter size: ${model.parameter_size}`}/>
                    </ListItem>
                ))
                }
            </List>
        </>
    )
}