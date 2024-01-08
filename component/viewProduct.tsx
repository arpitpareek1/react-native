import React from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const ViewProduct = () => {
  return (
    <>
      <ScrollView>
        <View style={styles.appCapsule}>
          <View style={styles.postBody}>
            <Image
              source={{
                uri: 'https://www.trumpfe.com/uploads/20231231/abe6b99bd33cc5600a8d4f48fb6e2350.png',
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
                  <View style={styles.detailsText}>
                    <Text style={styles.strong}>Price </Text>
                    <Text style={styles.detailsItem}> 48500 Rs</Text>
                  </View>
                  <View style={styles.detailsText}>
                    <Text style={styles.strong}>Daily income </Text>
                    <Text style={styles.detailsItem}> 2910</Text>
                  </View>
                  <View style={styles.detailsText}>
                    <Text style={styles.strong}>Validity period </Text>
                    <Text style={styles.detailsItem}> 55</Text>
                  </View>
                  <View style={styles.detailsText}>
                    <Text style={styles.strong}>Total revenue </Text>
                    <Text style={styles.detailsItem}> 160050</Text>
                  </View>
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

          <View style={styles.titleColor} id="yueye">
            <Text style={styles.strong}>{'\u20B9'} 2232.5</Text>
            <Text style={styles.strikethrough}>{'\u20B9'} 2350</Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => { }}>
          <Text style={styles.buyButton}>Buy</Text>
        </TouchableOpacity>
      </View>
    </>

  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderTopColor: '#e5e5e5',
    borderTopWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  leftContent: {
    flex: 1,
  },
  titleColor: {
    color: '#000',
    marginBottom: 0,
    flexDirection: 'row',
    gap: 10
  },
  strikethrough: {
    textDecorationLine: 'line-through',
    color: 'black'
  },
  buyButton: {
    backgroundColor: '#60856c',
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  btn: {
    alignItems: "flex-end"
  },
  appCapsule: {
    backgroundColor: 'white',
    padding: 15,
    flexDirection: 'column',
    gap: 20
  },
  postBody: {
    width: '100%',
    height: 300,
  },
  image: {
    height: 300,
  },
  appContent: {
    paddingVertical: 20
  },
  goodinfo: {
    backgroundColor: '#F5F7F9',
    borderRadius: 10,
    color: 'black',
    padding: 15,
  },
  titleContainer: {
    // height: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    color: 'black'
  },
  text: {
    marginTop: 2,
  },
  details: {
    paddingVertical: 10,
    gap: 5
  },
  detailsText: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  strong: {
    fontWeight: '400',
    color: 'black'
  },
  detailsItem: {
    color: 'black',
    fontWeight: '500',
  },
  wallet: {
    backgroundColor: '#F5F7F9',
    borderRadius: 10,
    color: 'black',
    padding: 15,
    marginTop: 20
  },
  walletTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    color: 'black'
  },
  tit: {
    paddingTop: 10,
    flexDirection: 'row',
    gap: 10
  },
  walletText: {
    color: 'black',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5
  },
  gooddesc: {
    backgroundColor: '#F5F7F9',
    borderRadius: 10,
    color: 'black',
    padding: 15,
    marginTop: 20
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    color: 'black'
  },
  cobn: {
    // Add your content inside cobn
  },
});

export default ViewProduct;
