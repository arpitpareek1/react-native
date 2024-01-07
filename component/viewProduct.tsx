import React from 'react';
import {View, Image, Text, StyleSheet, ScrollView, Button} from 'react-native';

const ViewProduct = () => {
  return (
    <>
    <ScrollView>
      <View style={styles.appCapsule}>
        <View style={styles.postBody}>
          <Image
            source={{
              uri: 'https://images.freeimages.com/variants/YSotMxjHEvoFiBGaZkkJv5K8/f4a36f6589a0e50e702740b15352bc00e4bfaf6f58bd4db850e167794d05993d',
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.appContent}>
          <View style={styles.goodinfo}>
            <Text style={styles.title}>
              Premium 3D printing (TruPrint 2000)
            </Text>
            <View style={styles.text}>
              <View style={styles.details}>
                <Text style={styles.detailsText}>
                  <Text style={styles.strong}>Price </Text>
                  <Text> 48500 Rs</Text>
                </Text>
                <Text style={styles.detailsText}>
                  <Text style={styles.strong}>Daily income </Text>
                  <Text> 2910</Text>
                </Text>
                <Text style={styles.detailsText}>
                  <Text style={styles.strong}>Validity period </Text>
                  <Text> 55</Text>
                </Text>
                <Text style={styles.detailsText}>
                  <Text style={styles.strong}>Total revenue </Text>
                  <Text> 160050</Text>
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.wallet}>
            <View style={styles.titleContainer}>
              <Text style={styles.walletTitle}>Choose a wallet</Text>
            </View>
            <View style={styles.tit}>
              <Text style={styles.walletText} data-id="1">
                Recharge
              </Text>
              <Text style={styles.walletText} data-id="2">
                Balance
              </Text>
            </View>
          </View>
          <View style={styles.gooddesc}>
            <View style={styles.titleContainer}>
              <Text style={styles.detailsTitle}>Details</Text>
            </View>
            <View style={styles.cobn} />
          </View>
        </View>
      </View>
    </ScrollView>
    <View style={styles.container}>
      <View style={styles.leftContent}>

        <Text style={styles.titleColor} id="yueye">
          <Text>{'\u20B9'} 2232.5</Text>
          <Text style={styles.strikethrough}>{'\u20B9'} 2350</Text>
        </Text>
      </View>

      <Button
        onPress={()=>{}}
        title='Buy'
        disabled={false}
      >
      </Button>
    </View>
    </>

  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContent: {
    flex: 1,
  },
  titleColor: {
    color: '#8B31E4',
    marginBottom: 0,
  },
  strikethrough: {
    textDecorationLine: 'line-through',
  },
  buyButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  btn:{
    alignItems:"flex-end"
  },
  appCapsule: {
    // paddingTop: 56,
  },
  postBody: {
    paddingBottom: 10,
  },
  image: {
    width: '100%',
    height: 200, // Adjust the height as needed
    resizeMode: 'cover',
  },
  appContent: {
    marginTop: 2,
  },
  goodinfo: {
    marginBottom: 2,
  },
  titleContainer: {
    // height: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    marginTop: 2,
  },
  details: {
    marginBottom: 2,
  },
  detailsText: {
    fontWeight: 'bold',
  },
  strong: {
    fontWeight: 'bold',
  },
  wallet: {
    // marginBottom: 2,
    // paddingBottom: 1,
  },
  walletTitle: {
    // height: 12,
    marginBottom: 10,
  },
  tit: {
    paddingTop:10,
    flexDirection: 'row',
  },
  walletText: {
    marginRight: 10,
  },
  gooddesc: {
    marginBottom: 2,
  },
  detailsTitle: {
    height: 12,
    marginBottom: 1,
  },
  cobn: {
    // Add your content inside cobn
  },
});

export default ViewProduct;
