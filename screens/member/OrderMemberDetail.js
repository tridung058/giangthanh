import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView,Dimensions, Alert, FlatList, Linking } from 'react-native';
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";

import { getOrderMannager } from '../../src/api/apiProHot';
import { saveStorage, getStorage} from '../../src/api/storage';
import global from '../../src/api/global';

let screenWidth = Dimensions.get('window').width;
export default class OrderMemberDetail extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });

    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            is_login: false,
            list: [],
            list_item: [],
            member: [],
            is_login: false
        }
    }

    componentDidMount() {
        let order_id = this.props.navigation.state.params.order_id;
        getStorage('member')
        .then((member)=>{
            if(member !=''){
                this.setState({
                    member:JSON.parse(member),
                    is_login: true
                })
                this.makeRemoteRequest(this.state.member.id, order_id);
            }
        })
        .catch((err)=>{
            console.log(err+ 'LOI');
        })
    }
    makeRemoteRequest = (id_member, order_id) => {
        getOrderMannager(id_member, order_id)
        .then(resJSON => {
            const {list, list_item } = resJSON;
            this.setState({
                list: list, 
                list_item: list_item,
                refreshing: false,
                loading: false
            });
            
        })
        .catch(err => console.log(err+ 'Lỗi'));
    }
    
    render() {
        const {navigation} = this.props;
        const { is_login, list, list_item } = this.state;
        return(
            <Container>
                <HeaderBase page="order_member_detail" title={''} navigation={navigation} />
                <View style={[MainStyle.tContainerDefault]}>
                    <View style={[MainStyle.tDefaultContent, MainStyle.tDefaultContentFix]}>
                        <View showsVerticalScrollIndicator={false} style={MainStyle.tDefaultScrollView}>
                           <View style={{paddingHorizontal:10}}>
                               {list.map((item, i) =>{
                                   return(
                                    <View key={i}>
                                        <View style={{borderBottomWidth:10, borderBottomColor:'#f8f8ff', paddingVertical:10}}>
                                            <Text style={MainStyle.titleOrderDetail}>Mã đơn hàng: {item.order_code}</Text>
                                            <Text style={MainStyle.titleSubDetail}>Đặt hàng: {item.order_time}, {item.order_day}</Text>
                                            <Text style={MainStyle.titleSubDetail}>Trạng thái: {item.status}</Text>
                                        </View>
                                        <View style={{borderBottomWidth:10, borderBottomColor:'#f8f8ff',paddingVertical:10}}>
                                            <Text style={MainStyle.titleOrderDetail}>Địa chỉ người nhận</Text>
                                            <Text style={MainStyle.titleSubDetail}>{item.name}</Text>
                                            <Text style={MainStyle.titleSubDetail}>{item.phone}</Text>
                                            <Text style={MainStyle.titleSubDetail}>{item.address}</Text>
                                        </View>
                                       
                                        <View style={{borderBottomWidth:10, borderBottomColor:'#f8f8ff', paddingVertical:10}}>
                                            <Text style={MainStyle.titleOrderDetail}>Thông tin đơn hàng</Text>
                                            {list_item[item.order_id].map((res, i2) =>{
                                                return(
                                                    <View key={i2}>
                                                        <View style={{flexDirection:'row', justifyContent:'space-between', paddingVertical:10}}>
                                                            <View >
                                                                <Image style={{width:(screenWidth-20)/2.7, height: (screenWidth-20)/2.7}} source={{uri:res.image}}/>
                                                            </View>
                                                            <View style={{flex:1, paddingHorizontal:10}}>
                                                                <Text style={{fontFamily:'Roboto', fontSize:15}} >{res.product_name}</Text>
                                                                <Text style={{fontFamily:'RobotoBold', color:'#ce1e1e', paddingVertical:3}}>{res.total}</Text>
                                                                <View style={MainStyle.codeProStyle}>
                                                                    <Text style={MainStyle.txtCodeStyle}>Mã SP: </Text>
                                                                    <Text style={MainStyle.txtResStyle}>{res.code_pro}</Text>
                                                                </View>
                                                                <View style={MainStyle.codeProStyle}>
                                                                    <Text style={MainStyle.txtCodeStyle}>Xuất xứ: </Text>
                                                                    <Text style={MainStyle.txtResStyle}>{res.origin}</Text>
                                                                </View>
                                                                <View style={MainStyle.codeProStyle}>
                                                                    <Text style={MainStyle.txtCodeStyle}>Số lượng: </Text>
                                                                    <Text style={MainStyle.txtResStyle}>{res.amount}</Text>
                                                                    <Text/>
                                                                </View>
                                                            </View>
                                                            <View/>
                                                        </View>
                                                    </View>
                                                )
                                            })}
                                        </View>
                                    </View>
                                   )
                               })}
                           </View>
                        </View>
                    </View>
                </View>
            </Container>
        );
    }
}
 