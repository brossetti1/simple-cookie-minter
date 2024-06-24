import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import { cookieToInitialState } from "wagmi";

import "./globals.css";
import { Providers } from "./providers";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { wagmiConfig } from "@/config/wagmi";
import { headers } from "next/headers";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "Create CookieJar App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const initialState = cookieToInitialState(
		wagmiConfig,
		headers().get("cookie"),
	);
	return (
		<html lang="en">
			<body
				className={cn(
					"min-h-screen bg-amber-100 font-sans text-foreground antialiased",
					fontSans.variable,
				)}
			>
				{/* ts-ignore */}
				<Providers initialState={initialState}>
					<div className="relative flex min-h-screen flex-col">
						<Header />
						<main className="flex-1">{children}</main>
						<Footer />
					</div>
				</Providers>
				<Toaster />
			</body>
		</html>
	);
}
