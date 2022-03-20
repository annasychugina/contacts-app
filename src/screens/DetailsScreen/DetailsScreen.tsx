import React, {useMemo} from 'react';
import {Header} from '@shared/ui/Header';
import {mockedUsers, RootStackParamList} from '@shared/config';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Container} from './styles';
import {useRouteParams} from './hooks';
import {UserDetails} from '@features/user-contacts';

export const DetailsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const params = useRouteParams();
  const userItem = useMemo(
    () => mockedUsers.find(us => us.id === params.userId),
    [params.userId],
  );
  if (!userItem) {
    return null;
  }

  return (
    <Container>
      <Header title="Details" onBackPress={navigation.goBack} />
      <UserDetails userItem={userItem} />
    </Container>
  );
};
