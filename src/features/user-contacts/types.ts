import {IUser} from '@entities';
import {ImageSourcePropType} from 'react-native';

export type IUserItem = IUser & {imageSource: ImageSourcePropType};
