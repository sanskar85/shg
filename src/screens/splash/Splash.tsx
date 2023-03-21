import {StackActions} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
  ToastAndroid,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {HANDSHAKE_LOTTIE} from '../../assets/Lottie';
import {useAuth} from '../../firebase';
import {COLORS} from '../../themes';
import SCREENS, {APP_SCREENS} from '../../themes/screens';

type Props = NativeStackScreenProps<APP_SCREENS, SCREENS.SPLASH>;
const Splash = ({navigation}: Props) => {
  const {user, loading} = useAuth();

  const handleNavigation = React.useCallback(async () => {
    if (loading) {
      return ToastAndroid.show('Loading...', ToastAndroid.SHORT);
    }

    if (user === null) {
      navigation.dispatch(StackActions.replace(SCREENS.LOGIN));
      return;
    }

    if (user.displayName === null || user.displayName === '') {
      navigation.dispatch(StackActions.replace(SCREENS.PROFILE));
      return;
    }
    navigation.dispatch(StackActions.replace(SCREENS.HOME));
  }, [navigation, loading, user]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.BACKGROUND}
      />
      <View style={[styles.wrapper]}>
        <AnimatedLottieView
          style={styles.wink}
          source={HANDSHAKE_LOTTIE}
          onAnimationFinish={handleNavigation}
          autoPlay
          loop={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    height: hp(100),
    width: wp(100),
    position: 'relative',
    backgroundColor: COLORS.BACKGROUND,
    justifyContent: 'center',
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  wink: {
    width: wp(80),
    height: wp(80),
  },
});

export default Splash;
