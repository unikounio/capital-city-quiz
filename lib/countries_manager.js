import { countries, continents } from "countries-list";

export default class CountriesManager {
  constructor(question, i18next) {
    this.countries = Object.values(countries);
    this.question = question;
    this.i18next = i18next;
  }

  async getContinentName() {
    const continentNames = Object.values(continents);
    return this.question.selectAContinent(continentNames);
  }

  getContinentCode(continentName) {
    let continentCode;
    for (const [code, name] of Object.entries(continents)) {
      if (name === continentName) {
        continentCode = code;
        break;
      }
    }
    return continentCode;
  }

  getCountriesInContinent(continentCode) {
    return this.countries.filter(
      (country) => country.continent === continentCode
    );
  }

  formatCapital(capital) {
    if (capital === "") return "None";
    else return capital;
  }

  addRandomCapitals(targetCapitals = [], numberOfAdditions) {
    const capitals = this.countries.map((country) => country.capital);
    while (targetCapitals.length <= numberOfAdditions) {
      const randomCapital = this.formatCapital(this.getRandomCapital(capitals));
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
      capital.replace(/\s+/g, "")
    );
    return formattedCapitals.map((capital) =>
      this.i18next.t(`capitals:${capital}`)
    );
  }
}
