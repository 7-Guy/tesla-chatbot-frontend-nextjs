'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function MainNavigation() {
    const pathname = usePathname();
    const [value, setValue] = React.useState(pathname);

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center"
            }}>
            <Tabs
                className="main-navigation"
                value={value}
                onChange={handleChange}
                aria-label="nav tabs example"
                role="navigation"
            >
                <Tab label="Chat" component={Link} href="/" value="/"/>
                <Tab label="History" component={Link} href="/history" value="/history"/>
                <Tab label="AI Models" component={Link} href="/ai-models" value="/ai-models"/>
                <Tab label="Prompt Management" component={Link} href="/prompt-management"
                     value="/prompt-management"/>
                <Tab label="Exhibit Management" component={Link} href="/exhibit-management"
                     value="/exhibit-management"/>
            </Tabs>
        </Box>
    );
}
