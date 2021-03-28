import { nanoid } from 'nanoid';

export const data = [
  {
    id: nanoid(3),
    isDeleted: false,
    login: 'Alex',
    password: nanoid(15),
    age: 10
  },
  {
    id: nanoid(3),
    isDeleted: false,
    login: 'Marco',
    password: nanoid(15),
    age: 11
  },
  {
    id: nanoid(3),
    isDeleted: false,
    login: 'Alexa',
    password: nanoid(15),
    age: 12
  },
  {
    id: nanoid(3),
    isDeleted: false,
    login: 'Paul',
    password: nanoid(15),
    age: 13
  },
  {
    id: nanoid(3),
    isDeleted: true,
    login: 'Anna',
    password: nanoid(15),
    age: 14
  }
];
