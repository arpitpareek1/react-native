import { NavigationProp } from "@react-navigation/native";

export interface ProductItemProps {
  imageSource: string;
  title: string;
  price: string;
  desc?: string
  link?: string;
  transaction_id?: string
  status?: string
  date?: string
  traStatus?: string
}

export interface NewsItemProps {
  imageSource: string;
  category: string;
  date: string;
  title: string
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
  purchaseLimit: number
  desc: string
  isHot: boolean
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
  rechargePoints:number
  isReferAmountAdded:boolean
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
  rechargePoints:number
  isReferAmountAdded:boolean
  userReferCode: string
}