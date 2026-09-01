import { drizzle } from "drizzle-orm/mysql2";
import { desc, eq } from "drizzle-orm";
import { InsertUser, users, contentItems, newsItems, contactSubmissions } from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try { _db = drizzle(process.env.DATABASE_URL); } catch (error) { console.warn("[Database] Failed to connect:", error); _db = null; }
  }
  return _db;
}
export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb(); if (!db) return;
  const values: InsertUser = { openId: user.openId }; const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "loginMethod"] as const;
  for (const field of textFields) { if (user[field] !== undefined) { values[field] = user[field] ?? null; updateSet[field] = user[field] ?? null; } }
  if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
  if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; } else if (user.openId === ENV.ownerOpenId) { values.role = "admin"; updateSet.role = "admin"; }
  if (!values.lastSignedIn) values.lastSignedIn = new Date(); if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}
export async function getUserByOpenId(openId: string) { const db = await getDb(); if (!db) return undefined; const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1); return result[0]; }
export async function listPublishedContent() { const db = await getDb(); if (!db) return []; return db.select().from(contentItems).where(eq(contentItems.published, 1)).orderBy(desc(contentItems.updatedAt)); }
export async function listApprovedNews() { const db = await getDb(); if (!db) return []; return db.select().from(newsItems).where(eq(newsItems.status, "approved")).orderBy(desc(newsItems.publishedAt), desc(newsItems.createdAt)); }
export async function createContactSubmission(input: { name: string; email: string; audience: string; message: string }) { const db = await getDb(); if (!db) return { success: false }; await db.insert(contactSubmissions).values(input); return { success: true }; }
export async function importPendingNews(items: Array<{ sourceName: string; sourceUrl: string; title: string; summary: string; imageUrl?: string }>) { const db = await getDb(); if (!db || items.length === 0) return { success: false, imported: 0 }; await db.insert(newsItems).values(items.map((item) => ({ ...item, status: "pending" as const }))); return { success: true, imported: items.length }; }
