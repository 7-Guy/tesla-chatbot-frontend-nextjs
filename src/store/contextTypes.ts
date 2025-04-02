import {AiModel} from "@/entities/AiModel";
import {Discussion, DiscussionHistoryElement} from "@/entities/Discussions";

export type ModelsContextType = {
    models: AiModel[],
    selectedModel: AiModel | null,
    setSelectedModel: (model: AiModel) => void,
    pullNewModel: (modelName: string) => Promise<{ message: string }>,
}

export type DiscussionContextType = {
    discussion: Discussion | null,
    discussionHistory: DiscussionHistoryElement[],
    activateDiscussion: (model: AiModel) => Discussion,
    finishDiscussion: () => void,
    askQuestion: (question: string) => void,
    reactivateDiscussion: (discussion: Discussion) => void,
}