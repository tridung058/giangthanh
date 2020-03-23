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
export default class OrderMember extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });

    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            is_login: false,
            list: [],
            member: [],
            is_login: false
        }
    }

    componentDidMount() {
        //let id_member = this.props.navigation.state.params.id;
        getStorage('member')
        .then((member)=>{
            if(member !=''){
                this.setState({
                    member:JSON.parse(member),
                    is_login: true
                })
                this.makeRemoteRequest(this.state.member.id);
            }
        })
        .catch((err)=>{
            console.log(err+ 'LOI');
        })
    }
    makeRemoteRequest = (id_member) => {
        getOrderMannager(id_member)
        .then(resJSON => {
            const {list } = resJSON;
            this.setState({
                list: list, 
                refreshing: false,
                loading: false
            });
            
        })
        .catch(err => console.log(err+ 'Lỗi'));
    }
    gotoDetailOrder(order_id){
        const {navigation} = this.props;
        navigation.navigate('OrderMemberDetailScreen',{order_id: order_id});
    }
    
    render() {
        const {navigation} = this.props;
        const { is_login, list } = this.state;
        return(
            <Container>
                <HeaderBase page="order_member" title={''} navigation={navigation} />
                <View style={[MainStyle.tContainerDefault]}>
                    <View style={[MainStyle.tDefaultContent, MainStyle.tDefaultContentFix]}>
                        <View showsVerticalScrollIndicator={false} style={MainStyle.tDefaultScrollView}>
                           <View style={{}}>
                               {this.state.list.map((item, i) =>{ return(
                                    <TouchableOpacity style={{padding:10, borderBottomColor:'#f8f8ff', borderBottomWidth:10}}
                                       key={i}
                                       onPress={()=>this.gotoDetailOrder(item.order_id)}
                                     >
                                        <Text style={{fontFamily:'RobotoBold', fontSize:17}}>Đơn Hàng: {item.order_id}</Text>
                                        <Text style={{color:'#777777', paddingVertical:3}}>Mã đơn hàng: {item.order_code}</Text>
                                        <Text style={{color:'#777777', paddingVertical:3}}>Đặt hàng: {item.order_time}, {item.order_day}</Text>
                                        <Text style={{color:'#777777', paddingVertical:3}}>Tổng tiền: {item.total_money}</Text>
                                        <Text style={{color:'#777777', paddingVertical:3}}>Trạng thái: {item.status}</Text>
                                    </TouchableOpacity>
                               )})}
                           </View>
                        </View>
                    </View>
                </View>
            </Container>
        );
    }
}
 