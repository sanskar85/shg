import React, {useEffect} from 'react';
import {Text, View, StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {COLORS} from '../../themes';
import {SATOSHI_MEDIUM} from '../../assets/font';
import {KeyboardDismiss} from '../../components/modules';
import {Button} from '../../components/root';
import {CALENDAR, FINE, PARTNERSHIP, RUPEES, TICK} from '../../assets/Images';
import {useSelector, useDispatch} from 'react-redux';
import {StoreNames} from '../../store/config';
import {
  setName,
  setDetails,
  setMembershipCharge,
  setMeetingFine,
  setWorkingMonth,
} from '../../store/reducers/ProfileReducer';
import StoreState from '../../types/store';
import {DateInputField, TextInput} from './components';
import {hp, wp} from '../../helpers/Helpers';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import SCREENS, {APP_SCREENS} from '../../themes/screens';
import {StackActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import useBackHandler from '../../configs/useBackHandler';
import {SettingsHelper} from '../../firebase/helpers';

type Props = NativeStackScreenProps<APP_SCREENS, SCREENS.PROFILE>;

const Profile = ({navigation}: Props) => {
  const dispatch = useDispatch();
  const goBack = useBackHandler(navigation);

  const {name, membership_charge, meeting_fine, working_month} = useSelector(
    (state: StoreState) => state[StoreNames.PROFILE],
  );

  useEffect(() => {
    const getCharge = async () => {
      const charges = (await SettingsHelper.getProfileCharge()) || {
        membership_charge: 0,
        meeting_fine: 0,
      };

      dispatch(setMembershipCharge(charges.membership_charge));
      dispatch(setMeetingFine(charges.meeting_fine));
    };
    const getWorkingMonth = async () => {
      const month = await SettingsHelper.getWorkingMonth();
      dispatch(setWorkingMonth(month));
    };
    getCharge();
    getWorkingMonth();
  }, [dispatch]);

  const onSave = async () => {
    const current_user = auth().currentUser;
    if (current_user === null) {
      return navigation.dispatch(StackActions.replace(SCREENS.LOGIN));
    }
    dispatch(
      setDetails({
        name,
        membership_charge,
      }),
    );
    current_user.updateProfile({
      displayName: name,
    });
    SettingsHelper.setProfileCharge({
      membership_charge,
      meeting_fine,
    });
    SettingsHelper.setWorkingMonth(working_month);

    goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor="transparent"
      />

      <KeyboardDismiss>
        <View style={styles.contentWrapper}>
          <Text style={styles.headingText}>Profile Setup</Text>

          <View style={styles.inputContainer}>
            <TextInput
              value={name}
              onChangeText={text => dispatch(setName(text))}
              placeholder="SHG Name"
              icon={PARTNERSHIP}
            />
            <TextInput
              value={
                membership_charge === 0 ? '' : membership_charge.toString()
              }
              onChangeText={text =>
                !isNaN(Number(text)) &&
                dispatch(setMembershipCharge(Number(text)))
              }
              placeholder="Monthly सदस्यता Charge"
              icon={RUPEES}
            />
            <TextInput
              value={meeting_fine === 0 ? '' : meeting_fine.toString()}
              onChangeText={text =>
                !isNaN(Number(text)) && dispatch(setMeetingFine(Number(text)))
              }
              placeholder="Meeting जुर्माना"
              icon={FINE}
            />
            <DateInputField
              value={working_month}
              onChangeDate={date =>
                dispatch(setWorkingMonth(date.format('MM-YYYY')))
              }
              minDate={working_month}
              icon={CALENDAR}
            />
            <Shadow
              distance={5}
              startColor={'#00000015'}
              containerStyle={styles.center}>
              <Button
                activeOpacity={0.8}
                style={styles.doneButton}
                onClick={onSave}>
                <TICK fill={COLORS.ACTION} />
              </Button>
            </Shadow>
          </View>
        </View>
      </KeyboardDismiss>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingBottom: 25,
    backgroundColor: COLORS.BACKGROUND,
    paddingTop: StatusBar.currentHeight,
    // position: 'relative',
  },
  contentWrapper: {
    paddingHorizontal: wp(5),
    height: hp(100),
    width: wp(100),
  },
  headingText: {
    fontSize: wp(5),
    fontFamily: SATOSHI_MEDIUM,
    color: COLORS.BLACK,
    textAlign: 'center',
    marginTop: hp(1),
  },
  inputContainer: {
    gap: hp(2),
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  center: {
    alignSelf: 'center',
  },
  doneButton: {
    height: 80,
    width: 80,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.ACTION,
  },
});

export default Profile;
