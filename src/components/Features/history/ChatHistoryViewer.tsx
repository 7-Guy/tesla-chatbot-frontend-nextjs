'use client'

import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {DiscussionContext} from "@/store/discussion-context";
import {use} from "react";
import Link from "next/link";
import {Discussion} from "@/entities/Discussions";
import {ModelsContext} from "@/store/models-context";

export default function ChatHistoryViewer() {
    const {discussionHistory, reactivateDiscussion} = use(DiscussionContext);
    const {setSelectedModel} = use(ModelsContext);

    function handleReactivateDiscussion(discussion: Discussion) {
        setSelectedModel(discussion.aiModel);
        reactivateDiscussion(discussion);
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Topic</TableCell>
                            <TableCell align="center">Number of questions</TableCell>
                            <TableCell align="center">Number of answers</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {discussionHistory.map((historyElement, i) => (
                            <TableRow
                                key={i}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {historyElement.discussionMetadata.topic}
                                </TableCell>
                                <TableCell
                                    align="center">{historyElement.discussionMetadata.numberOfQuestions}</TableCell>
                                <TableCell
                                    align="center">{historyElement.discussionMetadata.numberOfQuestions}</TableCell>
                                <TableCell align="center">
                                    <Button component={Link} href="/"
                                            onClick={() => handleReactivateDiscussion(historyElement.discussion)}>
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