import React, {useRef, useState, useCallback} from 'react';
import {FlatList} from 'react-native';
import type {LayoutChangeEvent} from 'react-native';
import {UserInfoList} from './user-info-list';
import {UsersCarousel} from './user-carousel';
import {IUser} from '../../entitites';
import {WINDOW_HEIGHT} from '../../shared/ui/helpers';
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
      userInfoFlatListRef.current?.scrollToOffset({
        animated: true,
        offset: containerScrollHeight * index,
      });
    }
  };

  const handleScroll = useCallback(
    event => {
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

  const handleUserInfoTouch = useCallback(() => {
    setIsActive(false);
  }, []);

  const handleScrollList = useCallback(
    e => {
      if (!isActive) {
        userCarouselFlatListRef.current?.scrollToOffset({
          animated: false,
          offset:
            e.nativeEvent.contentOffset.y *
            (AVATAR_SIZE / containerScrollHeight),
        });
      }
    },
    [containerScrollHeight, isActive],
  );
  const handleOnLayout = useCallback((e: LayoutChangeEvent) => {
    setContainerScrollHeight(e.nativeEvent.layout.height);
  }, []);

  return (
    <>
      <UsersCarousel
        ref={userCarouselFlatListRef}
        data={data}
        onScroll={handleScroll}
        onTouch={handleCarouselTouch}
        onPress={handleAvatarPress}
      />
      <UserInfoList
        ref={userInfoFlatListRef}
        data={data}
        containerScrollHeight={containerScrollHeight}
        onTouch={handleUserInfoTouch}
        onScroll={handleScrollList}
        onLayout={handleOnLayout}
      />
    </>
  );
};
