import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {useDispatch, useSelector} from 'react-redux';
import {SATOSHI_MEDIUM} from '../../assets/font';
import {REMOVE} from '../../assets/Images';
import {Button, Row} from '../../components/root';
import useBackHandler from '../../configs/useBackHandler';
import {SettingsHelper} from '../../firebase/helpers';
import {hp, wp} from '../../helpers/Helpers';
import {StoreNames} from '../../store/config';
import {
  addGroup,
  removeGroup,
  setGroups,
} from '../../store/reducers/GroupReducer';
import {COLORS} from '../../themes';
import SCREENS, {APP_SCREENS} from '../../themes/screens';
import StoreState from '../../types/store';

type ItemProps = {
  item: string;
  index: number;
};

type Props = NativeStackScreenProps<APP_SCREENS, SCREENS.GROUP>;

const Group = ({navigation}: Props) => {
  const [text, setText] = React.useState('');
  const {groups} = useSelector((state: StoreState) => state[StoreNames.GROUP]);
  const dispatch = useDispatch();

  const goBack = useBackHandler(navigation);

  const handleAddGroup = () => {
    if (!text) {
      return;
    }
    dispatch(addGroup(text));
    setText('');
  };

  useEffect(() => {
    SettingsHelper.fetchAllGroups().then(data => {
      if (data) {
        dispatch(setGroups(data));
      }
    });
  }, [dispatch]);

  const saveData = () => {
    SettingsHelper.saveGroups(groups);
    goBack();
  };

  const renderItem = ({index, item}: ItemProps) => (
    <View style={styles.itemWrapper}>
      <Shadow
        key={index}
        distance={10}
        startColor={'#00000015'}
        style={styles.item}>
        <Row style={styles.between}>
          <Text style={styles.itemText}>{item}</Text>
          <Button
            style={styles.itemDelete}
            onClick={() => dispatch(removeGroup(item))}>
            <REMOVE width={30} />
          </Button>
        </Row>
      </Shadow>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor="transparent"
      />

      <View style={styles.contentWrapper}>
        <Text style={styles.headingText}>Manage Groups</Text>

        <TextInput
          style={styles.input}
          placeholderTextColor={COLORS.GRAY_DARK}
          value={text}
          onChangeText={setText}
          placeholder="New Group Name"
        />

        <Button onClick={handleAddGroup} centered style={styles.button}>
          <Text style={styles.textWhite}>Add Group</Text>
        </Button>

        <FlatList
          data={groups}
          contentContainerStyle={styles.listContainer}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.rowSeparator} />}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index + ''}
        />

        <Button onClick={saveData} centered style={styles.button}>
          <Text style={styles.textWhite}>Save Groups</Text>
        </Button>
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
    paddingBottom: hp(2),
  },
  headingText: {
    fontSize: wp(5),
    fontFamily: SATOSHI_MEDIUM,
    color: COLORS.BLACK,
    textAlign: 'center',
    marginTop: hp(1),
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
  button: {
    marginVertical: hp(1),
    height: hp(5),
    width: wp(90),
    borderRadius: 10,
    backgroundColor: COLORS.ACTION,
  },

  listContainer: {
    paddingVertical: hp(2),
  },

  itemWrapper: {
    paddingVertical: wp(1),
    paddingHorizontal: wp(2.5),
  },
  item: {
    height: hp(5),
    width: wp(85),
    borderRadius: 10,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: wp(2),
    justifyContent: 'center',
  },
  itemText: {
    fontSize: wp(3.5),
    color: COLORS.GRAY_DARK,
  },
  itemDelete: {
    height: hp(5),
    width: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  between: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowSeparator: {
    height: 10,
  },
  textWhite: {
    color: COLORS.PRIMARY,
    fontSize: wp(3.5),
  },
});

export default Group;
