import i18next from "i18next";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
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
  const englishCountriesPath = path.join(__dirname, "en/countries.json");
  const englishContinentsPath = path.join(__dirname, "en/continents.json");
  const englishCapitalsPath = path.join(__dirname, "en/capitals.json");
  const englishMessagesPath = path.join(__dirname, "en/messages.json");

  const englishCountriesData = fs.readFileSync(englishCountriesPath, "utf8");
  const englishContinentsData = fs.readFileSync(englishContinentsPath, "utf8");
  const englishCapitalsData = fs.readFileSync(englishCapitalsPath, "utf8");
  const englishMessagesData = fs.readFileSync(englishMessagesPath, "utf8");

  return [
    englishCountriesData,
    englishContinentsData,
    englishCapitalsData,
    englishMessagesData,
  ];
}

function readJapaneseTranslationFiles() {
  const japaneseCountriesPath = path.join(__dirname, "ja/countries.json");
  const japaneseContinentsPath = path.join(__dirname, "ja/continents.json");
  const japaneseCapitalsPath = path.join(__dirname, "ja/capitals.json");
  const japaneseMessagesPath = path.join(__dirname, "ja/messages.json");

  const japaneseCountriesData = fs.readFileSync(japaneseCountriesPath, "utf8");
  const japaneseContinentsData = fs.readFileSync(
    japaneseContinentsPath,
    "utf8"
  );
  const japaneseCapitalsData = fs.readFileSync(japaneseCapitalsPath, "utf8");
  const japaneseMessagesData = fs.readFileSync(japaneseMessagesPath, "utf8");

  return [
    japaneseCountriesData,
    japaneseContinentsData,
    japaneseCapitalsData,
    japaneseMessagesData,
  ];
}

export default i18next;
