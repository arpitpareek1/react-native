import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios";

export const backend_url = "https://94a8-2405-201-5c05-153-f1fc-3879-796c-325.ngrok-free.app"

export const updateUserInfo = (callback?) => {
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
      link: '/index/wallet/details.html',
      imageSrc: '/static/img/jiaoyi.svg',
      title: 'Transactions',
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
    {
      link: '/index/account/resetpassword.html',
      imageSrc: '/static/img/pwd.svg',
      title: 'Change login password',
    },
    {
      link: '/index/account/paypassword.html',
      imageSrc: '/static/img/pay.svg',
      title: 'Set the withdrawal password',
    },
  ];