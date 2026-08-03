import { eq } from "drizzle-orm";
import { db } from "../ config/db";
import { users } from "../db/schema";
import { RegisterUserDto } from "../types/auth.types";

export class AuthRepository {
  async findByEmail(email: string) {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    return result[0];
  }

  async create(data: RegisterUserDto) {
    await db.insert(users).values(data);
  }

  async findById(id: number) {
    const result = await db
        .select()
        .from(users)
        .where(eq(users.id, id));

    return result[0];
}
}