import { ScrollView, StyleSheet, View, Image, Linking } from "react-native"
import { Text } from "react-native-elements"
import CommonHeader from "./commonHeader"
import AboutUsImg from "./assets/aboutUs.png"
import {
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const AboutUs = () => {

    return (
        <>
            <CommonHeader title='About Us' previousPage='' />
            <ScrollView>
                <View style={styles.container}>
                    <Image source={{ uri: Image.resolveAssetSource(AboutUsImg).uri }} style={{ width: 130, height: 130 }} />
                    {/* <AboutUsImg /> */}
                    <Text style={styles.heading}>About Riotinto</Text>

                    <Text style={styles.paragraph}>
                        Rio Tinto is a dual-listed company traded on both the London Stock Exchange, where it is a component of the FTSE 100 Index, and the Australian Securities Exchange, where it is a component of the S&P/ASX 200 index.American depositary shares of Rio Tinto's British branch are also traded on the New York Stock Exchange,giving it listings on three major stock exchanges. In the 2020 Forbes Global 2000, it was ranked the world's 114th-largest public company.
                    </Text>

                    {/* <Text style={styles.subheading}>Our Mission</Text> */}
                    <Text style={styles.paragraph}>
                        It was founded in 1873 by British capitalists to take over the exploitation of a series of sites in the Riotinto-Nerva mining basin that they had acquired from the Spanish State that same year.
                    </Text>
                </View>
                <View style={{ ...styles.paragraph, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    {/* <FontAwesome name="instagram" size={responsiveWidth(6)} color="#666" style={{ marginRight: responsiveWidth(1.5) }} /> */}
                    <FontAwesome name="whatsapp" size={responsiveWidth(6)} color="#666" style={{ marginRight: responsiveWidth(1.5) }} onPress={() => Linking.openURL('https://wa.me/918905608099')} />
                    <FontAwesome name="telegram" size={responsiveWidth(6)} color="#666" style={{ marginRight: responsiveWidth(1.5) }} onPress={() => Linking.openURL(`https://t.me/+VK2c7kU4TvhkODU1`)} />
                </View>


            </ScrollView>
        </>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: responsiveWidth(5),
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    thankYou: {

    },
    logo: {
        width: responsiveWidth(20),
        height: responsiveWidth(20),
        marginBottom: responsiveWidth(5),
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: responsiveWidth(3),
    },
    subheading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: responsiveWidth(3),
    },
    paragraph: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: responsiveWidth(5),
    },
});

export default AboutUs
