import React from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../routes';
import {useTheme} from '../theme/theme'; // Update this import to match your file structure
import GoBack from '../assets/svg/goback.svg';
import ArrowRight from '../assets/svg/arrow-right.svg';
import User from '../assets/svg/user.svg';
import Verified from '../assets/svg/verified.svg';
import {lightColorMode} from '../theme/colors';

const Settings: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {theme, themeMode, changeTheme} = useTheme();

  const isDarkMode = themeMode === 'dark';

  const toggleTheme = () => {
    changeTheme(isDarkMode ? 'light' : 'dark');
  };

  const profileNav = [
    {
      label: 'Favorites',
      action: () => {
        navigation.navigate('Favorites', {
          gotoBackToSettings: true,
        });
      },
    },
    {
      label: 'Privacy & Policy',
      action: () => {
        navigation.navigate('Privacy');
      },
    },
    {
      label: 'Terms & Condition',
      action: () => {
        navigation.navigate('Terms');
      },
    },
  ];

  // Optimized Dynamic styles that depend on the theme
  const dynamicStyles = React.useMemo(
    () => ({
      container: {
        backgroundColor: theme.appColorGrey,
      },
      blackText: {
        color: theme.appColorBlack,
      },
    }),
    [theme],
  );

  return (
    <>
      <StatusBar />
      <SafeAreaView style={[styles.container, dynamicStyles.container]}>
        <View style={{flex: 1}}>
          {/* top header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  navigation.canGoBack() ? navigation.goBack() : () => {};
                }}>
                <GoBack width={20} height={20} fill={theme.appColorBlack} />
              </TouchableOpacity>

              <View style={styles.switchContainer}>
                <Text style={[styles.modeText, dynamicStyles.blackText]}>
                  Dark Mode
                </Text>
                <Switch value={isDarkMode} onValueChange={toggleTheme} />
              </View>
            </View>
          </View>

          {/* header section with text */}
          <View style={styles.header}>
            <Text style={[styles.headerText, dynamicStyles.blackText]}>
              Settings
            </Text>

            <View style={styles.userDetails}>
              <User
                width={65}
                height={65}
                fill={lightColorMode.appColorWhite}
              />

              <View style={styles.userInfo}>
                <Text style={[styles.usernameText, dynamicStyles.blackText]}>
                  Ajibola Bello
                </Text>

                <View style={styles.otherDetails}>
                  <Text style={[styles.emailText, dynamicStyles.blackText]}>
                    bello****@gmail.com
                  </Text>

                  <View style={styles.verifiedContainer}>
                    <Verified
                      width={15}
                      height={15}
                      fill={theme.appColorGreen}
                    />
                    <Text
                      style={[
                        styles.emailText,
                        {
                          marginLeft: 4,
                        },
                      ]}>
                      Verified
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.mainContent}>
            {profileNav.map(item => (
              <TouchableOpacity
                onPress={() => {
                  item.action();
                }}
                activeOpacity={0.6}
                key={`profile-nav-${item.label}`}
                style={styles.navLink}>
                <Text style={[styles.navLabel, dynamicStyles.blackText]}>
                  {item.label}
                </Text>
                <ArrowRight fill={theme.appColorBlack} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  topHeader: {
    paddingHorizontal: 16,
  },
  header: {
    paddingHorizontal: 16,
    marginTop: 15,
  },
  headerText: {
    fontWeight: '600',
    fontSize: 40,
    marginLeft: 8,
    fontFamily: 'Lato-Bold',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userDetails: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'lightColorMode.appColorGrey1', // This will need to be updated
    paddingBottom: 10,
  },
  userInfo: {
    marginLeft: 10,
  },
  usernameText: {
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Lato-Bold',
    marginBottom: 6,
  },
  emailText: {
    fontSize: 14,
    fontFamily: 'Lato-Regular',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  navLink: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'lightColorMode.appColorGrey1', // This will need to be updated
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 18,
    fontFamily: 'Lato-Bold',
  },
  otherDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightColorMode.appColorBlue1', // This will need to be updated
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 8,
  },
  modeText: {
    fontSize: 16,
    fontFamily: 'Lato-Bold',
    marginRight: 10,
  },
  switchContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default Settings;
