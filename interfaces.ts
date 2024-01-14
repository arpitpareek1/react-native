import { NavigationProp } from "@react-navigation/native";

export interface ProductItemProps {
  imageSource: string;
  title: string;
  price: string;
  link: string;
}

export interface NewsItemProps {
  imageSource: string;
  category: string;
  date: string;
}
export interface GoodItemProps {
  imageSource: string;
  title: string;
  isHot: boolean;
  price: string;
  dailyIncome: string;
  validityPeriod: string;
  purchaseLimit: string;
  navigate: any
}
export interface SupportProps {
  navigation: NavigationProp<any>; // Adjust the type based on your navigation configuration
}

export interface ProductType {
  imageSource: string;
  link: string;
  price: string;
  title: string;
  dailyIncome: number;
  validity: number;
  purchaseLimit:number
  desc:string
}

export interface UserObjType {
  _id: string
  name: string
  email: string
  password: string
  phone: string
  money: number
  role: number
  approved: boolean
  referralCode: string
  isRefered: boolean
  userReferCode: string
  referredBy: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface invidedDataTypeObj {
  __v: number
  _id: string
  approved: boolean
  createdAt: string
  email: string
  isRefered: boolean
  money: number
  name: string
  password: string
  phone: string
  referralCode: string
  referredBy: string
  role: number
  updatedAt: string
  userReferCode: string
}