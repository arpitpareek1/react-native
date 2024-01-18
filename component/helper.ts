import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios";

export const backend_url = "https://ybt689k9fa.execute-api.ap-south-1.amazonaws.com/development"
// export const backend_url = "https://swon085vel.execute-api.us-east-1.amazonaws.com/development"

export const updateUserInfo = (callback?: Function) => {
  AsyncStorage.getItem("user").then((result) => {
    if (result) {
      console.log("updating...");
      axios.post(backend_url + "/api/v1/user/userData", {
        email: JSON.parse(result).email
      }).then(async ({ data }) => {
        if (data && data.data && data.data.userInfo) {
          await AsyncStorage.setItem("user", JSON.stringify(data.data.userInfo)).then(() => {
            if (callback)
              callback()
          })
        }
      }).catch(console.log)
    }
  })
}

export const menuItems = [
  {
    link: '/index/product/myproduct.html',
    imageSrc: '/static/img/good.svg',
    title: 'My activation Order',
  },
  {
    link: '/index/account/gift.html',
    imageSrc: '/static/img/gift.svg',
    title: 'Redemption bonus',
  },
  {
    link: '/index/wallet/mybank.html',
    imageSrc: '/static/img/bank.svg',
    title: 'Withdrawal bank account',
  },
];


export const handle500Error = (error:string, Alert:any) => {

if(error.includes("500")){
  Alert.alert("Network Error", "Looks Like you are on slow internet. Please try again.")
}  

}