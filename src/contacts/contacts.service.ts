import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
<<<<<<< HEAD

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';

=======
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';
>>>>>>> c40cb2e7b94d1a7bfb98d68f20e1dadd0f1b26fe
@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact) private contactRepo: Repository<Contact>,
  ) {}

<<<<<<< HEAD
  createContact(contact: CreateContactDto) {
    const newContact = this.contactRepo.create(contact);
    return this.contactRepo.save(newContact);
  }

  getContacts() {
=======
  create(createContactDto: CreateContactDto) {
    return 'This action adds a new contact';
  }

  findAll() {
>>>>>>> c40cb2e7b94d1a7bfb98d68f20e1dadd0f1b26fe
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
