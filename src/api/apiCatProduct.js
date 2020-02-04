import global from './../../src/api/global';
import { Alert } from 'react-native';
//get sub Cat
export function getSubCatById(id){
    let url;
    url = global.BASE_URL+`/get_sub_cat_by_id.api?id=${id}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};

//get product by sub cat
export function getListBySubCat(cat_id, type){
    let url;
    url = global.BASE_URL+`/get_list_by_sub_cat.api?cat_id=${cat_id}&type=${type}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};

//get cat
export function getCat(level){
    let url;
    url = global.BASE_URL+`/get_list_cat.api?level=${level}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};