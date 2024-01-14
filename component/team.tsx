import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import CommonHeader from './commonHeader'
import BottomNavigation from './buttomBar';
import DefaultImage1 from './assets/py.png';
import DefaultImage2 from './assets/team.png';
import { UserObjType, invidedDataTypeObj } from '../interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { backend_url } from './helper';

const TeamPage: React.FC = ({ navigation }: any) => {
  const [user, setUser] = useState<null | UserObjType>(null)
  const [invidedData, setInvitedData] = useState<null | invidedDataTypeObj[]>(null)

  useEffect(() => {
    AsyncStorage.getItem("user").then((result) => {
      const user = JSON.parse(result!) as UserObjType
      setUser(user)
      axios.post(backend_url + "/api/v1/user/getRefferForUser", {
        email: user.email
      }).then(({ data }) => {
        console.log("da", data.data);
        setInvitedData(data.data)
      }).catch(console.log)
    })
  }, [])

  return (
    <>
      <CommonHeader title='Team' previousPage='' />
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.appContent}>
            <View style={styles.teamtop}>
              <View style={styles.info}>
                <View style={styles.levelt}>
                  <Text style={{ color: 'white', textAlign: 'center', fontWeight: '500', fontSize: 18 }}>{user?.name}</Text>
                </View>
                <View style={styles.uname}>
                  <View style={styles.label}>
                    <Text style={{ color: 'black', fontWeight: '500', fontSize: 20 }}>Account</Text>
                  </View>
                  <View style={styles.name}>
                    <Text style={{ color: 'black', fontWeight: '400' }}>{user?.phone}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.data}>
                <View style={styles.cardInfo}>
                  <View style={styles.holderInfo}>
                    <View style={styles.desc}>
                      <View style={styles.tview}>
                        <View>
                          <Image source={{ uri: Image.resolveAssetSource(DefaultImage1).uri }} style={{ width: 30, height: 30, marginTop: 5 }} />
                        </View>
                        <View>
                          <Text style={styles.mb0}>{invidedData?.length}</Text>
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
                      </View>
                      <View style={styles.tview}>
                        <View>
                          <Image source={{ uri: Image.resolveAssetSource(DefaultImage2).uri }} style={{ width: 30, height: 32, marginTop: 3 }} />
                        </View>
                        <View>
                          <Text style={styles.mb0}>{invidedData?.length}</Text>
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
                      <Text style={styles.coinName}>Email</Text>
                    </View>
                  </View>
                </View>
                {invidedData && invidedData.map((person, index) => (
                  <View style={styles.dFlexAlignItemsCenterJustifyContentBetween} key={index}>
                    <View style={styles.dFlexAlignItemsCenter}>
                      <View style={styles.ml10}>
                        <Text style={styles.coinName}>{person.name}</Text>
                      </View>
                    </View>
                    <View style={styles.dFlexAlignItemsCenter}>
                      <View style={styles.ml10}>
                        <Text style={styles.coinName}>{"By You"}</Text>
                      </View>
                    </View>
                    <View style={styles.dFlexAlignItemsCenter}>
                      <View style={styles.ml10}>
                        <Text style={styles.coinName}>{person.email}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
              <View style={styles.loglistRq}>

              </View>
              <View style={styles.droploadDown}>
                <View style={styles.droploadNoData}></View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <BottomNavigation navigation={navigation.navigate} />
    </>
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
