import React from 'react';

import {render, fireEvent, act} from '@testing-library/react-native';
import {UsersCarousel} from '@features/user-contacts/user-carousel';
import {MockedNavigator} from './mockedNavigator';
import {ContactsScreen} from '@screens/ContactsScreen';
import {EScreens} from '@shared/config';
import {mockedUserItems} from './mockedUserItems';
const noop = () => {};

describe('UserCarousel', () => {
  afterEach(() => jest.clearAllMocks());
  test('render correct counts user avatars in carousel', () => {
    const {getByTestId, getAllByTestId} = render(
      <UsersCarousel data={mockedUserItems} onTouch={noop} onScroll={noop} />,
    );

    const userCards = getAllByTestId('userAvatar');
    const carousel = getByTestId('userCarousel');
    expect(userCards).toHaveLength(3);
    expect(carousel).toBeDefined();
  });

  test('userItem must be pressed', () => {
    const onPressEvent = jest.fn();

    const {getAllByTestId} = render(
      <UsersCarousel
        data={mockedUserItems}
        onTouch={noop}
        onScroll={noop}
        onPress={onPressEvent}
      />,
    );

    const item = getAllByTestId('userAvatar')[0];
    expect(item).toBeTruthy();
    fireEvent.press(item);
    expect(onPressEvent).toHaveBeenCalled();
  });

  test('should redirect on Details after press', async () => {
    const navigation = {
      navigate: jest.fn(),
      setParams: jest.fn(),
      addListener: jest.fn(),
    };

    const MockedContactsScreen = (props: any) => (
      <ContactsScreen {...props} navigation={navigation as any} />
    );
    const EmptyComponent = () => null;

    const {getAllByTestId} = render(
      <MockedNavigator
        component={MockedContactsScreen}
        screens={[{component: EmptyComponent, name: EScreens.DETAILS_SCREEN}]}
      />,
    );

    await act(() => {
      const toClick = getAllByTestId('userAvatar')[0];
      expect(toClick).toBeTruthy();
      fireEvent(toClick, 'press');

      expect(navigation.navigate).toBeCalledWith(EScreens.DETAILS_SCREEN, {
        userId: 1,
      });

      return Promise.resolve();
    });
  });
});
