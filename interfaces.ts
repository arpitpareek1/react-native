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
    navigate:any
  }