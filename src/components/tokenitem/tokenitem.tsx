import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Token, TokenInfo} from '../../api/tokenQueries';
import {lightColorMode} from '../../theme/colors';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

type TokenItemProps = {
  token: Token;
  info?: TokenInfo;
};

function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
  const [viewHeight, setViewHeight] = useState<number | null>(null);

  const handleLayout = (event: {nativeEvent: {layout: {height: any}}}) => {
    const {height} = event.nativeEvent.layout;
    setViewHeight(height - 21); // Subtract 10 from the view's actual height
  };

  const styleAnimation = useAnimatedStyle(() => {
    console.log('showRightProgress:', prog.value);
    console.log('appliedTranslation:', drag.value);

    return {
      transform: [{translateX: drag.value + 50}],
    };
  });

  return (
    <Reanimated.View style={[styleAnimation]} onLayout={handleLayout}>
      <View
        style={[
          styles.rightAction,
          {
            height: viewHeight,
          },
        ]}>
					
      </View>
    </Reanimated.View>
  );
}

const TokenItem = ({token, info}: TokenItemProps) => {
  return (
    <ReanimatedSwipeable
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderRightActions={RightAction}>
      <View style={styles.container}>
        <View style={styles.leftSide}>
          <Image
            source={{
              uri: info?.logo,
            }}
            style={styles.logo}
          />
          <View style={styles.info}>
            <Text style={styles.infoMainText}>{token.name}</Text>
            <Text style={styles.infoSubText}>{token.symbol}</Text>
          </View>
        </View>
        <View style={styles.rightSide}>
          <Text style={styles.infoMainText}>${token.price.toFixed(2)}</Text>
          <Text
            style={
              token.percentageChange24h > 0 ? styles.gainText : styles.lossText
            }>
            {token.percentageChange24h.toFixed(2)}
          </Text>
        </View>
      </View>
    </ReanimatedSwipeable>
  );
};

export default TokenItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
		marginRight: 10,
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
  },
  infoSubText: {
    fontSize: 12,
    opacity: 0.6,
    color: lightColorMode.appColorBlack,
  },
  logo: {
    width: 45,
    height: 45,
    marginRight: 10,
  },
  gainText: {
    color: lightColorMode.appColorGreen,
    fontSize: 12,
  },
  lossText: {
    color: lightColorMode.appColorRed,
    fontSize: 12,
  },
  rightAction: {
    width: 50,
    backgroundColor: lightColorMode.appColorGrey1,
  },
});
