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

const Terms = () => {
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
            <Text style={styles.topHeaderText}>Terms & Condition</Text>
          </View>

          <ScrollView
            style={styles.mainContainer}
            showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
            <Text style={styles.sectionContent}>
              By using the App, you acknowledge that you have read, understood,
              and agreed to be bound by these Terms and Conditions, as well as
              our Privacy Policy, available at [Insert Link]. These terms apply
              to all visitors, users, and others who access or use the App.
            </Text>

            <Text style={styles.sectionTitle}>2. Eligibility</Text>
            <Text style={styles.sectionContent}>
              You must be at least 18 years old to use Crypto Kit. By using the
              App, you represent and warrant that you are at least 18 years of
              age and have the full authority to enter into and abide by these
              Terms.
            </Text>

            <Text style={styles.sectionTitle}>
              3. User Account and Security
            </Text>
            <Text style={styles.sectionContent}>
              To use certain features of Crypto Kit, you may be required to
              register and create an account. You are responsible for
              maintaining the confidentiality of your account credentials,
              including your private keys, and for any activities that occur
              under your account. Crypto Kit is not responsible for any loss or
              damage resulting from unauthorized access to your account.
            </Text>

            <Text style={styles.sectionTitle}>4. Use of the App</Text>
            <Text style={styles.sectionContent}>
              Crypto Kit provides features such as viewing cryptocurrency
              prices, managing a portfolio, receiving market insights, and
              tracking token details. However, Crypto Kit does not provide
              financial, investment, or legal advice.
            </Text>

            <Text style={styles.sectionTitle}>
              5. Cryptocurrencies and Market Data
            </Text>
            <Text style={styles.sectionContent}>
              Crypto Kit allows users to view cryptocurrency data and track the
              value of their portfolios. Please note that cryptocurrency markets
              are highly volatile, and prices may fluctuate significantly.
              Crypto Kit does not guarantee the accuracy or completeness of the
              market data provided.
            </Text>

            <Text style={styles.sectionTitle}>
              6. Disclaimer of Financial Responsibility
            </Text>
            <Text style={styles.sectionContent}>
              The information provided by Crypto Kit is for informational
              purposes only. Crypto Kit is not responsible for any financial
              losses or gains you experience due to decisions made based on
              information provided by the App.
            </Text>

            <Text style={styles.sectionTitle}>7. Fees</Text>
            <Text style={styles.sectionContent}>
              Crypto Kit may charge fees for certain premium features or
              services within the App. All fees will be clearly disclosed at the
              time of purchase.
            </Text>

            <Text style={styles.sectionTitle}>8. Intellectual Property</Text>
            <Text style={styles.sectionContent}>
              All content and materials available on Crypto Kit are the property
              of Crypto Kit and are protected by intellectual property laws. You
              are granted a limited, non-exclusive, non-transferable license to
              use the App for your personal use.
            </Text>

            <Text style={styles.sectionTitle}>9. Limitation of Liability</Text>
            <Text style={styles.sectionContent}>
              To the maximum extent permitted by law, Crypto Kit shall not be
              liable for any direct, indirect, incidental, special, or
              consequential damages arising from your use of, or inability to
              use, the App.
            </Text>

            <Text style={styles.sectionTitle}>10. Privacy</Text>
            <Text style={styles.sectionContent}>
              Your privacy is important to us. Please review our Privacy Policy
              at [Insert Link], which outlines how we collect, use, and protect
              your personal data.
            </Text>

            <Text style={styles.sectionTitle}>11. Modification of Terms</Text>
            <Text style={styles.sectionContent}>
              We reserve the right to modify these Terms and Conditions at any
              time. Any changes will be effective immediately upon posting.
            </Text>

            <Text style={styles.sectionTitle}>12. Termination</Text>
            <Text style={styles.sectionContent}>
              Crypto Kit reserves the right to suspend or terminate your access
              to the App at any time, for any reason, including violations of
              these Terms and Conditions.
            </Text>

            <Text style={styles.sectionTitle}>13. Governing Law</Text>
            <Text style={styles.sectionContent}>
              These Terms and Conditions shall be governed by and construed in
              accordance with the laws of [Your Country].
            </Text>

            <Text style={styles.sectionTitle}>14. Contact Us</Text>
            <Text style={styles.sectionContent}>
              If you have any questions or concerns about these Terms and
              Conditions, please contact us at [Insert Contact Information].
            </Text>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Terms;

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
    fontFamily: 'Lato-Bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: lightColorMode.appColorBlack,
    fontFamily: 'Lato-Regular',
  },
  sectionContent: {
    fontSize: 14,
    marginBottom: 15,
    color: lightColorMode.appColorBlack,
    fontFamily: 'Lato-Regular',
  },
});
