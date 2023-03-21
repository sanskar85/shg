import {NativeStackScreenProps} from '@react-navigation/native-stack';
import moment from 'moment';
import React from 'react';
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SATOSHI_MEDIUM} from '../../assets/font';
import {Button} from '../../components/root';
import useBackHandler from '../../configs/useBackHandler';
import {LoanHelper, SettingsHelper} from '../../firebase/helpers';
import ExcelExport from '../../helpers/ExcelExport';
import {hp, wp} from '../../helpers/Helpers';
import {LoadStoreData} from '../../store';
import {StoreNames} from '../../store/config';
import {setWorkingMonth} from '../../store/reducers/ProfileReducer';
import {COLORS} from '../../themes';
import SCREENS, {APP_SCREENS} from '../../themes/screens';
import StoreState from '../../types/store';

type Props = NativeStackScreenProps<APP_SCREENS, SCREENS.REPORT>;

const Report = ({navigation}: Props) => {
  useBackHandler(navigation);

  const {working_month} = useSelector(
    (state: StoreState) => state[StoreNames.PROFILE],
  );
  const dispatch = useDispatch();
  const [monthCycleLoading, setMonthCycleLoading] = React.useState(false);
  const [exportLoading, setExportLoading] = React.useState(false);
  const [resetLoading, setResetLoading] = React.useState(false);

  const changeMonthCycle = async () => {
    setMonthCycleLoading(true);
    const working_month_moment = moment(working_month, 'MM-YYYY');

    const success = await LoanHelper.changeMonthCycle();
    if (!success) {
      ToastAndroid.show('Error changing month cycle.', ToastAndroid.SHORT);
      setMonthCycleLoading(false);
      return;
    }
    ToastAndroid.show('Month cycle changed.', ToastAndroid.SHORT);
    working_month_moment.add(1, 'month');
    dispatch(setWorkingMonth(working_month_moment.format('MM-YYYY')));
    SettingsHelper.setWorkingMonth(working_month_moment.format('MM-YYYY'));
    setMonthCycleLoading(false);
  };

  const exportData = async () => {
    setExportLoading(true);
    try {
      await ExcelExport();
      ToastAndroid.show('Data exported successfully.', ToastAndroid.SHORT);
    } catch (e) {
      console.log(e);

      ToastAndroid.show('Error exporting data.', ToastAndroid.SHORT);
    }
    setExportLoading(false);
  };

  const resetData = async () => {
    Alert.alert(
      'Reset Data',
      'Are you sure you want to reset all data?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          onPress: onResetDataClicked,
        },
      ],
      {cancelable: true},
    );
  };

  const onResetDataClicked = async () => {
    setResetLoading(true);
    try {
      await LoanHelper.resetData();
      LoadStoreData();
      ToastAndroid.show('Data reset successful.', ToastAndroid.SHORT);
    } catch (e) {
      ToastAndroid.show('Error resetting data.', ToastAndroid.SHORT);
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor="transparent"
      />
      <Text style={styles.headingText}>Reports</Text>

      <View style={styles.contentWrapper}>
        <View style={styles.buttonWrapper}>
          <Button
            style={[styles.button, styles.buttonAlternate]}
            centered
            isLoading={exportLoading}
            activeOpacity={0.8}
            onClick={exportData}>
            <Text style={[styles.buttonText, styles.buttonTextAlternate]}>
              Generate Report
            </Text>
          </Button>
        </View>
        <View>
          <Button
            style={[styles.button]}
            centered
            onClick={changeMonthCycle}
            activeOpacity={0.8}
            isLoading={monthCycleLoading}>
            <Text style={[styles.buttonText]}>Change Month Cycle</Text>
          </Button>
        </View>
        <View>
          <Button
            style={[styles.button, styles.resetBTN]}
            centered
            onClick={resetData}
            activeOpacity={0.6}
            isLoading={resetLoading}>
            <Text style={[styles.buttonText]}>Reset Data</Text>
          </Button>
        </View>
      </View>
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
    width: wp(100),
  },
  headingText: {
    fontSize: wp(5),
    fontFamily: SATOSHI_MEDIUM,
    color: COLORS.BLACK,
    textAlign: 'center',
    marginTop: hp(1),
    marginBottom: hp(2),
  },

  buttonWrapper: {
    marginVertical: wp(1),
  },
  button: {
    marginVertical: hp(1),
    height: hp(5),
    width: wp(90),
    borderRadius: 10,
    backgroundColor: COLORS.ACTION,
  },
  buttonText: {
    color: COLORS.PRIMARY,
    fontFamily: SATOSHI_MEDIUM,
    letterSpacing: 2,
    fontSize: wp(4),
  },
  buttonAlternate: {
    backgroundColor: COLORS.PRIMARY,
    borderWidth: 1,
    borderColor: COLORS.ACTION_LIGHT,
  },
  buttonTextAlternate: {
    color: COLORS.ACTION,
  },
  resetBTN: {
    backgroundColor: COLORS.PINK,
  },
});

export default Report;
