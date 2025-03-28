'use client'

import {FormControlLabel, List, ListItem, ListItemText, Radio, RadioGroup} from "@mui/material";
import {ModelsContext} from "@/store/models-context";
import React, {use} from "react";

export default function ModelList() {
    const {models, setSelectedModel, selectedModel} = use(ModelsContext);

    const handleModelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSelectedModel = models.find(model => model.name === event.target.value);
        if (newSelectedModel) {
            setSelectedModel(newSelectedModel);
        }
    };

    return (
        <>
            <RadioGroup value={selectedModel?.name || ''} onChange={handleModelChange}>
                <List>
                    {models.map((model, index) => (
                        <ListItem key={index}>
                            <FormControlLabel
                                value={model.name}
                                control={<Radio/>}
                                label={<ListItemText primary={model.name}
                                                     secondary={`parameter size: ${model.parameter_size}`}/>}
                            />
                        </ListItem>
                    ))}
                </List>
            </RadioGroup>
        </>
    )
}