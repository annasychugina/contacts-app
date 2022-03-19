import React, {PropsWithChildren} from 'react';
import {Typography} from '../Typography';
import type {ImageSourcePropType, StyleProp, ViewStyle} from 'react-native';
import {SafeAreaHeaderWrapper, StyledHeaderBackButton} from './components';
import styled from 'styled-components/native';
import {HEADER_HEIGHT} from './const';
import {Colors} from '../../lib/theme';

const {TitleBold2} = Typography;
const Container = styled(SafeAreaHeaderWrapper)({
  flexDirection: 'row',
  paddingRight: 8,
  paddingBottom: 6,
  backgroundColor: Colors.alabaster,
  justifyContent: 'center',
  alignItems: 'center',
});

const StyledContentView = styled.View({
  flex: 1,
  paddingRight: 16,
  marginLeft: 4,
  alignItems: 'center',
});

const StyledBlock = styled.View({
  paddingLeft: 16,
});

export type HeaderProps = {
  style?: StyleProp<ViewStyle>;
  onBackPress: () => void;
  title?: string;
  showBackButton?: boolean;
  color?: string;
  iconColor?: Colors;
  backIcon?: ImageSourcePropType;
};

export const Header = ({
  style,
  onBackPress,
  backIcon,
  title,
  children,
  showBackButton = true,
  color = Colors.black,
  iconColor = Colors.black,
}: PropsWithChildren<HeaderProps>) => (
  <Container style={style} height={HEADER_HEIGHT} paddingTop={6}>
    {showBackButton ? (
      <StyledHeaderBackButton
        onPress={onBackPress}
        icon={backIcon}
        color={iconColor}
      />
    ) : (
      <StyledBlock />
    )}
    <StyledContentView>
      <TitleBold2 numberOfLines={1} flexShrink={1} color={color}>
        {title}
      </TitleBold2>
    </StyledContentView>
    {children}
  </Container>
);
