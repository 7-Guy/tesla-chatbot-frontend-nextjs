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

    React.useEffect(() => {
        setValue(pathname);
    }, [pathname]);

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
                <Tab id="tab-chat" label="Chat" component={Link} href="/" value="/"/>
                <Tab id="tab-history" label="History" component={Link} href="/history" value="/history"/>
                <Tab id="tab-ai-models" label="AI Models" component={Link} href="/ai-models" value="/ai-models"/>
                <Tab id="tab-prompt-management" label="Prompt Management" component={Link} href="/prompt-management"
                     value="/prompt-management"/>
                <Tab id="tab-exhibit-management" label="Exhibit Management" component={Link} href="/exhibit-management"
                     value="/exhibit-management"/>
            </Tabs>
        </Box>
    );
}
