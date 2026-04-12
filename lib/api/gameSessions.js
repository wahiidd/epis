// Shared in-memory game session store for Next.js API routes
export const gameSessions = global._gameSessions || (global._gameSessions = new Map());
