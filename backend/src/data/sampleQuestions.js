export const sampleQuestions = [
  // Easy questions
  {
    question: "Qu'est-ce que l'épistémologie?",
    difficulty: "easy",
    options: [
      { text: "L'étude de la connaissance", isCorrect: true },
      { text: "L'étude des émotions", isCorrect: false },
      { text: "L'étude de la physique", isCorrect: false },
      { text: "L'étude de l'histoire", isCorrect: false }
    ],
    timeLimit: 15
  },
  {
    question: "Quel philosophe est connu pour la phrase 'Je pense donc je suis'?",
    difficulty: "easy",
    options: [
      { text: "René Descartes", isCorrect: true },
      { text: "Immanuel Kant", isCorrect: false },
      { text: "David Hume", isCorrect: false },
      { text: "Socrate", isCorrect: false }
    ],
    timeLimit: 15
  },
  // Medium questions
  {
    question: "Selon Karl Popper, qu'est-ce que la falsifiabilité?",
    difficulty: "medium",
    options: [
      { text: "La capacité d'une théorie à être réfutée par l'expérience", isCorrect: true },
      { text: "L'impossibilité de prouver quelque chose", isCorrect: false },
      { text: "La vérité absolue", isCorrect: false },
      { text: "Une méthode de calcul", isCorrect: false }
    ],
    timeLimit: 20
  },
  {
    question: "Quelle est la différence principale entre l'empirisme et le rationalisme?",
    difficulty: "medium",
    options: [
      { text: "L'empirisme valorise l'expérience, le rationalisme valorise la raison", isCorrect: true },
      { text: "Ils sont identiques", isCorrect: false },
      { text: "Le rationalisme utilise les mathématiques", isCorrect: false },
      { text: "L'empirisme est plus ancien", isCorrect: false }
    ],
    timeLimit: 20
  },
  // Hard questions
  {
    question: "Qu'est-ce que le problème de Gettier en épistémologie?",
    difficulty: "hard",
    options: [
      { text: "Un défi à la définition classique de la connaissance (vraie croyance justifiée)", isCorrect: true },
      { text: "Un problème mathématique", isCorrect: false },
      { text: "Une critique du gouvernement allemand", isCorrect: false },
      { text: "Un débat sur l'existence de Dieu", isCorrect: false }
    ],
    timeLimit: 25
  },
  {
    question: "Selon Thomas Kuhn, qu'est-ce qu'un paradigme?",
    difficulty: "hard",
    options: [
      { text: "Un ensemble de présupposés et de modèles scientifiques partagés par une communauté", isCorrect: true },
      { text: "Un exemple simple", isCorrect: false },
      { text: "Une formule mathématique", isCorrect: false },
      { text: "Un langage ancien", isCorrect: false }
    ],
    timeLimit: 25
  },
  // Random difficulty questions
  {
    question: "Qu'est-ce que l'a priori en épistémologie?",
    difficulty: "random",
    options: [
      { text: "Une connaissance indépendante de l'expérience", isCorrect: true },
      { text: "Une connaissance basée sur l'expérience", isCorrect: false },
      { text: "Une hypothèse non testée", isCorrect: false },
      { text: "Un pressentiment", isCorrect: false }
    ],
    timeLimit: 15
  }
];
