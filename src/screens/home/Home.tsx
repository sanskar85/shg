import React, {useEffect, useRef} from 'react';
import {StackActions} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {useSelector} from 'react-redux';
import {SATOSHI_MEDIUM} from '../../assets/font';
import {Button} from '../../components/root';
import {hp, wp} from '../../helpers/Helpers';
import {StoreNames} from '../../store/config';
import {COLORS} from '../../themes';
import SCREENS, {APP_SCREENS} from '../../themes/screens';
import StoreState from '../../types/store';
import menus, {Menu} from './menus';
import useBackHandler from '../../configs/useBackHandler';
import moment from 'moment';
import {LoadStoreData} from '../../store';

type Props = NativeStackScreenProps<APP_SCREENS, SCREENS.HOME>;

type ItemProps = {
  item: Menu;
  index: number;
};

const Home = ({route, navigation}: Props) => {
  const canExit = useRef(false);
  //get navigation state

  useBackHandler(navigation, () => {
    if (canExit.current) {
      return false;
    }
    ToastAndroid.show('Press back again to exit.', ToastAndroid.SHORT);
    canExit.current = true;
    setTimeout(() => {
      canExit.current = false;
    }, 1500);
    return true;
  });

  useEffect(() => {
    if (route.params?.fetchDetails) {
      LoadStoreData();
    }
  }, [route.params]);

  const {name: title, working_month} = useSelector(
    (state: StoreState) => state[StoreNames.PROFILE],
  );

  const renderItem = ({index, item}: ItemProps) => (
    <View style={styles.menuItemWrapper}>
      <Shadow
        key={index}
        distance={10}
        startColor={'#00000015'}
        style={styles.menuItem}>
        <Button
          centered
          onClick={() => navigation.dispatch(StackActions.push(item.screen))}>
          <View style={styles.menuItemIcon}>
            <item.icon />
          </View>
          <Text style={styles.menuItemText}>{item.title}</Text>
        </Button>
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
        <Text style={styles.headingText}>{title}</Text>
        {working_month && (
          <Text style={styles.subHeadingText}>
            {moment(working_month, 'MM-YYYY').format('MMMM YYYY')}
          </Text>
        )}
        <FlatList
          data={menus}
          numColumns={2}
          contentContainerStyle={styles.menuContainer}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.rowSeparator} />}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index + ''}
        />
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
  },
  subHeadingText: {
    fontSize: wp(4),
    fontFamily: SATOSHI_MEDIUM,
    color: COLORS.GRAY_DARK,
    textAlign: 'center',
  },

  menuContainer: {
    marginTop: hp(1),
    justifyContent: 'center',
    paddingVertical: hp(2),
    alignItems: 'center',
  },
  menuItemWrapper: {
    paddingHorizontal: wp(2.5),
  },

  menuItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(40),
    height: wp(40),
    borderRadius: 10,
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
    backgroundColor: COLORS.PRIMARY,
  },
  menuItemIcon: {
    marginBottom: hp(1),
    width: wp(20),
    height: wp(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: wp(4),
    fontFamily: SATOSHI_MEDIUM,
    color: COLORS.ACTION,
    textAlign: 'center',
  },
  rowSeparator: {
    height: 20,
  },
});

export default Home;
