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

export interface Discussion {
    questions: Question[];
    answers: Answer[];
    aiModel: AiModel;
}

export function newDiscussion(aiModel: AiModel): Discussion {
    return {
        questions: [],
        answers: [],
        aiModel: aiModel
    }
}