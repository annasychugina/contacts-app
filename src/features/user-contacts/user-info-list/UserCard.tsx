import React from 'react';
import {Container, StyledAbout, StyledNameRow, UserInfo} from './styles';
import {Colors} from '@shared/lib/theme';
import {Typography} from '@shared/ui/Typography';
import {IUser} from '@entities';

const {TitleRegular, TitleBold, NormalRegular, TitleBold2} = Typography;

type Props = {
  containerScrollHeight: number;
} & IUser;

export const UserCard = React.memo(
  ({containerScrollHeight, firstName, lastName, title, description}: Props) => (
    <Container testID="userCard" height={containerScrollHeight}>
      <StyledNameRow>
        <TitleBold>{firstName + ' '}</TitleBold>
        <TitleRegular>{lastName}</TitleRegular>
      </StyledNameRow>
      <NormalRegular textAlign="center" color={Colors.paleSlate}>
        {title}
      </NormalRegular>
      <UserInfo>
        <TitleBold2>About me</TitleBold2>
        <StyledAbout>{description}</StyledAbout>
      </UserInfo>
    </Container>
  ),
);
