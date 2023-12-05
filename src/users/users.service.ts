import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from './entities/user.entity';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { PublicUser } from './entities/public-user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(email: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(user: RegisterDto): Promise<PublicUser> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = await this.prisma.user.create({
      data: user,
    });

    return result;
  }
}
