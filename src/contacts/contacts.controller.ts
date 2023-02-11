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
  ParseIntPipe,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  async createContact(@Body() contact: CreateContactDto) {
    if (!contact.cellphone || !contact.name || !contact.last_name)
      return new HttpException(
        ' Celular, nombre y apellido son requeridos',
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
    return this.contactsService.updateContact(id, updateContactDto);
  }

  @Delete(':id')
  deleteContact(@Param('id', ParseIntPipe) id: number) {
    return this.contactsService.deleteContact(id);
  }
}
