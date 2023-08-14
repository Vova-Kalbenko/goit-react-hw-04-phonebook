import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import css from './Form.module.css'

export default function Form ({onSubmit, contactsName }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = e => {
    
    const { name, value } = e.currentTarget;

    if (name === '' && number === '') {
      alert('all fields must be fill in');
      return;
    }

    if (name === 'name') {
      setName(value);
      return
    } else if (name === 'number') {
      setNumber(value);
      return
    }
    return
  };
  const handleSubmit = e => {
    e.preventDefault();
    // В ПРОПСЫ ПРИЕЗЖАЕТ ОБЬЕКТ С МАСИВАМИ КОНТРАКТОВ+МЕТОДОМ ОНСАБМИТ 
    const matchName = contactsName.some(
      contactName => name.toLowerCase() === contactName.toLowerCase()
    );
    // ЧЕРЕЗ ТОЧКУ ОБРАЩАЕМСЯ ИМЕННО К ЭЭТОМУ МАСИВУ И С ПОМОЩЬЮ МЕТОДА SOME()
    // СРАВНИВАЕМ ЕСТЬ ЛИ ТАКОЙ КОНТАКТ УЖЕ В КНИГЕ
    if (matchName) {
      return alert(`${name} is already in contacts`);
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    onSubmit(newContact);
    resetForm();
  };
  const resetForm = () => {
    setName('');
    setNumber('');
  };
  // const nameInputId = nanoid()
  // const numberInputId = nanoid()

    return (
      <div>
        <h3>Phonebook</h3>
        <form onSubmit={handleSubmit} className={css.form}>
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={handleInputChange}
              // id={nameInputId}
              name="name"
              className={css.nameInput}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>
          <label>
            Number
            <input
              type="tel"
              value={number}
              onChange={handleInputChange}
              // id={numberInputId}
              name="number"
              className={css.numberInput}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>
          <button type="submit">
          add contact
        </button>
        </form>
      </div>
    );
  }

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  contactsName: PropTypes.arrayOf(PropTypes.string.isRequired),
};





