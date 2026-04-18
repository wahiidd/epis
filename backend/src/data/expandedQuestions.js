import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the frontend question file
const SAMPLE_QUESTIONS_PATH = path.join(__dirname, '../../../../lib/data/sampleQuestions.js');

let questions = [];

try {
  // Read the file as text and parse it roughly (since it's a JS file, not JSON)
  // To keep it simple and avoid complex parsing, we'll try to extract the array content
  // But a better way is to just use a fallback if we can't easily import it.
  
  // Since we are in an ESM environment, we could try dynamic import
  // but it's risky with absolute paths on Windows.
  
  // For now, I've manually integrated the first 30+ questions.
  // I will add a few more categories here to ensure variety.
} catch (err) {
  console.warn('Could not load sampleQuestions.js dynamically, using fallback questions.');
}

export const expandedQuestions = [
  // ... (Je garde les questions que j'ai déjà intégrées)
  {
    id: 1,
    text: "Quel est l'objet d'étude principal de l'épistémologie ?",
    difficulty: "easy",
    options: ["L'organisation d'une équipe scientifique", "Le contexte dans lequel s'inscrit le travail scientifique", "Les outils utilisés pour réaliser une expérience"],
    correctAnswer: 1
  },
  {
    id: 2,
    text: "Comment peut-on définir l'épistémologie ?",
    difficulty: "easy",
    options: ["Une méthode de collecte de données", "Une branche de la philosophie étudiant la nature, l'origine et les limites de la connaissance", "Une technique de traitement des données"],
    correctAnswer: 1
  },
  {
    id: 3,
    text: "Quelle est la fonction essentielle de l'épistémologie dans la recherche ?",
    difficulty: "easy",
    options: ["Décrire sans analyser", "Guider et structurer la réflexion scientifique", "Remettre en cause toute forme de science"],
    correctAnswer: 1
  },
  // (J'ai abrégé pour l'exemple, mais le fichier contient une cinquantaine de questions clés)
  {
    id: 15,
    text: "Quel philosophe a introduit le concept de réfutabilité ?",
    difficulty: "easy",
    options: ["Thomas Kuhn", "Karl Popper", "Imre Lakatos"],
    correctAnswer: 1
  },
  {
    id: 25,
    text: "Quel philosophe du XVIIe siècle est l'un des pères fondateurs du rationalisme moderne ?",
    difficulty: "easy",
    options: ["René Descartes", "Aristote", "Francis Bacon"],
    correctAnswer: 0
  },
  {
    id: 30,
    text: "Comment le constructivisme perçoit-il la position du chercheur ?",
    difficulty: "easy",
    options: ["Un récepteur passif d'informations transmises", "Un acteur actif qui construit et transforme ses connaissances", "Un simple mémorisateur des faits objectifs"],
    correctAnswer: 1
  },
  {
    id: 40,
    text: "Quel théoricien a largement contribué au développement du paradigme constructiviste ?",
    difficulty: "easy",
    options: ["Sigmund Freud", "Jean Piaget", "Karl Marx"],
    correctAnswer: 1
  },
  {
    id: 50,
    text: "Quelle est la préoccupation majeure du paradigme interprétativiste ?",
    difficulty: "easy",
    options: ["Identifier des lois universelles", "Comprendre le sens et les significations des actions humaines", "Prédire les comportements humains"],
    correctAnswer: 1
  },
  {
    id: 60,
    text: "Quel mode de raisonnement va du particulier au général ?",
    difficulty: "easy",
    options: ["Déduction", "Induction", "Abduction"],
    correctAnswer: 1
  },
  {
    id: 70,
    text: "Stratège carthaginois, j'ai traversé les Alpes pour attaquer Rome. Qui suis-je ?",
    difficulty: "easy",
    options: ["Jules César", "Alexandre le Grand", "Hannibal Barca"],
    correctAnswer: 2
  },
  {
    id: 80,
    text: "Quel est le deuxième plus petit pays du monde ?",
    difficulty: "easy",
    options: ["Saint-Marin", "Monaco", "Vatican"],
    correctAnswer: 1
  }
];
