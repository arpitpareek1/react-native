import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const TeamPage = () => {
  return (
    <View style={styles.content}>
      <View style={styles.appContent}>
        <View style={styles.teamtop}>
          <View style={styles.info}>
            <View style={styles.levelt}>
              <Text>VIP-0</Text>
            </View>
            <View style={styles.uname}>
              <View style={styles.label}>
                <Text>Account</Text>
              </View>
              <View style={styles.name}>
                <Text>9950929557</Text>
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
                    <Text style={styles.mb0}>0(0)</Text>
                    <View style={styles.cLabel}>
                      <Text>Invite</Text>
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
                    <Text style={styles.mb0}>0(0)</Text>
                    <View style={styles.cLabel}>
                      <Text>Team</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {},
  teamrule: {},
  content: {
    paddingBottom: 2,
  },
  appContent: {
    padding: 0,
    marginTop: 3,
  },
  teamtop: {
    // Style for teamtop
  },
  info: {
    // Style for info
  },
  levelt: {
    // Style for levelt
  },
  uname: {
    // Style for uname
  },
  label: {
    // Style for label
  },
  name: {
    // Style for name
  },
  data: {
    // Style for data
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
    // Style for tview
  },
  mb0: {
    marginBottom: 0,
  },
  cLabel: {
    // Style for cLabel
  },
  inlineh2: {
    // Style for inlineh2
  },
  wrap: {
    // Style for wrap
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
    color: '#8B31E4',
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
    // Style for span
  },
  select: {
    // Style for select
  },
});

export default TeamPage;
