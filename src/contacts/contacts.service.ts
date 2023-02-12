import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact) private contactRepo: Repository<Contact>,
  ) {}

  createContact(contact: CreateContactDto) {
    const newContact = this.contactRepo.create(contact);
    return this.contactRepo.save(newContact);
  }

  getContacts() {
    return this.contactRepo.find();
  }

  getContact(id: number) {
    return this.contactRepo.findOneBy({ id });
  }

  updateContact(id: number, updateContactDto: UpdateContactDto) {
    return this.contactRepo.update({ id }, updateContactDto);
  }

  deleteContact(id: number) {
    return this.contactRepo.delete({ id });
  }

  findContactByPhone(phone: number) {
    return this.contactRepo.findOne({ where: { cellphone: phone } });
  }
}
