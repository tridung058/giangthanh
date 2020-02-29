import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import { Icon } from "native-base";

//import global from './../api/global';
import MainStyle from './../../styles/MainStyle';

export default class FooterBase extends Component {
    constructor(props) {   
        super(props);

        this.state = {
        
        }
    } 

    componentDidMount() {
        
    }
    render() {

        const { navigation, page } = this.props;
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

                <TouchableOpacity style={MainStyle.tFItem} onPress={() => { navigation.navigate('NotifiScreen')}}>
                    <View >
                    <Image style={{ width: 20, height: 23 }} source={require('./../../assets/icon_notifi.png')} />
                    </View>
                    <Text style={MainStyle.textFooterBase}>Thông Báo</Text>
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
