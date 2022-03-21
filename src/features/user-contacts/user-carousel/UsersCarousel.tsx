import React, {useCallback, useRef, useMemo} from 'react';
import type {
  GestureResponderEvent,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {FlatList, Animated} from 'react-native';
import {IUser} from '@entities';
import {
  StyledImage,
  ImageWrapper,
  Container,
  Backdrop,
  AnimatedShadowLine,
  contentContainerStyle,
} from './styles';

import {
  AVATAR_SIZE,
  AVATAR_SIZE_WITHOUT_BORDER,
  AVATAR_SIZE_WITHOUT_MARGINS,
} from '../const';
import {IUserItem} from '../types';

type Props = {
  data: IUserItem[];
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onTouch?: (event: GestureResponderEvent) => void;
  onPress?: (index: number, item: IUser) => void;
};

const keyExtractor = (item: IUser) => item.id.toString();

export const UsersCarousel = React.forwardRef<FlatList, Props>(
  ({data, onScroll, onTouch, onPress}, ref) => {
    const translateX = useRef(new Animated.Value(1)).current;

    const animatedEvent = Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: translateX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
        listener: onScroll,
      },
    );

    const inputRange = useMemo(
      () =>
        data.flatMap((item, index) => [
          AVATAR_SIZE * (index - 0.5),
          AVATAR_SIZE * index,
          AVATAR_SIZE * (index + 0.5),
        ]),
      [data],
    );

    const outPutRange = useMemo(() => data.flatMap(() => [1, 0, 1]), [data]);

    const shadowStyle = {
      opacity: translateX.interpolate({
        inputRange: inputRange,
        outputRange: outPutRange,
        extrapolate: 'clamp',
      }),
    };

    const renderUserItem = useCallback(
      ({item, index}: ListRenderItemInfo<IUserItem>) => (
        <ImageWrapper
          onPress={() => onPress?.(index, item)}
          width={AVATAR_SIZE_WITHOUT_MARGINS}
          height={AVATAR_SIZE_WITHOUT_MARGINS}
          borderRadius={AVATAR_SIZE_WITHOUT_MARGINS}>
          <Backdrop
            style={{
              borderRadius: AVATAR_SIZE_WITHOUT_MARGINS,
              opacity: translateX.interpolate({
                inputRange: [
                  AVATAR_SIZE * (index - 1),
                  AVATAR_SIZE * index,
                  AVATAR_SIZE * (index + 1),
                ],
                outputRange: [0, 1, 0],
                extrapolate: 'clamp',
              }),
            }}
          />
          <StyledImage
            testID="userAvatar"
            resizeMode="cover"
            source={item.imageSource}
            width={AVATAR_SIZE_WITHOUT_BORDER}
            height={AVATAR_SIZE_WITHOUT_BORDER}
            borderRadius={AVATAR_SIZE_WITHOUT_BORDER}
          />
        </ImageWrapper>
      ),
      [translateX, onPress],
    );

    return (
      <Container>
        <AnimatedShadowLine style={shadowStyle} />
        <FlatList
          testID="userCarousel"
          ref={ref}
          data={data}
          centerContent
          horizontal
          snapToInterval={AVATAR_SIZE}
          showsHorizontalScrollIndicator={false}
          onScroll={animatedEvent}
          renderItem={renderUserItem}
          keyExtractor={keyExtractor}
          onTouchStart={onTouch}
          contentContainerStyle={contentContainerStyle}
          decelerationRate="fast"
          scrollEventThrottle={16}
        />
      </Container>
    );
  },
);
