import ModelList from "@/components/Features/ai-models/modelList";
import ModelPuller from "@/components/Features/ai-models/modelPuller";
import {Stack} from "@mui/material";

export default function AiModelsPage() {
    return (
        <Stack
            direction="column"
            spacing={2}
            sx={{
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <ModelList/>
            <ModelPuller/>
        </Stack>
    );
}