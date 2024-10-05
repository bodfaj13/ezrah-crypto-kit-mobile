import {StyleSheet, View, ViewStyle, StyleProp} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';

type PreloaderProps = {
  style?: StyleProp<ViewStyle>;
};

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const Preloader = ({style}: PreloaderProps) => {
  return (
    <View>
      <ShimmerPlaceHolder style={style} />
    </View>
  );
};

export default React.memo(Preloader);

const styles = StyleSheet.create({});
