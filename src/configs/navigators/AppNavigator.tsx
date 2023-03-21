import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import {HEADER_NONE_CONFIG} from './header_config';
import SCREENS, {APP_SCREENS} from '../../themes/screens';
import {Splash} from '../../screens/splash';
import {Login} from '../../screens/login';
import {Profile} from '../../screens/profile';
import {Home} from '../../screens/home';
import {Group} from '../../screens/group';
import {Member} from '../../screens/member';
import {LoanEntry} from '../../screens/loan_entry';
import {MonthlyMeeting} from '../../screens/monthly_meeting';
import {LoanRecovery} from '../../screens/loan_recovery';
import {Report} from '../../screens/report';

const Stack = createNativeStackNavigator<APP_SCREENS>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={SCREENS.SPLASH}>
        <Stack.Screen
          name={SCREENS.SPLASH}
          component={Splash}
          options={HEADER_NONE_CONFIG}
        />
        <Stack.Screen
          name={SCREENS.LOGIN}
          component={Login}
          options={HEADER_NONE_CONFIG}
        />
        <Stack.Screen
          name={SCREENS.PROFILE}
          component={Profile}
          options={HEADER_NONE_CONFIG}
        />
        <Stack.Screen
          name={SCREENS.HOME}
          component={Home}
          options={HEADER_NONE_CONFIG}
        />
        <Stack.Screen
          name={SCREENS.GROUP}
          component={Group}
          options={HEADER_NONE_CONFIG}
        />
        <Stack.Screen
          name={SCREENS.MEMBER}
          component={Member}
          options={HEADER_NONE_CONFIG}
        />
        <Stack.Screen
          name={SCREENS.LOAN_ENTRY}
          component={LoanEntry}
          options={HEADER_NONE_CONFIG}
        />
        <Stack.Screen
          name={SCREENS.LOAN_RECOVERY}
          component={LoanRecovery}
          options={HEADER_NONE_CONFIG}
        />
        <Stack.Screen
          name={SCREENS.MONTHLY_MEETING}
          component={MonthlyMeeting}
          options={HEADER_NONE_CONFIG}
        />
        <Stack.Screen
          name={SCREENS.REPORT}
          component={Report}
          options={HEADER_NONE_CONFIG}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
