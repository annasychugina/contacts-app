export enum EScreens {
  CONTACTS_SCREEN = 'ContactsScreen',
  DETAILS_SCREEN = 'DetailsScreen',
}

export type RootStackParamList = {
  [EScreens.CONTACTS_SCREEN]: undefined;
  [EScreens.DETAILS_SCREEN]: {userId: number};
};
