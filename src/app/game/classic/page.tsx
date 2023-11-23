"use client";

import { api } from '@/lib/axios';
import { Country } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Flag from 'react-world-flags';

export default function Classic() {
    const [randomItem, setRandomItem] = useState<Country>();
    const [countries, setCountries] = useState<Country[]>([]);

    async function getCountries(): Promise<Country[]> {
        const { data } = await api.get("/countries");
        return data?.countries || [];
    }

    const { data: allCountries = [] } = useQuery({
        queryKey: ['countries'],
        queryFn: () => getCountries()
    });

    console.log(allCountries);

    const getRandomItem = () => {
        if (countries.length > 0) {
            const randomIndex = Math.floor(Math.random() * countries.length);
            const selectedCountry = countries[randomIndex];

            setRandomItem(selectedCountry);

            const updatedCountries = [...countries];
            updatedCountries.splice(randomIndex, 1);

            setCountries(updatedCountries);
        }
    }

	return (
		<>
            <Flag code={randomItem?.id} height={24} width={24} />

            <h1>Clássico</h1>
		</>
	)
}