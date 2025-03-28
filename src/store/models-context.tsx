'use client'

import React, {createContext, useEffect, useState} from "react";
import {AiModel} from "@/entities/AiModel";
import {fetchExistingModels, pullNewModel} from "@/services/ai-api-client";

type ModelsContextType = {
    models: AiModel[],
    pullNewModel: (modelName: string) => Promise<{ message: string }>,
}

export const ModelsContext = createContext<ModelsContextType>({
    models: [],
    pullNewModel: () => {
        return Promise.resolve({message: ""})
    },
});

export default function ModelsContextProvider({children}: { children: React.ReactNode }) {
    const [modelsState, setModelsState] = useState({models: [] as AiModel[]});
    const [fetchNeeded, setFetchNeeded] = useState(false);

    function handleSetModels(models: AiModel[]) {
        setModelsState({models});
    }

    function isInvalidText(text: string) {
        return !text || text.trim() === '';
    }

    async function handlePullNewModel(modelName: string) {
        if (!modelName) {
            return {message: "Name is required."};
        }

        if (
            isInvalidText(modelName)
        ) {
            return {
                message: 'Name cannot be empty.',
            };
        }
        const response = await pullNewModel(modelName);
        setFetchNeeded(true);
        return response.success ? {message: `Pulled Model ${modelName}`} : {message: response.error};
    }

    useEffect(() => {
        fetchExistingModels()
            .then(models => {
                handleSetModels(models)
            });
        setFetchNeeded(false);
    }, [fetchNeeded]);

    const ctxValue = {
        models: modelsState.models,
        pullNewModel: handlePullNewModel,
    }

    return (
        <ModelsContext value={ctxValue}>
            {children}
        </ModelsContext>
    );
}