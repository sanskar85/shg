import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {SATOSHI_MEDIUM} from '../../assets/font';
import MemberSelector from '../../components/modules/MemberSelector';
import {Button, Row} from '../../components/root';
import useBackHandler from '../../configs/useBackHandler';
import {MembersHelper} from '../../firebase/helpers';
import {hp, wp} from '../../helpers/Helpers';
import {
  addMember,
  removeMember,
  updateMember,
} from '../../store/reducers/MemberReducer';
import {Member as IMember} from '../../store/types/MemberState';
import {COLORS} from '../../themes';
import SCREENS, {APP_SCREENS} from '../../themes/screens';

type Props = NativeStackScreenProps<APP_SCREENS, SCREENS.MEMBER>;

// type ItemProps = {
//   item: Menu;
//   index: number;
// };

const Member = ({navigation}: Props) => {
  const goBack = useBackHandler(navigation);

  const dispatch = useDispatch();

  const [text, setText] = useState('');
  const [depositAmount, setDepositAmount] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<IMember | null>(null);

  useEffect(() => {
    if (selectedMember) {
      setText(selectedMember.name);
      setDepositAmount(selectedMember.deposit);
    } else {
      setText('');
      setDepositAmount(0);
    }
  }, [selectedMember]);

  const saveMember = async () => {
    if (!text || !selectedGroup) {
      return;
    }

    if (selectedMember) {
      MembersHelper.updateMember({
        id: selectedMember.id,
        name: text.trim(),
        deposit: depositAmount,
      }).then(() => {
        dispatch(
          updateMember({
            id: selectedMember.id,
            name: text,
            deposit: depositAmount,
          }),
        );
      });
    } else {
      await MembersHelper.addMember({
        name: text.trim(),
        group: selectedGroup,
        deposit: depositAmount,
      }).then(id => {
        if (id === null) {
          return;
        }
        dispatch(
          addMember({
            id: id,
            name: text,
            group: selectedGroup,
            deposit: depositAmount,
          }),
        );
      });
    }
    goBack();
  };

  const deleteSelectedMember = async () => {
    if (!selectedMember) {
      return;
    }
    Alert.alert(
      'Delete Member',
      `Are you sure you want to remove ${selectedMember.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            await MembersHelper.deleteMember(selectedMember.id);
            setSelectedMember(null);
            dispatch(removeMember(selectedMember.id));
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor="transparent"
      />

      <View style={styles.contentWrapper}>
        <Text style={styles.headingText}>Members</Text>

        <MemberSelector
          onGroupSelected={setSelectedGroup}
          onMemberSelected={setSelectedMember}
        />

        <View style={styles.mt1}>
          <Row>
            <View style={styles.horizontalLine} />
            <Text style={styles.horizontalSeparatorText}>OR</Text>
            <View style={styles.horizontalLine} />
          </Row>
        </View>

        <Button
          onClick={() => setSelectedMember(null)}
          centered
          activeOpacity={0.8}
          style={styles.button}>
          <Text style={styles.buttonText}>Add Member</Text>
        </Button>

        <TextInput
          style={styles.input}
          placeholderTextColor={COLORS.GRAY}
          value={text}
          onChangeText={setText}
          placeholder={!selectedMember ? 'नये सदस्य का नाम' : 'सदस्य का नाम'}
        />
        <TextInput
          style={styles.input}
          keyboardType={'number-pad'}
          placeholderTextColor={COLORS.GRAY}
          value={depositAmount ? depositAmount.toString() : ''}
          onChangeText={_text => setDepositAmount(Number(_text))}
          placeholder={'Security Money'}
        />

        <Button
          onClick={saveMember}
          centered
          activeOpacity={0.8}
          style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </Button>

        {selectedMember !== null && (
          <Button
            onClick={deleteSelectedMember}
            centered
            activeOpacity={0.8}
            style={[styles.button, styles.deleteBTN]}>
            <Text style={styles.buttonText}>Delete Member</Text>
          </Button>
        )}
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
    height: hp(100),
    width: wp(100),
  },
  headingText: {
    fontSize: wp(5),
    fontFamily: SATOSHI_MEDIUM,
    color: COLORS.BLACK,
    textAlign: 'center',
    marginTop: hp(1),
    marginBottom: hp(3),
  },

  horizontalLine: {
    flex: 1,
    height: 2,
    marginHorizontal: wp(2),
    backgroundColor: COLORS.GRAY,
    borderRadius: 10,
  },
  horizontalSeparatorText: {
    fontSize: wp(3.5),
    color: COLORS.GRAY,
  },
  dropDownSeparator: {
    height: 1,
    backgroundColor: COLORS.GRAY,
  },
  dropDownContainer: {
    backgroundColor: COLORS.BACKGROUND,

    color: '#000',
  },

  button: {
    marginVertical: hp(1),
    height: hp(5),
    width: wp(90),
    borderRadius: 10,
    backgroundColor: COLORS.ACTION,
  },
  deleteBTN: {
    backgroundColor: COLORS.RED,
  },
  buttonText: {
    color: COLORS.PRIMARY,
    fontSize: wp(3.5),
  },

  input: {
    height: hp(5),
    width: wp(90),
    borderWidth: 2,
    marginTop: hp(2),
    borderColor: COLORS.ACTION_LIGHT,
    borderRadius: 10,
    color: COLORS.BLACK,
    paddingHorizontal: wp(2),
    fontSize: wp(3.5),
  },

  mt1: {
    marginTop: hp(1),
  },
  rowSeparator: {
    height: 20,
  },
});

export default Member;
