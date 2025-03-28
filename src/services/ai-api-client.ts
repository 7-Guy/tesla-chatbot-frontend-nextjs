import {AiModel, PullModelResponse} from "@/entities/AiModel";

const BASE_URL = process.env.NEXT_PUBLIC_AI_BACKEND_URL;

export async function pullNewModel(model: string): Promise<PullModelResponse> {
    const requestBody = {
        name: model,
        stream: false
    };

    try {
        const response = await fetch(`${BASE_URL}/api/pull`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });
        const responseData = await response.json();

        if (!response.ok) {
            return {success: false, error: responseData.error, modelName: model};
        }
        return {success: true, error: "", modelName: model}

    } catch {
        return {success: false, error: "Could not fetch model", modelName: model};
    }
}

export async function fetchExistingModels(): Promise<AiModel[]> {

    interface ModelData {
        model: string;
        size: number;
        parameter_size: string;
    }

    function ModelDataToAiModel(modelData: ModelData): AiModel {
        return {
            name: modelData.model,
            size: modelData.size,
            parameter_size: modelData.parameter_size
        };
    }

    return fetch(`${BASE_URL}/api/tags`)
        .then((response) => response.json())
        .then((data: { models: ModelData[] }) => {
            return data.models.map((m) => (
                ModelDataToAiModel(m)
            ));
        })
        .catch((error) => {
            console.log('Could not fetch models from Ollama: ', error)
            return [] as AiModel[];
        });
}
