import { countries, continents } from "countries-list";
import Enquirer from "enquirer";

class Main {
  //TODO 多言語対応（少なくとも日本語化）
  //TODO クラス分け
  //TODO 解答履歴の記録
  async question(message, choices) {
    const question = {
      type: "select",
      name: "selected",
      message: message,
      choices: choices,
    };
    return await Enquirer.prompt(question);
  }

  getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  async selectQuizOrView() {
    const message = "Welcome! Please select quiz or view:";
    const choices = ["[1] Play the capital quiz", "[2] View"];
    let answer = await this.question(message, choices);

    if (answer.selected === "[1] Play the capital quiz") {
      answer = await this.selectAllOrContinent();
      if (answer.selected === "[1] All countries") {
        this.quizAllCountries();
      } else {
        this.quizByContinent();
      }
    } else {
      this.selectSeachOrList();
    }
  }

  async selectAllOrContinent() {
    const message =
      "Do you want to focus on all countries or select by continent?:";
    const choices = ["[1] All countries", "[2] By Continent"];
    return this.question(message, choices);
  }

  async quizAllCountries() {
    let correctCounter = 0;
    const quizCountriesData = Object.values(countries);
    const numberOfQuestions = await this.getNumberOfQuestions(
      quizCountriesData
    );
    for (let i = 0; i < numberOfQuestions; i++) {
      correctCounter = await this.quiz(correctCounter, quizCountriesData, i);
    }
    console.log(
      `You got ${correctCounter} out of ${numberOfQuestions} questions right! Your accuracy rate is ${
        (correctCounter / numberOfQuestions) * 100
      }%.`
    );
  }

  async quizByContinent() {
    const answer = await this.selectAContinent();
    let continentCode;
    for (const [code, name] of Object.entries(continents)) {
      if (name === answer.selected) {
        continentCode = code;
        break;
      }
    }
    const quizCountriesData = Object.values(countries).filter(
      (country) => country.continent === continentCode
    );
    let correctCounter = 0;
    const numberOfQuestions = await this.getNumberOfQuestions(
      quizCountriesData
    );
    for (let i = 0; i < numberOfQuestions; i++) {
      correctCounter = await this.quiz(correctCounter, quizCountriesData, i);
    }
    console.log(
      `You got ${correctCounter} out of ${numberOfQuestions} questions right! Your accuracy rate is ${
        (correctCounter / numberOfQuestions) * 100
      }%.`
    );
  }

  async selectAContinent() {
    const message = "Please select a continent:";
    const choices = Object.values(continents);
    return this.question(message, choices);
  }

  formatCapital(capital) {
    if (capital === "") return "None";
    else return capital;
  }

  async getNumberOfQuestions(quizCountriesData) {
    const question = {
      type: "input",
      name: "numberOfQuestions",
      message: "How many questions would you like to answer?",
      input: 10,
      validate: (inputValue) => {
        const formattedValue = parseInt(inputValue);
        const quizLength = quizCountriesData.length;
        if (
          !isNaN(formattedValue) &&
          formattedValue > 0 &&
          formattedValue <= quizLength
        ) {
          return true;
        }
        return `Invalid number of questions.
Please enter a number between 1 and ${quizLength}.
${quizLength} is the maximum number of questions for this quiz.`;
      },
    };
    const answer = await Enquirer.prompt(question);
    return parseInt(answer.numberOfQuestions);
  }

  async quiz(correctCounter, quizCountriesData, questionNumber) {
    const shuffledCountriesData = this.shuffleArray(quizCountriesData);
    const questioningCountry = shuffledCountriesData[questionNumber];
    const capitals = quizCountriesData.map((country) => country.capital);
    const message = `Country: ${questioningCountry.name}\nWhich is the capital of this country?\nselect your answer:`;
    let capitalChoices = [this.formatCapital(questioningCountry.capital)];
    while (capitalChoices.length < 4) {
      const randomCapital = this.formatCapital(this.getRandomElement(capitals));
      if (!capitalChoices.includes(randomCapital)) {
        capitalChoices.push(randomCapital);
      }
    }
    const choices = this.shuffleArray(capitalChoices);
    const answer = await this.question(message, choices);
    if (answer.selected == questioningCountry.capital) {
      console.log("Correct!");
      correctCounter++;
    } else {
      console.log(
        `Sorry about that. The correct answer is "${questioningCountry.capital}"`
      );
    }
    return correctCounter;
  }

  async selectSeachOrList() {
    const message = "Please select search or view:";
    const choices = [
      "[1] Search for a capital city",
      "[2] View capital cities",
    ];
    const answer = await this.question(message, choices);

    if (answer.selected === "[1] Search for a capital city") {
      this.searchAnyCapital();
    } else {
      this.listCapitals();
    }
  }

  async searchAnyCapital() {
    const countriesData = Object.values(countries);
    const message = "Please select a country to find its capital:";
    const choices = countriesData.map((country) => country.name);
    const answer = await this.question(message, choices);
    const selectedCountry = countriesData.find(
      (country) => country.name === answer.selected
    );
    const capital = this.formatCapital(selectedCountry.capital);
    console.log(
      `The capital of the ${selectedCountry.name} is... "${capital}"`
    );
  }

  async listCapitals() {
    const answer = await this.selectAllOrContinent();
    if (answer.selected === "[1] All countries") {
      this.listAllCountries();
    } else {
      this.listByContinent();
    }
  }

  async listAllCountries() {
    const countriesData = Object.values(countries);
    for (const country of countriesData) {
      const capital = this.formatCapital(country.capital);
      console.log(`${country.name}: ${capital}`);
    }
  }

  async listByContinent() {
    const answer = await this.selectAContinent();
    let continentCode;
    for (const [code, name] of Object.entries(continents)) {
      if (name === answer.selected) {
        continentCode = code;
        break;
      }
    }
    const countriesData = Object.values(countries).filter(
      (country) => country.continent === continentCode
    );
    for (const country of countriesData) {
      const capital = this.formatCapital(country.capital);
      console.log(`${country.name}: ${capital}`);
    }
  }

  run() {
    this.selectQuizOrView();
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}

const main = new Main();
main.run();
