import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Req,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';
import { validateToken } from '../utils/utils';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  async createContact(@Body() contact: CreateContactDto, @Req() request) {
    const authorization = request.headers.authorization;
    const validateTolkenResult = validateToken({ authorization });
    if (!validateTolkenResult.success)
      throw new HttpException('token missing', HttpStatus.UNAUTHORIZED);

    if (!contact.cellphone || !contact.name || !contact.last_name)
      throw new HttpException(
        'Celular, nombre y apellido son requeridos',
        HttpStatus.BAD_REQUEST,
      );

    const foundContact = await this.contactsService.findContactByPhone(
      contact.cellphone,
    );
    if (foundContact)
      throw new HttpException(
        'El numero de telefono ya existe',
        HttpStatus.CONFLICT,
      );

    return this.contactsService.createContact(contact);
  }

  @Get()
  getContacts(@Req() request) {
    const authorization = request.headers.authorization;
    const validateTolkenResult = validateToken({ authorization });
    if (!validateTolkenResult.success)
      throw new HttpException('token missing', HttpStatus.UNAUTHORIZED);
    return this.contactsService.getContacts();
  }

  @Get(':id')
  async getContact(@Param('id', ParseIntPipe) id: number, @Req() request) {
    const contactFound = await this.contactsService.getContact(id);
    const authorization = request.headers.authorization;
    const validateTolkenResult = validateToken({ authorization });
    if (!validateTolkenResult.success)
      throw new HttpException('token missing', HttpStatus.UNAUTHORIZED);
    if (!contactFound)
      throw new HttpException('Contacto no Encontrado', HttpStatus.NOT_FOUND);
    return contactFound;
  }

  @Patch(':id')
  async updateContact(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateContactDto: UpdateContactDto,
    @Req() request,
  ) {
    const authorization = request.headers.authorization;
    const validateTolkenResult = validateToken({ authorization });
    if (!validateTolkenResult.success)
      throw new HttpException('token missing', HttpStatus.UNAUTHORIZED);
    if (!updateContactDto)
      throw new HttpException(
        'No se recibieron los parametros para actualizar',
        HttpStatus.BAD_REQUEST,
      );
    if (updateContactDto?.cellphone) {
      const contactFound = await this.contactsService.findContactByPhone(
        updateContactDto.cellphone,
      );
      if (contactFound)
        throw new HttpException(
          'El numero de telefono ya existe',
          HttpStatus.CONFLICT,
        );
    }

    const contactUpdated = await this.contactsService.updateContact(
      id,
      updateContactDto,
    );
    if (!contactUpdated.affected)
      throw new HttpException('Contacto no encontrado', HttpStatus.NOT_FOUND);
    return contactUpdated;
  }

  @Delete(':id')
  async deleteContact(@Param('id', ParseIntPipe) id: number, @Req() request) {
    const authorization = request.headers.authorization;
    const validateTolkenResult = validateToken({ authorization });
    if (!validateTolkenResult.success)
      throw new HttpException('token missing', HttpStatus.UNAUTHORIZED);
    const userDelete = await this.contactsService.deleteContact(id);
    if (!userDelete.affected)
      throw new HttpException('Contacto no encontrado', HttpStatus.NOT_FOUND);

    return userDelete;
  }
}
