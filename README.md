# capital-city-quiz

This is a CLI quiz application where you guess the capitals of countries around the world.

# Install

```
npm install -g capital-city-quiz
```

# Supported Language

- English (Default)
- Japanese

Please note that the default language of the application is English.
You can switch to Japanese by using the `-j` option

# Usage

## Quiz Mode

### Launch

To start the quiz, enter the following command:

```
capital-city-quiz
```

### Selecting the Scope

Choose the scope of the quiz:

```
? Please select the scope: …
▸ [1] All countries
  [2] By continent
```

#### If you choose `By continent`

Select the continent you want to answer questions about:

```
? Please select a continent: …
▸ Africa
  Antarctica
  Asia
  Europe
  North America
  Oceania
  South America
```

### Entering the Number of Questions

Enter the number of questions you want to be asked.
The number of available questions is as follows:

- All countries: 250
- Africa : 58
- Antarctica : 5
- Asia : 53
- Europe : 52
- North America: 41
- Oceania : 27
- South America: 14

```
? How many questions would you like to answer? ‣ 10
```

The quiz will begin.
A country name is displayed, and you must select the correct capital city.

```
Now, let's start with Question 1!
? Country: Japan
Which is the capital of this country?
Select your answer: …
▸ Washington D.C.
  Tokyo
  Moscow
  Copenhagen
```

After selecting a capital city, the app will indicate whether you are correct or incorrect.
If incorrect, it will show the right answer.

```
Oops! Not quite. The correct answer is "Tokyo".
```

Once you have answered the number of questions you initially entered, the app will display your total correct answers and accuracy rate.

```
You got 5 out of 10 questions right! Your accuracy rate is 50%.
```

## View Mode

By starting the app with the`-v`option, you can view the list of capitals of different countries.

```
$ capital-city-quiz -v
```

```
? Please select the scope: …
▸ [1] All countries
  [2] By continent
```

```
Andorra: Andorra la Vella
United Arab Emirates: Abu Dhabi
Afghanistan: Kabul
Antigua and Barbuda: Saint John's
Anguilla: The Valley
...
```

## Japanese Mode

With the `-j` option, you can enjoy the quiz in Japanese.

```
$ capital-city-quiz -j
```

In this mode, the questions will be presented in Japanese.
For example:

```
? 国名: 日本
この国の首都はどこでしょうか?: …
▸ ワシントンD.C.
  東京
  モスクワ
  コペンハーゲン
```

This option also applies to the view mode, allowing you to view the capitals in Japanese.

```

✔ 出題範囲を選択してください。 · [1] すべての国
アンドラ: アンドラ・ラ・ベリャ
アラブ首長国連邦: アブダビ
アフガニスタン: カブール
アンティグア・バーブーダ: セントジョンズ
アンギラ: ザ・バレー
...
```

Enjoy!

# License

This software is released under the MIT License.
