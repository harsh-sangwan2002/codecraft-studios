import Contact from './model';

export async function createContact(data: any) {
  const contact = new Contact(data);
  await contact.save();
  return contact;
}

export async function getContacts() {
  return Contact.find().sort({ createdAt: -1 });
} 