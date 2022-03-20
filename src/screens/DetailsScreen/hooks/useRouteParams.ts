import type {RouteProp} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';

import {RootStackParamList, EScreens} from '@shared/config';

export const useRouteParams = () => {
  const route =
    useRoute<RouteProp<RootStackParamList, EScreens.DETAILS_SCREEN>>();

  return route.params;
};
