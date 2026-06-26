import bcrypt from "bcryptjs";
import { connectToDatabase } from "./mongodb";
import type { SessionUser } from "./types";

interface StoredUser {
  id: string;
  email: string;
  passwordHash?: string;
  googleId?: string;
  name?: string;
  createdAt: string;
}

export async function createUser(
  email: string,
  password: string,
): Promise<SessionUser> {
  const normalized = email.trim().toLowerCase();
  const { db } = await connectToDatabase();
  const collection = db.collection<StoredUser>("users");

  const existing = await collection.findOne({ email: normalized });
  if (existing) {
    throw new Error("An account with this email already exists.");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }

  const user: StoredUser = {
    id: crypto.randomUUID(),
    email: normalized,
    passwordHash: await bcrypt.hash(password, 10),
    createdAt: new Date().toISOString(),
  };

  await collection.insertOne(user);
  return { id: user.id, email: user.email };
}

export async function verifyUser(
  email: string,
  password: string,
): Promise<SessionUser | null> {
  const normalized = email.trim().toLowerCase();
  const { db } = await connectToDatabase();
  const collection = db.collection<StoredUser>("users");

  const user = await collection.findOne({ email: normalized });
  if (!user?.passwordHash) return null;

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return null;

  return { id: user.id, email: user.email };
}

export async function findOrCreateGoogleUser(
  googleId: string,
  email: string,
  name?: string,
): Promise<SessionUser> {
  const normalized = email.trim().toLowerCase();
  const { db } = await connectToDatabase();
  const collection = db.collection<StoredUser>("users");

  // Check by Google ID
  let user = await collection.findOne({ googleId });
  if (user) {
    return { id: user.id, email: user.email };
  }

  // Check by Email
  user = await collection.findOne({ email: normalized });
  if (user) {
    await collection.updateOne(
      { email: normalized },
      { $set: { googleId, ...(name ? { name } : {}) } }
    );
    return { id: user.id, email: user.email };
  }

  // Create new
  const newUser: StoredUser = {
    id: crypto.randomUUID(),
    email: normalized,
    googleId,
    name,
    createdAt: new Date().toISOString(),
  };

  await collection.insertOne(newUser);
  return { id: newUser.id, email: newUser.email };
}

export async function getUserById(id: string): Promise<SessionUser | null> {
  const { db } = await connectToDatabase();
  const collection = db.collection<StoredUser>("users");

  const user = await collection.findOne({ id });
  if (!user) return null;

  return { id: user.id, email: user.email };
}
