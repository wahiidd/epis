import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  onSnapshot, 
  query, 
  where, 
  getDocs,
  serverTimestamp,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../firebase';

const SESSIONS_COLLECTION = 'game_sessions';

/**
 * Create a new pending game session in Firestore
 */
export const createGameSession = async (gameData) => {
  try {
    const docRef = await addDoc(collection(db, SESSIONS_COLLECTION), {
      ...gameData,
      status: 'pending',
      createdAt: serverTimestamp(),
    });
    return { success: true, gameId: docRef.id };
  } catch (error) {
    console.error("Error creating game session: ", error);
    return { success: false, error: error.message };
  }
};

/**
 * Listen to real-time status of a game session
 */
export const listenToGameStatus = (gameId, onUpdate) => {
  if (!gameId) return () => {};
  const docRef = doc(db, SESSIONS_COLLECTION, gameId);
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      onUpdate({ id: docSnap.id, ...docSnap.data() });
    }
  });
};

/**
 * Get all pending games (for Admin)
 */
export const getPendingGames = async () => {
  try {
    const q = query(collection(db, SESSIONS_COLLECTION), where('status', '==', 'pending'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting pending games: ", error);
    return [];
  }
};

/**
 * Listen to all pending games in real-time (for Admin)
 */
export const listenToPendingGames = (onUpdate) => {
  const q = query(
    collection(db, SESSIONS_COLLECTION), 
    where('status', '==', 'pending')
  );
  
  return onSnapshot(q, (querySnapshot) => {
    const games = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    onUpdate(games);
  });
};

/**
 * Update game status (Approve/Reject)
 */
export const updateGameStatus = async (gameId, status) => {
  try {
    const docRef = doc(db, SESSIONS_COLLECTION, gameId);
    await updateDoc(docRef, { status });
    return { success: true };
  } catch (error) {
    console.error("Error updating game status: ", error);
    return { success: false, error: error.message };
  }
};

/**
 * Update the entire players array (including scores)
 */
export const updateGamePlayers = async (gameId, players) => {
  try {
    const docRef = doc(db, SESSIONS_COLLECTION, gameId);
    await updateDoc(docRef, { 
      players,
      updatedAt: serverTimestamp() 
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating players: ", error);
    return { success: false, error: error.message };
  }
};

/**
 * Mark game as finished and store final ranking
 */
export const completeGame = async (gameId, ranking) => {
  try {
    const docRef = doc(db, SESSIONS_COLLECTION, gameId);
    await updateDoc(docRef, { 
      status: 'finished',
      ranking,
      finishedAt: serverTimestamp() 
    });
    return { success: true };
  } catch (error) {
    console.error("Error completing game: ", error);
    return { success: false, error: error.message };
  }
};
