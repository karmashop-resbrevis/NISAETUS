import { Assistant } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/Theme/ThemeProvider";
import HomeWrapper from "@/components/Wrapper/HomeWrapper";
import InterLang from "@/lib/Lang";

const assistantFont = Assistant({
	variable: "--font-assistant",
	subsets: ["latin"],
	weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const BRAND = process.env.NEXT_PUBLIC_NAMA_BRAND;

export const metadata = {
	title: `${BRAND} | Premium Fashion & Accessories`,
	description: `${BRAND} offers a curated collection of high-quality fashion, leather goods, and accessories. Shop the latest in luxury apparel and elevate your style.`,
	keywords: ['fashion', 'luxury', 'leather jackets', 'premium accessories', 'online shop', 'trendy apparel', 'premium fashion', 'nisaetus shop', 'nisaetusshop', 'nt', 'nisaetus'],
	openGraph: {
		siteName: BRAND,
		title: `${BRAND} | Premium Fashion & Accessories`,
		description: `Discover top-tier fashion and accessories at ${BRAND}. Our curated collection features luxury leather jackets, trendy apparel, and more.`,
		url: 'https://nisaetus.vercel.app',
		type: 'website',
		images: [
			{
				url: '/karmamix.png',
				width: 1200,
				height: 630,
				alt: `${BRAND} Featured Product`,
			},
			{
				url: '/karmamix.png',
				width: 800,
				height: 800,
				alt: `${BRAND} Featured Product`,
			},
			{
				url: '/karmamix.png',
				width: 800,
				height: 800,
				alt: `${BRAND} Logo`,
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: `${BRAND} | Premium Fashion & Accessories`,
		description: `Explore luxury fashion and accessories at ${BRAND}. Featuring high-end apparel and more.`,
		images: '/karmamix.png',
	},
	/*facebook: {
		appId: 'your-facebook-app-id',
	},*/
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${assistantFont.variable} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
				>
					<InterLang>
						<main>
							<HomeWrapper>
								{children}
							</HomeWrapper>
						</main>
					</InterLang>
				</ThemeProvider>
			</body>
		</html>
	);
}