import styled from 'styled-components/native';
import {Animated} from 'react-native';
import {Colors, EShadow, makeShadow} from '@shared/lib/theme';
import {WINDOW_WIDTH} from '@shared/ui/helpers';
import {AVATAR_SIZE} from '@features/user-contacts/const';

type ImageProps = {
  width: number;
  height: number;
  borderRadius: number;
};

export const StyledImage = styled.Image<ImageProps>(
  ({width, height, borderRadius}) => ({
    width,
    height,
    borderRadius,
  }),
);

export const ImageWrapper = styled.Pressable<ImageProps>(
  ({width, height, borderRadius}) => ({
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    width,
    height,
    borderRadius,
    marginHorizontal: 8,
  }),
);

export const Container = styled.View({
  paddingTop: 27,
  paddingBottom: 10,
});

export const Backdrop = styled(Animated.View)({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: Colors.linkWater,
});

export const AnimatedShadowLine = styled(Animated.View)({
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  height: 1,
  borderColor: Colors.alabaster,
  borderWidth: 0,
  backgroundColor: Colors.white,
  shadowRadius: 1.2,
  transform: 'rotate(-180deg)',
  ...makeShadow(EShadow.S),
});

export const contentContainerStyle = {
  paddingHorizontal: (WINDOW_WIDTH - AVATAR_SIZE) / 2,
};
