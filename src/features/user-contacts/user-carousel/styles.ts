import styled from 'styled-components/native';
import {Animated, Platform} from 'react-native';
import {Colors, EShadow, makeShadow} from '../../../shared/lib/theme';

export const StyledImage = styled.Image<{
  width: number;
  height: number;
  borderRadius: number;
}>(({width, height, borderRadius}) => ({
  width,
  height,
  borderRadius,
}));

export const ImageWrapper = styled.Pressable<{
  width: number;
  height: number;
  borderRadius: number;
}>(({width, height, borderRadius}) => ({
  overflow: 'hidden',
  justifyContent: 'center',
  alignItems: 'center',
  width,
  height,
  borderRadius,
  marginHorizontal: 8,
}));

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
  shadowOffset: {width: 0, height: 1},
  backgroundColor: Colors.white,
  shadowRadius: 1.2,
  transform: 'rotate(-180deg)',
  ...makeShadow(EShadow.S),
});
