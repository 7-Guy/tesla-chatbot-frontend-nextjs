import type {Metadata} from "next";
import "./globals.css";
import React from "react";
import "./styles.modules.css"
import {ThemedContent} from "@/app/themedContent";

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
        <ThemedContent>
            {children}
        </ThemedContent>
        </body>
        </html>
    );
}
