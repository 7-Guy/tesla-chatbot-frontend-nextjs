export type AiModel =
    {
        name: string;
        size: number;
        parameter_size: string;
    }

export type PullModelResponse = {
    success: boolean;
    error: string;
    modelName: string;
}