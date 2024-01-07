import Enquirer from "enquirer";

export default class Question {
  constructor(i18next) {
    this.i18next = i18next;
  }

  async selectAllOrContinent() {
    const question = {
      type: "select",
      name: "scope",
      message: this.i18next.t("messages:SelectScope"),
      choices: [
        this.i18next.t("messages:AllCountries"),
        this.i18next.t("messages:ByContinent"),
      ],
      onCancel: () => this.#onCancel(),
    };
    const answer = await Enquirer.prompt(question);
    return answer.scope;
  }

  async selectAContinent(continentNames) {
    const question = {
      type: "select",
      name: "continentName",
      message: this.i18next.t("messages:SelectAContinent"),
      choices: continentNames,
      onCancel: () => this.#onCancel(),
    };
    const answer = await Enquirer.prompt(question);
    return answer.continentName;
  }

  async getNumberOfQuestions(countries) {
    const question = {
      type: "input",
      name: "numberOfQuestions",
      message: this.i18next.t("messages:HowManyQuestions"),
      input: 10,
      validate: (inputValue) => {
        const formattedValue = parseInt(inputValue);
        if (isNaN(formattedValue)) {
          return this.i18next.t("messages:Invalid");
        }
        const countriesLength = countries.length;
        if (formattedValue < 1 || formattedValue > countriesLength) {
          return this.i18next.t("messages:QuestionCount", {
            countriesLength: countriesLength,
          });
        }
        return true;
      },
      onCancel: () => this.#onCancel(),
    };
    const answer = await Enquirer.prompt(question);
    return answer.numberOfQuestions;
  }

  async selectCapitalOfTheCountry(questioningCountry, shuffledCapitals) {
    const question = {
      type: "select",
      name: "capital",
      message: this.i18next.t("messages:Question", {
        countryName: this.i18next.t(
          `countries:${questioningCountry.name.replace(/\s+/g, "")}`
        ),
      }),
      choices: shuffledCapitals,
      onCancel: () => this.#onCancel(),
    };
    const answer = await Enquirer.prompt(question);
    return answer.capital;
  }

  #onCancel() {
    console.log(this.i18next.t("messages:Cancel"));
    process.exit(0);
  }
}
