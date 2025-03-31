import {AiModel} from "@/entities/AiModel";
import {Discussion} from "@/entities/Discussion";
import {Exhibit} from "@/entities/Exhibit";

export type ModelsContextType = {
    models: AiModel[],
    selectedModel: AiModel | null,
    setSelectedModel: (model: AiModel) => void,
    pullNewModel: (modelName: string) => Promise<{ message: string }>,
}

export type DiscussionContextType = {
    discussion: Discussion | null,
    discussionHistory: Discussion[],
    activateDiscussion: (exhibit: Exhibit) => Discussion,
    finishDiscussion: () => void,
    askQuestion: (question: string, model: AiModel) => void,
}