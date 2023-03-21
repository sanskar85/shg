import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import {BackHandler} from 'react-native';
import SCREENS, {APP_SCREENS} from '../themes/screens';

const useBackHandler = (
  navigation: NativeStackNavigationProp<APP_SCREENS, any, any>,
  onBackPress?: () => boolean,
) => {
  const DefaultBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.replace(SCREENS.HOME);
    }
    return true;
  };
  const goBack = onBackPress || DefaultBackPress;
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', goBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', goBack);
    };
  }, [goBack]);

  return goBack;
};

export default useBackHandler;
