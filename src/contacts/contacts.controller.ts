import {
  Controller,
  Get,
  Post,
  Body,
  Res,
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
import { Response } from 'express';
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  async createContact(@Body() contact: CreateContactDto, @Res() res: Response) {
    if (!contact.cellphone || !contact.name || !contact.last_name)
      return new HttpException(
        'Celular, nombre y apellido son requeridos',
        HttpStatus.BAD_REQUEST,
      );

    const foundContact = await this.contactsService.findContactByPhone(
      contact.cellphone,
    );
    if (foundContact)
      return new HttpException(
        'El numero de telefono ya existe',
        HttpStatus.CONFLICT,
      );

    return this.contactsService.createContact(contact);
  }

  @Get()
  getContacts(): Promise<Contact[]> {
    return this.contactsService.getContacts();
  }

  @Get(':id')
  async getContact(@Param('id', ParseIntPipe) id: number) {
    const contactFound = await this.contactsService.getContact(id);
    if (!contactFound)
      return new HttpException('Contacto no Encontrado', HttpStatus.NOT_FOUND);
    return contactFound;
  }

  @Patch(':id')
  async updateContact(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    if (!updateContactDto)
      return new HttpException(
        'No se recibieron los parametros para actualizar',
        HttpStatus.BAD_REQUEST,
      );
    if (updateContactDto?.cellphone) {
      const contactFound = await this.contactsService.findContactByPhone(
        updateContactDto.cellphone,
      );
      if (contactFound)
        return new HttpException(
          'El numero de telefono ya existe',
          HttpStatus.CONFLICT,
        );
    }

    const contactUpdated = await this.contactsService.updateContact(
      id,
      updateContactDto,
    );
    if (!contactUpdated.affected)
      return new HttpException('Contacto no encontrado', HttpStatus.NOT_FOUND);
    return contactUpdated;
  }

  @Delete(':id')
  async deleteContact(@Param('id', ParseIntPipe) id: number) {
    const userDelete = await this.contactsService.deleteContact(id);
    if (!userDelete.affected)
      return new HttpException('Contacto no encontrado', HttpStatus.NOT_FOUND);
    return userDelete;
  }
}
