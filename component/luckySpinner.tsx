import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import LuckyWheel from 'react-native-lucky-wheel';
const LuckySpinner = () => {
  const wheelRef = useRef<null | any>(null);
  const [isRunning , setIsRunning] = useState(false)

  const onSpinPress = () => {
    setIsRunning(true);
    console.log("wheelRef.current", wheelRef.current);

    (wheelRef.current)!.start(() => {
      console.log('Spin completed');
    });
  };

  return (
    <View style={styles.container}>
      <LuckyWheel
        ref={wheelRef}
        diameter={300}
        waitWinner={false}
        slices={[
          { text: 'Prize 1' },
          { text: 'Prize 2' },
          { text: 'Prize 3' },
          { text: 'Prize 4' },
          { text: 'Prize 5' },
          { text: 'Prize 6' },
          { text: 'Prize 7' },
          { text: 'Prize 8' },
        ]}
        onSpinningEnd={(r) => {
          console.log(r);
          (wheelRef.current)!.stop()
        }}
      />

      <TouchableOpacity style={styles.spinButton} onPress={onSpinPress} disabled={isRunning}>
        <Text style={styles.buttonText}>Spin to Win</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});


export default LuckySpinner;
