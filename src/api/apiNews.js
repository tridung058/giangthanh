import global from './../../src/api/global';
import { Alert } from 'react-native';


//get news
export function getNewsType(type){
    let url;
    url = global.BASE_URL+`/get_news_type.api?type=${type}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};
//news detail
export function getNewsDetail(id){
    let url;
    url = global.BASE_URL+`/get_news_detail.api?id=${id}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};
//other news
export function getOtherNews(id){
    let url;
    url = global.BASE_URL+`/get_other_news.api?id=${id}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};