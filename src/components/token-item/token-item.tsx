import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useRef} from 'react';
import {TokenDetail} from '../../api/tokenQueries';
import {lightColorMode} from '../../theme/colors';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {formatCurrency} from '../../utils/helper';
import SolidHeart from '../../assets/svg/solid-heart.svg';
import Heart from '../../assets/svg/heart.svg';
import useTokenStore from '../../hooks/useTokenStore';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../routes';
import ArrowUp from '../../assets/svg/arrow-up.svg';
import ArrowDown from '../../assets/svg/arrow-down.svg';

type TokenItemProps = {
  tokenDetail: TokenDetail;
};

const RightAction = (
  prog: SharedValue<number>,
  drag: SharedValue<number>,
  tokenDetail: TokenDetail,
  onActionComplete: () => void,
) => {
  const {addToken, removeToken, isTokenInArray} = useTokenStore();
  const [viewHeight, setViewHeight] = useState<number | null>(null);

  const handleLayout = (event: {nativeEvent: {layout: {height: any}}}) => {
    const {height} = event.nativeEvent.layout;
    setViewHeight(height - 15);
  };

  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{translateX: drag.value + 50}],
    };
  });

  const handlePress = () => {
    if (isTokenInArray(tokenDetail?.id)) {
      removeToken(tokenDetail?.id);
    } else {
      addToken(tokenDetail);
    }
    onActionComplete();
  };

  return (
    <Reanimated.View style={[styleAnimation]} onLayout={handleLayout}>
      <View
        style={[
          styles.rightAction,
          {
            height: viewHeight,
          },
        ]}>
        <TouchableOpacity activeOpacity={0.6} onPress={handlePress}>
          {isTokenInArray(tokenDetail?.id) ? (
            <SolidHeart
              width={20}
              height={20}
              fill={lightColorMode.appColorBlack}
            />
          ) : (
            <Heart width={20} height={20} fill={lightColorMode.appColorBlack} />
          )}
        </TouchableOpacity>
      </View>
    </Reanimated.View>
  );
};

const TokenItem = ({tokenDetail}: TokenItemProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const swipeableRef =
    useRef<React.ElementRef<typeof ReanimatedSwipeable>>(null);

  const closeSwipeable = () => {
    swipeableRef.current?.close();
  };

  return (
    <ReanimatedSwipeable
      ref={swipeableRef}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderRightActions={(prog, drag) =>
        RightAction(prog, drag, tokenDetail, closeSwipeable)
      }>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.6}
        onPress={() => {
          navigation.navigate('SingleToken', {
            tokenDetail,
          });
        }}>
        <View style={styles.leftSide}>
          <Image
            source={{
              uri: tokenDetail?.logo,
            }}
            style={styles.logo}
          />
          <View style={styles.info}>
            <Text style={styles.infoMainText}>{tokenDetail.name}</Text>
            <Text style={styles.infoSubText}>{tokenDetail.symbol}</Text>
          </View>
        </View>

        <View style={styles.rightSide}>
          <Text style={styles.infoMainText}>
            {formatCurrency(tokenDetail.price)}
          </Text>
          <View style={styles.indicators}>
            {tokenDetail.percentageChange1h > 0 ? (
              <ArrowUp
                fill={lightColorMode.appColorGreen}
                width={16}
                height={16}
              />
            ) : (
              <ArrowDown
                fill={lightColorMode.appColorRed}
                width={16}
                height={16}
              />
            )}
            <Text
              style={
                tokenDetail.percentageChange1h > 0
                  ? styles.gainText
                  : styles.lossText
              }>
              {tokenDetail.percentageChange1h.toFixed(2)}%
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </ReanimatedSwipeable>
  );
};

export default TokenItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: lightColorMode.appColorWhite,
    padding: 16,
    borderRadius: 8,
    elevation: 0.5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0.5},
    shadowOpacity: 0.05,
  },
  leftSide: {
    flexDirection: 'row',
  },
  rightSide: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  info: {
    justifyContent: 'space-between',
  },
  infoMainText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: lightColorMode.appColorBlack,
    fontFamily: 'Lato-Bold',
  },
  infoSubText: {
    fontSize: 12,
    opacity: 0.6,
    color: lightColorMode.appColorBlack,
    fontFamily: 'Lato-Regular',
  },
  logo: {
    width: 45,
    height: 45,
    marginRight: 10,
  },
  gainText: {
    color: lightColorMode.appColorGreen,
    fontSize: 14,
    fontFamily: 'Lato-Regular',
  },
  lossText: {
    color: lightColorMode.appColorRed,
    fontSize: 14,
    fontFamily: 'Lato-Regular',
  },
  rightAction: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicators: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});
