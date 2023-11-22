"use client";

import { api } from "@/lib/axios";
import { Country } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import ReactSelect from "react-select";
import Flag from 'react-world-flags';

export default function Home() {
    async function getCountries(): Promise<Country[]> {
        const { data } = await api.get("/countries");
        return data?.countries || [];
    }

    const { data: countries } = useQuery({
        queryKey: ['countries'],
        queryFn: () => getCountries(),
    });

	return (
		<>
            <ReactSelect />
			{countries?.map((country) => (
                <Flag code={country.id} height={24} />
            ))}
		</>
	)
}
