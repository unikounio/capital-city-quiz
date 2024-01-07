export default class Quiz {
  constructor(countriesManager, question) {
    this.countriesManager = countriesManager;
    this.question = question;
  }

  async allCountries() {
    const countries = this.countriesManager.countries;
    const [correctCounter, numberOfQuestions] = await this.#executeQuiz(
      countries
    );
    this.#displayResult(correctCounter, numberOfQuestions);
  }

  async byContinent() {
    const continentName = await this.countriesManager.getContinentName(
      this.question
    );
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
    console.log("Now, let's start with Question 1!");
    const correctCounter = await this.#repeatQuiz(countries, numberOfQuestions);
    return [correctCounter, numberOfQuestions];
  }

  #displayResult(correctCounter, numberOfQuestions) {
    console.log(
      `You got ${correctCounter} out of ${numberOfQuestions} questions right! Your accuracy rate is ${Math.round(
        (correctCounter / numberOfQuestions) * 100
      )}%.`
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
        console.log(`Question ${questionNumber}.`);
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
    const answeredCapital = await this.question.selectCapitalOfTheCountry(
      questioningCountry,
      this.#shuffleArray(capitalChoices)
    );
    return [questioningCountry, answeredCapital];
  }

  #displayCorrectOrNot(questioningCountry, answeredCapital, correctCounter) {
    if (answeredCapital === questioningCountry.capital) {
      console.log("Correct!");
      correctCounter++;
    } else {
      console.log(
        `Sorry about that. The correct answer is "${questioningCountry.capital}".`
      );
    }
    return correctCounter;
  }
}
