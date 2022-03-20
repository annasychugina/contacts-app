import styled from 'styled-components/native';

import {Typography} from '@shared/ui/Typography';
import {Colors} from '@shared/lib/theme';
import {FlatList} from 'react-native';

const {NormalRegular} = Typography;

export const Container = styled.View<{
  height: number;
}>(({height}) => ({
  paddingHorizontal: 22,
  paddingTop: 24,
  height,
}));

export const StyledNameRow = styled.View({
  flexDirection: 'row',
  alignSelf: 'center',
  paddingVertical: 5,
});

export const UserInfo = styled.View({
  marginTop: 20,
  flex: 1,
});

export const StyledAbout = styled(NormalRegular)({
  color: Colors.paleSlate,
  paddingTop: 5,
  textAlign: 'left',
  alignSelf: 'center',
});

export const StyledFlatList = styled.FlatList({
  contentContainerStyle: {
    width: '100%',
    flex: 1,
  },
}) as unknown as typeof FlatList;
