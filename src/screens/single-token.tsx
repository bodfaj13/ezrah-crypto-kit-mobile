import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {lightColorMode} from '../theme/colors';
import GoBack from '../assets/svg/goback.svg';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {RootStackParamList} from '../routes';
import useTokenStore from '../hooks/useTokenStore';
import SolidHeart from '../assets/svg/solid-heart.svg';
import Heart from '../assets/svg/heart.svg';
import {TokenDetail, useCryptoTickers} from '../api/tokenQueries';
import ArrowUp from '../assets/svg/arrow-up.svg';
import ArrowDown from '../assets/svg/arrow-down.svg';
import {formatCurrency} from '../utils/helper';
import SingleTokenChart from '../components/charts/single-token-chart';
import LiveData from '../components/charts/live-data';
import {useTheme} from '../theme/theme';

const views = [
  {
    title: 'Overview',
    id: 'overview',
  },
  {
    title: 'View Live Data',
    id: 'liveData',
  },
];

const START_DATE = '2024-01-01';

const SingleToken = () => {
  type RouteType = RouteProp<RootStackParamList, 'SingleToken'>;
  const {params} = useRoute<RouteType>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {addToken, removeToken, isTokenInArray} = useTokenStore();

  // Get theme-related data from the context
  const {theme} = useTheme();

  // Default view is 'overview'
  const [activeView, setActiveView] = useState(views[0].id);

  const {isPending, data} = useCryptoTickers(
    `${params?.tokenDetail?.symbol.toLowerCase()}-${params?.tokenDetail?.slug}`,
    START_DATE,
  );

  // Toggle the favorite status of the token
  const handlePress = () => {
    let tokenId = params?.tokenDetail?.id as string;

    if (isTokenInArray(tokenId)) {
      removeToken(tokenId);
    } else {
      addToken(params?.tokenDetail as TokenDetail);
    }
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
              <Image
                source={{
                  uri: params?.tokenDetail?.logo,
                }}
                style={styles.logo}
              />
              <Text style={[styles.headerText, dynamicStyles.blackText]}>
                {params?.tokenDetail?.name}
              </Text>
            </View>

            <TouchableOpacity activeOpacity={0.6} onPress={handlePress}>
              {isTokenInArray(params?.tokenDetail?.id as string) ? (
                <SolidHeart width={24} height={24} fill={theme.appColorBlack} />
              ) : (
                <Heart width={24} height={24} fill={theme.appColorBlack} />
              )}
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.mainContent}>
            {/* Show upward or downward arrow based on price change */}
            <View style={styles.priceDetails}>
              {/* Token price */}
              <Text style={[styles.infoMainText, dynamicStyles.blackText]}>
                {formatCurrency(params?.tokenDetail?.price)}
              </Text>
              {params?.tokenDetail?.percentageChange1h !== undefined && (
                <View style={styles.indicators}>
                  {/* Price change indicator (up or down arrow) */}
                  {params?.tokenDetail?.percentageChange1h > 0 ? (
                    <ArrowUp
                      fill={theme.appColorGreen}
                      width={22}
                      height={22}
                    />
                  ) : (
                    <ArrowDown
                      fill={theme.appColorRed}
                      width={22}
                      height={22}
                    />
                  )}
                  <Text
                    style={
                      params?.tokenDetail?.percentageChange1h > 0
                        ? styles.gainText
                        : styles.lossText
                    }>
                    {/* Percentage change */}
                    {params?.tokenDetail?.percentageChange1h.toFixed(2)}%
                  </Text>
                </View>
              )}
            </View>

            {/* Tabs for switching between 'Overview' and 'View Live Data' */}
            <View style={styles.tabs}>
              {views.map(item => (
                <TouchableOpacity
                  key={`tab-${item.id}`}
                  style={[
                    styles.tab,
                    {
                      backgroundColor:
                        activeView === item.id
                          ? lightColorMode.appColorBlue1
                          : lightColorMode.appColorWhite,
                    },
                  ]}
                  activeOpacity={0.6}
                  onPress={() => {
                    setActiveView(item.id);
                  }}>
                  <Text style={styles.tabText}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Conditionally render views based on the selected tab */}
            {activeView === views[0].id && (
              <>
                <SingleTokenChart data={data} />

                <View style={styles.description}>
                  <Text style={styles.descMainText}>Description</Text>
                  <Text style={styles.descSubText}>
                    {params?.tokenDetail?.description}
                  </Text>
                </View>
              </>
            )}

            {activeView === views[1].id && (
              <LiveData symbol={params?.tokenDetail?.symbol as string} />
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default SingleToken;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  header: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: '600',
    fontSize: 24,
    marginLeft: 8,
    fontFamily: 'Lato-Bold',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  logo: {
    width: 26,
    height: 26,
    marginLeft: 8,
  },
  logoText: {
    fontSize: 24,
    color: lightColorMode.appColorBlack,
    fontWeight: '600',
    fontFamily: 'Lato-Bold',
  },
  priceDetails: {
    marginTop: 10,
  },
  infoMainText: {
    fontWeight: 'bold',
    fontSize: 40,
    fontFamily: 'Lato-Bold',
  },
  indicators: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  gainText: {
    color: lightColorMode.appColorGreen,
    fontSize: 20,
    fontFamily: 'Lato-Regular',
    marginTop: 8,
  },
  lossText: {
    color: lightColorMode.appColorRed,
    fontSize: 20,
    fontFamily: 'Lato-Regular',
    marginTop: 8,
  },
  description: {
    marginTop: 30,
    backgroundColor: lightColorMode.appColorWhite,
    padding: 16,
    borderRadius: 8,
    elevation: 0.5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0.5},
    shadowOpacity: 0.05,
  },
  descMainText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: lightColorMode.appColorBlack,
    fontFamily: 'Lato-Bold',
    marginBottom: 10,
  },
  descSubText: {
    fontSize: 16,
    color: lightColorMode.appColorBlack,
    fontFamily: 'Lato-Regular',
    lineHeight: 24,
  },
  tabs: {
    flexDirection: 'row',
    marginTop: 14,
  },
  tab: {
    marginRight: 8,
    padding: 8,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  tabText: {
    fontSize: 16,
    color: lightColorMode.appColorBlack,
    fontFamily: 'Lato-Regular',
  },
});
