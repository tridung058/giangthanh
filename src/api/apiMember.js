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
export function signIn(email, password, type_si){
    let url;
    url = global.BASE_URL+`/signin.api?email=${email}&password=${password}&type_si=${type_si}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};
