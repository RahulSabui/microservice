import { db } from "../config/db";
import { doctors } from "../db/schema";
import { eq } from "drizzle-orm";

type NewDoctor = typeof doctors.$inferInsert;

export class DoctorRepository {
  async create(data: NewDoctor) {
    return await db.insert(doctors).values(data);
  }

  async findAll() {
    return await db.select().from(doctors);
  }

  async findById(id: number) {
    const result = await db
      .select()
      .from(doctors)
      .where(eq(doctors.id, id));

    return result[0];
  }

  async delete(id: number) {
    await db.delete(doctors).where(eq(doctors.id, id));
  }
}