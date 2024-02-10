import { TouchableOpacity, View, Image, Dimensions, Text } from 'react-native';
import { ProductItemProps } from '../../interfaces';

const ProductItem: React.FC<ProductItemProps> = ({
  imageSource,
  title,
  price,
  transaction_id,
  desc,
  status,
  date,
  traStatus
}) => {

  function getColor(status: string) {
    const p = {
      "cancelled": "#FF0000",
      "completed": "#355E3B",
      "pending": "#CC7722"
    }
    return p[status] ?? "#000"
  }

  return (
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
          <Text style={{ fontSize: 18, fontWeight: '500', color: "#000" }}>
            {title}
          </Text>
          <Text style={{ paddingVertical: 8, fontSize: 14, fontWeight: "600", color: title === "Points Added" ? "#355E3B" : ["Withdraw Request", "Buy Spin chances"].includes(title) ? "#FF0000" : '#000' }}>
            {price}
          </Text>
          {desc && (<Text style={{ paddingVertical: 8, fontSize: 14, color: '#000' }}>
            {desc}
          </Text>)}
          {transaction_id && (<Text style={{ paddingVertical: 8, fontSize: 14, color: '#000' }}>
            Transaction Id :{transaction_id}
          </Text>)}
          {status && (<Text style={{ paddingVertical: 8, fontSize: 14, color: '#000' }}>
            Request Status :
            <Text style={{ color: title === "Withdraw Request" ? getColor(status) : '#000' }}>
              {status}
            </Text>
          </Text>
          )}
          {date && (<Text style={{ paddingVertical: 8, fontSize: 14, color: '#000' }}>
            {date}
          </Text>
          )}
          {traStatus && (<Text style={{ paddingVertical: 8, fontSize: 14, fontWeight:"bold", color: traStatus === "in_progress" ? "#355E3B" : "#FF0000" }}>
            {traStatus === "in_progress" ? "Active" : traStatus}
          </Text>
          )}
        </View>
      </View>
    </>
  )
};

export default ProductItem;
