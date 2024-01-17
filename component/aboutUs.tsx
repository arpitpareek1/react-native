import { ScrollView, StyleSheet, View } from "react-native"
import { Text } from "react-native-elements"
import CommonHeader from "./commonHeader"
import {
    responsiveFontSize,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
const AboutUs = () => {

    return (
        <>
            <CommonHeader title='About Us' previousPage='' />
            <ScrollView>
                <View style={styles.container}>

                    <Text style={styles.heading}>About Rio Tindo</Text>

                    <Text style={styles.paragraph}>
                        Welcome to Rio Tindo – Where Innovation Meets Sustainability! At Rio
                        Tindo, we are more than just a company; we are a force driving positive
                        change in the world.
                    </Text>

                    <Text style={styles.subheading}>Our Mission</Text>
                    <Text style={styles.paragraph}>
                        Our mission at Rio Tindo is to create a sustainable future by
                        delivering cutting-edge solutions that not only meet but exceed the
                        expectations of our clients. We strive to revolutionize industries while minimizing our ecological footprint, contributing to a healthier planet for generations to come.
                    </Text>

                    <Text style={styles.subheading}>Who We Are</Text>
                    <Text style={styles.paragraph}>
                        Rio Tindo is a dynamic and forward-thinking company that operates on
                        the principles of integrity, collaboration, and environmental
                        responsibility. As a team, we bring together diverse talents, ideas, and experiences, fostering an environment where creativity and innovation flourish.
                    </Text>

                    <Text style={styles.subheading}>Our Expertise</Text>
                    <Text style={styles.paragraph}>
                        **Innovation:** Rio Tindo thrives on innovation. We invest in research and development to stay at the forefront of technological advancements, ensuring that our solutions are always on the cutting edge.

                        **Sustainability:** Environmental stewardship is at the core of our values. We are committed to sustainable practices, incorporating eco-friendly technologies and processes into every aspect of our operations.

                        **Client-Centric Approach:** Our clients are our partners in progress. We are dedicated to understanding their unique needs and delivering tailored solutions that go beyond expectations.
                    </Text>

                    <Text style={styles.subheading}>What Sets Us Apart</Text>
                    <Text style={styles.paragraph}>
                        - **Commitment to Excellence:** We set high standards for ourselves, aiming for excellence in every project we undertake.
                        - **Global Impact:** Rio Tindo operates on a global scale, making a positive impact in various industries across different continents.
                        - **Social Responsibility:** We believe in giving back to the communities we operate in. Rio Tindo actively participates in social initiatives to contribute to the well-being of society.
                    </Text>

                    <Text style={styles.paragraph}>
                        As we continue to evolve and lead in the industry, we invite you to join us on this journey towards a sustainable and innovative future. Explore the possibilities with Rio Tindo, where passion, purpose, and progress converge.
                    </Text>

                    <Text style={styles.thankYou}>Thank you for being a part of our story.</Text>

                    {/* Add any additional sections or content as needed */}
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
