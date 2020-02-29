import global from './../../src/api/global';
import { Alert } from 'react-native';

//get cart
export function getCart(ids, page){
    let url;
    url = global.BASE_URL+`/get_list_by_cart.api?ids=${ids}&page=${page}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};