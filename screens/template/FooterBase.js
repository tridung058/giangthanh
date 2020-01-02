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
                <TouchableOpacity style={MainStyle.tFItem}  onPress={() => this.gotoHomeScreen()}>
                    <View >
                        <Image style={{ width: 20, height: 23 }} source={require('./../../assets/icon_home.png')} />
                        {/* <Icon type="AntDesign" name="home" style={{ color: '#777777', fontSize: 25 }} /> */}
                    </View>
                    <Text style={MainStyle.textFooterBase}>Trang chủ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={MainStyle.tFItem} onPress={() => { navigation.navigate('CatProductScreen')}}>
                    <View >
                        <Image style={{ width: 20, height: 23 }} source={require('./../../assets/icon_cat.png')} />
                        {/* <Icon type="SimpleLineIcons" name="grid" style={{ color: '#777777', fontSize: 25 }} /> */}
                    </View>
                    <Text style={MainStyle.textFooterBase} >Danh Mục</Text>
                </TouchableOpacity>
                <TouchableOpacity style={MainStyle.tFItem} onPress={() => { navigation.navigate('MessageTeacherScreen');}}>
                    <View >
                    <Image style={{ width: 23, height: 23 ,marginTop:1}} source={require('./../../assets/icon_search.png')} />
                        {/* <Icon type="Ionicons" name="md-search" style={{ color: '#777777', fontSize: 25 }} /> */}
                    </View>
                    <Text style={MainStyle.textFooterBase}>Tìm Kiếm</Text>
                </TouchableOpacity>

                <TouchableOpacity style={MainStyle.tFItem} onPress={() => { navigation.navigate('CommentTeacherScreen')}}>
                    <View >
                    <Image style={{ width: 20, height: 23 }} source={require('./../../assets/icon_notifi.png')} />
                        {/* <Icon type="Ionicons" name="ios-notifications-outline" style={{ color: '#777777', fontSize: 25 }} /> */}
                    </View>
                    <Text style={MainStyle.textFooterBase}>Thông Báo</Text>
                </TouchableOpacity>

                <TouchableOpacity style={MainStyle.tFItem} onPress={() => {navigation.navigate('SurveyScreen');}}>
                    <View >
                        <Image style={{ width: 23, height: 23 }} source={require('./../../assets/icon_user.png')} />
                        {/* <Icon type="SimpleLineIcons" name="user" style={{ color: '#777777', fontSize: 25 }} /> */}
                    </View>
                    <Text style={MainStyle.textFooterBase}>Cá nhân</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
