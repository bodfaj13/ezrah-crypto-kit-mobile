import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {WebView} from 'react-native-webview';

type LiveDataProps = {
  symbol: string;
};

const LiveData = ({symbol}: LiveDataProps) => {
  const webViewRef = useRef<WebView>(null);

  const interval = '1D';
  const theme = 'light';

  const chartHtml = `
	<html>
		<head>
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
		</head>
		<body style="margin:0;padding:0;">
			<div id="tradingview_widget" style="height:100%;width:100%;"></div>
			<script type="text/javascript">
				new TradingView.widget({
					"width": "100%",
					"height": "100%",
					"symbol": "${symbol}USD",
					"interval": "${interval}",
					"timezone": "Etc/UTC",
					"theme": "${theme}",
					"style": "1",
					"locale": "en",
					"toolbar_bg": "#f1f3f6",
					"enable_publishing": false,
					"allow_symbol_change": false,
					"container_id": "tradingview_widget"
				});
			</script>
		</body>
	</html>
`;

  useEffect(() => {
    if (webViewRef?.current !== undefined) {
      webViewRef?.current?.reload();
    }
  }, [symbol]);

  return (
    <View style={styles.chartContainer}>
      <WebView
        ref={webViewRef}
        source={{html: chartHtml}}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};

export default LiveData;

const styles = StyleSheet.create({
  chartContainer: {
    marginTop: 20,
    flex: 1,
		height: 500
  },
  webview: {
    flex: 1,
  },
});
