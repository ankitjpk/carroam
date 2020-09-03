import * as React from 'react';
import {HomeScreen, SummaryScreen} from './screens';
import ActivityPopup from './components/ActivityPopup/ActivityPopup';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const AppWithNavigation: React.FC = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="Summary"
          component={SummaryScreen}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="complete"
          component={ActivityPopup}
          options={{header: () => null}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppWithNavigation;
