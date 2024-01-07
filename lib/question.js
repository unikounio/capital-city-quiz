import Enquirer from "enquirer";

export default class Question {
  async selectAllOrContinent() {
    const question = {
      type: "select",
      name: "scope",
      message: "Do you want to focus on all countries or select by continent?:",
      choices: ["[1] All countries", "[2] By Continent"],
      onCancel: () => this.#onCancel(),
    };
    const answer = await Enquirer.prompt(question);
    return answer.scope;
  }

  async selectAContinent(continentNames) {
    const question = {
      type: "select",
      name: "continentName",
      message: "Please select a continent:",
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
      message: "How many questions would you like to answer?",
      input: 10,
      validate: (inputValue) => {
        const formattedValue = parseInt(inputValue);
        if (isNaN(formattedValue)) {
          return "Please enter a valid number.";
        }
        const countriesLength = countries.length;
        if (formattedValue < 1 && formattedValue <= countriesLength) {
          return `Please enter a number between 1 and ${countriesLength}.
  the maximum number of questions for this quiz is ${countriesLength}.`;
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
      message: `Country: ${questioningCountry.name}\nWhich is the capital of this country?\nSelect your answer:`,
      choices: shuffledCapitals,
      onCancel: () => this.#onCancel(),
    };
    const answer = await Enquirer.prompt(question);
    return answer.capital;
  }

  #onCancel() {
    console.log("The quiz has been canceled. Exiting the application.");
    process.exit(0);
  }
}
