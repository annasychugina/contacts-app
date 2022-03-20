import React from 'react';
import {Header} from '@shared/ui/Header';
import {EScreens, mockedUsers, RootStackParamList} from '@shared/config';
import {UserContacts} from '@features/user-contacts';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Container} from './styles';

export const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
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
