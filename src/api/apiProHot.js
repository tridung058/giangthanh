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

//get sub cat techology
export function getSubCatTech(id){
    let url;
    url = global.BASE_URL+`/get_sub_cat_tech.api?id=${id}`;
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

//get list by techology
export function getListTech(cat_id){
    let url;
    url = global.BASE_URL+`/get_list_tech.api?cat_id=${cat_id}`;
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

//get sub cat buy
export function getSubCatB(id){
    let url;
    url = global.BASE_URL+`/get_sub_cat_buy.api?id=${id}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};
//get sub cat service
export function getSubCatSer(id){
    let url;
    url = global.BASE_URL+`/get_sub_cat_service.api?id=${id}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};

//get detail pro
export function getProductDetail(id){
    let url;
    url = global.BASE_URL+`/get_pro_detail.api?id=${id}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};

//get list by cat
export function getOtherPro(cat_id, id){
    let url;
    url = global.BASE_URL+`/get_other_pro.api?cat_id=${cat_id}&id=${id}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};

export function getProductHot(type){
    let url;
    url = global.BASE_URL+`/get_product_hot_all.api?type=${type}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};

export function getProducts(cat_id){
    let url;
    url = global.BASE_URL+`/get_product_all.api?cat_id=${cat_id}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};
//search

export function getSearchProducts(page, search){
    let url;
    url = global.BASE_URL+`/get_search_products.api?page=${page}&search=${search}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};

//comment

export function postComment(name, email, comment, is_login, record_id){
    let url;
    url = global.BASE_URL+`/post_comment.api?name=${name}&email=${email}&comment=${comment}&is_login=${is_login}&record_id=${record_id}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};

//comment

export function getComment(id){
    let url;
    url = global.BASE_URL+`/get_comment.api?id=${id}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};

//complete order

export function getOrder(ids, member_id){
    let url;
    url = global.BASE_URL+`/complete_order.api?ids=${ids}&member_id=${member_id}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};
// viewed 
export function getViewed(str, page){
    let url;
    url = global.BASE_URL+`/get_viewed.api?str=${str}&page=${page}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};

// get order 
export function getOrderMannager(id_member, order_id){
    let url;
    url = global.BASE_URL+`/get_order_mannager.api?id=${id_member}&order_id=${order_id}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};

// get notification
export function getProductNotification(id_member){
    let url;
    url = global.BASE_URL+`/get_product_notification.api?id=${id_member}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};
// get count notification
export function getCountNotification(id_member){
    let url;
    url = global.BASE_URL+`/get_count_notification.api?id=${id_member}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};
// update notification
export function updateNotification(id_member){
    let url;
    url = global.BASE_URL+`/update_notification.api?id=${id_member}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};

// get key hot
export function getKeyHot(){
    let url;
    url = global.BASE_URL+`/get_key_hot.api`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};

// get search by key
export function getProductByKey(key){
    let url;
    url = global.BASE_URL+`/get_product_by_key.api?key=${key}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};