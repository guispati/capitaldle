import { api } from "@/lib/axios";
import { Country } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ReactSelect, { OptionProps, components } from "react-select";
import Flag from 'react-world-flags';
import { OptionContainer } from "./style";
import { SelectFields } from "@/app/game/classic/page";

export default function SelectCountries() {
    const id = Date.now().toString();
    const [isMounted, setIsMounted] = useState(false);

	useEffect(() => setIsMounted(true), []);

    async function getCountries(): Promise<SelectFields[]> {
        const { data } = await api.get("/countries");
        const countries: Country[] = data?.countries || [];

        const options = countries.map((country: Country) => ({
            value: country.id,
            label: country.name
        }));

        return options;
    }

    const { data: countries } = useQuery({
        queryKey: ['countries'],
        queryFn: () => getCountries(),
    });

    const Option = (props: OptionProps<SelectFields>) => {
        return (
            <OptionContainer>
                <Flag code={props.data.value} height={24} width={24} />
                <components.Option {...props} />
            </OptionContainer>
        );
    };

	return isMounted && (
        <ReactSelect id={id} components={{ Option }} options={countries} />
	)
}
