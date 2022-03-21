import React from 'react';
import type {
  FlatListProps,
  GestureResponderEvent,
  LayoutChangeEvent,
  ListRenderItem,
} from 'react-native';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {IUser} from '@entities';
import {FlatList} from 'react-native';
import {UserCard} from './UserCard';
import {IUserItem} from '../types';

type Props = {
  data: IUserItem[];
  containerScrollHeight: number;
  onTouch?: (event: GestureResponderEvent) => void;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onLayout?: (event: LayoutChangeEvent) => void;
  onEndReached?: FlatListProps<IUser>['onEndReached'];
};

const keyExtractor = (item: IUser) => item.id.toString();

export const UserInfoList = React.forwardRef<FlatList<IUser>, Props>(
  (
    {data, containerScrollHeight, onTouch, onEndReached, onScroll, onLayout},
    ref,
  ) => {
    const renderUserItem: ListRenderItem<IUser> = ({item}) => (
      <UserCard {...item} containerScrollHeight={containerScrollHeight} />
    );
    return (
      <FlatList
        testID="userInfoList"
        ref={ref}
        data={data}
        renderItem={renderUserItem}
        keyExtractor={keyExtractor}
        extraData={containerScrollHeight}
        snapToInterval={containerScrollHeight}
        onTouchStart={onTouch}
        onScroll={onScroll}
        onLayout={onLayout}
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
        scrollEventThrottle={16}
        onEndReached={onEndReached}
      />
    );
  },
);
