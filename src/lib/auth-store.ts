import bcrypt from "bcryptjs";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type { SessionUser } from "./types";

interface StoredUser {
  id: string;
  email: string;
  passwordHash?: string;
  googleId?: string;
  name?: string;
  createdAt: string;
}

const USERS_FILE = path.join(process.cwd(), ".data", "users.json");

async function readUsers(): Promise<Map<string, StoredUser>> {
  try {
    await mkdir(path.dirname(USERS_FILE), { recursive: true });
    const raw = await readFile(USERS_FILE, "utf-8");
    const list = JSON.parse(raw) as StoredUser[];
    return new Map(list.map((u) => [u.email, u]));
  } catch {
    return new Map();
  }
}

async function writeUsers(users: Map<string, StoredUser>): Promise<void> {
  await mkdir(path.dirname(USERS_FILE), { recursive: true });
  await writeFile(
    USERS_FILE,
    JSON.stringify(Array.from(users.values()), null, 2),
    "utf-8",
  );
}

export async function createUser(
  email: string,
  password: string,
): Promise<SessionUser> {
  const normalized = email.trim().toLowerCase();
  const users = await readUsers();

  if (users.has(normalized)) {
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

  users.set(normalized, user);
  await writeUsers(users);

  return { id: user.id, email: user.email };
}

export async function verifyUser(
  email: string,
  password: string,
): Promise<SessionUser | null> {
  const normalized = email.trim().toLowerCase();
  const users = await readUsers();
  const user = users.get(normalized);
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
  const users = await readUsers();

  for (const user of users.values()) {
    if (user.googleId === googleId) {
      return { id: user.id, email: user.email };
    }
  }

  const existing = users.get(normalized);
  if (existing) {
    existing.googleId = googleId;
    if (name) existing.name = name;
    await writeUsers(users);
    return { id: existing.id, email: existing.email };
  }

  const user: StoredUser = {
    id: crypto.randomUUID(),
    email: normalized,
    googleId,
    name,
    createdAt: new Date().toISOString(),
  };

  users.set(normalized, user);
  await writeUsers(users);
  return { id: user.id, email: user.email };
}

export async function getUserById(id: string): Promise<SessionUser | null> {
  const users = await readUsers();
  for (const user of users.values()) {
    if (user.id === id) return { id: user.id, email: user.email };
  }
  return null;
}
