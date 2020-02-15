import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView,Dimensions, Alert, TextInput } from 'react-native';
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";

import { getContact, send} from '../../src/api/apiContact';
import {getStorage} from '../../src/api/storage';

let screenWidth = Dimensions.get('window').width;
export default class Contact extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });

    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            list_contact: {},
            name: '',
            email: '',
            phone: '',
            address: '',
            content: '',
            re_code: '',
            code: '',

        }
    }

    componentDidMount() {
    
        this.makeRemoteRequest();
        
    }

    makeRemoteRequest = () => {

        this.setState({ loading: true});
		
		getContact()
        .then(resJSON => {
            const {list_contact, error } = resJSON;
            //console.log(list_sub_cat);
			if(error == false){
				this.setState({
					list_contact: list_contact, 
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

        this.generateRandomString(4);
    }

    generateRandomString(string_length)
    {
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var string = '';
        for(var i = 0; i <= string_length; i++)
        {
            var rand = Math.round(Math.random() * (characters.length - 1));
            var character = characters.substr(rand, 1);
            string = string + character;
        }
        this.setState({
            code: string
        })
    }

    sendContact(){
        var { email, name, phone, address, content, code, re_code } = this.state;

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        let number = /^[0-9 .]+$/;
        if(name == ''){
            Alert.alert('Thông báo', 'Bạn vui lòng nhập tên.');
            return;
        }else if(phone == ''){
            Alert.alert('Thông báo','Vui lòng nhập số điện thoại');
            return;
        }else if(number.test(phone) === false){
            Alert.alert('Thông báo', 'Phone bạn nhập chưa hợp lệ.');
            return;
        }else if(phone.length != 10){
            Alert.alert('Thông báo', 'Phone chỉ có 10 ký tự.');
            return;
        }else if (email == '') {
            Alert.alert('Thông báo', 'Bạn vui lòng nhập email.');
            return;
        }else if(reg.test(email) === false){
            Alert.alert('Thông báo', 'Email bạn nhập chưa hợp lệ.');
            return;
        }else if(address == ''){
            Alert.alert('Thông báo', 'Vui lòng nhập địa chỉ.');
            return;
        }else if(re_code == ''){
            Alert.alert('Thông báo', 'Vui lòng nhập mã code.');
            return;
        }else if(re_code !== code){
            Alert.alert('Thông báo', 'Mã code nhập chưa đúng');
            return;
        }else{
            send(name, phone, email, address, content)
            .then(resJSON => {
                const {msg, error } = resJSON;
                if(error == false){
                    Alert.alert(msg);
                    this.props.navigation.navigate('HomeScreen');
                }else{
                    Alert.alert(msg);
                    return;
                }	
            }).catch(err => {
                this.setState({ loading: false });
            });
        }
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

        return(
            <Container>
                <HeaderBase page="contact" title={''} navigation={navigation} />
                <View style={[MainStyle.tContainerDefault]}>
                    <View style={[MainStyle.tDefaultContent, MainStyle.tDefaultContentFix]}>
                        <ScrollView showsVerticalScrollIndicator={false} style={MainStyle.tDefaultScrollView,{marginBottom:100}}>
                           <View style={{borderTopWidth:10, borderTopColor:'#eeeeee'}}>
                                <View style={{width:screenWidth-20,marginLeft:10, marginTop:20}}>
                                    <Text style={{fontFamily:'RobotoBold', fontSize:20, textTransform:'uppercase'}}>Thông tin liên hệ</Text>
                                    <Text style={{fontFamily:'RobotoBold', fontSize:16, textTransform:'uppercase', marginTop:15}}>Công ty tnhh máy may Giang Thành</Text>
                                    <View style={MainStyle.contact}>
                                        <Text><Text style={MainStyle.titleInfoCt}>Trụ sở Hà Nội:</Text>{this.state.list_contact.hanoi}</Text>
                                        <Text><Text style={MainStyle.titleInfoCt}>Hotline:</Text>{this.state.list_contact.hotline_hn}</Text>
                                        <Text><Text style={MainStyle.titleInfoCt}>Email:</Text>{this.state.list_contact.email_hn}</Text>
                                    </View>
                                    <View style={MainStyle.contact}>
                                        <Text><Text style={MainStyle.titleInfoCt}>Trụ sở HCM:</Text>{this.state.list_contact.hcm}</Text>
                                        <Text><Text style={MainStyle.titleInfoCt}>Hotline:</Text>{this.state.list_contact.hotline_hcm}</Text>
                                        <Text><Text style={MainStyle.titleInfoCt}>Email:</Text>{this.state.list_contact.email_hcm}</Text>
                                        <Text><Text style={MainStyle.titleInfoCt}>Website:</Text>{this.state.list_contact.website}</Text>
                                    </View>
                                    <Text style={{fontStyle:'italic', fontFamily:'RobotoBold', fontSize:15, marginTop:10}}>Hãy điền vào mẫu bên dưới để được chúng tôi giải đáp thắc mắc của bạn sớm nhất </Text>
                                    <View>
                                    <View style={MainStyle.formComment}>
                                        <TextInput style={{fontSize:14,borderColor:'#dddddd', borderWidth:1, padding:5, marginTop:10 }}  onChangeText={(name) => this.setState({ name })} value={this.state.name}
                                            placeholder="Họ và tên*" multiline={false} 
                                        />
                                        <TextInput style={{fontSize:14,borderColor:'#dddddd', borderWidth:1, padding:5, marginTop:10 }}  onChangeText={(phone) => this.setState({ phone })} value={this.state.phone}
                                            placeholder="Số điện thoại*" multiline={false} 
                                        />
                                        <TextInput style={{fontSize:14,borderColor:'#dddddd', borderWidth:1, padding:5, marginTop:10 }}  onChangeText={(email) => this.setState({ email })} value={this.state.email}
                                            placeholder="Email*" multiline={false} 
                                        />
                                        <TextInput style={{fontSize:14,borderColor:'#dddddd', borderWidth:1, padding:5, marginTop:10 }}  onChangeText={(address) => this.setState({ address })} value={this.state.address}
                                            placeholder="Địa chỉ*" multiline={false} 
                                        />
                                        <TextInput style={{fontSize:14,borderColor:'#dddddd', borderWidth:1, padding:5, height:60, marginTop:10 }}  onChangeText={(content) => this.setState({ content })} value={this.state.content}
                                            placeholder="Nội dung liên hệ" multiline={true} 
                                        />
                                        <View style={{flexDirection:'row',position:'relative', paddingBottom:50}}>
                                            <TextInput style={{fontSize:14,borderColor:'#dddddd', borderWidth:1, padding:5, marginTop:10, width:(screenWidth-20)/2.5 }}  onChangeText={(re_code) => this.setState({ re_code })} value={this.state.re_code}
                                                placeholder="Nhập mã bảo mật*" multiline={false} 
                                            />
                                            <TextInput style={{fontSize:14,borderColor:'#dddddd', borderWidth:1, padding:5, marginTop:10,width:(screenWidth-20)/5,marginLeft:5,marginRight:5 }}editable = {false} value={this.state.code}
                                            />
                                            <View style={{width:(screenWidth-20)/3,backgroundColor:'#ce1e1e', justifyContent:'center',alignItems:'center',  marginTop:10, position:'absolute', right:0, height:30, marginBottom:40}}>
                                               <TouchableOpacity onPress={()=>this.sendContact()}>
                                                    <Text style={{fontFamily:'RobotoBold', color:'#ffffff'}}>Gửi liên hệ</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                    </View>
                                </View>
                           </View>
                        </ScrollView>
                    </View>
                </View>
            
            </Container>
        );
    }
}
 