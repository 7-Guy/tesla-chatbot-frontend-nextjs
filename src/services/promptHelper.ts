import {PromptBuildingBlock} from "@/entities/PromptBuildingBlock";

export function getCompletePrompt(promptBuildingBlocks: PromptBuildingBlock[], question: string, person: string) {
    return promptBuildingBlocks.map((block) => getPromptTextPart(block, question, person)).join("");
}

function getPromptTextPart(block: PromptBuildingBlock, question: string, person: string) {
    return block.userQuestionActive ? question
        : block.personActive ? person
            : block.promptText;
}