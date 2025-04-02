import {Question} from "@/entities/Question";
import {Answer} from "@/entities/Answer";
import {AiModel} from "@/entities/AiModel";

export type DiscussionHistoryElement = {
    discussion: Discussion,
    discussionMetadata: DiscussionMetadata
}

export type DiscussionMetadata = {
    numberOfQuestions: number;
    numberOfAnswers: number;
    topic: string;
}

export type Discussion = {
    id: string;
    questions: Question[];
    answers: Answer[];
    aiModel: AiModel;
}

export function newDiscussion(aiModel: AiModel): Discussion {
    return {
        id: crypto.randomUUID(),
        questions: [],
        answers: [],
        aiModel: aiModel
    }
}