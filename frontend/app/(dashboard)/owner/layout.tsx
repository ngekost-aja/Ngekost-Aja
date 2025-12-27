import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import OwnerNavigation from "./components/OwnerNavigation";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Owner Dashboard | Ngekost Aja",
	description: "Owner dashboard untuk mengelola properti kos di Ngekost Aja",
};

export default function OwnerLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="id">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<OwnerNavigation>{children}</OwnerNavigation>
			</body>
		</html>
	);
}
