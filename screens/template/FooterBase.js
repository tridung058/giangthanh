import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import { Icon } from "native-base";

import {getCountNotification, updateNotification} from './../../src/api/apiProHot';
import {getStorage} from './../../src/api/storage';
import global from '../../src/api/global';
import MainStyle from './../../styles/MainStyle';

export default class FooterBase extends Component {
    constructor(props) {   
        super(props);

        this.state = {
            count: 0,
            id: ''
        }
    } 

    componentDidMount() {
        getStorage('member')
        .then((member)=>{
            if(member !=''){
                let arrMember = JSON.parse(member);
                this.setState({
                    id: arrMember.id,
                    is_login: true
                })

                getCountNotification(this.state.id)
                .then(resJSON => {
                    const {count, error } = resJSON;
                    //console.log(list_sub_cat);
                    if(error == false){
                        this.setState({
                            count: count, 
                            loading: false, 
                            refreshing: false ,
                            allow_more: false,
                        });
                    }else{
                        this.setState({ 
                            loading: false, 
                            allow_more: false
                        });
                    }
                        
                }).catch(err => {
                    console.log(err+ 'ERR notification');
                    this.setState({ loading: false });
                });
                    }
            }).catch((err)=>{
                console.log(err+ 'LOI');
        })
    }
    gotoNotification(){
        const {navigation} = this.props;
        navigation.navigate('NotifiScreen');
    }
    render() {

        const { navigation, page } = this.props;
        const { count } = this.state;
        return (
            <View style={[MainStyle.tFooter]}>
                <TouchableOpacity style={MainStyle.tFItem}  onPress={() => {navigation.navigate('HomeScreen')}}>
                    <View >
                        <Image style={{ width: 20, height: 23 }} source={require('./../../assets/icon_home.png')} />
                    </View>
                    <Text style={MainStyle.textFooterBase}>Trang chủ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={MainStyle.tFItem} onPress={() => { navigation.navigate('CatScreen')}}>
                    <View >
                        <Image style={{ width: 20, height: 23 }} source={require('./../../assets/icon_cat.png')} />
                    </View>
                    <Text style={MainStyle.textFooterBase} >Danh Mục</Text>
                </TouchableOpacity>
                <TouchableOpacity style={MainStyle.tFItem} onPress={() => { navigation.navigate('SearchScreen');}}>
                    <View >
                    <Image style={{ width: 23, height: 23 ,marginTop:1}} source={require('./../../assets/icon_search.png')} />
                    </View>
                    <Text style={MainStyle.textFooterBase}>Tìm Kiếm</Text>
                </TouchableOpacity>

                <TouchableOpacity style={MainStyle.tFItem} onPress={() => { this.gotoNotification()}}>
                    <View >
                    <Image style={{ width: 20, height: 23 }} source={require('./../../assets/icon_notifi.png')} />
                    </View>
                    <Text style={MainStyle.textFooterBase}>Thông Báo</Text>
                    {count > 0?
                        <View style={{position:'absolute',top:0, right:13, backgroundColor:'#ce1e1e',
                        color:'#fff', paddingHorizontal:8, height:18,borderRadius:9}}>
                        <Text style={{color:'#ffffff'}} >{count}</Text>
                        </View>:
                        null
                    }
                </TouchableOpacity>

                <TouchableOpacity style={MainStyle.tFItem} onPress={() => {navigation.navigate('MemberScreen');}}>
                    <View >
                        <Image style={{ width: 23, height: 23 }} source={require('./../../assets/icon_user.png')} />
                    </View>
                    <Text style={MainStyle.textFooterBase}>Cá nhân</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
