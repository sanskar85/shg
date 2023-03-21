import AnimatedLottieView from 'lottie-react-native';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {WINK_LOTTIE} from '../../assets/Lottie';
import {OTPInput, PhoneNumberInput} from './components';
import {StackActions} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import SCREENS, {APP_SCREENS} from '../../themes/screens';
import {useDispatch, useSelector} from 'react-redux';
import {
  AuthStatus,
  resetOTP,
  setAuthStatus,
  setDetails as setProfileDetails,
  setOTP,
  setPhone,
} from '../../store/reducers/ProfileReducer';
import StoreState from '../../types/store';
import {StoreNames} from '../../store/config';
import {SATOSHI_MEDIUM} from '../../assets/font';
import {COLORS} from '../../themes';
import {Button} from '../../components/root';
import {useAuth} from '../../firebase';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import useBackHandler from '../../configs/useBackHandler';

type Props = NativeStackScreenProps<APP_SCREENS, SCREENS.LOGIN>;
const Login = ({navigation}: Props) => {
  const [loading, setLoading] = React.useState(false);
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  const {user, loading: loadingUser, login} = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loadingUser && user) {
      dispatch(
        setProfileDetails({
          membership_charge: 0,
          name: user.displayName || '',
          phone: user.phoneNumber || '',
        }),
      );
      if (user.displayName === null) {
        navigation.dispatch(StackActions.replace(SCREENS.PROFILE));
      } else {
        navigation.dispatch(
          StackActions.replace(SCREENS.HOME, {fetchDetails: true}),
        );
      }
    }
  }, [user, loadingUser, navigation, dispatch]);

  const {phone, otp, auth_status} = useSelector(
    (state: StoreState) => state[StoreNames.PROFILE],
  );

  const handleClick = async () => {
    if (auth_status === AuthStatus.OTP_NOT_SEND) {
      sendOTP();
    } else if (auth_status === AuthStatus.OTP_SENT) {
      handleVerify(otp.join(''));
    }
  };

  const sendOTP = async () => {
    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      ToastAndroid.show(
        'Please enter a valid phone number',
        ToastAndroid.SHORT,
      );
      return;
    }
    const phoneNumber = phone.length === 10 ? `+91${phone}` : phone;

    try {
      const confirmation = await login(phoneNumber);
      setConfirm(confirmation);
      dispatch(setAuthStatus(AuthStatus.OTP_SENT));
    } catch (err) {
      ToastAndroid.show('Invalid Phone Number', ToastAndroid.SHORT);
    }
  };

  const handleVerify = async (code: string) => {
    if (confirm === null) {
      dispatch(setAuthStatus(AuthStatus.OTP_NOT_SEND));
      return;
    }
    setLoading(true);
    try {
      await confirm.confirm(code);
    } catch (error: unknown) {
      ToastAndroid.show('Invalid OTP', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  useBackHandler(navigation, () => {
    if (auth_status === AuthStatus.OTP_SENT) {
      dispatch(setAuthStatus(AuthStatus.OTP_NOT_SEND));
      dispatch(resetOTP());
      setConfirm(null);
      return true;
    }
    return false;
  });

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.BACKGROUND}
      />
      <View style={styles.container}>
        <Text style={styles.text}>नमस्ते</Text>
        <AnimatedLottieView
          style={styles.wink}
          source={WINK_LOTTIE}
          autoPlay
          loop={false}
        />
        {/* <Image source={LOGIN} style={styles.image} /> */}
        <View style={styles.inputWrapper}>
          {auth_status === AuthStatus.OTP_NOT_SEND ? (
            <PhoneNumberInput
              value={
                phone.length.toString().startsWith('91')
                  ? phone.length.toString().slice(2)
                  : phone
              }
              disabled={loading}
              onTextChange={(text: string) => dispatch(setPhone(text))}
            />
          ) : (
            <OTPInput
              value={otp}
              disabled={loading}
              onTextChange={text => dispatch(setOTP(text))}
            />
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            onClick={handleClick}
            isLoading={loading}
            centered
            style={styles.button}>
            {auth_status === AuthStatus.OTP_NOT_SEND ? (
              <Text style={styles.textWhite}>Send OTP</Text>
            ) : (
              <Text style={styles.textWhite}>Verify OTP</Text>
            )}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  container: {
    width: wp(100),
    height: hp(100),
    paddingHorizontal: wp(5),
    paddingTop: hp(15),
    paddingBottom: hp(3),
    backgroundColor: COLORS.BACKGROUND,
    alignItems: 'center',
  },
  image: {
    width: wp(60),
    height: wp(60),
    resizeMode: 'contain',
  },
  wink: {
    width: wp(30),
    height: wp(30),
    marginTop: hp(-2),
  },
  inputWrapper: {
    paddingVertical: hp(5),
    width: wp(85),
    alignSelf: 'center',
  },
  text: {
    color: COLORS.BLACK,
    fontSize: wp(5),
    fontFamily: SATOSHI_MEDIUM,
  },
  textWhite: {
    color: COLORS.WHITE,
    fontSize: wp(4),
    fontFamily: SATOSHI_MEDIUM,
  },
  marginTop5: {
    marginTop: wp(5),
  },
  inputContainer: {
    marginVertical: wp(2),
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: hp(3),
  },
  button: {
    backgroundColor: COLORS.ACTION,
    borderRadius: 5,
    width: wp(90),
    height: 45,
  },
});

export default Login;
