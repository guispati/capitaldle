"use client";

import { api } from '@/lib/axios';
import { Country } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useCallback, useState } from 'react';
import ReactSelect from 'react-select';
import Flag from 'react-world-flags';

export interface SelectFields {
    value: string;
    label: string;
}

export default function Classic() {
    const [randomItem, setRandomItem] = useState<Country>();
    const [countries, setCountries] = useState<Country[]>([]);
    const [selectedOption, setSelectedOption] = useState<SelectFields | null>(null);
    const [lifes, setLifes] = useState(3);

    async function getCountries(): Promise<Country[]> {
        const { data } = await api.get("/countries");
        return data?.countries || [];
    }

    const { data: allCountries } = useQuery({
        queryKey: ['countries'],
        queryFn: () => getCountries()
    });

    const allCountriesSelect = useMemo(() => {
        return allCountries?.map(country => ({
            label: country.capital || '',
            value: country.id || ''
        }));
    }, [allCountries]);

    const getRandomItem = useCallback((countries: Country[]) => {
        if (countries.length > 0) {
            const randomIndex = Math.floor(Math.random() * countries.length);
            const selectedCountry = countries[randomIndex];

            setRandomItem(selectedCountry);

            const updatedCountries = [...countries];
            updatedCountries.splice(randomIndex, 1);

            setCountries(updatedCountries);
        }
    }, []);

    useEffect(() => {
        if (allCountries?.length) {
            getRandomItem(allCountries);
        }
    }, [allCountries, getRandomItem]);

    function checkCapital(option: SelectFields | null) {
        if (option?.value !== randomItem?.id) {
            setLifes(prevValue => prevValue - 1);
        }
        getRandomItem(countries);

        setSelectedOption(null);
    }

	return (
		<>
            {lifes > 0 ? (
                <div>
                    <Flag code={randomItem?.id} height={300} width={300} />
                    <h1>{randomItem?.name}</h1>
                    <h2>Vidas: {lifes}</h2>
        
                    <ReactSelect options={allCountriesSelect} onChange={checkCapital} value={selectedOption} />
                </div>
            ) : (
                <h1>Perdeu otário</h1>
            )}
		</>
	)
}