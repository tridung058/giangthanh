import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import {  createDrawerNavigator } from 'react-navigation-drawer';
import Home from './screens/Home';
import CatProduct from './screens/category/CatProduct';
export const GiangThanhStack = createStackNavigator({
    HomeScreen: {
        screen: Home
    },
    CatProductScreen: {
        screen: CatProduct
    },
});

export const GiangThanh = createDrawerNavigator({
    GiangThanh: {
        screen: GiangThanhStack,
    }
});

