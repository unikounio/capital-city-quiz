import Enquirer from "enquirer";

export default class Question {
  async selectQuizOrView() {
    const question = {
      type: "select",
      name: "action",
      message: "Welcome! Please select quiz or view:",
      choices: ["[1] Play the capital quiz", "[2] View"],
      onCancel: () => this.#onCancel(),
    };
    const answer = await Enquirer.prompt(question);
    return answer.action;
  }

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

  async getNumberOfQuestions(quizCountriesData) {
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
        const quizLength = quizCountriesData.length;
        if (formattedValue < 1 && formattedValue <= quizLength) {
          return `Please enter a number between 1 and ${quizLength}.
  the maximum number of questions for this quiz is ${quizLength}.`;
        }
        return true;
      },
      onCancel: () => this.#onCancel(),
    };
    const answer = await Enquirer.prompt(question);
    return answer.numberOfQuestions;
  }

  async selectACountry(countryNames) {
    const question = {
      type: "select",
      name: "countryName",
      message: "Please select a country to find its capital:",
      choices: countryNames,
      onCancel: () => this.#onCancel(),
    };
    const answer = await Enquirer.prompt(question);
    return answer.countryName;
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

  async selectCapitalOfTheCountry(questioningCountry, shuffledCapitals) {
    const question = {
      type: "select",
      name: "capital",
      message: `Country: ${questioningCountry.name}\nWhich is the capital of this country?\nselect your answer:`,
      choices: shuffledCapitals,
      onCancel: () => this.#onCancel(),
    };
    const answer = await Enquirer.prompt(question);
    return answer.capital;
  }

  async selectCapitalViewMode() {
    const question = {
      type: "select",
      name: "viewMode",
      message: "Please select Reference or List:",
      choices: [
        "[1] Reference for a capital city",
        "[2] List view capital cities",
      ],
      onCancel: () => this.#onCancel(),
    };
    const answer = await Enquirer.prompt(question);
    return answer.viewMode;
  }

  #onCancel() {
    console.log("Operation canceled. Exit the application.");
    process.exit(0);
  }
}
