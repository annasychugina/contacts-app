import React, {useCallback} from 'react';
import type {
  ListRenderItemInfo,
  GestureResponderEvent,
  LayoutChangeEvent,
} from 'react-native';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {IUser} from '../../../entitites';
import {
  Container,
  StyledNameRow,
  UserInfo,
  StyledAbout,
  StyledFlatList,
} from './styles';
import {FlatList} from 'react-native';
import {Typography} from '../../../shared/ui/Typography';
import {Colors} from '../../../shared/lib/theme';

const {TitleRegular, TitleBold, NormalRegular, TitleBold2} = Typography;

type Props = {
  data: IUser[];
  containerScrollHeight: number;
  onTouch?: (event: GestureResponderEvent) => void;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onLayout?: (event: LayoutChangeEvent) => void;
};

const keyExtractor = (item: IUser) => item.id.toString();

export const UserInfoList = React.forwardRef<FlatList<IUser>, Props>(
  ({data, containerScrollHeight, onTouch, onScroll, onLayout}, ref) => {
    const renderUserItem = useCallback(
      ({item}: ListRenderItemInfo<IUser>) => (
        <Container height={containerScrollHeight}>
          <StyledNameRow>
            <TitleBold>{item.firstName + ' '}</TitleBold>
            <TitleRegular>{item.lastName}</TitleRegular>
          </StyledNameRow>
          <NormalRegular textAlign="center" color={Colors.paleSlate}>
            {item.title}
          </NormalRegular>
          <UserInfo>
            <TitleBold2>About me</TitleBold2>
            <StyledAbout>{item.description}</StyledAbout>
          </UserInfo>
        </Container>
      ),
      [containerScrollHeight],
    );

    return (
      <StyledFlatList
        ref={ref}
        data={data}
        renderItem={renderUserItem}
        keyExtractor={keyExtractor}
        extraData={containerScrollHeight}
        snapToInterval={containerScrollHeight}
        onTouchStart={onTouch}
        onScroll={onScroll}
        onLayout={onLayout}
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
        scrollEventThrottle={16}
      />
    );
  },
);
