import React, {createContext, useEffect, useState} from "react";
import {Discussion, newDiscussion} from "@/entities/Discussion";
import {DiscussionContextType} from "@/store/contextTypes";
import {Exhibit} from "@/entities/Exhibit";
import {Question} from "@/entities/Question";
import {fetchNextResponse, fetchResponse} from "@/services/ai-api-client";
import {AiModel} from "@/entities/AiModel";

export const DiscussionContext = createContext<DiscussionContextType>({
    discussion: null,
    discussionHistory: [],
    activateDiscussion: () => {
        return {} as Discussion
    },
    finishDiscussion: () => {
    },
    askQuestion: () => {
    }
});

export default function DiscussionContextProvider({children}: { children: React.ReactNode }) {
    type questionRequestType = {
        question: Question, model: AiModel, isInitialQuestion: boolean,
        previousQuestions: Question[],
        previousAnswers: Question[]
    };

    const [discussion, setDiscussion] = useState<Discussion | null>(null);
    const [discussionHistory, setDiscussionHistory] = useState<Discussion[]>([]);
    const [questionRequest, setQuestionRequest] = useState<questionRequestType | null>(null);

    function handleActivateDiscussion(exhibit: Exhibit) {
        const discussion = newDiscussion(exhibit);
        setDiscussion(discussion);
        return discussion;
    }

    function handleAskQuestion(question: string, model: AiModel) {
        if (discussion) {
            const isInitialQuestion = discussion.questions.length === 0;
            const newQuestion: Question = {text: question};
            setDiscussion({
                ...discussion,
                questions: [...discussion.questions, newQuestion]
            });
            setQuestionRequest({
                question: newQuestion,
                model: model,
                isInitialQuestion,
                previousQuestions: discussion.questions,
                previousAnswers: discussion.answers
            });
        }
    }

    function handleFinishDiscussion() {
        if (discussion) {
            setDiscussionHistory((prevHistory) => [...prevHistory, discussion]);
            setDiscussion(null);
        }
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

    const discussionContext: DiscussionContextType = {
        discussion: discussion,
        discussionHistory: discussionHistory,
        activateDiscussion: handleActivateDiscussion,
        finishDiscussion: handleFinishDiscussion,
        askQuestion: handleAskQuestion,
    }

    return (
        <DiscussionContext value={discussionContext}>
            {children}
        </DiscussionContext>
    )
}
