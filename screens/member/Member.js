import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView,Dimensions, Alert, FlatList, Linking } from 'react-native';
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";

import { getCat} from '../../src/api/apiCatProduct';
import { getSearchProducts } from './../../src/api/apiProHot';
import { saveStorage, getStorage} from '../../src/api/storage';
import global from '../../src/api/global';

let screenWidth = Dimensions.get('window').width;
export default class Member extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });

    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            id:'',
            name:'',
            sex:'',
            birthday:'',
            time:'',
            email:'',
            is_login: false,
        }
        global.onRefresh = this.onRefresh.bind(this);
    }

    componentDidMount() {
        //saveStorage('member', '');
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        this.setState({ loading: true});
        getStorage('member')
        .then((member)=>{
            if(member !=''){
                let arrMember = JSON.parse(member);
                this.setState({
                    id: arrMember.id,
                    name: arrMember.name,
                    sex: arrMember.sex,
                    birthday: arrMember.birthday,
                    time: arrMember.time,
                    email: arrMember.email,
                    is_login: true
                })
            }
        })
        .catch((err)=>{
            console.log(err+ 'LOI');
        })
    }

    onRefresh(){
        this.makeRemoteRequest();
    }

    logOut(){
        saveStorage('member', '');
        global.onRefresh();
        this.props.navigation.navigate('AuthenticationScreen');
    }

    gotoAuthentication(){
        const { navigation } = this.props;
        navigation.navigate('AuthenticationScreen');
    }
    gotoInfomation(){
        const { navigation } = this.props;
        if(this.state.is_login === true)
        return navigation.navigate('InfoMemberScreen');
        return Alert.alert('Thông báo','Bạn phải đăng nhập để sử dụng chức năng này!');
    }
    gotoOrderMember(){
        const { navigation } = this.props;
        if(this.state.is_login === true)
        return navigation.navigate('OrderMemberScreen',{id:this.state.id});
        return Alert.alert('Thông báo','Bạn phải đăng nhập để sử dụng chức năng này!');
    }
    gotoChangePassWord(){
        const { navigation } = this.props;
        if(this.state.is_login === true)
        return navigation.navigate('ChangePassWordScreen');
        return Alert.alert('Thông báo','Bạn phải đăng nhập để sử dụng chức năng này!');
    }
    
    dialCall = (number) => {
        let phoneNumber = '';
        if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
        else {phoneNumber = `telprompt:${number}`; }
        Linking.openURL(phoneNumber);
     };
    
    render() {
        const {navigation} = this.props;
        const { is_login, name, time, email } = this.state;
        const memberInfo = (
            <View style={MainStyle.signInStyle}>
                <View style={MainStyle.avatarMember}>
                    <Image style={MainStyle.imageMember} source={require('./../../assets/member.png')}/>
                </View>
                <View style={MainStyle.txtWellcome}>
                    <Text style={MainStyle.txtName}>{name}</Text>
                    <Text style={MainStyle.txtEmail}>{email}</Text>
                    <Text style={MainStyle.txtMemberTime}>Thành viên từ: {time}</Text>
                </View>
            </View>
        )
        const signInSignOut = (
            <View style={MainStyle.signInStyle}>
                <View style={MainStyle.avatarMember}>
                    <Image style={MainStyle.imageMember} source={require('./../../assets/member.png')}/>
                </View>
                <View style={MainStyle.txtWellcome}>
                    <TouchableOpacity onPress={this.gotoAuthentication.bind(this)}>
                    <Text style={{fontFamily:'Roboto', color:'#777777', fontSize:15}}>Chào mừng bạn đến với HDM</Text>
                    <Text style={{fontFamily:'RobotoBold', color:'#ce1e1e', fontSize:18, paddingTop:5}}>Đăng nhập/Đăng ký</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Icon type="FontAwesome5" name="chevron-right" style={{ color: '#ce1e1e', fontSize:23 }} />
                </View>
        </View>
        )
        
        const main = is_login === true?memberInfo:signInSignOut;

        return(
            <Container>
                <HeaderBase page="member" title={''} navigation={navigation} />
                <View style={[MainStyle.tContainerDefault]}>
                    <View style={[MainStyle.tDefaultContent, MainStyle.tDefaultContentFix]}>
                        <View showsVerticalScrollIndicator={false} style={MainStyle.tDefaultScrollView}>

                           <View style={{}}>
                                <View style={MainStyle.subCat}>
                                    {main}
                                    <View style={MainStyle.infoOrder}>
                                         <TouchableOpacity style={MainStyle.itemInfoOrderFirst} onPress={this.gotoOrderMember.bind(this)}>
                                             <View style={{width:30}}>
                                                <Icon type="AntDesign" name="filetext1" style={{ color:'#777777', fontSize:23 }} />
                                             </View>
                                             <View style={ MainStyle.txtTitle}>
                                                <Text style={MainStyle.txtStyle}>Quản lý đơn hàng</Text>
                                             </View>
                                             <Icon type="FontAwesome5" name="chevron-right" style={{color:'#777777', fontSize:23 }} />
                                         </TouchableOpacity>
                                         <TouchableOpacity style={MainStyle.itemInfoOrder} onPress={()=>this.gotoInfomation()}>
                                             <View style={{width:30}}>
                                                <Icon type="FontAwesome" name="user" style={{color:'#777777', fontSize:23 }} />
                                             </View>
                                             <View style={ MainStyle.txtTitle}>
                                                <Text style={MainStyle.txtStyle}>Thông tin tài khoản</Text>
                                             </View>
                                             <Icon type="FontAwesome5" name="chevron-right" style={{color:'#777777', fontSize:23 }} />
                                         </TouchableOpacity>
                                         <TouchableOpacity style={MainStyle.itemInfoOrder} onPress={() =>this.gotoChangePassWord()}>
                                             <View style={{width:30}}>
                                                <Icon type="FontAwesome" name="key" style={{ color:'#777777', fontSize:23 }} />
                                             </View>
                                             <View style={ MainStyle.txtTitle}>
                                                <Text style={MainStyle.txtStyle}>Đổi mật khẩu</Text>
                                             </View>
                                             <Icon type="FontAwesome5" name="chevron-right" style={{color:'#777777', fontSize:23 }} />
                                         </TouchableOpacity>
                                         <View style={MainStyle.itemInfoOrder}>
                                             <View style={{width:30}}>
                                                <Icon type="FontAwesome" name="phone" style={{ color:'#777777', fontSize:23 }} />
                                             </View>
                                             <TouchableOpacity style={ MainStyle.txtTitle} onPress={()=>{this.dialCall('0967118879')}}>
                                                <Text style={MainStyle.txtStyle}>Hotline: <Text style={{color:'#ce1e1e', fontFamily:'Roboto', fontSize:16}}>0967 118879</Text> (tư vấn miễn phí)</Text>
                                             </TouchableOpacity>
                                         </View>
                                         {is_login === true?
                                            <TouchableOpacity style={MainStyle.itemInfoOrder} onPress={()=> this.logOut()}>
                                                <View style={{width:30}}>
                                                    <Icon type="FontAwesome" name="power-off" style={{color:'#777777', fontSize:23 }} />
                                                </View>
                                                <View style={ MainStyle.txtTitle}>
                                                    <Text style={MainStyle.txtStyle}>Đăng xuất</Text>
                                                </View>
                                            </TouchableOpacity>:null
                                         }
                                        
                                    </View>
                                </View>
                           </View>
                        </View>
                    </View>
                </View>
            </Container>
        );
    }
}
 