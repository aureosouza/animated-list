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

const data = [
  {id: '1', text: 'Item 1'},
  {id: '2', text: 'Item 2'},
  {id: '3', text: 'Item 3'},
  {id: '4', text: 'Item 4'},
  {id: '5', text: 'Item 5'},
  {id: '6', text: 'Item 6'},
  {id: '7', text: 'Item 7'},
  {id: '8', text: 'Item 8'},
  {id: '9', text: 'Item 9'},
  {id: '10', text: 'Item 10'},
  {id: '11', text: 'Item 11'},
  {id: '12', text: 'Item 12'},
  {id: '13', text: 'Item 13'},
  {id: '14', text: 'Item 14'},
  {id: '15', text: 'Item 15'},
  {id: '16', text: 'Item 16'},
  {id: '17', text: 'Item 17'},
  {id: '18', text: 'Item 18'},
  {id: '19', text: 'Item 19'},
  {id: '20', text: 'Item 20'},
  {id: '21', text: 'Item 21'},
  {id: '22', text: 'Item 22'},
  {id: '23', text: 'Item 23'},
  {id: '24', text: 'Item 24'},
  {id: '25', text: 'Item 25'},
  {id: '26', text: 'Item 26'},
  {id: '27', text: 'Item 27'},
  {id: '28', text: 'Item 28'},
  {id: '29', text: 'Item 29'},
];

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
        <Text>{'Componets behind list'}</Text>
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
