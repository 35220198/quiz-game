# Quiz Arena

**Think. Play. Conquer.**

A colourful, responsive browser quiz game built with plain HTML, CSS and JavaScript.

## Project files

```text
quiz-arena/
├── index.html
├── styles.css
├── scripts.js
└── README.md
```

## Run locally

1. Keep all three code files in the same folder.
2. Open `index.html` in a modern web browser.
3. Choose a category and difficulty.
4. Press **Start the challenge**.

No framework, build tool, server, or package installation is required.

## Run in OneCompiler

Use an HTML project and make sure its file tabs are named exactly:

- `index.html`
- `styles.css`
- `scripts.js`

Paste each file's matching contents into its own tab, then press **Run**. The HTML links to `./styles.css` and `./scripts.js`.

## Features

- 24 questions across six categories: Kenya, Science, Technology, Geography, General Knowledge and Nature.
- Up to 10 random questions per round.
- Randomised answer order.
- Easy (20 seconds), Medium (15 seconds) and Hard (10 seconds) timer settings.
- Live score and gradient progress bar.
- Correct/incorrect answer feedback with explanations.
- Optional generated sound effects using the Web Audio API.
- Results screen, answer review and locally saved personal best.
- Responsive layout and animated colour lighting.

## Customisation

### Change the round length

In `scripts.js`, change `questionsPerRound` inside `CONFIG`.

### Change timer lengths

Edit `secondsPerQuestion` inside `CONFIG` in `scripts.js`.

### Add questions

Add another object to the `QUESTIONS` array. The `correct` property is the zero-based index of the correct answer.

Example:

```javascript
{
  category: "NATURE",
  question: "Which animal is known as the king of the jungle?",
  answers: ["Elephant", "Lion", "Zebra", "Giraffe"],
  correct: 1,
  explanation: "The lion is commonly called the king of the jungle."
}
```

### Change the colours

Edit the CSS variables at the top of `styles.css`.

## Score storage

The personal best is stored in the current browser using `localStorage`. It is not a shared online leaderboard and does not synchronise across devices.

## Troubleshooting

- If the page has no styling, confirm the CSS tab is named `styles.css` and the HTML contains `<link rel="stylesheet" href="./styles.css">`.
- If the Start button does nothing, confirm the JavaScript tab is named `scripts.js` and the HTML contains `<script src="./scripts.js" defer></script>`.
- Make sure all files are in the same project folder and press Run again.
- If the preview is stale, refresh it or use Ctrl+F5 in your browser.
