import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import {  createDrawerNavigator } from 'react-navigation-drawer';
import Home from './screens/Home';
import CatProduct from './screens/category/CatProduct';
import Cat from './screens/category/Cat';
import ProductDetail from './screens/product/ProductDetail';
import News from './screens/news/News';
import NewsDetail from './screens/news/NewsDetail';
import Catalog from './screens/catalog/Catalog';
import CatalogDetail from './screens/catalog/CatalogDetail';
import Contact from './screens/contact/Contact';
import Search from './screens/search/Search';
import Notifi from './screens/notifi/Notifi';
import Member from './screens/member/Member';
import ProductHot from './screens/product/ProductHot';
import CatMachin from './screens/category/CatMachin';
export const GiangThanhStack = createStackNavigator({
    HomeScreen: {
        screen: Home
    },
    CatProductScreen: {
        screen: CatProduct
    },
    CatScreen: {
        screen: Cat
    },
    NewsScreen: {
        screen: News
    },
    NewsDetailScreen: {
        screen: NewsDetail
    },
    ProductDetailScreen: {
        screen: ProductDetail
    },
    CatalogScreen: {
        screen: Catalog
    },
    CatalogDetailScreen: {
        screen: CatalogDetail
    },
    ContactScreen: {
        screen: Contact
    },
    SearchScreen: {
        screen: Search
    },
    NotifiScreen: {
        screen: Notifi
    },
    MemberScreen: {
        screen: Member
    },
    ProductHotScreen: {
        screen: ProductHot
    },
    CatMachinScreen: {
        screen: CatMachin
    },
});

export const GiangThanh = createDrawerNavigator({
    GiangThanh: {
        screen: GiangThanhStack,
    }
});

