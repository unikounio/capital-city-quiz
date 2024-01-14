export default class View {
  constructor(countriesSrore, question, i18next) {
    this.countriesSrore = countriesSrore;
    this.question = question;
    this.i18next = i18next;
  }

  allCountries() {
    const { countries } = this.countriesSrore;
    this.#displayCountriesAndCapitals(countries);
  }

  async byContinent() {
    const continentName = await this.countriesSrore.getContinentName(
      this.question
    );
    const continentCode = this.countriesSrore.getContinentCode(continentName);
    const countriesInContinent =
      this.countriesSrore.getCountriesInContinent(continentCode);
    this.#displayCountriesAndCapitals(countriesInContinent);
  }

  #displayCountriesAndCapitals(countries) {
    for (const country of countries) {
      const capital = this.countriesSrore.formatName(country.capital);
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
