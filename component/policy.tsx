import { ScrollView, StyleSheet, View, Image, Linking } from "react-native"
import { Text } from "react-native-elements"
import CommonHeader from "./commonHeader"
import AboutUsImg from "./assets/aboutUs.png"
import {
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const Policy = () => {
    const sendEmail = () => {
        Linking.openURL('mailto:support@riotinto.in');
    };
    return (
        <>
            <CommonHeader title='Privacy Policy' previousPage='' />
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.heading}>Privacy Policy</Text>

                    <Text style={styles.paragraph}>
                        Riotinto is a leading international mining group headquartered in the UK, combining Riotinto plc, a London and New York Stock Exchange listed company, and Riotinto Limited, which is listed on the Australian Securities Exchange. The two companies are joined in a dual listed companies structure as a single economic entity, called the Rio Tinto Group.
                    </Text>

                    <Text style={styles.paragraph}>
                        This Privacy Policy applies to the processing of personal data by all Riotinto staff and all the companies in the Riotinto Group (which may be described as "Riotinto", "Group businesses", "we" or "us" in this Privacy Policy also).
                    </Text>

                    <Text style={styles.subheading}>Structure</Text>

                    <Text style={styles.paragraph}>
                        This Privacy Policy is in two parts. It contains:
                    </Text>

                    <Text style={styles.paragraph}>
                        Part 1: Riotinto's Data Privacy Standard which includes 12 Data Privacy Principles that apply whenever and wherever Rio Tinto collects and processes personal data (including but not limited to any personal data processing that occurs through this website). The Data Privacy Standard is Riotinto's organization-wide privacy policy.
                    </Text>

                    <Text style={styles.paragraph}>
                        Part 2: Online privacy statement and cookies privacy statement, which sets out additional information about your privacy if you use this website.
                    </Text>

                    <Text style={styles.paragraph}>
                        A Glossary has been included at the end of the Standard which defines key terms (in bold).
                    </Text>

                    <Text style={styles.subheading}>Questions and Contact Information</Text>

                    <Text style={styles.paragraph}>
                        If you have any questions or complaints about your privacy or wish to exercise your rights as a data subject, please refer to Data Privacy Principle 8 in the Data Privacy Standard (below) and:
                    </Text>

                    <Text style={styles.paragraph}>
                        - If you are a Rio Tinto staff member, contact the Data Privacy Lead for your region or
                    </Text>

                    <Text style={styles.paragraph}>
                        - Otherwise, contact your local Riotinto office or
                    </Text>

                    <Text style={styles.paragraph}>
                        - Email us at {" "}
                        <Text style={{ color: 'blue', textDecorationLine: 'underline' }} onPress={sendEmail}>
                            support@riotinto.in
                        </Text>
                         Your correspondence will be forwarded to the Riotinto Data Privacy Lead for the relevant region to consider.
                    </Text>

                    <Text style={styles.paragraph}>
                        This Privacy Policy may be updated from time to time. This Privacy Policy was last updated in June 2021.
                    </Text>
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

export default Policy
