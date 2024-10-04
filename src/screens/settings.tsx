import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {lightColorMode} from '../theme/colors';
import {RootStackParamList} from '../routes';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import GoBack from '../assets/svg/goback.svg';
import ArrowRight from '../assets/svg/arrow-right.svg';
import User from '../assets/svg/user.svg';
import Verified from '../assets/svg/verified.svg';

const Settings = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const profileNav = [
    {
      label: 'Favorites',
      action: () => {
        navigation.navigate('Favourites', {
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

  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flex: 1,
          }}>
          {/* top header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  navigation.canGoBack() ? navigation.goBack() : () => {};
                }}>
                <GoBack
                  width={20}
                  height={20}
                  fill={lightColorMode.appColorBlack}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* header section with text */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Settings</Text>

            <View style={styles.userDetails}>
              <User width={65} height={65} />

              <View style={styles.userInfo}>
                <Text style={styles.usernameText}>Ajibola Bello</Text>

                <View style={styles.otherDetails}>
                  <Text style={styles.emailText}>bello****@gmail.com</Text>

                  <View style={styles.verifiedContainer}>
                    <Verified
                      width={15}
                      height={15}
                      fill={lightColorMode.appColorGreen}
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
                <Text style={styles.navLabel}>{item.label}</Text>
                <ArrowRight fill={lightColorMode.appColorBlack} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColorMode.appColorGrey,
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
    color: lightColorMode.appColorBlack,
    marginLeft: 8,
    fontFamily: 'Lato-Bold',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userDetails: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: lightColorMode.appColorGrey1,
    paddingBottom: 10,
  },
  userInfo: {
    marginLeft: 10,
  },
  usernameText: {
    fontWeight: '600',
    fontSize: 16,
    color: lightColorMode.appColorBlack,
    fontFamily: 'Lato-Bold',
    marginBottom: 6,
  },
  emailText: {
    fontSize: 14,
    color: lightColorMode.appColorBlack,
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
    borderBottomColor: lightColorMode.appColorGrey1,
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 18,
    color: lightColorMode.appColorBlack,
    fontFamily: 'Lato-Bold',
  },
  otherDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: lightColorMode.appColorBlue1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 8,
  },
});
