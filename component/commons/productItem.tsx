import {TouchableOpacity, View, Image, Dimensions, Text} from 'react-native';
import {ProductItemProps} from '../../interfaces';

const ProductItem: React.FC<ProductItemProps> = ({
  imageSource,
  title,
  price,
}) => (
  <>
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 10,
      }}>
      <View
        style={{
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          overflow: 'hidden',
          height: 130,
        }}>
        <Image source={{uri: imageSource}} style={{width: 130, height: 130}} />
      </View>
      <View
        style={{
          padding: 10,
          width: Dimensions.get('window').width - 160,
          backgroundColor: '#e1eae4',
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        }}>
        <Text style={{fontSize: 18, fontWeight: '500', color: '#000'}}>
          {title}
        </Text>
        <Text style={{paddingVertical: 8, fontSize: 14, color: '#000'}}>
          {price}
        </Text>
      </View>
    </View>
  </>
);

export default ProductItem;
