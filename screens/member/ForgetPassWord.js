import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView,Dimensions, Alert, FlatList, TextInput } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";

import { saveStorage, getStorage } from '../../src/api/storage';
import {forgetPassWord} from '../../src/api/apiMember';
import global from '../../src/api/global';

let screenWidth = Dimensions.get('window').width;
export default class ForgetPassWord extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });

    constructor(props) {
        super(props);
        
        this.state = {
            id:'',
            loading: true,
            isSignIn: true,
            pass_old: '',
            pass_new: '',
            re_pass: '',
            btnSignUp: 'ĐĂNG KÝ',
            btnSignIn: 'ĐĂNG NHẬP',
            email: ''
        }
    }
    componentDidMount(){
        
    }

    onForgetPass(){
        var { email } = this.state;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if (email == '') {
            Alert.alert('Thông báo', 'Bạn vui lòng nhập email.');
            return;
        }else if(reg.test(email) === false){
            Alert.alert('Thông báo', 'Email bạn nhập chưa hợp lệ.');
            return;
        }else{
            forgetPassWord(email)
            .then((resJSON) => {
                if (resJSON.error == true) {
                     Alert.alert('Thông báo', resJSON.msg);
                     return;
                }else{
                    Alert.alert('Thông báo', resJSON.msg);
                    global.onRefresh();
                    this.props.navigation.navigate('MemberScreen');
                }
            }).catch(err => {
                console.log(err + 'LOI');
                this.setState({ btnSignIn: 'CẬP NHẬT' });
            });
        }
    }

    
    render() {
        const {navigation} = this.props;
        const {isSignIn} = this.state;
        
        return(
            <Container>
                <HeaderBase page="forget_password" title={''} navigation={navigation} />
                <View style={[MainStyle.tContainerDefault]}>
                    <View style={[MainStyle.tDefaultContent, MainStyle.tDefaultContentFix]}>
                        <View showsVerticalScrollIndicator={false} style={MainStyle.tDefaultScrollView}>
                            <View style={MainStyle.changePassWordStyle}>
                                <View style={MainStyle.formSignIn}>
                                    <TextInput style={MainStyle.txtInput} placeholder='Nhập email' onChangeText={(email) => this.setState({ email })} value={this.state.email} />
                                    <TouchableOpacity style={MainStyle.btnSignIn} onPress={() => this.onForgetPass()}>
                                        <Text style={{color:'#ffffff', fontFamily:'RobotoBold', fontSize:18}}>CẬP NHẬT</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Container>
        );
    }
}
 