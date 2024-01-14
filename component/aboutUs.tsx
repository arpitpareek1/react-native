import { ScrollView, View } from "react-native"
import { Text } from "react-native-elements"
import CommonHeader from "./commonHeader"

const AboutUs = () => {

    return (
        <>
            <CommonHeader title='News' previousPage='' />
            <ScrollView>
                <View>
                    <Text style={{ color: "#000" }}>About US</Text>
                </View>
                <View>
                    <Text>DSGH:h;gzfjh;nsjhf;gsjhfgls,hfglgblgblk,jgblv</Text>
                </View>
            </ScrollView>
        </>

    )
}
export default AboutUs