import { countries, continents } from "countries-list";

export default class CountriesStore {
  constructor(question, i18next) {
    this.countries = Object.values(countries);
    this.question = question;
    this.i18next = i18next;
  }

  async getContinentName() {
    const continentNames = Object.values(continents);
    const translatedContinentNames = continentNames.map((continent) =>
      this.getTranslatedContinentName(continent)
    );
    return this.question.selectAContinent(translatedContinentNames);
  }

  getTranslatedContinentName(continentName) {
    const formattedContinentName = this.formatName(continentName);
    return this.i18next.t(`continents:${formattedContinentName}`);
  }

  getContinentCode(continentName) {
    const selectedContinent = Object.entries(continents).find(
      ([, name]) => this.getTranslatedContinentName(name) === continentName
    );
    return selectedContinent[0];
  }

  getCountriesInContinent(continentCode) {
    return this.countries.filter(
      (country) => country.continent === continentCode
    );
  }

  formatName(name) {
    return name === "" ? "None" : name.replace(/\s+/g, "");
  }

  addRandomCapitals(targetCapitals = [], numberOfAdditions) {
    const capitals = this.countries.map((country) => country.capital);
    while (targetCapitals.length <= numberOfAdditions) {
      const randomCapital = this.formatName(this.getRandomCapital(capitals));
      if (!targetCapitals.includes(randomCapital)) {
        targetCapitals.push(randomCapital);
      }
    }
    return targetCapitals;
  }

  getRandomCapital(capitals) {
    return capitals[Math.floor(Math.random() * capitals.length)];
  }

  getTranslatedCapitals(capitals) {
    const formattedCapitals = capitals.map((capital) =>
      this.formatName(capital)
    );
    return formattedCapitals.map((capital) =>
      this.i18next.t(`capitals:${capital}`)
    );
  }
}
