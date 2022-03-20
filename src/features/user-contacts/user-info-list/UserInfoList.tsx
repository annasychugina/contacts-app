import React from 'react';
import type {
  GestureResponderEvent,
  LayoutChangeEvent,
  ListRenderItem,
} from 'react-native';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {IUser} from '../../../entitites';
import {StyledFlatList} from './styles';
import {FlatList} from 'react-native';
import {UserCard} from './UserCard';

type Props = {
  data: IUser[];
  containerScrollHeight: number;
  onTouch?: (event: GestureResponderEvent) => void;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onLayout?: (event: LayoutChangeEvent) => void;
};

const keyExtractor = (item: IUser) => item.id.toString();

export const UserInfoList = React.forwardRef<FlatList<IUser>, Props>(
  ({data, containerScrollHeight, onTouch, onScroll, onLayout}, ref) => {
    const renderUserItem: ListRenderItem<IUser> = ({item}) => (
      <UserCard {...item} containerScrollHeight={containerScrollHeight} />
    );
    return (
      <StyledFlatList
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
      />
    );
  },
);
