import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.prismaService.user.findFirst({
      where: {
        email: createUserDto.email,
      },
    });

    if (userExists) {
      throw new HttpException('User already exists!', HttpStatus.CONFLICT);
    }

    try {
      await this.prismaService.user.create({
        data: createUserDto,
      });
      return 'This action adds a new user';
    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    try {
      const allUsers = await this.prismaService.user.findMany();
      return allUsers;
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          id,
        },
      });
      return user;
    } catch (err) {
      throw err;
    }
  }

  async remove(id: string) {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          id,
        },
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.CONFLICT);
      }

      await this.prismaService.user.delete({
        where: {
          id,
        },
      });
      return 'user deleted';
    } catch (err) {
      throw err;
    }
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }
}
