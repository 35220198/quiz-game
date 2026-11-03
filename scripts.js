"use strict";

const CONFIG = {
  questionsPerRound: 10,
  secondsPerQuestion: { easy: 20, medium: 15, hard: 10 },
  storageKey: "quizArenaLifeApprovalBestV5"
};

const QUESTIONS = [
  { category: "SELF-LOVE", question: "When you reflect on a past mistake or detour, what is your primary feeling towards your former self?", answers: ["Harsh criticism and regret", "Indifference and avoidance", "Deep compassion, knowing I did my best with what I knew then", "Constant worry about repeating it"], correct: 2, explanation: "Deep compassion honors your growth and acknowledges that you always did the best you could with the awareness you had at that moment." },
  { category: "SELF-LOVE", question: "How do you respond when you look in the mirror and acknowledge your unique presence?", answers: ["I pick apart every single perceived flaw", "I feel a warm wave of appreciation for my resilience and growth", "I avoid looking too closely", "I compare myself to impossible standards"], correct: 1, explanation: "Approaching yourself with appreciation celebrates the incredible journey your body and spirit have traveled together." },
  { category: "SELF-LOVE", question: "What does genuine self-care mean to you in your daily rhythm?", answers: ["A luxury I must endlessly earn through exhaustion", "A non-negotiable celebration of my vitality and well-being", "A waste of productive time", "Something I only do when I collapse"], correct: 1, explanation: "Rest and self-care are essential fuel for your vitality, not rewards that must be earned through burnout." },
  { category: "SELF-LOVE", question: "If you could give one profound approval stamp to your life right this second, what would it declare?", answers: ["I am whole, wonderfully capable, and proud of who I am becoming", "I am completely lost and unqualified", "I am waiting for permission to approve of myself", "I need everyone else's approval first"], correct: 0, explanation: "Your self-worth is inherently yours. Recognizing your wholeness empowers every step of your journey." },

  { category: "RESILIENCE", question: "When a sudden unexpected storm disrupts your plans, what is your internal dialogue?", answers: ["Everything is ruined and I am helpless", "I trust my inner fortitude; I have navigated storms before and emerged stronger", "Blaming myself for not planning better", "Panicking with no direction"], correct: 1, explanation: "Trusting your resilience reminds you that challenges are temporary tests of strength from which you always rise." },
  { category: "RESILIENCE", question: "How comfortable are you with celebrating your own quiet victories and personal milestones?", answers: ["I brush them off as unimportant", "I wait for someone else to validate me", "I proudly champion my own wins, knowing every step counts", "I feel uncomfortable acknowledging success"], correct: 2, explanation: "Championing your own wins builds momentum and reinforces your belief in your incredible capabilities." },
  { category: "RESILIENCE", question: "When dealing with self-doubt or inner resistance, how do you respond?", answers: ["I surrender immediately and give up", "I answer doubt with bold action and unwavering belief in my potential", "I pretend the doubt does not exist", "I let fear dictate my choices"], correct: 1, explanation: "Action is the ultimate antidote to doubt. Stepping forward despite fear proves your inner courage." },
  { category: "RESILIENCE", question: "How do you view unexpected detours or changes in your life path?", answers: ["As catastrophic failures", "As valuable lessons and pivot points guiding me toward alignment", "As proof that I cannot succeed", "As unfair punishments"], correct: 1, explanation: "Revising your perspective on detours turns roadblocks into stepping stones toward greater fulfillment." },

  { category: "BOUNDARIES", question: "How do you view the boundaries you set in your personal and professional relationships?", answers: ["As a sacred act of self-respect protecting my inner peace", "As something I feel guilty or selfish for enforcing", "As barriers that push people away", "I rarely set boundaries at all"], correct: 0, explanation: "Boundaries are not walls; they are clear expressions of self-respect that preserve your precious energy." },
  { category: "BOUNDARIES", question: "When someone asks too much of your time and energy, what is your immediate instinct?", answers: ["Saying yes out of guilt while resenting it internally", "Pausing to evaluate my capacity and offering a kind, clear boundary", "Agreeing instantly to avoid any discomfort", "Ignoring them completely"], correct: 1, explanation: "Honoring your personal limits with kindness protects your well-being and fosters authentic relationships." },
  { category: "BOUNDARIES", question: "How do you handle saying 'no' to requests that drain your spirit?", answers: ["With guilt and endless apologies", "With calm confidence, knowing a 'no' to others is a loving 'yes' to myself", "By lying to avoid the conversation", "By feeling like a bad person"], correct: 1, explanation: "Saying no is a powerful affirmation of your priorities and a commitment to your mental peace." },
  { category: "BOUNDARIES", question: "What role does protecting your peace play in your daily life?", answers: ["It is a luxury I cannot afford", "It is my highest priority and foundation for outward success", "It is secondary to everyone else's demands", "It happens only on weekends"], correct: 1, explanation: "Protecting your inner peace allows you to show up as your strongest, most grounded self." },

  { category: "PURPOSE", question: "When comparing your personal timeline to societal expectations, how do you ground yourself?", answers: ["I feel like I am falling behind", "I honor my own sacred pace; my journey cannot be rushed", "I stress over what others think of my status", "I rush recklessly to catch up"], correct: 1, explanation: "Your life is not a race against a clock. Honoring your sacred pace brings profound inner peace." },
  { category: "PURPOSE", question: "What motivates your daily pursuits and long-term aspirations?", answers: ["Proving my worth to critics", "Fulfilling societal milestones to gain applause", "Aligning with my authentic passions and inner joy", "Fear of falling short"], correct: 2, explanation: "True fulfillment blooms when your actions align with your authentic values and joy." },
  { category: "PURPOSE", question: "How do you approach discovering your unique gifts and talents?", answers: ["I assume I have none", "Through joyful curiosity, exploration, and self-expression", "By copying what successful people do", "By waiting for lightning to strike"], correct: 1, explanation: "Curiosity and playful exploration are your greatest tools for uncovering your unique brilliance." },
  { category: "PURPOSE", question: "When you visualize your future, what feeling anchors your vision?", answers: ["Anxiety and uncertainty", "Excitement, alignment, and deep self-trust", "Doubt and hesitation", "Pressure and obligation"], correct: 1, explanation: "Visualizing your future with self-trust magnetizes the exact growth and joy you deserve." },

  { category: "MINDFULNESS", question: "How do you anchor yourself when external criticism or opinions are loud?", answers: ["My self-worth is anchored internally; external opinions do not define my joy", "I let every criticism crush my confidence", "I retaliate defensively to every comment", "I absorb every negative word as absolute truth"], correct: 0, explanation: "When your worth is anchored within, external opinions lose their power to steal your peace." },
  { category: "MINDFULNESS", question: "How do you experience the present moment during a busy day?", answers: ["Constantly rushing toward the next task", "Pausing to breathe and noticing the beauty in small details", "Living entirely in past regrets or future worries", "Feeling numb and detached"], correct: 1, explanation: "Pausing to breathe anchors you in the present, where your power and peace truly reside." },
  { category: "MINDFULNESS", question: "What is your relationship with your inner critic?", answers: ["I obey its every command without question", "I observe it with gentle curiosity and reframe its voice with kindness", "I feed it with more self-judgment", "I pretend it doesn't exist while feeling miserable"], correct: 1, explanation: "Treating your inner critic with compassionate awareness transforms judgment into encouragement." },
  { category: "MINDFULNESS", question: "How do you process heavy emotions when they arise?", answers: ["Suppressing them immediately", "Allowing myself to feel them fully without judgment, letting them flow through", "Drowning them out with distractions", "Blaming everyone around me"], correct: 1, explanation: "Allowing emotions to move through you without judgment is the key to emotional freedom." },

  { category: "GROWTH", question: "How do you view challenges and obstacles on your path?", answers: ["As insurmountable roadblocks", "As gym sessions for my soul that build strength and wisdom", "As personal punishments", "As signs to quit immediately"], correct: 1, explanation: "Every obstacle is an opportunity to expand your strength, adaptability, and wisdom." },
  { category: "GROWTH", question: "What does continuous personal evolution mean to you?", answers: ["Fixing everything 'broken' about me", "Unfolding into a truer, freer expression of who I really am", "Achieving perfection by a certain age", "Competing with everyone around me"], correct: 1, explanation: "Growth is not about fixing flaws; it is about uncovering and celebrating your truest self." },
  { category: "GROWTH", question: "How do you approach learning new skills or stepping into the unknown?", answers: ["With dread because I might make mistakes", "With adventurous excitement, knowing curiosity beats perfection", "By avoiding anything uncomfortable", "By demanding perfection on the first try"], correct: 1, explanation: "Embracing beginner's mind opens doors to incredible growth and joyful discovery." },
  { category: "GROWTH", question: "When you achieve a major goal, how do you integrate the victory?", answers: ["Immediately moving to the next stressful target without pausing", "Savoring the accomplishment, celebrating deeply, and thanking myself", "Downplaying it as luck", "Worrying about maintaining it"], correct: 1, explanation: "Savoring your victories honors your hard work and wires your brain for continuous success." }
];

