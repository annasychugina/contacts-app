import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {UserInfoList} from '@features/user-contacts/user-info-list';
import {mockedUserItems} from './mockedUserItems';

const noop = () => {};
const onEndReached = jest.fn();

describe('UserInfoList', () => {
  test('render users info correctly', () => {
    const {getByText, getAllByTestId} = render(
      <UserInfoList
        data={mockedUserItems}
        containerScrollHeight={20}
        onTouch={noop}
        onScroll={noop}
        onLayout={noop}
      />,
    );

    mockedUserItems.forEach(user => {
      expect(getByText(user.firstName)).toBeDefined();
      expect(getByText(user.lastName)).toBeDefined();
      expect(getByText(user.title)).toBeDefined();
      expect(getByText(user.description)).toBeDefined();
    });

    const userCards = getAllByTestId('userCard');
    expect(userCards).toHaveLength(3);
  });

  test('scroll users info list', () => {
    const {getByTestId} = render(
      <UserInfoList
        data={mockedUserItems}
        containerScrollHeight={500}
        onTouch={noop}
        onScroll={noop}
        onLayout={noop}
        onEndReached={onEndReached}
      />,
    );

    const eventData = {
      nativeEvent: {
        contentOffset: {
          y: 500,
        },
        contentSize: {
          // Dimensions of the scrollable content
          height: 500,
          width: 100,
        },
        layoutMeasurement: {
          // Dimensions of the device
          height: 100,
          width: 100,
        },
      },
    };

    fireEvent.scroll(getByTestId('userInfoList'), eventData);
    expect(onEndReached).toBeCalledTimes(1);
  });
});
