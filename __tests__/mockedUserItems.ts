import {IUserItem} from '@features/user-contacts';

const mockedImagePath = require('@assets/AllanMunger.webp');
export const mockedUserItems: IUserItem[] = [
  {
    firstName: 'Allan',
    lastName: 'Munger',
    title: 'Solutions',
    image: 'AllanMunger',
    description: 'description-1',
    imageSource: mockedImagePath,
    id: 1,
  },
  {
    firstName: 'Amanda',
    lastName: 'Brady',
    title: 'Program',
    image: 'AmandaBrady',
    description: 'description-2',
    imageSource: mockedImagePath,
    id: 2,
  },
  {
    firstName: 'Ashley',
    lastName: 'Mc Carthy',
    title: 'Brand',
    image: 'AshleyMcCarthy',
    description: 'description-3',
    imageSource: mockedImagePath,
    id: 3,
  },
];
