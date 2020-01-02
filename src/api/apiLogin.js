//import global from './../api/global';

import global from './../../screens/api/global';
export function resetPassword(email, version){
    let url;
    url = global.BASE_URL+`/reset_password.api?email=${email}&version=${version}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};

export function saveSex(sex, user_id, version){
    let url;
    url = global.BASE_URL+`/save_sex.api?sex=${sex}&user_id=${user_id}&version=${version}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};