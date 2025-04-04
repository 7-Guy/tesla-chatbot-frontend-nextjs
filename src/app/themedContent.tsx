'use client'

import {ThemeProvider} from "@mui/material";
import {appTheme} from "@/app/theme";
import MainNavigation from "@/components/header/mainNavigation";
import ModelsContextProvider from "@/store/models-context";
import {Footer} from "@/components/footer/footer";
import React, {ReactNode} from "react";
import DiscussionContextProvider from "@/store/discussion-context";
import PromptsContextProvider from "@/store/prompts-context";

export function ThemedContent({children}: { children: ReactNode }) {
    return (
        <ThemeProvider theme={appTheme}>
            <div className="mainNavigation">
                <MainNavigation/>
            </div>
            <ModelsContextProvider>
                <PromptsContextProvider>
                    <DiscussionContextProvider>
                        <div className="mainContent">
                            {children}
                        </div>
                    </DiscussionContextProvider>
                </PromptsContextProvider>
            </ModelsContextProvider>
            <div className="footerContent">
                <Footer/>
            </div>
        </ThemeProvider>
    )
}