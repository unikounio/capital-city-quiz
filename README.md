# capital-city-quiz

これは世界の国名から首都名を当てる CLI クイズアプリです。

# install

```
npx capital-city-quiz
```

# supported language

- English
- Japanese

# Usage

## クイズモード

### 起動

起動するには次のコマンドを入力します。

```
capital-city-quiz
```

### 出題範囲の選択

出題範囲を選択します。

```
? Please select the quiz scope: …
▸ [1] All countries
  [2] By continent
```

#### `By continent`を選択した場合

答えたい大陸を選択します。

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

### 問題数の入力

出題する問題の数を入力します。
なお、収録問題数は次のとおりです。

- All countries: 250 問
- Africa : 58 問
- Antarctica : 5 問
- Asia : 53 問
- Europe : 52 問
- North America: 41 問
- Oceania : 27 問
- South America: 14 問

```
? How many questions would you like to answer? ‣ 10
```

クイズが始まります。
国名が提示されますので、答えとなる首都名を選択してください。

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

首都名を選択すると、正解か不正解かを判定します。
不正解の場合は、正しい首都名を示します。

```
Oops! Not quite. The correct answer is "Tokyo".
```

初めに入力した問題数を出題し終えると、正解数と正解率が表示されます。

```
You got 5 out of 10 questions right! Your accuracy rate is 50%.
```

## ビューモード

## 日本語

楽しんで!

# License

This software is released under the MIT License.
