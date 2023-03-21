import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import {COLORS} from '../../themes';
import {SATOSHI_MEDIUM} from '../../assets/font';
import {hp, wp} from '../../helpers/Helpers';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import SCREENS, {APP_SCREENS} from '../../themes/screens';
import useBackHandler from '../../configs/useBackHandler';
import MemberSelector from '../../components/modules/MemberSelector';
import {Member} from '../../store/types/MemberState';
import LoanDataEntry from './components/LoanDataEntry';
import {Button} from '../../components/root';
import {LoanHelper} from '../../firebase/helpers';
import {useDispatch, useSelector} from 'react-redux';
import {reset, setLoanDetails} from '../../store/reducers/LoanReducer';
import StoreState from '../../types/store';
import {StoreNames} from '../../store/config';

type Props = NativeStackScreenProps<APP_SCREENS, SCREENS.LOAN_RECOVERY>;

const LoanRecovery = ({navigation}: Props) => {
  useBackHandler(navigation);

  const [loading, setLoading] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const loanData = useSelector((state: StoreState) => state[StoreNames.LOAN]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedMember === null) {
      dispatch(reset());
      return;
    }
    setLoading(true);
    LoanHelper.fetchLoanEntry(selectedMember.id).then(data => {
      if (data !== null) {
        dispatch(setLoanDetails(data));
      }
      setLoading(false);
    });
  }, [selectedMember, dispatch]);

  const saveData = async () => {
    if (selectedMember === null) {
      return;
    }
    await LoanHelper.setLoanEntry(selectedMember.id, loanData);
    setSelectedMember(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor="transparent"
      />
      <Text style={styles.headingText}>ऋण Recovery</Text>
      <ScrollView contentContainerStyle={styles.contentWrapper}>
        <MemberSelector onMemberSelected={setSelectedMember} />

        {/* selectedMember === null */}
        {selectedMember !== null && <LoanDataEntry />}
        {selectedMember !== null && (
          <Button
            onClick={saveData}
            centered
            activeOpacity={0.8}
            isLoading={loading}
            style={[styles.button]}>
            <Text style={styles.buttonText}>Save</Text>
          </Button>
        )}
      </ScrollView>
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

  button: {
    marginVertical: hp(1),
    height: hp(5),
    width: wp(90),
    borderRadius: 10,
    backgroundColor: COLORS.ACTION,
  },
  buttonText: {
    color: COLORS.PRIMARY,
    fontSize: wp(3.5),
  },
});

export default LoanRecovery;
