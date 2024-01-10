import i18next from "i18next";
import fs from "fs";

const [englishCountries, englishContinents, englishCapitals, englishMessages] =
  loadEnglishTranslationsData();
const [
  japaneseCountries,
  japaneseContinents,
  japaneseCapitals,
  japaneseMessages,
] = loadJapaneseTranslationsData();

i18next.init({
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: {
      countries: englishCountries,
      continents: englishContinents,
      capitals: englishCapitals,
      messages: englishMessages,
    },
    ja: {
      countries: japaneseCountries,
      continents: japaneseContinents,
      capitals: japaneseCapitals,
      messages: japaneseMessages,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

function loadEnglishTranslationsData() {
  const [
    englishCountriesData,
    englishContinentsData,
    englishCapitalsData,
    englishMessagesData,
  ] = readEnglishTranslationFiles();

  const englishCountries = JSON.parse(englishCountriesData);
  const englishContinents = JSON.parse(englishContinentsData);
  const englishCapitals = JSON.parse(englishCapitalsData);
  const englishMessages = JSON.parse(englishMessagesData);

  return [
    englishCountries,
    englishContinents,
    englishCapitals,
    englishMessages,
  ];
}

function loadJapaneseTranslationsData() {
  const [
    japaneseCountriesData,
    japaneseContinentsData,
    japaneseCapitalsData,
    japaneseMessagesData,
  ] = readJapaneseTranslationFiles();
  const japaneseCountries = JSON.parse(japaneseCountriesData);
  const japaneseContinents = JSON.parse(japaneseContinentsData);
  const japaneseCapitals = JSON.parse(japaneseCapitalsData);
  const japaneseMessages = JSON.parse(japaneseMessagesData);

  return [
    japaneseCountries,
    japaneseContinents,
    japaneseCapitals,
    japaneseMessages,
  ];
}

function readEnglishTranslationFiles() {
  const englishCountriesData = fs.readFileSync(
    "lib/translation/en/countries.json"
  );
  const englishContinentsData = fs.readFileSync(
    "lib/translation/en/continents.json"
  );
  const englishCapitalsData = fs.readFileSync(
    "lib/translation/en/capitals.json"
  );
  const englishMessagesData = fs.readFileSync(
    "lib/translation/en/messages.json"
  );

  return [
    englishCountriesData,
    englishContinentsData,
    englishCapitalsData,
    englishMessagesData,
  ];
}

function readJapaneseTranslationFiles() {
  const japaneseCountriesData = fs.readFileSync(
    "lib/translation/ja/countries.json"
  );
  const japaneseContinentsData = fs.readFileSync(
    "lib/translation/ja/continents.json"
  );
  const japaneseCapitalsData = fs.readFileSync(
    "lib/translation/ja/capitals.json"
  );
  const japaneseMessagesData = fs.readFileSync(
    "lib/translation/ja/messages.json"
  );

  return [
    japaneseCountriesData,
    japaneseContinentsData,
    japaneseCapitalsData,
    japaneseMessagesData,
  ];
}

export default i18next;
