import * as crypto from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { PrismaService } from 'src/prisma.service';
import * as argon2 from "argon2";

@Injectable()
export class AuthService {
  constructor(private readonly db: PrismaService) {}

  async login(loginData: LoginDto) {
    const user = await this.db.user.findUniqueOrThrow({
      where: { email: loginData.email }
    })
    if(await argon2.verify(user.password, loginData.password)) {
      const token = crypto.randomBytes(64).toString('hex');
      await this.db.token.create({
        data: {
          token,
          user: { connect: { id: user.id } }
        }
      })
      return {
        token,
        userid: user.id,
      }
    } else {
      throw new Error("Wrong password");
    }
  }
}
