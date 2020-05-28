import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView,Dimensions, Alert, FlatList, TextInput, KeyboardAvoidingView,Platform } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";

import { saveStorage, getStorage } from '../../src/api/storage';
import {signUp, signIn} from '../../src/api/apiMember';
import global from '../../src/api/global';

import { registerForPushNotificationsAsync } from './../../src/api/registerForPushNotificationsAsync';
import { Notifications } from 'expo';
import Constants from 'expo-constants';

let screenWidth = Dimensions.get('window').width;
export default class Authentication extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });

    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            value: 1,
            isSignIn: true,
            name: '',
            phone: '',
            email: '',
            password: '',
            birthday: '',
            btnSignUp: 'ĐĂNG KÝ',
            btnSignIn: 'ĐĂNG NHẬP',
            password_si: '',
            email_si: '',
            type_si: 1,
            token: '',
        }
    }

    async componentDidMount() {
        getStorage('member')
        .then(member => { 
            if(member != '')
                this.gotoHomeScreen();
            else{
                registerForPushNotificationsAsync();
            }
        });

        try {
            if (!Constants.isDevice) {
                var token = '';
            }else{
                var token = await Notifications.getExpoPushTokenAsync();
            }

            this.setState({token});
            
        } catch (e) {
            console.log('Error');
        }
    }

    gotoHomeScreen() {
        this.props.navigation.navigate('HomeScreen');
            
    }


    makeRemoteRequest = (level) => {

        this.setState({ loading: true});
		
		getCat(level)
        .then(resJSON => {
            const {list_cat, error } = resJSON;
            //console.log(list_sub_cat);
			if(error == false){
				this.setState({
					list_cat: list_cat, 
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
			// console.log(err);
			this.setState({ loading: false });
        });
    }
    onSignUp(){
        var { email, name, phone, password, birthday, value } = this.state;

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        let number = /^[0-9 .]+$/;
        if(name == ''){
            Alert.alert('Thông báo', 'Bạn vui lòng nhập tên.');
            return;
        }else if(phone == ''){
            Alert.alert('Thông báo','Vui lòng nhập số điện thoại');
            return;
        }else if(number.test(phone) === false){
            Alert.alert('Thông báo', 'Số điện thoại bạn nhập chưa hợp lệ.');
            return;
        }else if(phone.length != 10){
            Alert.alert('Thông báo', 'Số điện thoại phải có 10 ký tự.');
            return;
        }else if (email == '') {
            Alert.alert('Thông báo', 'Bạn vui lòng nhập email.');
            return;
        }else if(reg.test(email) === false){
            Alert.alert('Thông báo', 'Email bạn nhập chưa hợp lệ.');
            return;
        }else if(password == ''){
            Alert.alert('Thông báo', 'Vui lòng nhập mật khẩu.');
            return;
        }else if(password.length < 6){
            Alert.alert('Thông báo', 'Mật khẩu phải từ 6 ký tự.');
            return;
        }else if(birthday == ''){
            Alert.alert('Thông báo', 'Vui lòng nhập ngày sinh.');
            return;
        }else{
            this.setState({ btnSignUp: 'ĐANG XỬ LÝ...' });
            signUp( email, name, phone,password, birthday, value)
            .then(resJSON => {
                const {msg, error } = resJSON;
                if(error == false){
                    Alert.alert('Thông báo', resJSON.msg);
                    this.setState({ isSignIn: true,btnSignUp:'ĐĂNG KÝ' });
                }else{
                    Alert.alert(msg);
                    this.setState({ btnSignUp:'ĐĂNG KÝ' });
                    return;
                }	
            }).catch(err => {
                console.log(err+ 'Lỗi')
                this.setState({ loading: false });
            });
        }
    }

    onSignIn(){
        var { email_si, password_si, type_si, token } = this.state;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if (email_si == '') {
            Alert.alert('Thông báo', 'Bạn vui lòng nhập email.');
            return;
        }
        if(reg.test(email_si) === false){
            Alert.alert('Thông báo', 'Nhập email không hợp lệ.');
            return;
        }
        if (password_si == '') {
            Alert.alert('Thông báo', 'Bạn vui lòng nhập mật khẩu.');
            return;
        }

        this.setState({ btnSignIn: 'ĐANG XỬ LÝ...' });

        signIn(email_si, password_si, type_si, token)
        .then((resJSON) => {
            if (resJSON.error == false) {
                saveStorage('member', JSON.stringify(resJSON.member));
                Alert.alert('Thông báo', resJSON.msg);
                this.setState({ btnSignIn: 'ĐĂNG NHẬP' });
                this.gotoMember();
                global.onRefresh();
                global.onSignIn();
                this.props.navigation.navigate('MemberScreen');
            } else {
                Alert.alert('Thông báo', resJSON.msg);
                this.setState({ btnSignIn: 'Đăng nhập' });
            }
        }).catch(err => {
            console.log(err + 'LOI');
            //Alert.alert('Thông báo', 'Có lỗi trong quá trình xử lý. Vui lòng kiểm tra lại kết nối!');
            this.setState({ btnSignIn: 'ĐĂNG NHẬP' });
        });
    }

    gotoMember(){
        const {navigation} = this.props;
        navigation.goBack();
    }
    gotoForgetPassword(){
        const {navigation} = this.props;
        navigation.navigate('ForgetPassWordScreen');
    }

    isSignIn(){
        this.setState({
            isSignIn:true
        })
    }
    isSignUp(){
        this.setState({
            isSignIn:false
        })
    }
    
    render() {
        const {navigation} = this.props;
        const {isSignIn} = this.state;
        const radio_props = [
            {label: 'Nam', value: 1 },
            {label: 'Nữ', value: 0 }
          ];

          const frSignIn = (
                <View style={MainStyle.formSignIn}>
                    <TextInput style={MainStyle.txtInput} placeholder='Email' onChangeText={(email_si) => this.setState({ email_si })} value={this.state.email_si} returnKeyType='next'/>
                    <TextInput style={MainStyle.txtInput} placeholder='Mật khẩu' onChangeText={(password_si) => this.setState({ password_si })} value={this.state.password_si} returnKeyType='done' password={"true"} secureTextEntry={true}/>
                    <TouchableOpacity style={MainStyle.btnSignIn} onPress={() => this.onSignIn()}>
                        <Text style={{color:'#ffffff', fontFamily:'RobotoBold', fontSize:18}}>ĐĂNG NHẬP</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={MainStyle.btnFogotPass} onPress={() => this.gotoForgetPassword()}>
                        <Text style={{color:'#ce1e1e', fontFamily:'Roboto', textAlign:'center', fontSize:16}}>Quên mật khẩu?</Text>
                    </TouchableOpacity>
                </View>
          )

          const frSignUp = (
                <View style={MainStyle.formSignUp}>
                    <TextInput style={MainStyle.txtInput} placeholder='Họ tên' onChangeText={(name) => this.setState({ name })} value={this.state.name}  returnKeyType='next'/>
                    <TextInput style={MainStyle.txtInput} placeholder='Số điện thoại' onChangeText={(phone) => this.setState({ phone })} value={this.state.phone} returnKeyType='next'/>
                    <TextInput style={MainStyle.txtInput} placeholder='Email' onChangeText={(email) => this.setState({ email })} value={this.state.email} returnKeyType='next' />
                    <TextInput style={MainStyle.txtInput} placeholder='Mật khẩu' onChangeText={(password) => this.setState({ password })} value={this.state.password} returnKeyType='next' password={"true"} secureTextEntry={true}/>
                    <TextInput style={MainStyle.txtInput} placeholder='Ngày sinh' onChangeText={(birthday) => this.setState({ birthday })} value={this.state.birthday} returnKeyType='done' />
                    <View style={{marginTop:10, paddingTop:10}}>
                        <RadioForm
                        radio_props={radio_props}
                        initial={0}
                        buttonColor={'#777777'}
                        labelStyle={{paddingRight:10}}
                        buttonSize={16}
                        formHorizontal={true}
                        labelStyle={{color: '#777777', paddingRight:10}}
                        onPress={(value) => {this.setState({value:value})}}
                        />
                    </View>
                    <TouchableOpacity style={MainStyle.btnSignIn} onPress={() =>this.onSignUp()}>
                        <Text style={{color:'#ffffff', fontFamily:'RobotoBold', fontSize:18}}>{this.state.btnSignUp}</Text>
                    </TouchableOpacity>
                </View>
      )
      const main = isSignIn == true?frSignIn:frSignUp;
        return(
            <Container>
                <HeaderBase page="authentication" title={''} navigation={navigation} />
                <View style={[MainStyle.tContainerDefault]}>
                    <View style={[MainStyle.tDefaultContent, MainStyle.tDefaultContentFix]}>
                        <View showsVerticalScrollIndicator={false} style={MainStyle.tDefaultScrollView}>
                            <View style={MainStyle.authenticationStyle}>
                                <View style={MainStyle.stateAuthentication}>
                                    <TouchableOpacity style={isSignIn ==true?MainStyle.signIn:MainStyle.signUp} onPress={this.isSignIn.bind(this)}>
                                        <Text style={ isSignIn ==true?MainStyle.txtsignIn:MainStyle.txtsignUp}>Đăng nhập</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={ !isSignIn ==true?MainStyle.signIn:MainStyle.signUp} onPress={this.isSignUp.bind(this)}>
                                        <Text style={ !isSignIn ==true?MainStyle.txtsignIn:MainStyle.txtsignUp}>Đăng ký</Text>
                                    </TouchableOpacity>
                                </View>
                                <KeyboardAvoidingView style={[ {backgroundColor: '#f5fdff', paddingBottom:50}]} keyboardVerticalOffset={40} behavior={Platform.OS === "ios" ? 'padding' : 'height'}>
                                    <ScrollView>
                                        {main}
                                    </ScrollView>
                                </KeyboardAvoidingView>
                            </View>
                        </View>
                    </View>
                </View>
            </Container>
        );
    }
}
 