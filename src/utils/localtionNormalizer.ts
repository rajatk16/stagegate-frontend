import countries from 'world-countries';

type LocationResult = string | null;

const countryLookup = new Map<string, string>();
for (const country of countries) {
  const name = country.name.common;

  countryLookup.set(name.toLowerCase(), name);

  for (const alt of country.altSpellings) {
    countryLookup.set(alt.toLowerCase(), name);
  }

  countryLookup.set(country.cca2.toLowerCase(), name);
}

const isoToCountry = new Map<string, string>();

for (const country of countries) {
  isoToCountry.set(country.cca2, country.name.common);
}

const tokenize = (location: string): string[] =>
  location
    .toLowerCase()
    .replace(/[().]/g, ' ')
    .replace(/[/-]/g, ',')
    .replace(/\s+/g, ' ')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

export const normalizeLocation = (location: string | null): LocationResult => {
  if (!location) {
    return null;
  }

  const tokens = tokenize(location);

  for (const token of tokens) {
    const country = countryLookup.get(token);

    if (country) {
      return country;
    }
  }

  return null;
};
