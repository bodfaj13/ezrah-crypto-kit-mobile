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
import GoBack from '../assets/svg/goback.svg';
import {RootStackParamList} from '../routes';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useTheme} from '../theme/theme';

const Privacy = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Get theme-related data from the context
  const {theme} = useTheme();

  const handleGoBack = () => {
    navigation.navigate('Settings');
  };

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
        <View
          style={{
            flex: 1,
          }}>
          {/* Top header containing the menu button, title, and user icon */}
          <View style={[styles.topHeader]}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                handleGoBack();
              }}>
              <GoBack
                width={20}
                height={20}
                fill={theme.appColorBlack}
              />
            </TouchableOpacity>
            <Text style={[styles.topHeaderText, dynamicStyles.blackText]}>Privacy & Policy</Text>
          </View>

          <ScrollView
            style={styles.mainContainer}
            showsVerticalScrollIndicator={false}>
            <Text style={[styles.sectionTitle, dynamicStyles.blackText]}>1. Introduction</Text>
            <Text style={[styles.sectionContent, dynamicStyles.blackText]}>
              At Crypto Kit, we respect your privacy and are committed to
              protecting the personal information you may provide while using
              our app. This Privacy Policy explains what information we collect,
              how we use it, and your rights regarding your personal data.
            </Text>

            <Text style={[styles.sectionTitle, dynamicStyles.blackText]}>2. Information We Collect</Text>
            <Text style={[styles.sectionContent, dynamicStyles.blackText]}>
              We may collect the following types of information:
              {'\n\n'}
              <Text style={[styles.subItem, dynamicStyles.blackText]}>- Personal Information: </Text> Name,
              email address, and other identifying details when you register or
              interact with our services.
              {'\n\n'}
              <Text style={[styles.subItem, dynamicStyles.blackText]}>- Usage Data: </Text> Information
              such as your IP address, device type, operating system, and usage
              statistics when you use the app.
              {'\n\n'}
              <Text style={[styles.subItem, dynamicStyles.blackText]}>
                - Cookies and Tracking Technologies:{' '}
              </Text>{' '}
              We may use cookies to enhance your experience and track app usage.
            </Text>

            <Text style={[styles.sectionTitle, dynamicStyles.blackText]}>
              3. How We Use Your Information
            </Text>
            <Text style={[styles.sectionContent, dynamicStyles.blackText]}>
              We use the information we collect to:
              {'\n\n'}
              <Text style={[styles.subItem, dynamicStyles.blackText]}>
                - Provide and maintain the app:{' '}
              </Text>{' '}
              Ensure that you can access and use the features of Crypto Kit.
              {'\n\n'}
              <Text style={[styles.subItem, dynamicStyles.blackText]}>- Improve the app: </Text> Analyze
              user behavior and preferences to improve the app's functionality
              and performance.
              {'\n\n'}
              <Text style={[styles.subItem, dynamicStyles.blackText]}>- Communicate with you: </Text> Send
              you updates, promotions, or respond to your inquiries.
              {'\n\n'}
              <Text style={[styles.subItem, dynamicStyles.blackText]}>- Legal purposes: </Text> Comply with
              legal obligations or respond to lawful requests for information.
            </Text>

            <Text style={[styles.sectionTitle, dynamicStyles.blackText]}>
              4. How We Share Your Information
            </Text>
            <Text style={[styles.sectionContent, dynamicStyles.blackText]}>
              We may share your personal information with:
              {'\n\n'}
              <Text style={[styles.subItem, dynamicStyles.blackText]}>- Service Providers: </Text>{' '}
              Third-party companies that provide services such as analytics,
              hosting, or customer support on our behalf.
              {'\n\n'}
              <Text style={[styles.subItem, dynamicStyles.blackText]}>- Legal Authorities: </Text> When
              required by law or necessary to protect our legal rights.
              {'\n\n'}
              <Text style={[styles.subItem, dynamicStyles.blackText]}>- With Your Consent: </Text> We may
              share your data with third parties when you give us explicit
              consent to do so.
            </Text>

            <Text style={[styles.sectionTitle, dynamicStyles.blackText]}>5. Data Retention</Text>
            <Text style={[styles.sectionContent, dynamicStyles.blackText]}>
              We will retain your personal data only as long as necessary to
              fulfill the purposes for which it was collected or as required by
              law. When your information is no longer needed, we will securely
              delete or anonymize it.
            </Text>

            <Text style={[styles.sectionTitle, dynamicStyles.blackText]}>6. Security</Text>
            <Text style={[styles.sectionContent, dynamicStyles.blackText]}>
              We take reasonable steps to protect your personal information from
              unauthorized access, use, or disclosure. However, no method of
              transmission over the internet or electronic storage is 100%
              secure.
            </Text>

            <Text style={[styles.sectionTitle, dynamicStyles.blackText]}>7. Your Rights</Text>
            <Text style={[styles.sectionContent, dynamicStyles.blackText]}>
              You have the following rights regarding your personal information:
              {'\n\n'}
              <Text style={[styles.subItem, dynamicStyles.blackText]}>- Access: </Text> You can request
              access to your personal data.
              {'\n\n'}
              <Text style={[styles.subItem, dynamicStyles.blackText]}>- Correction: </Text> You can request
              corrections to any inaccurate information.
              {'\n\n'}
              <Text style={[styles.subItem, dynamicStyles.blackText]}>- Deletion: </Text> You can request
              the deletion of your personal information, subject to legal
              limitations.
              {'\n\n'}
              <Text style={[styles.subItem, dynamicStyles.blackText]}>- Opt-Out: </Text> You can opt out of
              marketing communications or withdraw consent at any time.
            </Text>

            <Text style={[styles.sectionTitle, dynamicStyles.blackText]}>8. Third-Party Links</Text>
            <Text style={[styles.sectionContent, dynamicStyles.blackText]}>
              Crypto Kit may contain links to third-party websites or services
              that we do not control. We are not responsible for the privacy
              practices or content of these external sites. We encourage you to
              review the privacy policies of any third-party sites you visit.
            </Text>

            <Text style={[styles.sectionTitle, dynamicStyles.blackText]}>
              9. Changes to This Privacy Policy
            </Text>
            <Text style={[styles.sectionContent, dynamicStyles.blackText]}>
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the updated policy within the
              app or through other communication channels.
            </Text>

            <Text style={[styles.sectionTitle, dynamicStyles.blackText]}>10. Contact Us</Text>
            <Text style={[styles.sectionContent, dynamicStyles.blackText]}>
              If you have any questions about this Privacy Policy or your
              personal data, please contact us at:
              {'\n\n'}
              Email: bellohargbola13@gmail.com
            </Text>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Privacy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  topHeader: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  topHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Lato-Bold',
    marginLeft: 10,
  },
  mainContainer: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Lato-Regular',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    fontFamily: 'Lato-Bold',
  },
  sectionContent: {
    fontSize: 14,
    marginBottom: 15,
  },
  subItem: {
    fontWeight: 'bold',
    fontFamily: 'Lato-Regular',
  },
});