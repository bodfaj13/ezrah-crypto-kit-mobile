import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {lightColorMode} from '../../theme/colors';
import Home from '../../assets/svg/home.svg';
import Settings from '../../assets/svg/settings.svg';
import Fav from '../../assets/svg/fav.svg';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../routes';

const CustomSideBar = (props: DrawerContentComponentProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Array of navigation items with their labels, actions, and icons
  const nav = [
    {
      label: 'Home',
      action: () => {
        navigation.navigate('Tokens');
      },
      icon: <Home fill={lightColorMode.appColorBlack} width={30} height={30} />,
    },
    {
      label: 'Settings',
      action: () => {
        navigation.navigate('Settings');
      },
      icon: (
        <Settings fill={lightColorMode.appColorBlack} width={30} height={30} />
      ),
    },
    {
      label: 'Favorites',
      action: () => {
        navigation.navigate('Favorites', {
          gotoBackToSettings: false,
        });
      },
      icon: <Fav fill={lightColorMode.appColorBlack} width={30} height={30} />,
    },
  ];

  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      {/* Map through nav items and render TouchableOpacity for each */}
      {nav.map(item => (
        <TouchableOpacity
          key={`nav-item-${item.label}`}
          activeOpacity={0.6}
          onPress={() => {
            item.action();
          }}
          style={styles.navItem}>
          {item.icon}
          <Text style={styles.navText}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </DrawerContentScrollView>
  );
};

export default CustomSideBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColorMode.appColorWhite,
  },
  navItem: {
    padding: 18,
    alignItems: 'center',
    flexDirection: 'row',
  },
  navText: {
    fontSize: 24,
    fontFamily: 'Lato-Regular',
    color: lightColorMode.appColorBlack,
    marginLeft: 10,
  },
});
