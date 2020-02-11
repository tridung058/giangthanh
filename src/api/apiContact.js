import global from './../../src/api/global';

export function getContact(){
    let url;
    url = global.BASE_URL+`/get_contact.api`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};
//send
export function send(name, phone, email, address, content){
    let url;
    url = global.BASE_URL+`/send_contact.api?name=${name}&phone=${phone}&email=${email}&address=${address}&content=${content}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};
