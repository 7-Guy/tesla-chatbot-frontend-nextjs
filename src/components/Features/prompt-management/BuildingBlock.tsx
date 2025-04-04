import {Button, TextField} from "@mui/material";
import {PromptBuildingBlock} from "@/entities/PromptBuildingBlock";
import styles from "./styles.module.css"
import React from "react";

export default function BuildingBlock({block, index, updateBuildingBlock}: {
    block: PromptBuildingBlock;
    index: number,
    updateBuildingBlock: (updatedBuildingBlock: PromptBuildingBlock) => void
}) {
    function handlePersonButtonClick() {
        if (block.personActive) {
            const updatedBlock: PromptBuildingBlock = {...block, personActive: false};
            updateBuildingBlock(updatedBlock);
        } else {
            const updatedBlock: PromptBuildingBlock = {personActive: true, userQuestionActive: false, promptText: ""};
            updateBuildingBlock(updatedBlock);
        }
    }

    function handleQuestionButtonClick() {
        if (block.userQuestionActive) {
            const updatedBlock: PromptBuildingBlock = {...block, userQuestionActive: false};
            updateBuildingBlock(updatedBlock);
        } else {
            const updatedBlock: PromptBuildingBlock = {personActive: false, userQuestionActive: true, promptText: ""};
            updateBuildingBlock(updatedBlock);
        }
    }

    function handlePromptTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const updatedBlock: PromptBuildingBlock = {...block, promptText: event.target.value};
        updateBuildingBlock(updatedBlock);
    }

    return (
        <div className={styles.buildingBlock}>
            <Button id={`${index}-building-block-person-button`}
                    variant={`${block.personActive ? "contained" : "outlined"}`}
                    onClick={handlePersonButtonClick}
                    sx={{width: "100%"}}
            >Person</Button>
            <Button id={`${index}-building-block-question-button`}
                    variant={`${block.userQuestionActive ? "contained" : "outlined"}`}
                    onClick={handleQuestionButtonClick}
                    sx={{width: "100%"}}>
                User question
            </Button>

            <TextField id={`${index}-building-block-prompt-input`}
                       placeholder={`Prompt text part`}
                       variant="outlined"
                       value={block.promptText}
                       multiline={true}
                       disabled={block.userQuestionActive || block.personActive}
                       sx={{width: "100%"}}
                       onChange={handlePromptTextChange}/>
        </div>
    );
};