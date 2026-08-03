import bcrypt from "bcrypt";
import { AuthRepository } from "../repositories/auth.repository";
import { LoginUserDto, RegisterUserDto } from "../types/auth.types";
import { generateAccessToken } from "../utils/jwt";

export class AuthService {
  private repository = new AuthRepository();

  async register(data: RegisterUserDto) {
    const existingUser = await this.repository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await this.repository.create({
      ...data,
      password: hashedPassword,
    });

    return {
      success: true,
      message: "User registered successfully",
    };
  }

  async login(data: LoginUserDto) {
  const user = await this.repository.findByEmail(data.email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(
    data.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = generateAccessToken({
    id: user.id,
    email: user.email,
  });

  return {
    success: true,
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
  }

  async getUserId(id: number) {
    return this.repository.findById(id);
  }
}