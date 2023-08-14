import { useState, useEffect } from 'react';
import Form from './Form/Form';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import css from './PhoneBook.module.css';

export default function PhoneBook() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');


  useEffect(() => {
    const localStorageContacts = localStorage.getItem('contacts');
    if (localStorageContacts) {
      setContacts(JSON.parse(localStorageContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddNewContact = newContact => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizeFilter)
    );
  };

  const handleDeleteContact = contactId => {
    setContacts((prevContacts) =>
      prevContacts.filter(({ id }) => id !== contactId))
      ;
  };



  const visibleContacts = getVisibleContacts();
  const contactsName = contacts.map(contact => contact.name);

  return (
    <section className={css.sectionWrapper}>
      <h1>Phonebook</h1>
      <Form onSubmit={handleAddNewContact} contactsName={contactsName} />

      <h2>Contacts</h2>
      <div>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          visibleContacts={visibleContacts}
          onDeleteContact={handleDeleteContact}
        />
      </div>
    </section>
  );

}

// || 