import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Platform,
  Animated,
} from 'react-native';
import TokenItem from '../components/token-item/token-item';
import {lightColorMode} from '../theme/colors';
import {TokenDetail} from '../api/tokenQueries';
import {RootStackParamList} from '../routes';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import GoBack from '../assets/svg/goback.svg';
import useTokenStore from '../hooks/useTokenStore';
import NoData from '../assets/svg/nodata.svg';
import {useTheme} from '../theme/theme';

const Favorites: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  type RouteType = RouteProp<RootStackParamList, 'Favorites'>;
  const {params} = useRoute<RouteType>();
  const scrollY = useRef(new Animated.Value(0)).current;
  const {tokens} = useTokenStore();

  // Get theme-related data from the context
  const {theme} = useTheme();

  const [flatListHeight, setFlatListHeight] = useState(0);
  const [isScrollable, setIsScrollable] = useState(false);

  // Function to render each token item
  const renderItems = ({index, item}: {index: number; item: TokenDetail}) => {
    return <TokenItem tokenDetail={item} key={`token-${index}-${item?.id}`} />;
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

  const handleGoBack = () => {
    if (params?.gotoBackToSettings) {
      navigation.navigate('Settings');
    } else {
      navigation.canGoBack() ? navigation.goBack() : () => {};
    }
  };

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
    }),
    [theme],
  );

  const ListEmptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <NoData />
        <Text style={[styles.emptyTextMain, dynamicStyles.blackText]}>
          Special place for your favorite tokens
        </Text>
        <Text style={[styles.emptyTextSub, dynamicStyles.blackText]}>
          Add you favorite coins and check here easily
        </Text>
      </View>
    );
  };

  return (
    <>
      <StatusBar />
      <SafeAreaView style={[styles.container, dynamicStyles.container]}>
        <View style={{flex: 1}}>
          {/* Top header containing the menu button, title, and user icon */}
          <View style={[styles.topHeader]}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                handleGoBack();
              }}>
              <GoBack width={20} height={20} fill={theme.appColorBlack} />
            </TouchableOpacity>
            <Animated.Text
              style={[
                styles.topHeaderText,
                {
                  opacity: isScrollable ? headerTextOpacity : 0,
                  color: theme.appColorBlack,
                },
              ]}>
              Favorites
            </Animated.Text>
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
              Favorites
            </Text>
            <Text style={[styles.headerSubText, dynamicStyles.blackText]}>
              Listing and managing your favourite tokens
            </Text>
          </Animated.View>

          {/* Conditional rendering for token list if data is available */}
          <View style={styles.tokenList}>
            <Animated.FlatList
              ListEmptyComponent={<ListEmptyComponent />}
              onLayout={onLayout}
              data={tokens}
              renderItem={renderItems}
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
    // Platform-specific padding for iOS and Android
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
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
    alignItems: 'center',
  },
  topHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Lato-Bold',
    marginLeft: 10,
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
  emptyTextMain: {
    fontSize: 28,
    fontFamily: 'Lato-Bold',
    textAlign: 'center',
  },
  emptyTextSub: {
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
  },
});

export default Favorites;
