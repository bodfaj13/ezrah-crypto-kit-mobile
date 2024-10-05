import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  RefreshControl,
  TouchableOpacity,
  Platform,
  Animated,
} from 'react-native';
import TokenItem from '../components/token-item/token-item';
import {Token, useTokenInfo, useTokenList} from '../api/tokenQueries';
import Menu from '../assets/svg/menu.svg';
import User from '../assets/svg/user.svg';
import {RootStackParamList} from '../routes';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useTheme} from '../theme/theme';
import {lightColorMode} from '../theme/colors';
import NoData from '../assets/svg/nodata.svg';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import Preloader from '../components/preloader/preloader';
import { dummyToken } from '../dummydata/dummy-data';

const Tokens: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const navigationDrawer =
    useNavigation<DrawerNavigationProp<RootStackParamList>>();
  const scrollY = useRef(new Animated.Value(0)).current;

  // Get theme-related data from the context
  const {theme} = useTheme();

  const [refreshing, setRefreshing] = useState(false);
  const [flatListHeight, setFlatListHeight] = useState(0);
  const [isScrollable, setIsScrollable] = useState(false);

  // Custom hook to fetch token list
  const {
    isPending: isTokensLoading,
    data: tokens,
    refetch,
    error,
  } = useTokenList(20);

  // Join token ids to be used for fetching additional info
  const ids = tokens?.map(item => item.id).join(',');

  // Fetch additional token information based on token ids
  const {data: infoData, isPending: isInfoPending} = useTokenInfo(ids);

  // Handle refreshing
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // Function to render each token item
  const renderItems = ({index, item}: {index: number; item: Token}) => {
    // Find additional token info based on id
    const info = infoData?.find(i => i.id === item.id);

    return isTokensLoading || isInfoPending ? (
      <Preloader
        style={{
          width: '100%',
          height: 80,
          marginBottom: 10,
          borderRadius: 8,
        }}
      />
    ) : (
      <TokenItem
        tokenDetail={{...item, ...info}}
        key={`token-${index}-${item?.id}`}
      />
    );
  };

  // Header animation for opacity (fades out as you scroll down)
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // Header animation for translating Y-axis (moves up as you scroll down)
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  // Header animation for height (reduces as you scroll down)
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [70, 0],
    extrapolate: 'clamp',
  });

  // Header text opacity animation (fades in as you scroll)
  const headerTextOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const onLayout = (event: {nativeEvent: {layout: {height: any}}}) => {
    const {height} = event.nativeEvent.layout;
    setFlatListHeight(height);
  };

  useEffect(() => {
    if (flatListHeight > 0 && tokens) {
      // Estimate the total content height
      const estimatedContentHeight = tokens.length * 80; // Assuming each item is about 80px tall
      setIsScrollable(estimatedContentHeight > flatListHeight);
    }
  }, [flatListHeight, tokens]);

  // Optimized Dynamic styles that depend on the theme
  const dynamicStyles = React.useMemo(
    () => ({
      container: {
        backgroundColor: theme.appColorGrey,
      },
      blackText: {
        color: theme.appColorBlack,
      },
      whiteBg: {
        backgroundColor: theme.appColorWhite,
      },
    }),
    [theme],
  );

  //empty state view
  const ListEmptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <NoData />
        <Text style={[styles.emptyTextSub, dynamicStyles.blackText]}>
          Cant't load up tokens
        </Text>
      </View>
    );
  };

  // handle error for getting tokens
  useEffect(() => {
    if (error) {
      Notifier.showNotification({
        title: 'Fetch tokens',
        description: error?.message || 'Something went wrong',
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: 'error',
        },
      });
    }
  }, [error]);

  return (
    <>
      <StatusBar />
      <SafeAreaView style={[styles.container, dynamicStyles.container]}>
        <View style={{flex: 1}}>
          {/* Top header containing the menu button, title, and user icon */}
          <View style={styles.topHeader}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                navigationDrawer?.openDrawer();
              }}>
              <Menu
                fill={theme.appColorBlack} // Theme-based color
                width={30}
                height={30}
              />
            </TouchableOpacity>
            <Animated.Text
              style={[
                styles.topHeaderText,
                {
                  opacity: isScrollable ? headerTextOpacity : 0,
                  color: theme.appColorBlack,
                },
              ]}>
              Tokens
            </Animated.Text>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                navigation.navigate('Settings');
              }}>
              <User
                width={35}
                height={35}
                fill={lightColorMode.appColorWhite}
              />
            </TouchableOpacity>
          </View>

          {/* Animated header section with text */}
          <Animated.View
            style={[
              styles.header,
              {
                height: isScrollable ? headerHeight : 70,
                opacity: isScrollable ? headerOpacity : 1,
                transform: isScrollable ? [{translateY: headerTranslateY}] : [],
              },
            ]}>
            <Text style={[styles.headerText, dynamicStyles.blackText]}>
              Tokens
            </Text>
            <Text style={[styles.headerSubText, dynamicStyles.blackText]}>
              Listing and managing your favourite tokens
            </Text>
          </Animated.View>

          <View style={[styles.tokenList, dynamicStyles.whiteBg]}>
            <Animated.FlatList
              ListEmptyComponent={
                isTokensLoading || isInfoPending ? undefined : (
                  <ListEmptyComponent />
                )
              }
              onLayout={onLayout}
              data={
                isTokensLoading || isInfoPending ? dummyToken : tokens ?? []
              }
              renderItem={renderItems}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              // Track scroll position for animations
              onScroll={
                isScrollable
                  ? Animated.event(
                      [{nativeEvent: {contentOffset: {y: scrollY}}}],
                      {useNativeDriver: false},
                    )
                  : undefined
              }
              style={styles.tokensList}
              keyExtractor={item => item?.id}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 50 : 20, // Platform-specific padding for iOS and Android
  },
  header: {
    marginTop: 15,
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
  },
  tokenList: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 16,
  },
  tokensList: {
    flex: 1,
    marginTop: 10,
    paddingTop: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 40,
    fontFamily: 'Lato-Bold',
  },
  topHeader: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Lato-Bold',
  },
  headerSubText: {
    fontSize: 16,
    fontFamily: 'Lato-Regular',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  emptyTextSub: {
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
  },
});

export default Tokens;
