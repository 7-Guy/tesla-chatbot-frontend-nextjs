'use client'

import {InteractionCard} from "@/components/Features/chat/InteractionCard";
import styles from './styles.module.css'
import {Button, Skeleton, Stack, TextField} from "@mui/material";
import React, {use, useState} from "react";
import {DiscussionContext} from "@/store/discussion-context";

export default function DiscussionViewer() {
    const {discussion, finishDiscussion, askQuestion} = use(DiscussionContext);

    function handleQuestionChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setNextQuestion(event.target.value);
    }

    const [nextQuestion, setNextQuestion] = useState("");
    const handleSubmit = () => {
        console.log("next Question: " + nextQuestion);
        askQuestion(nextQuestion);
        setNextQuestion("");
    };

    function handleFinishDiscussion() {
        finishDiscussion();
    }

    return (
        <>
            <div className={styles.discussion}>
                {discussion && (
                    <>
                        {discussion.questions.length > 0 && discussion.questions.map((question, i) => (
                            <div key={i} className={styles.discussion}>
                                <InteractionCard text={question.text} isQuestion={true}/>
                                {discussion.answers[i] ? (
                                    <InteractionCard text={discussion.answers[i].text} isQuestion={false}/>
                                ) : (
                                    <Skeleton variant="rectangular" width={'80%'} height={30}/>
                                )}
                            </div>
                        ))}
                    </>
                )}

                <TextField id="outlined-textarea"
                           placeholder="Ask a question"
                           multiline
                           onChange={handleQuestionChange}
                           value={nextQuestion}
                />
                <Stack direction="row" spacing={2} sx={{justifyContent: 'space-between'}}>
                    <Button variant="outlined" color="error" onClick={handleFinishDiscussion}>
                        Finish discussion
                    </Button>
                    <Button onClick={handleSubmit}
                            variant="outlined">
                        Add question
                    </Button>
                </Stack>
            </div>
        </>
    );
}