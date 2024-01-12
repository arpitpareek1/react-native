import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import CommonHeader from './commonHeader'
import BottomNavigation from './buttomBar';
import DefaultImage1 from './assets/py.png';
import DefaultImage2 from './assets/team.png';

const TeamPage: React.FC = ({ navigation }: any) =>{
  return (
    <View style={styles.content}>
      <CommonHeader title='Team' previousPage='' />
      <View style={styles.appContent}>
        <View style={styles.teamtop}>
          <View style={styles.info}>
            <View style={styles.levelt}>
              <Text style={{ color: 'white', textAlign: 'center', fontWeight: '500', fontSize: 18 }}>VIP-0</Text>
            </View>
            <View style={styles.uname}>
              <View style={styles.label}>
                <Text style={{ color: 'black', fontWeight: '500', fontSize: 20 }}>Account</Text>
              </View>
              <View style={styles.name}>
                <Text style={{ color: 'black', fontWeight: '400' }}>9950929557</Text>
              </View>
            </View>
          </View>
          <View style={styles.data}>
            <View style={styles.cardInfo}>
              <View style={styles.holderInfo}>
                <View style={styles.desc}>
                  <View style={styles.iconself}>
                    {/* <Image source={require('/static/img/yq.svg')} style={styles.icon} /> */}
                  </View>
                  <View style={styles.tview}>
                    <View>
                      <Image source={{ uri: Image.resolveAssetSource(DefaultImage1).uri }} style={{ width: 30, height: 30, marginTop: 5 }} />
                    </View>
                    <View>
                      <Text style={styles.mb0}>0(0)</Text>
                      <View>
                        <Text style={styles.cLabel}>Invite</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.inlineh2}></View>
              <View style={styles.holderInfo}>
                <View style={styles.desc}>
                  <View style={styles.iconself}>
                    {/* <Image source={require('/static/img/team.svg')} style={styles.icon} /> */}
                  </View>
                  <View style={styles.tview}>
                    <View>
                      <Image source={{ uri: Image.resolveAssetSource(DefaultImage2).uri }} style={{ width: 30, height: 32, marginTop: 3 }} />
                    </View>
                    <View>
                      <Text style={styles.mb0}>0(0)</Text>
                      <View>
                        <Text style={styles.cLabel}>Team</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.teamrule}>
          <Text style={[styles.select, styles.span]} data-id="1">
            B 10%- (0)
          </Text>
          <Text style={styles.span} data-id="2">
            C 5%- (0)
          </Text>
          <Text style={styles.span} data-id="3">
            D 2%- (0)
          </Text>
        </View>
        <View style={styles.wrap}>
          <View style={styles.tablebt}>
            <View style={styles.dFlexAlignItemsCenterJustifyContentBetween}>
              <View style={styles.dFlexAlignItemsCenter}>
                <View style={styles.ml10}>
                  <Text style={styles.coinName}>Account</Text>
                </View>
              </View>
              <View style={styles.dFlexAlignItemsCenter}>
                <View style={styles.ml10}>
                  <Text style={styles.coinName}>Referrer</Text>
                </View>
              </View>
              <View style={styles.dFlexAlignItemsCenter}>
                <View style={styles.ml10}>
                  <Text style={styles.coinName}>Assets</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.loglistRq}>
            {/* Add content for the loglist rq */}
          </View>
          <View style={styles.droploadDown}>
            <View style={styles.droploadNoData}></View>
          </View>
        </View>
      </View>
      <BottomNavigation navigation={navigation.navigate} />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {},
  teamrule: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#e1eae4',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  content: {
    paddingBottom: 2,
    minHeight: Dimensions.get('window').height
  },
  appContent: {
    padding: 20,
    marginTop: 3,
    gap: 20
  },
  teamtop: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    gap: 20
  },
  info: {
    flexDirection: 'row'
  },
  levelt: {
    backgroundColor: '#EEB31C',
    padding: 10,
    borderRadius: 10,
    width: 70,
    height: 70,
    justifyContent: 'center',
  },
  uname: {
    padding: 10
  },
  label: {
    // Style for label
  },
  name: {
    // Style for name
  },
  data: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#e1eae4'
  },
  cardInfo: {
    flexDirection: 'row',
    textAlign: 'center',
  },
  holderInfo: {
    flex: 1,
    // Style for holderInfo
  },
  desc: {
    // Style for desc
  },
  iconself: {
    // Style for iconself
  },
  tview: {
    flexDirection: 'row',
    gap: 15
  },
  mb0: {
    marginBottom: 0,
    color: 'black',
    fontWeight: 'bold'
  },
  cLabel: {
    color: 'black',
    fontWeight: '400'
  },
  inlineh2: {
    // Style for inlineh2
  },
  wrap: {
    
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
  },
  tablebt: {
    // Style for tablebt
  },
  dFlexAlignItemsCenterJustifyContentBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dFlexAlignItemsCenter: {
    // Style for dFlexAlignItemsCenter
  },
  ml10: {
    marginLeft: 10,
  },
  coinName: {
    // Style for coinName
    color: '#7a9f86',
    fontWeight: '500'
  },
  loglistRq: {
    // Style for loglist rq
  },
  droploadDown: {
    // Style for dropload down
  },
  droploadNoData: {
    // Style for dropload noData
  },
  span: {
    color: '#000'
  },
  select: {
    // Style for select
  },
});

export default TeamPage;
