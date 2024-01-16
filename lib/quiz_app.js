import minimist from "minimist";
import Question from "./question.js";
import Quiz from "./quiz.js";
import View from "./view.js";
import CountriesSrore from "./countries_store.js";
import i18next from "./translation/i18next.js";

export default class QuizApp {
  constructor() {
    this.question = new Question(i18next);
    this.countriesSrore = new CountriesSrore(this.question, i18next);
  }
  async run() {
    const options = minimist(process.argv.slice(2));
    if (options.v && options.j) {
      i18next.changeLanguage("ja");
      await this.viewCapitals();
    } else if (options.v) {
      await this.viewCapitals();
    } else if (options.j) {
      i18next.changeLanguage("ja");
      await this.quizCapitals();
    } else {
      await this.quizCapitals();
    }
  }

  async viewCapitals() {
    const view = new View(this.countriesSrore, this.question, i18next);
    const scope = await this.question.selectAllOrContinent();
    scope === i18next.t("messages:AllCountries")
      ? view.allCountries()
      : view.byContinent();
  }

  async quizCapitals() {
    const quiz = new Quiz(this.countriesSrore, this.question, i18next);
    const scope = await this.question.selectAllOrContinent();
    scope === i18next.t("messages:AllCountries")
      ? await quiz.allCountries()
      : await quiz.byContinent();
  }
}
