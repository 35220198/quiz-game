"use strict";

/* =========================================================
   QUIZ ARENA — GAME ENGINE
   Filename: scripts.js
========================================================= */

const CONFIG = {
  questionsPerRound: 10,
  secondsPerQuestion: { easy: 20, medium: 15, hard: 10 },
  storageKey: "quizArenaBestScoreV4"
};

/* Question bank: 24 questions across six categories. */
const QUESTIONS = [
  { category: "KENYA", question: "Which city is the capital of Kenya?", answers: ["Mombasa", "Nairobi", "Kisumu", "Nakuru"], correct: 1, explanation: "Nairobi is the capital of Kenya and its largest city." },
  { category: "KENYA", question: "What is the highest mountain in Kenya?", answers: ["Mount Elgon", "Mount Longonot", "Mount Kenya", "Mount Kilimanjaro"], correct: 2, explanation: "Mount Kenya is the country's highest mountain. Its tallest peak, Batian, reaches 5,199 metres." },
  { category: "KENYA", question: "What is the official currency of Kenya?", answers: ["Kenyan shilling", "Kenyan pound", "East African dollar", "Ugandan shilling"], correct: 0, explanation: "Kenya uses the Kenyan shilling, abbreviated KSh or KES." },
  { category: "KENYA", question: "Which ocean borders Kenya?", answers: ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Arctic Ocean"], correct: 2, explanation: "Kenya's southeastern coastline borders the Indian Ocean." },

  { category: "SCIENCE", question: "Which planet is known as the Red Planet?", answers: ["Venus", "Mars", "Jupiter", "Saturn"], correct: 1, explanation: "Iron minerals on Mars have oxidised, giving its surface a reddish appearance." },
  { category: "SCIENCE", question: "What is the chemical symbol for gold?", answers: ["Go", "Ag", "Au", "Gd"], correct: 2, explanation: "Au is the chemical symbol for gold, from the Latin word aurum." },
  { category: "SCIENCE", question: "What is the process by which plants make food?", answers: ["Respiration", "Photosynthesis", "Fermentation", "Evaporation"], correct: 1, explanation: "Photosynthesis uses sunlight to convert water and carbon dioxide into sugars, releasing oxygen." },
  { category: "SCIENCE", question: "Which particle in an atom has a negative charge?", answers: ["Proton", "Neutron", "Electron", "Nucleus"], correct: 2, explanation: "Electrons carry a negative electric charge." },

  { category: "TECHNOLOGY", question: "What does HTML stand for?", answers: ["HyperText Markup Language", "HighText Machine Language", "HyperTool Multi Language", "Home Text Making Language"], correct: 0, explanation: "HTML stands for HyperText Markup Language. It structures web page content." },
  { category: "TECHNOLOGY", question: "Which of these is a programming language?", answers: ["Photoshop", "Python", "Bluetooth", "Windows"], correct: 1, explanation: "Python is widely used in web development, automation, data science and artificial intelligence." },
  { category: "TECHNOLOGY", question: "What does CPU stand for?", answers: ["Computer Power Utility", "Central Processing Unit", "Core Program Upload", "Central Performance User"], correct: 1, explanation: "The Central Processing Unit executes the instructions that make a computer operate." },
  { category: "TECHNOLOGY", question: "Which company develops Android?", answers: ["Google", "Nintendo", "Adobe", "Netflix"], correct: 0, explanation: "Google develops the Android operating system." },

  { category: "GEOGRAPHY", question: "What is the largest ocean on Earth?", answers: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"], correct: 2, explanation: "The Pacific Ocean is the largest and deepest ocean on Earth." },
  { category: "GEOGRAPHY", question: "In which country is the ancient city of Petra?", answers: ["Egypt", "Jordan", "Greece", "Morocco"], correct: 1, explanation: "Petra is an ancient archaeological city in southern Jordan." },
  { category: "GEOGRAPHY", question: "What is the capital of Japan?", answers: ["Kyoto", "Osaka", "Tokyo", "Hiroshima"], correct: 2, explanation: "Tokyo is the capital of Japan." },
  { category: "GEOGRAPHY", question: "On which continent is the Sahara Desert?", answers: ["Asia", "South America", "Africa", "Australia"], correct: 2, explanation: "The Sahara is in North Africa and is the world's largest hot desert." },

  { category: "GENERAL KNOWLEDGE", question: "How many sides does a hexagon have?", answers: ["Five", "Six", "Seven", "Eight"], correct: 1, explanation: "A hexagon is a polygon with six sides." },
  { category: "GENERAL KNOWLEDGE", question: "Which instrument measures temperature?", answers: ["Barometer", "Thermometer", "Compass", "Altimeter"], correct: 1, explanation: "A thermometer is used to measure temperature." },
  { category: "GENERAL KNOWLEDGE", question: "How many players does a standard football team have on the field?", answers: ["Nine", "Ten", "Eleven", "Twelve"], correct: 2, explanation: "A standard association football team has eleven players, including the goalkeeper." },
  { category: "GENERAL KNOWLEDGE", question: "Which language has the most native speakers worldwide?", answers: ["English", "Spanish", "Mandarin Chinese", "French"], correct: 2, explanation: "Mandarin Chinese has the largest number of native speakers worldwide." },

  { category: "NATURE", question: "What is the fastest land animal?", answers: ["Lion", "Cheetah", "Leopard", "Ostrich"], correct: 1, explanation: "The cheetah is the fastest land animal." },
  { category: "NATURE", question: "What is the largest animal known to have ever lived?", answers: ["African elephant", "Whale shark", "Blue whale", "Giraffe"], correct: 2, explanation: "The blue whale is the largest known animal ever to have lived." },
  { category: "NATURE", question: "What do bees collect from flowers to make honey?", answers: ["Nectar", "Tree bark", "Sand", "Dew only"], correct: 0, explanation: "Worker bees collect nectar from flowers and transform it into honey." },
  { category: "NATURE", question: "Which part of a plant absorbs water from the soil?", answers: ["Flower", "Leaves", "Roots", "Fruit"], correct: 2, explanation: "Roots absorb water and dissolved minerals from the soil." }
];

/* Cache all HTML elements once. */
const $ = id => document.getElementById(id);
const ui = {
  start: $("start-screen"), quiz: $("quiz-screen"), results: $("results-screen"),
  category: $("category"), difficulty: $("difficulty"), available: $("available"),
  best: $("best-score"), bestResult: $("best-result"),
  startBtn: $("start-btn"), restartBtn: $("restart-btn"), homeBtn: $("home-btn"), nextBtn: $("next-btn"), soundBtn: $("sound-btn"),
  currentCategory: $("current-category"), timerBox: $("timer-box"), time: $("time"),
  current: $("current"), total: $("total"), score: $("score"),
  progressTrack: $("progress-track"), progressFill: $("progress-fill"),
  question: $("question"), answers: $("answers"),
  feedback: $("feedback"), feedbackIcon: $("feedback-icon"), feedbackTitle: $("feedback-title"), feedbackText: $("feedback-text"),
  circle: $("score-circle"), percentage: $("percentage"), finalScore: $("final-score"), timeTaken: $("time-taken"),
  resultTitle: $("result-title"), resultText: $("result-text"), resultCategory: $("result-category"), resultPace: $("result-pace"),
  reviewCount: $("review-count"), reviewList: $("review-list"), year: $("year")
};

let round = [];
let questionIndex = 0;
let score = 0;
let locked = false;
let timerId = null;
let timerDeadline = 0;
let secondsLeft = 15;
let roundStartedAt = 0;
let mistakes = [];
let soundEnabled = false;
let audioContext = null;
let bestRecord = null;
let roundDifficulty = "medium";
let roundCategory = "all";

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function formatTime(totalSeconds) {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function getQuestionPool() {
  return roundCategory === "all"
    ? [...QUESTIONS]
    : QUESTIONS.filter(item => item.category === roundCategory);
}

function updateAvailableCount() {
  ui.available.textContent = String(Math.min(CONFIG.questionsPerRound, getQuestionPool().length));
}

function showScreen(target) {
  [ui.start, ui.quiz, ui.results].forEach(screen => screen.classList.remove("active"));
  target.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* Local high-score storage. The game still works if storage is unavailable. */
function loadBestScore() {
  try {
    const saved = localStorage.getItem(CONFIG.storageKey);
    const parsed = saved ? JSON.parse(saved) : null;
    bestRecord = parsed && Number.isFinite(parsed.percentage) && Number.isFinite(parsed.score) ? parsed : null;
  } catch (error) {
    console.warn("Quiz Arena could not read the saved score:", error);
    bestRecord = null;
  }
  updateBestScoreDisplay();
}

function updateBestScoreDisplay() {
  const label = bestRecord ? `${bestRecord.percentage}%` : "—";
  ui.best.textContent = label;
  ui.bestResult.textContent = label;
}

function saveBestScore(percentage) {
  const isBetter = !bestRecord ||
    percentage > bestRecord.percentage ||
    (percentage === bestRecord.percentage && score > bestRecord.score);
  if (!isBetter) return;

  bestRecord = { percentage, score, total: round.length, savedAt: new Date().toISOString() };
  try {
    localStorage.setItem(CONFIG.storageKey, JSON.stringify(bestRecord));
  } catch (error) {
    console.warn("Quiz Arena could not save the score:", error);
  }
}

/* Optional sound effects are generated locally; no audio files are needed. */
function playTone(frequency, duration = 0.1) {
  if (!soundEnabled) return;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  if (!audioContext) audioContext = new AudioContextClass();
  if (audioContext.state === "suspended") audioContext.resume().catch(() => {});

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const now = audioContext.currentTime;
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.045, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + duration + 0.03);
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  ui.soundBtn.textContent = soundEnabled ? "♪" : "♫";
  ui.soundBtn.setAttribute("aria-pressed", String(soundEnabled));
  ui.soundBtn.setAttribute("aria-label", soundEnabled ? "Turn sound off" : "Turn sound on");
  if (soundEnabled) playTone(660);
}

function playAnswerSound(correct) {
  if (!soundEnabled) return;
  if (correct) {
    playTone(750);
    window.setTimeout(() => playTone(980), 100);
  } else {
    playTone(260, 0.17);
  }
}

/* Timer uses a deadline so background tab throttling does not add time. */
function stopTimer() {
  if (timerId !== null) {
    window.clearInterval(timerId);
    timerId = null;
  }
}

function updateTimerDisplay() {
  ui.time.textContent = String(secondsLeft);
  ui.timerBox.classList.toggle("urgent", secondsLeft <= 5);
}

function startTimer() {
  stopTimer();
  secondsLeft = CONFIG.secondsPerQuestion[roundDifficulty] || 15;
  timerDeadline = Date.now() + secondsLeft * 1000;
  updateTimerDisplay();

  timerId = window.setInterval(() => {
    secondsLeft = Math.max(0, Math.ceil((timerDeadline - Date.now()) / 1000));
    updateTimerDisplay();
    if (secondsLeft <= 0) {
      stopTimer();
      submitAnswer(null, true);
    }
  }, 200);
}

function updateProgress(completed = false) {
  const done = questionIndex + (completed ? 1 : 0);
  const percentage = round.length ? Math.round(done / round.length * 100) : 0;
  ui.progressFill.style.width = `${percentage}%`;
  ui.progressTrack.setAttribute("aria-valuenow", String(percentage));
}

/* This function is connected directly to the Start Challenge button. */
function startGame() {
  stopTimer();
  roundCategory = ui.category.value;
  roundDifficulty = ui.difficulty.value;

  const pool = shuffle(getQuestionPool());
  round = pool.slice(0, CONFIG.questionsPerRound).map(item => ({
    ...item,
    answers: shuffle(item.answers.map((text, answerIndex) => ({
      text,
      correct: answerIndex === item.correct
    })))
  }));

  if (round.length === 0) {
    console.error("Quiz Arena: no questions were found for this category.");
    return;
  }

  questionIndex = 0;
  score = 0;
  locked = false;
  mistakes = [];
  roundStartedAt = Date.now();
  ui.score.textContent = "0";
  ui.total.textContent = String(round.length);
  showScreen(ui.quiz);
  renderQuestion();
}

function renderQuestion() {
  stopTimer();
  locked = false;
  const question = round[questionIndex];

  ui.current.textContent = String(questionIndex + 1).padStart(2, "0");
  ui.total.textContent = String(round.length).padStart(2, "0");
  ui.currentCategory.textContent = question.category;
  ui.question.textContent = question.question;
  ui.score.textContent = String(score);
  ui.answers.replaceChildren();
  ui.feedback.hidden = true;
  ui.feedback.className = "feedback";
  ui.nextBtn.hidden = true;
  ui.nextBtn.innerHTML = questionIndex === round.length - 1
    ? 'See results <span aria-hidden="true">↗</span>'
    : 'Next question <span aria-hidden="true">→</span>';
  updateProgress(false);

  question.answers.forEach((answer, answerIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-btn";
    button.dataset.answerIndex = String(answerIndex);

    const letter = document.createElement("span");
    letter.className = "option-letter";
    letter.textContent = String.fromCharCode(65 + answerIndex);

    const text = document.createElement("span");
    text.className = "option-text";
    text.textContent = answer.text;

    button.append(letter, text);
    button.addEventListener("click", () => submitAnswer(answerIndex, false));
    ui.answers.appendChild(button);
  });

  ui.question.focus({ preventScroll: true });
  startTimer();
}

function submitAnswer(selectedIndex, timedOut = false) {
  if (locked) return;
  locked = true;
  stopTimer();

  const question = round[questionIndex];
  const correctAnswer = question.answers.find(answer => answer.correct);
  const selectedAnswer = selectedIndex === null ? null : question.answers[selectedIndex];
  const isCorrect = Boolean(selectedAnswer && selectedAnswer.correct);

  [...ui.answers.children].forEach((button, answerIndex) => {
    button.disabled = true;
    if (question.answers[answerIndex].correct) button.classList.add("correct");
    if (answerIndex === selectedIndex && !isCorrect) button.classList.add("wrong");
  });

  if (isCorrect) {
    score += 1;
    ui.score.textContent = String(score);
  } else {
    mistakes.push({
      question: question.question,
      userAnswer: selectedAnswer ? selectedAnswer.text : "No answer — time ran out",
      correctAnswer: correctAnswer.text,
      explanation: question.explanation
    });
  }

  showFeedback(isCorrect, timedOut, correctAnswer.text, question.explanation);
  updateProgress(true);
  ui.nextBtn.hidden = false;
  playAnswerSound(isCorrect);
}

function showFeedback(isCorrect, timedOut, correctAnswer, explanation) {
  ui.feedback.hidden = false;
  ui.feedback.className = "feedback";

  if (isCorrect) {
    ui.feedback.classList.add("good");
    ui.feedbackIcon.textContent = "✓";
    ui.feedbackTitle.textContent = "Excellent! Correct answer.";
    ui.feedbackText.textContent = explanation;
  } else if (timedOut) {
    ui.feedback.classList.add("timeout");
    ui.feedbackIcon.textContent = "◷";
    ui.feedbackTitle.textContent = "Time is up!";
    ui.feedbackText.textContent = `The correct answer is ${correctAnswer}. ${explanation}`;
  } else {
    ui.feedback.classList.add("bad");
    ui.feedbackIcon.textContent = "×";
    ui.feedbackTitle.textContent = "Not quite. Keep going!";
    ui.feedbackText.textContent = `The correct answer is ${correctAnswer}. ${explanation}`;
  }
}

function nextQuestion() {
  if (!locked) return;
  questionIndex += 1;
  if (questionIndex < round.length) renderQuestion();
  else showResults();
}

function showResults() {
  stopTimer();
  showScreen(ui.results);

  const percentage = Math.round(score / round.length * 100);
  const elapsedSeconds = Math.floor((Date.now() - roundStartedAt) / 1000);

  ui.percentage.textContent = `${percentage}%`;
  ui.finalScore.textContent = `${score}/${round.length}`;
  ui.timeTaken.textContent = formatTime(elapsedSeconds);
  ui.circle.style.setProperty("--score-angle", `${percentage * 3.6}deg`);
  ui.resultCategory.textContent = roundCategory === "all" ? "ALL CATEGORIES" : roundCategory;
  ui.resultPace.textContent = `${roundDifficulty.toUpperCase()} PACE`;

  if (percentage === 100) {
    ui.resultTitle.textContent = "Absolutely flawless!";
    ui.resultText.textContent = "You conquered every question. A perfect round!";
  } else if (percentage >= 80) {
    ui.resultTitle.textContent = "You're on fire!";
    ui.resultText.textContent = "An outstanding performance. Your knowledge is showing.";
  } else if (percentage >= 60) {
    ui.resultTitle.textContent = "Strong effort!";
    ui.resultText.textContent = "You're getting there. One more round could make all the difference.";
  } else if (percentage >= 40) {
    ui.resultTitle.textContent = "Good start!";
    ui.resultText.textContent = "Every question is a lesson. Keep practising and beat this score.";
  } else {
    ui.resultTitle.textContent = "Your comeback starts now!";
    ui.resultText.textContent = "Stay curious, learn from the replay and come back stronger.";
  }

  saveBestScore(percentage);
  updateBestScoreDisplay();
  renderReview();
}

function renderReview() {
  ui.reviewList.replaceChildren();
  ui.reviewCount.textContent = mistakes.length === 1 ? "1 to review" : `${mistakes.length} to review`;

  if (mistakes.length === 0) {
    const message = document.createElement("div");
    message.className = "perfect-message";
    message.textContent = "Perfect score! Every answer was correct. Nothing to review — enjoy your victory!";
    ui.reviewList.appendChild(message);
    return;
  }

  mistakes.forEach((item, index) => {
    const article = document.createElement("article");
    article.className = "review-item";

    const heading = document.createElement("h3");
    heading.textContent = `${index + 1}. ${item.question}`;

    const userLine = document.createElement("p");
    userLine.className = "review-user";
    userLine.textContent = `Your answer: ${item.userAnswer}`;

    const correctLine = document.createElement("p");
    correctLine.className = "review-correct";
    correctLine.textContent = `Correct answer: ${item.correctAnswer}`;

    const explanation = document.createElement("p");
    explanation.className = "review-explanation";
    explanation.textContent = item.explanation;

    article.append(heading, userLine, correctLine, explanation);
    ui.reviewList.appendChild(article);
  });
}

function goHome() {
  stopTimer();
  showScreen(ui.start);
  updateAvailableCount();
  updateBestScoreDisplay();
}

function initializeQuizArena() {
  /* Fail clearly rather than silently leaving the Start button dead. */
  const requiredElements = Object.entries(ui).filter(([, element]) => !element);
  if (requiredElements.length) {
    console.error("Quiz Arena is missing these HTML elements:", requiredElements.map(([name]) => name));
    return;
  }

  ui.year.textContent = String(new Date().getFullYear());
  loadBestScore();
  updateAvailableCount();

  ui.startBtn.addEventListener("click", startGame);
  ui.restartBtn.addEventListener("click", startGame);
  ui.homeBtn.addEventListener("click", goHome);
  ui.nextBtn.addEventListener("click", nextQuestion);
  ui.soundBtn.addEventListener("click", toggleSound);
  ui.category.addEventListener("change", updateAvailableCount);
}

/* scripts.js is loaded with defer, so the HTML is ready here. */
initializeQuizArena();
