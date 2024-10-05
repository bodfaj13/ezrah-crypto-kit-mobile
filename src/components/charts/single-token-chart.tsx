import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CryptoTicker} from '../../api/tokenQueries';
import {CartesianChart, Line, useChartPressState} from 'victory-native';
import moment from 'moment';
import {Circle, useFont} from '@shopify/react-native-skia';
import Lato from '../../../assets/fonts/Lato-Regular.ttf';
import {SharedValue} from 'react-native-reanimated';
import {lightColorMode} from '../../theme/colors';
import { useTheme } from '../../theme/theme';

type SingleTokenChartProps = {
  data?: CryptoTicker[];
};

// ToolTip component to show a circle at the pressed point on the chart
function ToolTip({x, y}: {x: SharedValue<number>; y: SharedValue<number>}) {
  return <Circle cx={x} cy={y} r={8} color={lightColorMode.appColorBlue} />;
}

const SingleTokenChart = ({data}: SingleTokenChartProps) => {
  // Load Lato font for chart labels
  const font = useFont(Lato, 12);
  const {state, isActive} = useChartPressState({x: 0, y: {price: 0}});

	  // Get theme-related data from the context
		const {theme} = useTheme();

  return (
    <>
      {data?.length && (
        <View style={styles.chartContainer}>
          <CartesianChart
            data={data ?? []}
            xKey="timestamp"
            yKeys={['price']}
            axisOptions={{
              font,
              labelOffset: {x: -2, y: 0},
              tickCount: 5,
              labelColor: theme.appColorBlack,
              formatXLabel: ms => moment(ms).format('MM/YY'),
            }}>
            {({points}) => (
              <>
                {/* Render the price line */}
                <Line
                  points={points.price}
                  color={lightColorMode.appColorBlue}
                  strokeWidth={3}
                />
                {/* Render the ToolTip when chart is pressed */}
                {isActive && (
                  <ToolTip x={state.x.position} y={state.y.price.position} />
                )}
              </>
            )}
          </CartesianChart>
        </View>
      )}
    </>
  );
};

export default SingleTokenChart;

const styles = StyleSheet.create({
  chartContainer: {
    height: 300,
    marginTop: 20,
  },
});
