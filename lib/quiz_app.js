import { countries, continents } from "countries-list";
import minimist from "minimist";
import Question from "./question.js";

export default class QuizApp {
  //TODO 多言語対応（少なくとも日本語化）
  //TODO クラス分け
  constructor() {
    this.question = new Question();
    this.countriesData = Object.values(countries);
    this.continentNames = Object.values(continents);
  }

  async run() {
    const options = minimist(process.argv.slice(2));
    if (options.v) {
      this.listCapitals();
    } else {
      const scope = await this.question.selectAllOrContinent();
      if (scope === "[1] All countries") {
        this.quizAllCountries();
      } else {
        this.quizByContinent();
      }
    }
  }

  getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  async quizAllCountries() {
    let correctCounter = 0;
    const numberOfQuestions = parseInt(
      await this.question.getNumberOfQuestions(this.countriesData)
    );
    for (let i = 0; i < numberOfQuestions; i++) {
      correctCounter = await this.quiz(correctCounter, this.countriesData, i);
    }
    console.log(
      `You got ${correctCounter} out of ${numberOfQuestions} questions right! Your accuracy rate is ${
        (correctCounter / numberOfQuestions) * 100
      }%.`
    );
  }

  async quizByContinent() {
    const continentName = await this.question.selectAContinent(
      this.continentNames
    );
    let continentCode;
    for (const [code, name] of Object.entries(continents)) {
      if (name === continentName) {
        continentCode = code;
        break;
      }
    }
    const countriesInContinent = this.countriesData.filter(
      (country) => country.continent === continentCode
    );
    let correctCounter = 0;
    const numberOfQuestions = parseInt(
      await this.question.getNumberOfQuestions(countriesInContinent)
    );
    for (let i = 0; i < numberOfQuestions; i++) {
      correctCounter = await this.quiz(correctCounter, countriesInContinent, i);
    }
    console.log(
      `You got ${correctCounter} out of ${numberOfQuestions} questions right! Your accuracy rate is ${
        (correctCounter / numberOfQuestions) * 100
      }%.`
    );
  }

  formatCapital(capital) {
    if (capital === "") return "None";
    else return capital;
  }

  async quiz(correctCounter, countriesData, questionNumber) {
    const shuffledCountriesData = this.shuffleArray(countriesData);
    const questioningCountry = shuffledCountriesData[questionNumber];
    const capitals = countriesData.map((country) => country.capital);
    let capitalChoices = [this.formatCapital(questioningCountry.capital)];
    while (capitalChoices.length < 4) {
      const randomCapital = this.formatCapital(this.getRandomElement(capitals));
      if (!capitalChoices.includes(randomCapital)) {
        capitalChoices.push(randomCapital);
      }
    }
    const answeredCapital = await this.question.selectCapitalOfTheCountry(
      questioningCountry,
      this.shuffleArray(capitalChoices)
    );
    if (answeredCapital === questioningCountry.capital) {
      console.log("Correct!");
      correctCounter++;
    } else {
      console.log(
        `Sorry about that. The correct answer is "${questioningCountry.capital}"`
      );
    }
    return correctCounter;
  }

  async listCapitals() {
    const scope = await this.question.selectAllOrContinent();
    if (scope === "[1] All countries") {
      this.listAllCountries();
    } else {
      this.listByContinent();
    }
  }

  async listAllCountries() {
    for (const country of this.countriesData) {
      const capital = this.formatCapital(country.capital);
      console.log(`${country.name}: ${capital}`);
    }
  }

  async listByContinent() {
    const continentName = await this.question.selectAContinent(
      this.continentNames
    );
    let continentCode;
    for (const [code, name] of Object.entries(continents)) {
      if (name === continentName) {
        continentCode = code;
        break;
      }
    }
    const countriesInContinent = this.countriesData.filter(
      (country) => country.continent === continentCode
    );
    for (const country of countriesInContinent) {
      const capital = this.formatCapital(country.capital);
      console.log(`${country.name}: ${capital}`);
    }
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
