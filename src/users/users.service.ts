import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as argon2 from "argon2";
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly db: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPw = await argon2.hash(createUserDto.password);
    const user = await this.db.user.create({
      data: {
        ...createUserDto,
        password: hashedPw,
      },
    })
    delete user.password;
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async getUserByToken(token: string) {
    const tokenObj = await this.db.token.findUnique({
      where: { token },
      include: { user: true }
    })
    if (!tokenObj) return null;
    const user = tokenObj.user;
    delete user.password;
    return user;
  }

}
