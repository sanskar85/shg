import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {ScreenOrientationTypes} from 'react-native-screens';

const HEADER_NONE_CONFIG: NativeStackNavigationOptions = {
  headerShown: false,
  orientation: 'portrait' as ScreenOrientationTypes,
  animation: 'slide_from_right',
  statusBarAnimation: 'slide',
};
const HEADER_NONE_LANDSCAPE_CONFIG: NativeStackNavigationOptions = {
  headerShown: false,
  orientation: 'landscape' as ScreenOrientationTypes,
  animation: 'slide_from_right',
  statusBarAnimation: 'slide',
};

export {HEADER_NONE_CONFIG, HEADER_NONE_LANDSCAPE_CONFIG};
