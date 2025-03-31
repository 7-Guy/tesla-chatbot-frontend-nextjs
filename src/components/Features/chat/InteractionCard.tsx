import {Card} from "@mui/material";
import {useTheme} from "@mui/material/styles";

export const InteractionCard = ({text, isQuestion}: { text: string; isQuestion: boolean }) => {
    const theme = useTheme();

    return (
        <Card sx={{
            minWidth: "75%",
            maxWidth: '90%',
            marginLeft: isQuestion ? 'auto' : '0',
            marginRight: isQuestion ? '0' : 'auto',
            padding: 1,
            backgroundColor: isQuestion ? `${theme.palette.success.light}` : `${theme.palette.grey["500"]}`,
            color: 'white'
        }}>
            <p style={{whiteSpace: 'pre-wrap'}}>{text}</p>
        </Card>
    );
};