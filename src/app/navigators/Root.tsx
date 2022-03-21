import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {EScreens, RootStackParamList} from '@shared/config';
import {ContactsScreen} from '@screens/ContactsScreen';
import {DetailsScreen} from '@screens/DetailsScreen';

export const Stack = createStackNavigator<RootStackParamList>();

export const Root = () => {
  return (
    <Stack.Navigator initialRouteName={EScreens.CONTACTS_SCREEN}>
      <Stack.Screen
        name={EScreens.CONTACTS_SCREEN}
        component={ContactsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={EScreens.DETAILS_SCREEN}
        component={DetailsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
