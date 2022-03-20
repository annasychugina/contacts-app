import React, {useRef, useState, useCallback} from 'react';
import {FlatList, NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import type {LayoutChangeEvent} from 'react-native';
import {UserInfoList} from './user-info-list';
import {UsersCarousel} from './user-carousel';
import {IUser} from '@entities';
import {WINDOW_HEIGHT} from '@shared/ui/helpers';
import {AVATAR_SIZE} from './const';

type Props = {
  data: IUser[];
  onUserAvatarPress: (userId: number) => void;
};

export const UserContacts = ({data, onUserAvatarPress}: Props) => {
  const userCarouselFlatListRef = useRef<FlatList>(null);
  const userInfoFlatListRef = useRef<FlatList>(null);
  const [containerScrollHeight, setContainerScrollHeight] =
    useState(WINDOW_HEIGHT);

  const [isActive, setIsActive] = useState(false);
  const [activeIcon, setActiveIcon] = useState(0);

  const handleAvatarPress = (index: number, item: IUser) => {
    if (activeIcon === index) {
      onUserAvatarPress(item.id);
    } else {
      userCarouselFlatListRef.current?.scrollToOffset({
        animated: true,
        offset: AVATAR_SIZE * index,
      });
    }
  };

  const handleCarouselScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const active = Math.ceil(
        event.nativeEvent.contentOffset.x / AVATAR_SIZE - 0.5,
      );
      if (activeIcon !== active) {
        setActiveIcon(active);
      }
      if (isActive) {
        userInfoFlatListRef.current?.scrollToOffset({
          offset:
            event.nativeEvent.contentOffset.x *
            (containerScrollHeight / AVATAR_SIZE),
          animated: false,
        });
      }
    },
    [activeIcon, containerScrollHeight, isActive],
  );

  const handleCarouselTouch = useCallback(() => {
    setIsActive(true);
  }, []);

  const handleUserListTouch = useCallback(() => {
    setIsActive(false);
  }, []);

  const handleScrollList = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (!isActive) {
        userCarouselFlatListRef.current?.scrollToOffset({
          animated: false,
          offset:
            event.nativeEvent.contentOffset.y *
            (AVATAR_SIZE / containerScrollHeight),
        });
      }
    },
    [containerScrollHeight, isActive],
  );

  const onLayoutHandler = ({
    nativeEvent: {
      layout: {height: newHeight},
    },
  }: LayoutChangeEvent) => {
    if (newHeight !== 0) {
      setContainerScrollHeight(newHeight);
    }
  };
  return (
    <>
      <UsersCarousel
        ref={userCarouselFlatListRef}
        data={data}
        onTouch={handleCarouselTouch}
        onScroll={handleCarouselScroll}
        onPress={handleAvatarPress}
      />
      <UserInfoList
        ref={userInfoFlatListRef}
        data={data}
        containerScrollHeight={containerScrollHeight}
        onTouch={handleUserListTouch}
        onScroll={handleScrollList}
        onLayout={onLayoutHandler}
      />
    </>
  );
};
