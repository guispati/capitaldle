import Providers from '@/utils/provider';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';

export const font = Nunito({
	subsets: ["latin"],
});

export const metadata: Metadata = {
  	title: 'Capitaldle',
}

export default function RootLayout({
  	children,
}: {
  	children: React.ReactNode
}) {
	return (
		<html lang="pt-br">
			<body className={font.className}>
				<Providers>
					{children}
				</Providers>
			</body>
		</html>
	)
}
