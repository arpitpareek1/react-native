import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios";
import { ToastAndroid } from "react-native";


export const backend_url = "https://ybt689k9fa.execute-api.ap-south-1.amazonaws.com/development"
// export const backend_url = "https://1fdf-49-36-238-182.ngrok-free.app"

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
    title: 'My Orders',
  },
  {
    title: 'Redeem Daily Earning',
  },
  {
    title: 'Add Bank Info',
  },

  {
    title: "Support"

  },
  {
    title: "Privacy Policy"

  },
  {
    title: "About Us"
  }
];

export const updateBankInfo = async (obj: {
  source: string;
  value: any;
}) => {
  const existingData = await AsyncStorage.getItem('withdrawInfo');
  let existingWithdrawInfo = existingData ? JSON.parse(existingData) : [];
  existingWithdrawInfo.push(obj);
  await AsyncStorage.setItem('withdrawInfo', JSON.stringify(existingWithdrawInfo));
  ToastAndroid.showWithGravity(
    "Info Saved.",
    ToastAndroid.SHORT,
    ToastAndroid.CENTER,
  );
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