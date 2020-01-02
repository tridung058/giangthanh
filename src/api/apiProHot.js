import global from './../../src/api/global';
import { Alert } from 'react-native';
//background home
export function getBgHome(){
    let url;
    url = global.BASE_URL+`/get_bg_home.api`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};
//get products hot
export function getProHot(is_hot){
    let url;
    url = global.BASE_URL+`/get_pro_hot.api?is_hot=${is_hot}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};
//get cat
export function getCat(){
    let url;
    url = global.BASE_URL+`/get_cat.api`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};