import {AiModel} from "@/entities/AiModel";
import {Discussion, DiscussionHistoryElement} from "@/entities/Discussions";
import {PromptBuildingBlock} from "@/entities/PromptBuildingBlock";

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

export type PromptsContextType = {
    promptBuildingBlocks: PromptBuildingBlock[],
    addPromptBuildingBlockAfterIndex: (index: number) => void,
    removePromptBuildingBlock: (index: number) => void,
    updateBuildingBlock: (updatedBuildingBlock: PromptBuildingBlock, index: number) => void,
}