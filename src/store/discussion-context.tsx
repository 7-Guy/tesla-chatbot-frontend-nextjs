import React, {createContext, useEffect, useState} from "react";
import {DiscussionContextType} from "@/store/contextTypes";
import {Question} from "@/entities/Question";
import {fetchNextResponse, fetchResponse, findTopic} from "@/services/ai-api-client";
import {AiModel} from "@/entities/AiModel";
import {Discussion, DiscussionHistoryElement, newDiscussion} from "@/entities/Discussions";

export const DiscussionContext = createContext<DiscussionContextType>({
    discussion: null,
    discussionHistory: [],
    activateDiscussion: () => {
        return {} as Discussion
    },
    finishDiscussion: () => {
    },
    askQuestion: () => {
    },
    reactivateDiscussion: () => {
    }
});

export default function DiscussionContextProvider({children}: { children: React.ReactNode }) {
    type questionRequestType = {
        question: Question, model: AiModel, isInitialQuestion: boolean,
        previousQuestions: Question[],
        previousAnswers: Question[]
    };

    const [discussion, setDiscussion] = useState<Discussion | null>(null);
    const [discussionHistory, setDiscussionHistory] = useState<DiscussionHistoryElement[]>([]);
    const [questionRequest, setQuestionRequest] = useState<questionRequestType | null>(null);

    function handleActivateDiscussion(model: AiModel) {
        const discussion = newDiscussion(model);
        setDiscussion(discussion);
        return discussion;
    }

    function handleAskQuestion(question: string) {
        if (discussion) {
            const isInitialQuestion = discussion.questions.length === 0;
            const newQuestion: Question = {text: question};
            setDiscussion({
                ...discussion,
                questions: [...discussion.questions, newQuestion]
            });
            setQuestionRequest({
                question: newQuestion,
                model: discussion.aiModel,
                isInitialQuestion,
                previousQuestions: discussion.questions,
                previousAnswers: discussion.answers
            });
        }
    }

    function handleFinishDiscussion() {
        if (discussion && discussion.questions && discussion.questions.length > 0) {
            findTopic(discussion)
                .then(topic => {
                    const discussionHistoryElement: DiscussionHistoryElement = {
                        discussion: discussion,
                        discussionMetadata: {
                            numberOfQuestions: discussion.questions.length,
                            numberOfAnswers: discussion.answers.length,
                            topic: topic
                        }
                    };
                    setDiscussionHistory((prevHistory) => {
                        const filteredHistory = prevHistory.filter(element => element.discussion.id !== discussion.id);
                        return [...filteredHistory, discussionHistoryElement];
                    });
                    setDiscussion(null);
                })
        }
        setDiscussion(null);
    }

    useEffect(() => {
        function getResponse(questionRequest: questionRequestType) {
            if (questionRequest.isInitialQuestion) {
                return fetchResponse(questionRequest.question, questionRequest.model);
            }
            return fetchNextResponse(questionRequest.previousQuestions, questionRequest.previousAnswers, questionRequest.question, questionRequest.model.name);
        }

        if (questionRequest && discussion) {
            getResponse(questionRequest)
                .then(response => {
                    setQuestionRequest(null);
                    const newAnswer = {text: response};
                    setDiscussion({
                        ...discussion,
                        answers: [...discussion.answers, newAnswer]
                    });
                });
        }
    }, [discussion, questionRequest]);

    function handleReactivateDiscussion(discussion: Discussion) {
        if (questionRequest) {
            alert("Cannot reactivate discussion if there is a question waiting for a response");
            return;
        }
        setDiscussion(discussion);
    }


    const discussionContext: DiscussionContextType = {
        discussion: discussion,
        discussionHistory: discussionHistory,
        activateDiscussion: handleActivateDiscussion,
        finishDiscussion: handleFinishDiscussion,
        askQuestion: handleAskQuestion,
        reactivateDiscussion: handleReactivateDiscussion
    }

    return (
        <DiscussionContext value={discussionContext}>
            {children}
        </DiscussionContext>
    )
}
