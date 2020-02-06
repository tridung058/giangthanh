import global from './../../src/api/global';
import { Alert } from 'react-native';

//get list by cat
export function getCatalog(){
    let url;
    url = global.BASE_URL+`/get_catalog.api`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};

//get detail
export function getCatalogDetail(id){
    let url;
    url = global.BASE_URL+`/get_catalog.api?id=${id}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};

//get list by cat # id
export function getOtherCatalog(id, cat_id){
    let url;
    url = global.BASE_URL+`/get_catalog.api?id=${id}&cat_id=${cat_id}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};
