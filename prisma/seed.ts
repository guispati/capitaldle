import { PrismaClient, Country } from '@prisma/client'
import axios from 'axios';
const prisma = new PrismaClient()

async function main() {
    await prisma.country.deleteMany();

    const countriesApi = await axios.get('http://servicodados.ibge.gov.br/api/v1/paises/*');
    const countries = countriesApi.data;

    const uniqueCountryIds = new Set(); // Use a Set to store unique country IDs

    const countriesSeed = countries.flatMap((country: any) => {
        const countryId = country.id['ISO-3166-1-ALPHA-2'];

        // Check if the country ID is already added to the Set
        if (!uniqueCountryIds.has(countryId)) {
            uniqueCountryIds.add(countryId); // Add the country ID to the Set

            return prisma.country.create({
                data: {
                    id: countryId,
                    name: country.nome['abreviado'],
                    capital: country.governo.capital.nome,
                },
            });
        }

        return null; // Return null for duplicate countries to filter them out
    });

    await prisma.$transaction(countriesSeed.filter((country: Country) => country !== null));
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })