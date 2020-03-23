import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView,Dimensions, Alert, FlatList, TextInput } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";

import { saveStorage, getStorage } from '../../src/api/storage';
import {changPassWord} from '../../src/api/apiMember';
import global from '../../src/api/global';

let screenWidth = Dimensions.get('window').width;
export default class ChangePassWord extends Component{
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
            btnSignIn: 'ĐĂNG NHẬP'
        }
    }
    componentDidMount(){
        getStorage('member')
        .then((member)=>{
            if(member !=''){
                let arrMember = JSON.parse(member);
                this.setState({
                    id: arrMember.id,
                })
            }
        })
        .catch((err)=>{
            console.log(err+ 'LOI');
        })
    }

    onChangePass(){
        var { pass_old, pass_new, re_pass, id } = this.state;
        if (pass_old == '') {
            Alert.alert('Thông báo', 'Bạn vui lòng nhập mật khẩu hiện tại.');
            return;
        }else if( pass_new == '') {
            Alert.alert('Thông báo', 'Bạn vui lòng nhập mật khẩu mới.');
            return;
        }else if( re_pass == '') {
            Alert.alert('Thông báo', 'Vui lòng nhập lại mật khẩu mới.');
            return;
        }else if(pass_new != re_pass){
            Alert.alert('Thông báo', 'Nhập mật khẩu không khớp.');
            return;
        }else{
            changPassWord(pass_old, id, pass_new)
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
                <HeaderBase page="change_pass_word" title={''} navigation={navigation} />
                <View style={[MainStyle.tContainerDefault]}>
                    <View style={[MainStyle.tDefaultContent, MainStyle.tDefaultContentFix]}>
                        <View showsVerticalScrollIndicator={false} style={MainStyle.tDefaultScrollView}>
                            <View style={MainStyle.changePassWordStyle}>
                                <View style={MainStyle.formSignIn}>
                                    <TextInput style={MainStyle.txtInput} placeholder='Mật khẩu hiện tại' onChangeText={(pass_old) => this.setState({ pass_old })} value={this.state.pass_old} returnKeyType='done' password={"true"} secureTextEntry={true}/>
                                    <TextInput style={MainStyle.txtInput} placeholder='Mật khẩu mới' onChangeText={(pass_new) => this.setState({ pass_new })} value={this.state.pass_new} returnKeyType='done' password={"true"} secureTextEntry={true}/>
                                    <TextInput style={MainStyle.txtInput} placeholder='Nhập lại mật khẩu mới' onChangeText={(re_pass) => this.setState({ re_pass })} value={this.state.re_pass} returnKeyType='done' password={"true"} secureTextEntry={true}/>
                                    <TouchableOpacity style={MainStyle.btnSignIn} onPress={() => this.onChangePass()}>
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
 