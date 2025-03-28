import type {Metadata} from "next";
import "./globals.css";
import React from "react";
import MainNavigation from "@/components/header/mainNavigation";
import {Footer} from "@/components/footer/footer";
import "./styles.modules.css"

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
        <div className="mainContent">
            {children}
        </div>
        <div className="footerContent">
            <Footer/>
        </div>
        </body>
        </html>
    );
}
