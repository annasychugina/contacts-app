import styled from 'styled-components/native';

import {Typography} from '@shared/ui/Typography';
import {Colors} from '@shared/lib/theme';

const {NormalRegular} = Typography;

export const Container = styled.ScrollView({
  paddingHorizontal: 22,
  paddingTop: 24,
});

export const StyledNameRow = styled.View({
  flexDirection: 'row',
  alignSelf: 'center',
  paddingVertical: 5,
});

export const StyledAbout = styled(NormalRegular)({
  color: Colors.paleSlate,
  paddingTop: 5,
  textAlign: 'left',
  alignSelf: 'center',
});

export const StyledAvatar = styled.Image({
  borderRadius: 14,
  width: 64,
  height: 64,
  alignSelf: 'center',
  marginBottom: 20,
});
