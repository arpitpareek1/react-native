import { TouchableOpacity, View, Image, Dimensions, Text } from 'react-native';
import { ProductItemProps } from '../../interfaces';

const ProductItem: React.FC<ProductItemProps> = ({
  imageSource,
  title,
  price,
  transaction_id
}) => (
  <>
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 15,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        overflow: 'hidden'
      }}>
      <View
        style={{
          overflow: 'hidden',
          height: 130,
        }}>
        <Image source={{ uri: imageSource }} style={{ width: 130, height: 130 }} />
      </View>
      <View
        style={{
          padding: 10,
          width: Dimensions.get('window').width - 160,
          backgroundColor: '#e1eae4',
        }}>
        <Text style={{ fontSize: 18, fontWeight: '500', color: '#000' }}>
          {title}
        </Text>
        <Text style={{ paddingVertical: 8, fontSize: 14, color: '#000' }}>
          {price}
        </Text>
        {transaction_id && (<Text style={{ paddingVertical: 8, fontSize: 14, color: '#000' }}>
        Transaction Id :{transaction_id}
        </Text>)}
      </View>
    </View>
  </>
);

export default ProductItem;
