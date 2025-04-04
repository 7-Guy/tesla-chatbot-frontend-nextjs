import React, {createContext, useState} from "react";
import {PromptsContextType} from "@/store/contextTypes";
import {PromptBuildingBlock} from "@/entities/PromptBuildingBlock";

export const PromptsContext = createContext<PromptsContextType>({
    promptBuildingBlocks: [],
    addPromptBuildingBlockAfterIndex: () => {
    },
    removePromptBuildingBlock: () => {
    },
    updateBuildingBlock: () => {
    },
})

export default function PromptsContextProvider({children}: { children: React.ReactNode }) {
    const [buildingBlocks, setBuildingBlocks] = useState<PromptBuildingBlock[]>([
        {userQuestionActive: false, personActive: false, promptText: "Respond to the following question: '"},
        {userQuestionActive: true, personActive: false, promptText: ""},
        {userQuestionActive: false, personActive: false, promptText: "' Formulate your response as if you were "},
        {userQuestionActive: false, personActive: true, promptText: ""},
        {userQuestionActive: false, personActive: false, promptText: "."},
    ])

    function handleAddPromptBuildingBlock(index: number) {
        const newBlock: PromptBuildingBlock = {userQuestionActive: false, personActive: false, promptText: ""};
        const updatedBlocks = [...buildingBlocks];
        updatedBlocks.splice(index + 1, 0, newBlock);
        setBuildingBlocks(updatedBlocks);
    }

    function handleRemovePromptBuildingBlock(index: number) {
        const updatedBlocks = [...buildingBlocks];
        updatedBlocks.splice(index, 1);
        setBuildingBlocks(updatedBlocks);
    }

    function handleUpdateBuildingBlock(updatedBuildingBlock: PromptBuildingBlock, index: number) {
        const updatedBlocks = [...buildingBlocks];
        updatedBlocks[index] = updatedBuildingBlock;
        setBuildingBlocks(updatedBlocks);
    }

    const ctxValue: PromptsContextType = {
        promptBuildingBlocks: buildingBlocks,
        addPromptBuildingBlockAfterIndex: (index: number) => {
            handleAddPromptBuildingBlock(index)
        },
        removePromptBuildingBlock: (index: number) => {
            handleRemovePromptBuildingBlock(index)
        },
        updateBuildingBlock: (updatedBuildingBlock: PromptBuildingBlock, index: number) => {
            handleUpdateBuildingBlock(updatedBuildingBlock, index)
        },
    }

    return (
        <PromptsContext value={ctxValue}>
            {children}
        </PromptsContext>
    );
}

