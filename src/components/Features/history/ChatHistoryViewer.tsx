'use client'

import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {DiscussionContext} from "@/store/discussion-context";
import {use} from "react";
import Link from "next/link";
import {Discussion} from "@/entities/Discussions";
import {ModelsContext} from "@/store/models-context";

export default function ChatHistoryViewer({id}: { id: string }) {
    const {discussionHistory, reactivateDiscussion} = use(DiscussionContext);
    const {setSelectedModel} = use(ModelsContext);

    function handleReactivateDiscussion(discussion: Discussion) {
        setSelectedModel(discussion.aiModel);
        reactivateDiscussion(discussion);
    }

    return (
        <>
            <TableContainer component={Paper} id={`${id}-table-container`}>
                <Table sx={{minWidth: 650}} aria-label="simple table" id={`${id}-table`}>
                    <TableHead id={`${id}-table-head`}>
                        <TableRow id={`${id}-table-head-row`}>
                            <TableCell id={`${id}-table-head-cell-topic`}>Topic</TableCell>
                            <TableCell id={`${id}-table-head-cell-model`}>Model</TableCell>
                            <TableCell align="center" id={`${id}-table-head-cell-questions`}>Number of
                                questions</TableCell>
                            <TableCell align="center" id={`${id}-table-head-cell-answers`}>Number of answers</TableCell>
                            <TableCell align="center" id={`${id}-table-head-cell-action`}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody id={`${id}-table-body`}>
                        {discussionHistory.map((historyElement, i) => (
                            <TableRow
                                key={i}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                id={`${id}-table-body-row-${i}`}
                            >
                                <TableCell component="th" scope="row" id={`${id}-table-body-cell-topic-${i}`}>
                                    {historyElement.discussionMetadata.topic}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    id={`${id}-table-body-cell-model-${i}`}>{historyElement.discussion.aiModel.name}</TableCell>
                                <TableCell
                                    align="center"
                                    id={`${id}-table-body-cell-questions-${i}`}>{historyElement.discussionMetadata.numberOfQuestions}</TableCell>
                                <TableCell
                                    align="center"
                                    id={`${id}-table-body-cell-answers-${i}`}>{historyElement.discussionMetadata.numberOfQuestions}</TableCell>
                                <TableCell align="center" id={`${id}-table-body-cell-action-${i}`}>
                                    <Button component={Link} href="/"
                                            onClick={() => handleReactivateDiscussion(historyElement.discussion)}
                                            id={`${id}-reactivate-button-${i}`}>
                                        Reactivate
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}