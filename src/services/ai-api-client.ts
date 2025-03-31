import {AiModel, PullModelResponse} from "@/entities/AiModel";
import {Question} from "@/entities/Question";
import {Answer} from "@/entities/Answer";
import {Discussion} from "@/entities/Discussions";

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

export async function fetchResponse(question: Question, model: AiModel): Promise<string> {
    const prompt: string = "Act as if you were Nikola Tesla."
        + question.text + "?"
        + "Talk as Nikola Tesla."

    const requestBody = {
        model: model.name,
        prompt: prompt,
        stream: false
    };

    try {
        const response = await fetch(`${BASE_URL}/api/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });
        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

interface Message {
    role: string;
    content: string;
}

function getChatHistoryForRequest(questions: Question[], answers: Answer[]) {
    const messages: Message[] = [];
    questions.forEach((question, index) => {
        messages.push({role: "user", content: question.text});
        if (answers[index]) {
            messages.push({role: "assistant", content: answers[index].text});
        }
    });
    return messages;
}

function addNextQuestionToMessages(messages: Message[], nextQuestion: Question) {
    messages.push({role: "user", content: nextQuestion.text});
}

export async function fetchNextResponse(
    previousQuestions: Question[],
    previousAnswers: Answer[],
    nextQuestion: Question,
    model: string): Promise<string> {

    const messages: Message[] = getChatHistoryForRequest(previousQuestions, previousAnswers);
    addNextQuestionToMessages(messages, nextQuestion);

    const requestBody = {
        model: model,
        messages: messages,
        stream: false
    };

    try {
        const response = await fetch(`${BASE_URL}/api/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });
        const data = await response.json();
        return data.message.content;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export async function findTopic(discussion: Discussion): Promise<string> {
    const prompt: string = "What is the topic of the following question?"
        + "Summarize the question in one or two words."
        + "You're answer should only consist of the topic and nothing else."
        + "Question: "
        + discussion.questions[0].text


    const requestBody = {
        model: discussion.aiModel.name,
        prompt: prompt,
        stream: false
    };

    try {
        const response = await fetch(`${BASE_URL}/api/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });
        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}