const $ = id => document.getElementById(id);

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
  const catSelect = $("category");
  roundCategory = catSelect ? catSelect.value : "all";
  return roundCategory === "all" ? [...QUESTIONS] : QUESTIONS.filter(item => item.category === roundCategory);
}

function updateAvailableCount() {
  const availableEl = $("available");
  if (availableEl) {
    availableEl.textContent = String(Math.min(CONFIG.questionsPerRound, getQuestionPool().length));
  }
}

function showScreen(targetElement) {
  const startScreen = $("start-screen");
  const quizScreen = $("quiz-screen");
  const resultsScreen = $("results-screen");

  [startScreen, quizScreen, resultsScreen].forEach(screen => {
    if (screen) screen.classList.remove("active");
  });

  if (targetElement) {
    targetElement.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function loadBestScore() {
  try {
    const saved = localStorage.getItem(CONFIG.storageKey);
    const parsed = saved ? JSON.parse(saved) : null;
    bestRecord = parsed && Number.isFinite(parsed.percentage) && Number.isFinite(parsed.score) ? parsed : null;
  } catch (error) {
    bestRecord = null;
  }
  updateBestScoreDisplay();
}

function updateBestScoreDisplay() {
  const label = bestRecord ? `${bestRecord.percentage}%` : "—";
  const bestEl = $("best-score");
  const bestResEl = $("best-result");
  if (bestEl) bestEl.textContent = label;
  if (bestResEl) bestResEl.textContent = label;
}

function saveBestScore(percentage) {
  const isBetter = !bestRecord || percentage > bestRecord.percentage || (percentage === bestRecord.percentage && score > bestRecord.score);
  if (!isBetter) return;
  bestRecord = { percentage, score, total: round.length, savedAt: new Date().toISOString() };
  try {
    localStorage.setItem(CONFIG.storageKey, JSON.stringify(bestRecord));
  } catch (error) {}
}

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
  const soundBtn = $("sound-btn");
  if (soundBtn) {
    soundBtn.textContent = soundEnabled ? "♪" : "♫";
    soundBtn.setAttribute("aria-pressed", String(soundEnabled));
  }
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

function stopTimer() {
  if (timerId !== null) {
    window.clearInterval(timerId);
    timerId = null;
  }
}

function updateTimerDisplay() {
  const timeEl = $("time");
  const timerBoxEl = $("timer-box");
  if (timeEl) timeEl.textContent = String(secondsLeft);
  if (timerBoxEl) timerBoxEl.classList.toggle("urgent", secondsLeft <= 5);
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
  const progressFill = $("progress-fill");
  const progressTrack = $("progress-track");
  if (progressFill) progressFill.style.width = `${percentage}%`;
  if (progressTrack) progressTrack.setAttribute("aria-valuenow", String(percentage));
}

function startGame() {
  stopTimer();
  const catSelect = $("category");
  const diffSelect = $("difficulty");
  roundCategory = catSelect ? catSelect.value : "all";
  roundDifficulty = diffSelect ? diffSelect.value : "medium";

  const pool = shuffle(getQuestionPool());
  round = pool.slice(0, CONFIG.questionsPerRound).map(item => ({
    ...item,
    answers: shuffle(item.answers.map((text, answerIndex) => ({
      text,
      correct: answerIndex === item.correct
    })))
  }));

  if (round.length === 0) return;

  questionIndex = 0;
  score = 0;
  locked = false;
  mistakes = [];
  roundStartedAt = Date.now();
  
  const scoreEl = $("score");
  const totalEl = $("total");
  if (scoreEl) scoreEl.textContent = "0";
  if (totalEl) totalEl.textContent = String(round.length);
  
  showScreen($("quiz-screen"));
  renderQuestion();
}

function renderQuestion() {
  stopTimer();
  locked = false;
  const question = round[questionIndex];

  const currentEl = $("current");
  const totalEl = $("total");
  const currentCatEl = $("current-category");
  const questionEl = $("question");
  const scoreEl = $("score");
  const answersEl = $("answers");
  const feedbackEl = $("feedback");
  const nextBtnEl = $("next-btn");

  if (currentEl) currentEl.textContent = String(questionIndex + 1).padStart(2, "0");
  if (totalEl) totalEl.textContent = String(round.length).padStart(2, "0");
  if (currentCatEl) currentCatEl.textContent = question.category;
  if (questionEl) questionEl.textContent = question.question;
  if (scoreEl) scoreEl.textContent = String(score);
  if (answersEl) answersEl.replaceChildren();
  
  if (feedbackEl) {
    feedbackEl.hidden = true;
    feedbackEl.className = "feedback";
  }
  
  if (nextBtnEl) {
    nextBtnEl.hidden = true;
    nextBtnEl.innerHTML = questionIndex === round.length - 1
      ? 'See results <span aria-hidden="true">↗</span>'
      : 'Next question <span aria-hidden="true">→</span>';
  }
  
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
    if (answersEl) answersEl.appendChild(button);
  });

  if (questionEl) questionEl.focus({ preventScroll: true });
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

  const answersEl = $("answers");
  if (answersEl) {
    [...answersEl.children].forEach((button, answerIndex) => {
      button.disabled = true;
      if (question.answers[answerIndex].correct) button.classList.add("correct");
      if (answerIndex === selectedIndex && !isCorrect) button.classList.add("wrong");
    });
  }

  if (isCorrect) {
    score += 1;
    const scoreEl = $("score");
    if (scoreEl) scoreEl.textContent = String(score);
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
  
  const nextBtnEl = $("next-btn");
  if (nextBtnEl) nextBtnEl.hidden = false;
  
  playAnswerSound(isCorrect);
}

function showFeedback(isCorrect, timedOut, correctAnswer, explanation) {
  const feedbackEl = $("feedback");
  if (!feedbackEl) return;
  
  feedbackEl.hidden = false;
  feedbackEl.className = "feedback";

  const iconEl = $("feedback-icon");
  const titleEl = $("feedback-title");
  const textEl = $("feedback-text");

  if (isCorrect) {
    feedbackEl.classList.add("good");
    if (iconEl) iconEl.textContent = "✓";
    if (titleEl) titleEl.textContent = "Beautiful insight! Perfectly aligned.";
    if (textEl) textEl.textContent = explanation;
  } else if (timedOut) {
    feedbackEl.classList.add("timeout");
    if (iconEl) iconEl.textContent = "◷";
    if (titleEl) titleEl.textContent = "Time is up!";
    if (textEl) textEl.textContent = `The empowering choice is: ${correctAnswer}. ${explanation}`;
  } else {
    feedbackEl.classList.add("bad");
    if (iconEl) iconEl.textContent = "×";
    if (titleEl) titleEl.textContent = "A wonderful learning moment.";
    if (textEl) textEl.textContent = `The empowering choice is: ${correctAnswer}. ${explanation}`;
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
  showScreen($("results-screen"));

  const percentage = Math.round(score / round.length * 100);
  const elapsedSeconds = Math.floor((Date.now() - roundStartedAt) / 1000);

  const percentageEl = $("percentage");
  const finalScoreEl = $("final-score");
  const timeTakenEl = $("time-taken");
  const circleEl = $("score-circle");
  const resCatEl = $("result-category");
  const resPaceEl = $("result-pace");
  const resTitleEl = $("result-title");
  const resTextEl = $("result-text");

  if (percentageEl) percentageEl.textContent = `${percentage}%`;
  if (finalScoreEl) finalScoreEl.textContent = `${score}/${round.length}`;
  if (timeTakenEl) timeTakenEl.textContent = formatTime(elapsedSeconds);
  if (circleEl) circleEl.style.setProperty("--score-angle", `${percentage * 3.6}deg`);
  if (resCatEl) resCatEl.textContent = roundCategory === "all" ? "ALL CATEGORIES" : roundCategory;
  if (resPaceEl) resPaceEl.textContent = `${roundDifficulty.toUpperCase()} PACE`;

  if (resTitleEl && resTextEl) {
    if (percentage === 100) {
      resTitleEl.textContent = "Radiant Soul Level!";
      resTextEl.textContent = "You radiate deep self-approval, emotional resilience, and authentic grace.";
    } else if (percentage >= 80) {
      resTitleEl.textContent = "Growing Bloom Level!";
      resTextEl.textContent = "You are on a powerful, beautiful journey of self-discovery and acceptance.";
    } else if (percentage >= 60) {
      resTitleEl.textContent = "Tender Awakening Level!";
      resTextEl.textContent = "You are embracing a transformative chapter of radical self-love.";
    } else {
      resTitleEl.textContent = "Your sacred journey continues!";
      resTextEl.textContent = "Every reflection is a step closer to unshakeable self-approval.";
    }
  }

  saveBestScore(percentage);
  updateBestScoreDisplay();
  renderReview();
}

function renderReview() {
  const reviewList = $("review-list");
  const reviewCount = $("review-count");
  if (!reviewList || !reviewCount) return;
  
  reviewList.replaceChildren();
  reviewCount.textContent = mistakes.length === 1 ? "1 to review" : `${mistakes.length} to review`;

  if (mistakes.length === 0) {
    const message = document.createElement("div");
    message.className = "perfect-message";
    message.textContent = "Flawless reflection! Every choice aligned with deep self-approval.";
    reviewList.appendChild(message);
    return;
  }

  mistakes.forEach((item, index) => {
    const article = document.createElement("article");
    article.className = "review-item";

    const heading = document.createElement("h3");
    heading.textContent = `${index + 1}. ${item.question}`;

    const userLine = document.createElement("p");
    userLine.className = "review-user";
    userLine.textContent = `Your choice: ${item.userAnswer}`;

    const correctLine = document.createElement("p");
    correctLine.className = "review-correct";
    correctLine.textContent = `Empowered choice: ${item.correctAnswer}`;

    const explanation = document.createElement("p");
    explanation.className = "review-explanation";
    explanation.textContent = item.explanation;

    article.append(heading, userLine, correctLine, explanation);
    reviewList.appendChild(article);
  });
}

function goHome() {
  stopTimer();
  showScreen($("start-screen"));
  updateAvailableCount();
  updateBestScoreDisplay();
}

function initializeQuizArena() {
  const yearEl = $("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  
  loadBestScore();
  updateAvailableCount();

  const startBtn = $("start-btn");
  const restartBtn = $("restart-btn");
  const homeBtn = $("home-btn");
  const nextBtn = $("next-btn");
  const soundBtn = $("sound-btn");
  const categorySelect = $("category");

  if (startBtn) {
    startBtn.addEventListener("click", (e) => {
      e.preventDefault();
      startGame();
    });
  }
  
  if (restartBtn) {
    restartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      startGame();
    });
  }
  
  if (homeBtn) {
    homeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      goHome();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      nextQuestion();
    });
  }
  
  if (soundBtn) {
    soundBtn.addEventListener("click", toggleSound);
  }
  
  if (categorySelect) {
    categorySelect.addEventListener("change", updateAvailableCount);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeQuizArena);
} else {
  initializeQuizArena();
}
