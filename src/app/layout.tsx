import type {Metadata} from "next";
import "./globals.css";
import React from "react";
import MainNavigation from "@/components/header/mainNavigation";
import {Footer} from "@/components/footer/footer";
import "./styles.modules.css"
import ModelsContextProvider from "@/store/models-context";

export const metadata: Metadata = {
    title: "Nikola Tesla Chatbot",
    description: "A chatbot that simulates a conversation with Nikola Tesla"
};

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className="rootLayout">
        <div className="mainNavigation">
            <MainNavigation/>
        </div>
        <ModelsContextProvider>
            <div className="mainContent">
                {children}
            </div>
        </ModelsContextProvider>
        <div className="footerContent">
            <Footer/>
        </div>
        </body>
        </html>
    );
}
