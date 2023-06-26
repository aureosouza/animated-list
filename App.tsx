import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const {height: SCREEN_HEIGHT} = Dimensions.get('screen');

const data = Array.from({length: 30}, (_, index) => ({
  id: `${index + 1}`,
  text: `Item ${index + 1}`,
}));

const App = () => {
  const animatedVerticalScroll = useSharedValue(0);

  const listAnimatedStyle = useAnimatedStyle(() => {
    const marginTopValue = interpolate(
      animatedVerticalScroll.value,
      [0, SCREEN_HEIGHT * 0.7],
      [SCREEN_HEIGHT * 0.7, 0],
      Extrapolation.CLAMP,
    );

    const paddingValue = interpolate(
      animatedVerticalScroll.value,
      [0, SCREEN_HEIGHT * 0.7],
      [0, SCREEN_HEIGHT * 0.7],
      Extrapolation.CLAMP,
    );
    return {
      marginTop: marginTopValue,
      paddingTop: paddingValue,
    };
  });

  const footerAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      animatedVerticalScroll.value,
      [0, SCREEN_HEIGHT * 0.7],
      [0, SCREEN_HEIGHT * 0.7],
      Extrapolation.CLAMP,
    );
    return {
      height: height,
    };
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      animatedVerticalScroll.value = event.contentOffset.y;
    },
  });

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.containerBehind}>
        <Text>{'Components behind list'}</Text>
      </View>
      <Animated.FlatList
        bounces={false}
        data={data}
        renderItem={renderItem}
        style={[styles.listContainer, listAnimatedStyle]}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        ListFooterComponent={<Animated.View style={footerAnimatedStyle} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerBehind: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    top: 0,
    left: 0,
    position: 'absolute',
    zIndex: 10,
    width: '100%',
    height: '100%',
    backgroundColor: 'green',
  },
  item: {
    height: 50,
  },
});

export default App;
