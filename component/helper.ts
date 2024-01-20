import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios";
import { ToastAndroid } from "react-native";


// export const backend_url = "https://ybt689k9fa.execute-api.ap-south-1.amazonaws.com/development"
export const backend_url = "https://c0f4-2405-201-5c05-153-91f1-5289-668-713e.ngrok-free.app"

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
    title: 'My Orders',
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

export const updateBankInfo = async (obj: {
  source: string;
  value: any;
}) => {
  const existingData = await AsyncStorage.getItem('withdrawInfo');
  let existingWithdrawInfo = existingData ? JSON.parse(existingData) : [];
  existingWithdrawInfo.push(obj);
  await AsyncStorage.setItem('withdrawInfo', JSON.stringify(existingWithdrawInfo));
}

export const handle500Error = (error: string) => {

  if (error.includes("500")) {
    ToastAndroid.showWithGravity(
      "Network Error:Looks Like you are on slow internet. Please try again.",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }

}