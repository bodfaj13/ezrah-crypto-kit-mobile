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
import GoBack from '../assets/svg/goback.svg';
import {RootStackParamList} from '../routes';
import {NavigationProp, useNavigation} from '@react-navigation/native';

const Privacy = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleGoBack = () => {
    navigation.navigate('Settings');
  };

  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.container}>
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
                fill={lightColorMode.appColorBlack}
              />
            </TouchableOpacity>
            <Text style={styles.topHeaderText}>Privacy & Policy</Text>
          </View>

          <ScrollView
            style={styles.mainContainer}
            showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionTitle}>1. Introduction</Text>
            <Text style={styles.sectionContent}>
              At Crypto Kit, we respect your privacy and are committed to
              protecting the personal information you may provide while using
              our app. This Privacy Policy explains what information we collect,
              how we use it, and your rights regarding your personal data.
            </Text>

            <Text style={styles.sectionTitle}>2. Information We Collect</Text>
            <Text style={styles.sectionContent}>
              We may collect the following types of information:
              {'\n\n'}
              <Text style={styles.subItem}>- Personal Information: </Text> Name,
              email address, and other identifying details when you register or
              interact with our services.
              {'\n\n'}
              <Text style={styles.subItem}>- Usage Data: </Text> Information
              such as your IP address, device type, operating system, and usage
              statistics when you use the app.
              {'\n\n'}
              <Text style={styles.subItem}>
                - Cookies and Tracking Technologies:{' '}
              </Text>{' '}
              We may use cookies to enhance your experience and track app usage.
            </Text>

            <Text style={styles.sectionTitle}>
              3. How We Use Your Information
            </Text>
            <Text style={styles.sectionContent}>
              We use the information we collect to:
              {'\n\n'}
              <Text style={styles.subItem}>
                - Provide and maintain the app:{' '}
              </Text>{' '}
              Ensure that you can access and use the features of Crypto Kit.
              {'\n\n'}
              <Text style={styles.subItem}>- Improve the app: </Text> Analyze
              user behavior and preferences to improve the app's functionality
              and performance.
              {'\n\n'}
              <Text style={styles.subItem}>- Communicate with you: </Text> Send
              you updates, promotions, or respond to your inquiries.
              {'\n\n'}
              <Text style={styles.subItem}>- Legal purposes: </Text> Comply with
              legal obligations or respond to lawful requests for information.
            </Text>

            <Text style={styles.sectionTitle}>
              4. How We Share Your Information
            </Text>
            <Text style={styles.sectionContent}>
              We may share your personal information with:
              {'\n\n'}
              <Text style={styles.subItem}>- Service Providers: </Text>{' '}
              Third-party companies that provide services such as analytics,
              hosting, or customer support on our behalf.
              {'\n\n'}
              <Text style={styles.subItem}>- Legal Authorities: </Text> When
              required by law or necessary to protect our legal rights.
              {'\n\n'}
              <Text style={styles.subItem}>- With Your Consent: </Text> We may
              share your data with third parties when you give us explicit
              consent to do so.
            </Text>

            <Text style={styles.sectionTitle}>5. Data Retention</Text>
            <Text style={styles.sectionContent}>
              We will retain your personal data only as long as necessary to
              fulfill the purposes for which it was collected or as required by
              law. When your information is no longer needed, we will securely
              delete or anonymize it.
            </Text>

            <Text style={styles.sectionTitle}>6. Security</Text>
            <Text style={styles.sectionContent}>
              We take reasonable steps to protect your personal information from
              unauthorized access, use, or disclosure. However, no method of
              transmission over the internet or electronic storage is 100%
              secure.
            </Text>

            <Text style={styles.sectionTitle}>7. Your Rights</Text>
            <Text style={styles.sectionContent}>
              You have the following rights regarding your personal information:
              {'\n\n'}
              <Text style={styles.subItem}>- Access: </Text> You can request
              access to your personal data.
              {'\n\n'}
              <Text style={styles.subItem}>- Correction: </Text> You can request
              corrections to any inaccurate information.
              {'\n\n'}
              <Text style={styles.subItem}>- Deletion: </Text> You can request
              the deletion of your personal information, subject to legal
              limitations.
              {'\n\n'}
              <Text style={styles.subItem}>- Opt-Out: </Text> You can opt out of
              marketing communications or withdraw consent at any time.
            </Text>

            <Text style={styles.sectionTitle}>8. Third-Party Links</Text>
            <Text style={styles.sectionContent}>
              Crypto Kit may contain links to third-party websites or services
              that we do not control. We are not responsible for the privacy
              practices or content of these external sites. We encourage you to
              review the privacy policies of any third-party sites you visit.
            </Text>

            <Text style={styles.sectionTitle}>
              9. Changes to This Privacy Policy
            </Text>
            <Text style={styles.sectionContent}>
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the updated policy within the
              app or through other communication channels.
            </Text>

            <Text style={styles.sectionTitle}>10. Contact Us</Text>
            <Text style={styles.sectionContent}>
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
    backgroundColor: lightColorMode.appColorGrey,
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
    color: lightColorMode.appColorBlack,
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
		color: lightColorMode.appColorBlack,
    fontFamily: 'Lato-Regular',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
		color: lightColorMode.appColorBlack,
    fontFamily: 'Lato-Bold',
  },
  sectionContent: {
    fontSize: 14,
    marginBottom: 15,
  },
  subItem: {
    fontWeight: 'bold',
		color: lightColorMode.appColorBlack,
    fontFamily: 'Lato-Regular',
  },
});
