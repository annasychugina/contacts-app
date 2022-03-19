import type {ComponentType} from 'react';
import React from 'react';
import styled from 'styled-components/native';
import {HeaderBackButton} from '@react-navigation/elements';
import type {HeaderBackButtonProps} from '@react-navigation/elements';
import {Colors} from '../../../lib/theme';
import {ImageSourcePropType} from 'react-native';

const iconLeft = require('@assets/icons/arrow.webp');

export type StyledHeaderBackButtonProps = {
  onPress?(): void;
  icon?: ImageSourcePropType;
  color?: Colors;
  marginLeft?: number;
  marginRight?: number;
} & HeaderBackButtonProps;

export const StyledHeaderBackButton = styled<
  ComponentType<StyledHeaderBackButtonProps>
>(HeaderBackButton).attrs(({icon = iconLeft, color = Colors.black}) => ({
  backImage: () => <Icon source={icon} color={color} />,
}))(({marginLeft = 16, marginRight}) => ({
  marginLeft,
  marginRight,
}));

export const Icon = styled.Image<{color: Colors}>(({color}) => ({
  color: color,
  width: 14,
  height: 14,
}));
