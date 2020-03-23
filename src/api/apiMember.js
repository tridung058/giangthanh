import global from './../../src/api/global';

//sign Up
export function signUp(email, name, phone, password, birthday, sex){
    let url;
    url = global.BASE_URL+`/signup.api?email=${email}&name=${name}&phone=${phone}&password=${password}&birthday=${birthday}&sex=${sex}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};
//sign In
export function signIn(email, password, type_si, token){
    let url;
    url = global.BASE_URL+`/signin.api?email=${email}&password=${password}&type_si=${type_si}&token=${token}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};

//changePass
export function changPassWord(pass_old, id, pass_new){
    let url;
    url = global.BASE_URL+`/change_password.api?pass_old=${pass_old}&id=${id}&pass_new=${pass_new}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};

//getCity
export function getCity(){
    let url;
    url = global.BASE_URL+`/get_city.api`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};

//get info
export function getInfoMember(id){
    let url;
    url = global.BASE_URL+`/get_info.api?id=${id}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};
//update Info
export function updateInfoMember(name, phone , email, job, sex, birthday, company, city, address_detail, id){
    let url;
    url = global.BASE_URL+`/update_info_member.api?name=${name}&phone=${phone}&email=${email}&job=${job}&sex=${sex}
    &birthday=${birthday}&company=${company}&city=${city}&address_detail=${address_detail}&id=${id}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};

//forget password
export function forgetPassWord(email){
    let url;
    url = global.BASE_URL+`/forget_password.api?email=${email}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};