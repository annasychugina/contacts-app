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
} from './styles';

import {localAvatarImageSource} from './const';

import {
  AVATAR_SIZE,
  AVATAR_SIZE_WITHOUT_BORDER,
  AVATAR_SIZE_WITHOUT_MARGINS,
} from '../const';
import {WINDOW_WIDTH} from '@shared/ui/helpers';

type Props = {
  data: IUser[];
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
          (index - 0.5) * AVATAR_SIZE,
          index * AVATAR_SIZE,
          (index + 0.5) * AVATAR_SIZE,
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
      ({item, index}: ListRenderItemInfo<IUser>) => (
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
                  (index - 1) * AVATAR_SIZE,
                  index * AVATAR_SIZE,
                  (index + 1) * AVATAR_SIZE,
                ],
                outputRange: [0, 1, 0],
                extrapolate: 'clamp',
              }),
            }}
          />
          <StyledImage
            resizeMode="cover"
            source={localAvatarImageSource[item.image]}
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
          contentContainerStyle={{
            paddingHorizontal: (WINDOW_WIDTH - AVATAR_SIZE) / 2,
          }}
          decelerationRate="fast"
          scrollEventThrottle={16}
        />
      </Container>
    );
  },
);
