'use client'

import {Button, Card, CardActions, CardContent, IconButton, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import BuildingBlock from "@/components/Features/prompt-management/BuildingBlock";
import {AddCircleOutlined} from "@mui/icons-material";
import styles from "@/components/Features/prompt-management/styles.module.css";
import {PromptsContext} from "@/store/prompts-context";
import {use} from "react";
import {PromptBuildingBlock} from "@/entities/PromptBuildingBlock";
import {getCompletePrompt} from "@/services/promptHelper";

export default function PromptManager() {
    const exampleUserQuestion = "Tell me a joke about Thomas Edison.";
    const examplePerson = "Nikola Tesla";
    const {
        promptBuildingBlocks,
        removePromptBuildingBlock,
        updateBuildingBlock,
        addPromptBuildingBlockAfterIndex
    } = use(PromptsContext)


    function handleUpdateBuildingBlock(index: number, updatedBlock: PromptBuildingBlock) {
        updateBuildingBlock(updatedBlock, index);
    }

    function handleAddBuildingBlockAfterIndex(index: number) {
        addPromptBuildingBlockAfterIndex(index);
    }

    function handleDeleteBuildingBlock(index: number) {
        removePromptBuildingBlock(index);
    }

    const prompt = getCompletePrompt(promptBuildingBlocks, exampleUserQuestion, examplePerson)

    return (

        <div className={styles.promptManagement}>
            <Card variant="outlined" id="prompt-summary" sx={{maxWidth: "90%"}}>
                <CardContent>
                    <Typography id="example-person" variant="body2"
                                sx={{color: 'text.secondary'}}>
                        <span style={{fontWeight: "bold"}}>Example person: </span>{examplePerson}
                    </Typography>
                    <Typography id="example-user-question" variant="body2"
                                sx={{color: 'text.secondary'}}>
                        <span style={{fontWeight: "bold"}}>Example user question: </span>{exampleUserQuestion}
                    </Typography>
                    <Typography id="complete-prompt-text" variant="body2"
                                sx={{color: 'text.secondary'}}>
                        <span style={{fontWeight: "bold"}}>Complete prompt text: </span>{prompt}
                    </Typography>
                </CardContent>
            </Card>
            {promptBuildingBlocks.map((block, index) => (
                <div key={index} className={styles.buildingBlockContainer}>
                    <Card variant="outlined" id={`${index}-prompt-building-block`} sx={{minWidth: "50%"}}>
                        <CardContent>
                            <BuildingBlock block={block} index={index}
                                           updateBuildingBlock={(updatedBuildingBlock) => handleUpdateBuildingBlock(index, updatedBuildingBlock)}/>
                        </CardContent>
                        <CardActions sx={{justifyContent: 'flex-end'}}>
                            <IconButton onClick={() => handleDeleteBuildingBlock(index)}
                                        id={`${index}-delete-building-block-button`}>
                                <DeleteIcon/>
                            </IconButton>
                        </CardActions>
                    </Card>
                    <Button id={`${index}-add-button`}
                            color="success"
                            onClick={() => handleAddBuildingBlockAfterIndex(index)}>
                        <AddCircleOutlined component="svg"/>
                    </Button>
                </div>
            ))
            }
            {promptBuildingBlocks.length === 0 && (
                <Button id={`0-add-button`}
                        color="success"
                        onClick={() => handleAddBuildingBlockAfterIndex(-1)}>
                    <AddCircleOutlined component="svg"/>
                </Button>)
            }
        </div>
    )
}