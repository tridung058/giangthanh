import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView,Dimensions, Alert, FlatList } from 'react-native';
import MainStyle from '../../styles/MainStyle';

import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";

import { getProductHot} from '../../src/api/apiProHot';
import { getCart} from '../../src/api/apiCart';
import {getStorage, saveStorage} from '../../src/api/storage';
import global from '../../src/api/global';
import { TextInput } from 'react-native-gesture-handler';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
export default class Carts extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });

    constructor(props) {
        super(props);
        
        this.state = {
            list: [],
            total_money_cart: 0,
			page: 1,
			refreshing: false,
            loading: false,
            all_amout: 0
        }
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
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
                    const {list, total_money_cart, all_amout } = resJSON;
                    this.arr = list.concat(this.arr);
                    this.setState({
                        list: this.arr, 
                        refreshing: false,
                        loading: false,
                        total_money_cart: total_money_cart,
                        all_amout: all_amout
                    });
                })
                .catch(err => console.log(err+ 'Lỗi'));
            }
        })
        .catch(err => console.log(err));
    }

    plusAmout(id, amout){
        var intAmout = parseInt(amout);
        var arrCart = JSON.parse(this.state.cart);
        var tmp = [];
        arrCart.map((item,i)=>{
                if(item.id == id){
                    tmp.push({
                        id:item.id,
                        amout:intAmout+1
                    })
                }else{
                    tmp.push(item);
                }
        })
        saveStorage('cart', JSON.stringify(tmp));
        this.makeRemoteRequest();
    }
    minusAmout(id, amout){
        var intAmout = parseInt(amout);
        if(intAmout > 1){
            var arrCart = JSON.parse(this.state.cart);
            var tmp = [];
            arrCart.map((item,i)=>{
                    if(item.id == id){
                        tmp.push({
                            id:item.id,
                            amout:intAmout-1
                        })
                    }else{
                        tmp.push(item);
                    }
            })
            saveStorage('cart', JSON.stringify(tmp));
            this.makeRemoteRequest();
        }else{
            return;
        }
    }
    changeAmout(id, amout){
            var intAmout = parseInt(amout);
          
            var arrCart = JSON.parse(this.state.cart);
            var tmp = [];
            arrCart.map((item,i)=>{
                    if(item.id == id){
                        tmp.push({
                            id:item.id,
                            amout:amout
                        })
                    }else{
                        tmp.push(item);
                    }
            })
            saveStorage('cart', JSON.stringify(tmp));
            this.makeRemoteRequest();
    }

    delItemCart(id){
        var arrCart = JSON.parse(this.state.cart);
        var tmp = [];
            arrCart.map((item,i)=>{
                if(item.id != id){
                    tmp.push(item);
                }
            })
            saveStorage('cart', JSON.stringify(tmp));
            this.makeRemoteRequest();
    }

	renderLoading  = () => {
        if (!this.state.loading) return null;

        return (
            <View style={{paddingVertical: 20}}>
                <ActivityIndicator animating size="large" />
            </View>
        );
	};
    
    render() {
        const {navigation} = this.props;
        const {list, total_money_cart} = this.state;
        return(
            <Container style={{backgroundColor:'#eeeeee'}}>
                <HeaderBase page="carts" title={''} navigation={navigation} />
                <View >
                    <View style={[MainStyle.tDefaultContent, MainStyle.tDefaultContentFix]}>
                        <ScrollView >
                            {list.map((item, i) =>{return(
                                <View key={i} style={{ flexDirection:'row', width:screenWidth,backgroundColor:'#fff', justifyContent:'space-around' }}>
                                    <View style={{width:(screenWidth-20)/3, paddingLeft:10}}>
                                        <Image style={{width:(screenWidth-20)/3, height:((screenWidth-20)/3)*436/400}}  source={{uri:item.image}}/>
                                    </View>
                                    <View style={{ paddingTop:30, paddingLeft:20, width:(screenWidth-20)*2/3}} >
                                        <Text style={{fontSize:15, fontFamily:'Roboto'}}>{ item.name}</Text>
                                        <Text style={{fontSize:15, fontFamily:'RobotoBold', paddingTop:5, color:'#ce1e1e'}}>{ item.total_money}</Text>
                                        <View style={MainStyle.changeAmoutStyle}>
                                            <View style={MainStyle.changeAmout}>
                                                <TouchableOpacity style={MainStyle.plusChangeAmout} onPress={() =>{this.minusAmout(item.id, item.amout)}} >
                                                    <Icon type="AntDesign" style={{fontSize:25, color:'#333333'}} name="minus"  />
                                                </TouchableOpacity>
                                                <TextInput style={MainStyle.changeTextAmout} keyboardType='phone-pad' onChangeText={(amout) => this.changeAmout(item.id, amout)} value={item.amout}/>
                                                <TouchableOpacity style={MainStyle.plusChangeAmout} onPress={() =>{this.plusAmout(item.id, item.amout)}}>
                                                    <Icon type="AntDesign" style={{fontSize:25, color:'#333333'}} name="plus"  />
                                                </TouchableOpacity>
                                            </View>
                                            <Text style={{color:'#ce1e1e', fontFamily:'Roboto', paddingTop:5}}>Mua sau</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <TouchableOpacity onPress={()=>this.delItemCart(item.id)} >
                                            <Icon type="Feather" style={{fontSize:25, color:'#333333',paddingTop:5, paddingRight:10}} name="x"  />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )})}
                            <View style={MainStyle.listCart}>
                                <Text style={{paddingLeft:20, fontFamily:'Roboto', color:'#000'}}>Tạm tính</Text>
                                <Text style={{paddingRight:20, color:'#333333', fontFamily:'Roboto', fontSize:14}}>{total_money_cart}</Text>
                            </View>
                        </ScrollView>
                    </View>
                </View>
                 <View style={MainStyle.list_cart}>
                    <View style={MainStyle.moneyStyle}>
                        <Text style={{fontFamily:'Roboto', paddingLeft:10}}>Thành tiền</Text>
                        <View style={{ paddingRight:10, color:'#000'}}>
                            <Text style={{fontFamily:'RobotoBold', color:'#ce1e1e', fontSize:15}}>{total_money_cart}</Text>
                            <Text style={{ paddingRight:10, color:'#000'}}>Đã bao gồm VAT</Text>
                        </View>
                    </View>
                    <View style={MainStyle.toMoney}>
                        <Icon type="Ionicons" name="ios-checkmark-circle-outline" style={{ color: '#ffffff',fontSize:20,paddingRight:5}} />
                        <Text style={{fontFamily:'RobotoBold',textTransform:'uppercase', fontSize:14, color:'#ffffff'}}>Hoàn tất đơn hàng</Text>
                    </View>
                </View>
            </Container>
        );
    }
}
 