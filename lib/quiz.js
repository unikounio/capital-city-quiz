import { shuffleArray } from "./utility.js";

export default class Quiz {
  constructor(countriesSrore, question, i18next) {
    this.countriesSrore = countriesSrore;
    this.question = question;
    this.i18next = i18next;
  }

  async allCountries() {
    const { countries } = this.countriesSrore;
    const [correctCounter, numberOfQuestions] = await this.#executeQuiz(
      countries
    );
    this.#displayResult(correctCounter, numberOfQuestions);
  }

  async byContinent() {
    const continentName = await this.countriesSrore.getContinentName();
    const continentCode = this.countriesSrore.getContinentCode(continentName);
    const countriesInContinent =
      this.countriesSrore.getCountriesInContinent(continentCode);
    const [correctCounter, numberOfQuestions] = await this.#executeQuiz(
      countriesInContinent
    );
    this.#displayResult(correctCounter, numberOfQuestions);
  }

  async #executeQuiz(countries) {
    const numberOfQuestions = parseInt(
      await this.question.getNumberOfQuestions(countries)
    );
    console.log(this.i18next.t("messages:QuizStart"));
    const correctCounter = await this.#repeatQuiz(countries, numberOfQuestions);
    return [correctCounter, numberOfQuestions];
  }

  #displayResult(correctCounter, numberOfQuestions) {
    console.log(
      this.i18next.t("messages:QuizResult", {
        correctCounter,
        numberOfQuestions,
        percentage: Math.round((correctCounter / numberOfQuestions) * 100),
      })
    );
  }

  async #repeatQuiz(countries, numberOfQuestions) {
    let correctCounter = 0;
    const shuffledCountries = shuffleArray(countries);
    for (let i = 0; i < numberOfQuestions; i++) {
      correctCounter = await this.#playQuiz(
        correctCounter,
        shuffledCountries,
        i
      );
      if (i < numberOfQuestions - 1) {
        const questionNumber = i + 2;
        console.log(
          this.i18next.t("messages:QuestionNumber", {
            questionNumber,
          })
        );
      }
    }
    return correctCounter;
  }

  async #playQuiz(correctCounter, shuffledCountries, countryNumber) {
    const [questioningCountry, answeredCapital] = await this.#answerQuiz(
      shuffledCountries,
      countryNumber
    );
    return this.#displayCorrectOrNot(
      questioningCountry,
      answeredCapital,
      correctCounter
    );
  }

  async #answerQuiz(shuffledCountries, countryNumber) {
    const questioningCountry = shuffledCountries[countryNumber];
    const correctCapital = questioningCountry.capital;
    let randomCapitals = this.countriesSrore.getRandomCapitals(3);
    while (randomCapitals.includes(correctCapital)) {
      randomCapitals = this.countriesSrore.getRandomCapitals(3);
    }
    const capitalChoices = [correctCapital, randomCapitals].flat();
    const shuffledCapitals = shuffleArray(capitalChoices);
    const translatedCapitals =
      this.countriesSrore.getTranslatedCapitals(shuffledCapitals);
    const answeredCapital = await this.question.selectCapitalOfTheCountry(
      questioningCountry,
      translatedCapitals
    );
    return [questioningCountry, answeredCapital];
  }

  #displayCorrectOrNot(questioningCountry, answeredCapital, correctCounter) {
    const formattedCapital = this.countriesSrore.formatName(
      questioningCountry.capital
    );
    if (answeredCapital == this.i18next.t(`capitals:${formattedCapital}`)) {
      console.log(this.i18next.t("messages:Correct"));
      correctCounter++;
    } else {
      const collectCapital = formattedCapital.replace(/\s+/g, "");
      const translatedCapital = this.i18next.t(`capitals:${collectCapital}`);
      console.log(this.i18next.t("messages:Incorrect", { translatedCapital }));
    }
    return correctCounter;
  }
}
