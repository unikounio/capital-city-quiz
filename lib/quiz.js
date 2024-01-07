export default class Quiz {
  constructor(countriesManager, question, i18next) {
    this.countriesManager = countriesManager;
    this.question = question;
    this.i18next = i18next;
  }

  async allCountries() {
    const countries = this.countriesManager.countries;
    const [correctCounter, numberOfQuestions] = await this.#executeQuiz(
      countries
    );
    this.#displayResult(correctCounter, numberOfQuestions);
  }

  async byContinent() {
    const continentName = await this.countriesManager.getContinentName();
    const continentCode = this.countriesManager.getContinentCode(continentName);
    const countriesInContinent =
      this.countriesManager.getCountriesInContinent(continentCode);
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
        correctCounter: correctCounter,
        numberOfQuestions: numberOfQuestions,
        percentage: Math.round((correctCounter / numberOfQuestions) * 100),
      })
    );
  }

  async #repeatQuiz(countries, numberOfQuestions) {
    let correctCounter = 0;
    const shuffledCountries = this.#shuffleArray(countries);
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
            questionNumber: questionNumber,
          })
        );
      }
    }
    return correctCounter;
  }

  #shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
    let capitalChoices = [
      this.countriesManager.formatCapital(questioningCountry.capital),
    ];
    capitalChoices = this.countriesManager.addRandomCapitals(capitalChoices, 3);
    const shuffledCapitals = this.#shuffleArray(capitalChoices);
    const translatedCapitals =
      this.countriesManager.getTranslatedCapitals(shuffledCapitals);
    const answeredCapital = await this.question.selectCapitalOfTheCountry(
      questioningCountry,
      translatedCapitals
    );
    return [questioningCountry, answeredCapital];
  }

  #displayCorrectOrNot(questioningCountry, answeredCapital, correctCounter) {
    if (answeredCapital === questioningCountry.capital) {
      console.log(this.i18next.t("messages:Correct"));
      correctCounter++;
    } else {
      const collectCapital = questioningCountry.capital.replace(/\s+/g, "");
      console.log(
        this.i18next.t("messages:Incorrect", {
          correctCapital: this.i18next.t(`capitals:${collectCapital}`),
        })
      );
    }
    return correctCounter;
  }
}
