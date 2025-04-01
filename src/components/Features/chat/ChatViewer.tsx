'use client';

import DiscussionViewer from "@/components/Features/chat/DiscussionViewer";
import {DiscussionContext} from "@/store/discussion-context";
import {use} from "react";
import {Button} from "@mui/material";
import {ModelsContext} from "@/store/models-context";
import Link from "next/link";
import {useTheme} from "@mui/material/styles";
import styles from './styles.module.css';

export default function ChatViewer() {
    const {discussion, activateDiscussion} = use(DiscussionContext);
    const {selectedModel} = use(ModelsContext);
    const theme = useTheme();

    function handleActivateDiscussion() {
        if (!selectedModel) {
            alert("cannot activate a discussion without a model selected");
            return;
        }
        activateDiscussion(selectedModel);
    }

    function ActivateDiscussionButton() {
        return (selectedModel
                ? (
                    <div className={styles.chatContainer}>
                        <Button id="activate-discussion-button"
                                variant="outlined"
                                onClick={handleActivateDiscussion}>
                            Activate Discussion
                        </Button>
                    </div>
                )
                : (
                    <div className={styles.chatContainer}>
                        <p id="select-model-error-text"
                           color={`${theme.palette.error}`}>Select an AI Model first before starting a
                            discussion</p>
                        <Button id="select-model-button"
                                variant="outlined"
                                component={Link}
                                href="/ai-models">
                            Select AI Model
                        </Button>
                    </div>
                )
        )
    }

    return (
        <div>
            {discussion
                ? <DiscussionViewer></DiscussionViewer>
                : <ActivateDiscussionButton/>

            }
        </div>

    )
}