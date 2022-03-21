import React from 'react';
import {Header} from '@shared/ui/Header';
import {EScreens, mockedUsers, RootStackParamList} from '@shared/config';
import {UserContacts} from '@features/user-contacts';
import {StackNavigationProp} from '@react-navigation/stack';
import {Container} from './styles';

type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
};

export const ContactsScreen = ({navigation}: Props) => {
  const handleNavigateToDetails = (userId: number) => {
    navigation.navigate(EScreens.DETAILS_SCREEN, {userId});
  };
  return (
    <Container>
      <Header title="Contacts" showBackButton={false} />
      <UserContacts
        data={mockedUsers}
        onUserAvatarPress={handleNavigateToDetails}
      />
    </Container>
  );
};
