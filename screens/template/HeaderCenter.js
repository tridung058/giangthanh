import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, Dimensions, TextInput, FlatList, Alert} from 'react-native';
import { Icon } from "native-base";
import MainStyle from './../../styles/MainStyle';

import {getStorage, saveStorage} from '../../src/api/storage';
import { getCart} from '../../src/api/apiCart';
import global from "../../src/api/global";

const {width, height} = Dimensions.get('window');
const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
export default class HeaderCenter extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            list_search: [],
            search: '',
            page: 1,
            amout:'',
            all_amout:0
        }
        
    }

    componentDidMount() {
        this.arr = [];
        this.setState({ loading: true });
        getStorage('cart')
        .then(cart => {
            if(cart != ''){
                this.setState({cart});

                var arrCart = JSON.parse(cart);
                var ids = '';
				arrCart.map(c => {
                    if(ids == '')
                        ids = c.id+','+c.amout;
                    else
                        ids = ids + '|' + c.id+','+c.amout;
                });
                getCart(ids, this.state.page)
                .then(resJSON => {
                    const { all_amout } = resJSON;
                    this.setState({
                        refreshing: false,
                        loading: false,
                        all_amout: all_amout
                    });
                })
                .catch(err => console.log(err+'ERR'));
            }
        })
        .catch(err => console.log(err));
    }
    ProductDetail(id){
        this.props.navigation.navigate('ProductDetailScreen',{id:id});
    }

    setSearch=(value)=>{
        this.setState(
                  { "search": value},
                );
        var key = this.state.search;
        global.onChangeSearch(key);
    }

    renderButton(){
        const {navigation} = this.props;
        const {all_amout} = this.state;
            if(this.props.page && this.props.page == 'home'){
                return (
                    <View style={{alignItems: 'center',marginTop:width/12}}>
                        <Image style={MainStyle.logoHome} source={require('./../../assets/logo.png')}/>
                    </View>
                )
            }else if(this.props.page && (this.props.page == 'category' || this.props.page == 'cat' || this.props.page == 'cat_machine' || this.props.page == 'news' || this.props.page == 'news_detail' || this.props.page == 'catalog' 
            || this.props.page == 'catalog_detail'|| this.props.page == 'search' )){
                return (
                    <View style={{alignItems: 'center',marginTop:width/13.5,marginRight:20,position:'relative'}}>
                        <Icon type="Ionicons" name="md-search" style={{ color: '#000000', position: 'absolute', top: 5, left: 20,zIndex:2 }} />
                        <TextInput style={{ height: 35, backgroundColor:'#ffffff', width:ScreenWidth - 40 -(ScreenWidth/4), borderRadius:3, fontFamily:'Roboto', paddingLeft:35 }} placeholderTextColor='#000000'
                        onChangeText={search => this.setSearch(search)}
                        value={this.state.search}
                        placeholder={'Nhập mã hoặc tên sản phẩm'} />
                    </View>
                )
            } else if(this.props.page && (this.props.page == 'carts')){
                return (
                    <View style={{alignItems: 'center',marginTop:width/13.5,marginRight:20,position:'relative'}}>
                            <Text style={{fontFamily:'RobotoBold',color:'#fff', fontSize:16, paddingTop:10}}>Giỏ hàng ({all_amout.toString()})</Text>
                    </View>
                )
            }else if(this.props.page && (this.props.page == 'member' )){
                return (
                    <View style={{alignItems: 'center',marginTop:width/13.5,marginRight:20,position:'relative'}}>
                            <Text style={{fontFamily:'RobotoBold',color:'#fff', fontSize:16, paddingTop:10}}>Cá Nhân</Text>
                    </View>
                )
            }else if(this.props.page && (this.props.page == 'info_member' )){
                return (
                    <View style={{alignItems: 'center',marginTop:width/13.5,marginRight:20,position:'relative'}}>
                            <Text style={{fontFamily:'RobotoBold',color:'#fff', fontSize:16, paddingTop:10}}>Thông tin tài khoản</Text>
                    </View>
                )
            }else if( this.props.page == 'order_member'){
                return (
                    <View style={{alignItems: 'center',marginTop:width/13.5,marginRight:20,position:'relative'}}>
                            <Text style={{fontFamily:'RobotoBold',color:'#fff', fontSize:16, paddingTop:10}}>Đơn hàng của tôi</Text>
                    </View>
                )
            }else if( this.props.page == 'order_member_detail'){
                return (
                    <View style={{alignItems: 'center',marginTop:width/13.5,marginRight:20,position:'relative'}}>
                            <Text style={{fontFamily:'RobotoBold',color:'#fff', fontSize:16, paddingTop:10}}>Chi tiết đơn hàng</Text>
                    </View>
                )
            }else if( this.props.page == 'change_pass_word'){
                return (
                    <View style={{alignItems: 'center',marginTop:width/13.5,marginRight:20,position:'relative'}}>
                            <Text style={{fontFamily:'RobotoBold',color:'#fff', fontSize:16, paddingTop:10}}>Đổi mật khẩu</Text>
                    </View>
                )
            }else if( this.props.page == 'notifi'){
                return (
                    <View style={{alignItems: 'center',marginTop:width/13.5,marginRight:20,position:'relative'}}>
                            <Text style={{fontFamily:'RobotoBold',color:'#fff', fontSize:16, paddingTop:10}}>Thông báo</Text>
                    </View>
                )
            }else if( this.props.page == 'forget_password'){
                return (
                    <View style={{alignItems: 'center',marginTop:width/13.5,marginRight:20,position:'relative'}}>
                            <Text style={{fontFamily:'RobotoBold',color:'#fff', fontSize:16, paddingTop:10}}>Quên mật khẩu</Text>
                    </View>
                )
            }else if(this.props.page && (this.props.page == 'product_detail')){
                return (
                    <View style={{alignItems: 'center',marginTop:width/13.5,marginRight:20,position:'relative'}}>
                        
                    </View>
                )
            }else if(this.props.page && (this.props.page == 'contact')){
                return (
                    <View style={{alignItems: 'center',marginTop:width/13.5,marginRight:20,position:'relative'}}>
                        
                    </View>
                )
            }else{
                return (
                    <TouchableOpacity onPress={() => this.gotoBack()}>
                        <Icon type="SimpleLineIcons" name="arrow-left"  />
                    </TouchableOpacity>
                )
            }
        }


    render() {
        return(
            <View>
                {this.renderButton()}
            </View>
        );
    }
}