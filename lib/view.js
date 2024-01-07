export default class View {
  constructor(countriesManager, question) {
    this.countriesManager = countriesManager;
    this.question = question;
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
      const capital = this.countriesManager.formatCapital(country.capital);
      console.log(`${country.name}: ${capital}`);
    }
  }
}
