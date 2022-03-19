import React from 'react';

import {Header} from '../../shared/ui/Header';

import {EScreens, mockedUsers, RootStackParamList} from '../../shared/config';
import {UserContacts} from '../../features/user-contacts/UserContacts';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Container} from './styles';

const noop = () => {};

export const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const handleNavigateToDetails = (userId: number) => {
    navigation.navigate(EScreens.DETAILS_SCREEN, {userId});
  };
  return (
    <Container>
      <Header title="Contacts" showBackButton={false} onBackPress={noop} />
      <UserContacts
        data={mockedUsers}
        onUserAvatarPress={handleNavigateToDetails}
      />
    </Container>
  );
};
