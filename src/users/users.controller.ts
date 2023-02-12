import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();
const configService = new ConfigService();
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto.email || !createUserDto.password)
      throw new HttpException(
        'Email y contraseña son Requeridos',
        HttpStatus.BAD_REQUEST,
      );
    const foundUser = await this.usersService.findUserByEmail(
      createUserDto.email,
    );
    console.log(foundUser);
    if (foundUser)
      throw new HttpException(
        'Ya existe un usuario registrado con este correo',
        HttpStatus.CONFLICT,
      );
    const saltRound = 10;
    const passHash = await bcrypt.hash(createUserDto.password, saltRound);
    console.log(passHash);
    createUserDto.password = passHash;
    return this.usersService.createUser(createUserDto);
  }

  @Post('/login')
  async loginUser(@Body() loginUserDto: LoginUserDto, @Res() response) {
    if (!loginUserDto.email || !loginUserDto.password)
      throw new HttpException(
        'Email y contraseña son Requeridos',
        HttpStatus.BAD_REQUEST,
      );
    const foundUser = await this.usersService.findUserByEmail(
      loginUserDto.email,
    );
    const validatePassword = !foundUser
      ? null
      : await bcrypt.compare(loginUserDto.password, foundUser.password);
    if (!(foundUser && validatePassword))
      throw new HttpException(
        'usuario o contraseña Invalida',
        HttpStatus.UNAUTHORIZED,
      );
    const userForToken = { ...foundUser };
    const token = jwt.sign(userForToken, configService.get('SECRET_JWT'), {
      expiresIn: 60 * 60 * 24 * 7,
    });

    return response.status(HttpStatus.OK).json({
      message: 'User found',
      data: {
        name: `${foundUser.name} ${foundUser.lastName}`,
        token,
        email: foundUser.email,
        id: foundUser.id,
      },
    });
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
