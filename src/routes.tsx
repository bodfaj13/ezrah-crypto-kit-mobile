import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Tokens from './screens/tokens';
import Settings from './screens/settings';
import {TokenDetail, TokenInfo} from './api/tokenQueries';
import SingleToken from './screens/single-token';
import Favorites from './screens/favorites';
import CustomSideBar from './components/custom-side-bar/custom-side-bar';
import Terms from './screens/terms';
import Privacy from './screens/privacy';

// the aim is to have 3 simple screens.
// drawer navigation
//    2 items within Settings and Main crypto view
//    A stack navigator within crypto view to hold two screens the main view and the single crypto assets view.
//

export type RootStackParamList = {
  Tokens: undefined;
  SingleToken: {
    tokenDetail?: TokenDetail;
  };
  Settings: undefined;
  Favorites: {
    gotoBackToSettings?: boolean;
  };
  Terms: undefined;
  Privacy: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

const StackView = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Tokens" component={Tokens} />
      <Stack.Screen name="SingleToken" component={SingleToken} />
    </Stack.Navigator>
  );
};

const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={props => <CustomSideBar {...props} />}
    screenOptions={{
      headerTransparent: true,
      headerTitle: '',
      headerShown: false,
    }}>
    <Drawer.Screen name="MainView" component={StackView} />
    <Drawer.Screen name="Settings" component={Settings} />
    <Drawer.Screen name="Favorites" component={Favorites} />
    <Drawer.Screen name="Terms" component={Terms} />
    <Drawer.Screen name="Privacy" component={Privacy} />
  </Drawer.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default App;
