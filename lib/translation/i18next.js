import i18next from "i18next";
import fs from "fs";

const englishCountriesData = fs.readFileSync(
  "lib/translation/en/countries.json"
);
const englishCapitalsData = fs.readFileSync("lib/translation/en/capitals.json");
const englishMessagesData = fs.readFileSync("lib/translation/en/messages.json");
const japaneseCountriesData = fs.readFileSync(
  "lib/translation/ja/countries.json"
);
const japaneseCapitalsData = fs.readFileSync(
  "lib/translation/ja/capitals.json"
);
const japaneseMessagesData = fs.readFileSync(
  "lib/translation/ja/messages.json"
);
const englishCountries = JSON.parse(englishCountriesData);
const englishCapitals = JSON.parse(englishCapitalsData);
const englishMessages = JSON.parse(englishMessagesData);
const japaneseCountries = JSON.parse(japaneseCountriesData);
const japaneseCapitals = JSON.parse(japaneseCapitalsData);
const japaneseMessages = JSON.parse(japaneseMessagesData);

i18next.init({
  lng: "en", // 初期言語設定
  fallbackLng: "en", // 利用可能な翻訳がない場合のフォールバック言語
  resources: {
    en: {
      countries: englishCountries,
      capitals: englishCapitals,
      messages: englishMessages,
    },
    ja: {
      countries: japaneseCountries,
      capitals: japaneseCapitals,
      messages: japaneseMessages,
    },
  },
});

export default i18next;
