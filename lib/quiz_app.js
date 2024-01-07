import minimist from "minimist";
import Question from "./question.js";
import Quiz from "./quiz.js";
import View from "./view.js";
import CountriesManager from "./countries_manager.js";

export default class QuizApp {
  //TODO 多言語対応（少なくとも日本語化）
  constructor() {
    this.question = new Question();
    this.countriesManager = new CountriesManager(this.question);
  }
  async run() {
    const options = minimist(process.argv.slice(2));
    if (options.v) {
      await this.viewCapitals();
    } else {
      await this.quizCapitals();
    }
  }

  async viewCapitals() {
    const view = new View(this.countriesManager, this.question);
    const scope = await this.question.selectAllOrContinent();
    if (scope === "[1] All countries") {
      view.allCountries();
    } else {
      view.byContinent();
    }
  }

  async quizCapitals() {
    const quiz = new Quiz(this.countriesManager, this.question);
    const scope = await this.question.selectAllOrContinent();
    if (scope === "[1] All countries") {
      await quiz.allCountries();
    } else {
      await quiz.byContinent();
    }
  }
}
