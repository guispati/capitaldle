import Link from "next/link";

export default function Home() {
	return (
		<>
			<Link href={"/game/classic"}>
				Clássico
			</Link>
			<Link href={"/game/alternate"}>
				Alternativo
			</Link>
		</>
	)
}
