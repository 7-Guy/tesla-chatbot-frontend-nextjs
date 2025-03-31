'use client';

import DiscussionViewer from "@/components/Features/chat/DiscussionViewer";
import {DiscussionContext} from "@/store/discussion-context";
import {use} from "react";
import {Button} from "@mui/material";

export default function ChatViewer() {
    const {discussion, activateDiscussion} = use(DiscussionContext);

    function handleActivateDiscussion() {
        const exhibit = {
            name: "Geography",
            description: "Geography is the study of places and the relationships between people and their environments.",
            imageUrl: 'https://www.google.com/imgres?q=geography&imgurl=https%3A%2F%2Ffarm5.static.flickr.com%2F4102%2F4925267732_8b4a2cf887.jpg&imgrefurl=https%3A%2F%2Flibguides.humboldt.edu%2Fopenedu%2Fgeog&docid=VsuocsUyHw0lhM&tbnid=ZhBOzriB7OB9vM&vet=12ahUKEwisjZK_9qyMAxX0ReUKHbK2CnMQM3oECGIQAA..i&w=500&h=320&hcb=2&ved=2ahUKEwisjZK_9qyMAxX0ReUKHbK2CnMQM3oECGIQAA'
        }
        activateDiscussion(exhibit);
    }

    return (
        <>
            {discussion
                ? (
                    <DiscussionViewer></DiscussionViewer>
                )
                : (
                    <Button variant="outlined"
                            onClick={handleActivateDiscussion}>
                        Activate Discussion
                    </Button>
                )}
        </>

    )
}