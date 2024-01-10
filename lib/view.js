export default class View {
  constructor(countriesManager, question, i18next) {
    this.countriesManager = countriesManager;
    this.question = question;
    this.i18next = i18next;
  }

  allCountries() {
    const countries = this.countriesManager.countries;
    this.#displayCountriesAndCapitals(countries);
  }

  async byContinent() {
    const continentName = await this.countriesManager.getContinentName(
      this.question
    );
    const continentCode = this.countriesManager.getContinentCode(continentName);
    const countriesInContinent =
      this.countriesManager.getCountriesInContinent(continentCode);
    this.#displayCountriesAndCapitals(countriesInContinent);
  }

  #displayCountriesAndCapitals(countries) {
    for (const country of countries) {
      const capital = this.countriesManager.formatName(country.capital);
      const formattedCountry = country.name.replace(/\s+/g, "");
      const formattedCapital = capital.replace(/\s+/g, "");
      console.log(
        `${this.i18next.t(`countries:${formattedCountry}`)}: ${this.i18next.t(
          `capitals:${formattedCapital}`
        )}`
      );
    }
  }
}
