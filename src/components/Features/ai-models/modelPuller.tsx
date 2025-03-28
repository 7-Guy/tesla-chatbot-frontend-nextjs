'use client';

import {use, useState} from "react";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {ModelsContext} from "@/store/models-context";

export default function ModelPuller() {
    const [open, setOpen] = useState(false);
    const [pulling, setPulling] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [requestedModel, setRequestedModel] = useState("");
    const {pullNewModel} = use(ModelsContext);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePullModel = async (modelName: string) => {
        setPulling(true);
        pullNewModel(modelName).then(response => {
            setPulling(false);
            alert(response.message);
        }).finally(() => handleClose());
    }

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Pull another model
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle id="responsive-dialog-title">
                    Pull a new Ollama model
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter a model name to pull a new model from Ollama. The model will be downloaded and added to
                        the list of available models.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        onChange={(e) => setRequestedModel(e.target.value)}
                        margin="dense"
                        id="model_name"
                        name="model_name"
                        label="Model name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />

                    <Button type="submit" disabled={pulling} onClick={() => handlePullModel(requestedModel)}>
                        {pulling ? "Pulling..." : "Pull"}
                    </Button>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}