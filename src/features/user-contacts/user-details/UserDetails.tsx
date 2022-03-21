import React from 'react';
import {Container, StyledAbout, StyledNameRow, StyledAvatar} from './styles';
import {Colors} from '@shared/lib/theme';
import {IUser} from '@entities';
import {Typography} from '@shared/ui/Typography';

import {localAvatarImageSource} from '../const';
const {TitleRegular, TitleBold, NormalRegular, TitleBold2} = Typography;

type Props = {
  userItem: IUser;
};

export const UserDetails = ({userItem}: Props) => {
  return (
    <Container>
      <StyledAvatar
        resizeMode="cover"
        source={localAvatarImageSource[userItem.image]}
      />
      <StyledNameRow>
        <TitleBold>{userItem.firstName + ' '}</TitleBold>
        <TitleRegular>{userItem.lastName}</TitleRegular>
      </StyledNameRow>
      <NormalRegular textAlign="center" color={Colors.paleSlate}>
        {userItem.title}
      </NormalRegular>
      <TitleBold2>About me</TitleBold2>
      <StyledAbout>{userItem.description}</StyledAbout>
    </Container>
  );
};
