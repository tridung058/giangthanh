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
//get sub cat industry
export function getSubCatIn(id){
    let url;
    url = global.BASE_URL+`/get_sub_cat_in.api?id=${id}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};
//get list by industry
export function getListIn(cat_id){
    let url;
    url = global.BASE_URL+`/get_list_in.api?cat_id=${cat_id}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};

//get sub cat Accessary
export function getSubCatAr(id){
    let url;
    url = global.BASE_URL+`/get_sub_cat_ar.api?id=${id}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};
//get list by accessary
export function getListAr(cat_id){
    let url;
    url = global.BASE_URL+`/get_list_ar.api?cat_id=${cat_id}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};

//get list by accessary
export function getProductDetail(id){
    let url;
    url = global.BASE_URL+`/get_pro_detail.api?id=${id}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};
