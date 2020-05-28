import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView,Dimensions, Alert, FlatList, TextInput, KeyboardAvoidingView } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';

import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon, Picker } from "native-base";

import { getCity, updateInfoMember, getInfoMember} from '../../src/api/apiMember';
import { saveStorage, getStorage} from '../../src/api/storage';
import global from '../../src/api/global';

let screenWidth = Dimensions.get('window').width;
export default class InfoMember extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });

    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            is_login: false,
            language:'',
            member: '',
            value:1,
            gender: true,
            list_city: [],
            city:'',
            city_name: '',
            name: '',
            phone: '',
            email: '',
            job: '',
            sex: '',
            birthday: '',
            company: '',
            address_detail: '', 

        }
        global.onRefresh = this.onRefresh.bind(this);
    }
    
    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        this.setState({ loading: true});
        getStorage('member')
        .then((member)=>{
            if(member !=''){
                let arrMember = JSON.parse(member);
                this.setState({
                    member: arrMember,
                    is_login: true,
                })

                getInfoMember(this.state.member.id)
                .then(resJSON => {
                    const {list, error } = resJSON;
                    if(error == false){
                        this.setState({
                            list: list,
                            city: list.city,
                            city_name: list.city_name,
                            name: list.name,
                            phone: list.phone,
                            email: list.email,
                            job: list.job,
                            value:list.sex,
                            birthday: list.birthday,
                            company: list.company,
                            address_detail: list.address_detail,
                        });
                        if(this.state.gender == 'Nam'){
                            this.setState({
                                gender:true
                            })
                         }else{
                             this.setState({
                                 gender:false
                             })
                         }
                    }
                        
                }).catch(err => {
                    console.log(err+ 'ERR');
                    this.setState({ loading: false });
                });
            }
        })
        .catch((err)=>{
            console.log(err+ 'LOI');
        })
       
//get city
        getCity()
        .then(resJSON => {
            const {list_city, error } = resJSON;
			if(error == false){
				this.setState({
					list_city: list_city,
				});
			}
				
        }).catch(err => {
            console.log(err+ 'ERR');
			this.setState({ loading: false });
        });
    }

    updateInfo(){
        var { name, phone , email, job, value, birthday, company, city, address_detail, member} = this.state;

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        let number = /^[0-9 .]+$/;
        if (name == '') {
            Alert.alert('Thông báo', 'Vui lòng nhập tên.');
            return;
        }else if( phone == '') {
            Alert.alert('Thông báo', 'Vui lòng nhập SĐT.');
            return;
        }else if( number.test(phone) === false) {
            Alert.alert('Thông báo', 'SĐT nhập không hợp lệ.');
            return;
        }else if( phone.length != 10) {
            Alert.alert('Thông báo', 'SĐT phải có 10 ký tự.');
            return;
        }else if( email == '') {
            Alert.alert('Thông báo', 'Vui lòng nhập email.');
            return;
        }else if( reg.test(email) === false) {
            Alert.alert('Thông báo', 'Email nhập không hợp lệ.');
            return;
        }else if(address_detail ==''){
            Alert.alert('Thông báo', 'Vui lòng nhập địa chỉ.');
            return;
        }else{
            updateInfoMember(name, phone , email, job, value, birthday, company, city, address_detail, member.id)
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

    onRefresh(){
        this.makeRemoteRequest();
    }
    
    render() {
        const {navigation} = this.props;
        const { is_login, name, time, email, member } = this.state;
        const radio_props = [
            {label: 'Nam', value: 1 },
            {label: 'Nữ', value: 0 }
          ];

          const male = (
            <View style={{marginTop:10, paddingVertical:10, borderBottomColor:'#e0e0e0', borderBottomWidth:1}}>
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
          )
        
          const female = (
            <View style={{marginTop:10, paddingVertical:10, borderBottomColor:'#e0e0e0', borderBottomWidth:1}}>
                <RadioForm
                radio_props={radio_props}
                initial={1}
                buttonColor={'#777777'}
                labelStyle={{paddingRight:10}}
                buttonSize={16}
                formHorizontal={true}
                labelStyle={{color: '#777777', paddingRight:10}}
                onPress={(value) => {this.setState({value:value})}}
                />
            </View>
          )
        const main_sex = this.state.gender ? male : female;
        return(
            <Container>
                <HeaderBase page="info_member" title={''} navigation={navigation} />
                <View style={[MainStyle.tContainerDefault]}>
                <KeyboardAvoidingView style={[ {backgroundColor: '#f5fdff'}]} keyboardVerticalOffset={80} behavior={Platform.OS === "ios" ? 'padding' : 'height'}>
                    <ScrollView>
                        <View style={[MainStyle.tDefaultContent, MainStyle.tDefaultContentFix]}>
                            <View showsVerticalScrollIndicator={false} style={MainStyle.tDefaultScrollView}>
                            <View style={MainStyle.changeInfoStyle}>
                                    <View style={MainStyle.formSignIn}>
                                        <TextInput style={MainStyle.txtInput} 
                                            onChangeText={(name) => this.setState({ name })} 
                                            value={this.state.name} returnKeyType='next' 
                                        />
                                        <TextInput style={MainStyle.txtInput} 
                                            onChangeText={(phone) => this.setState({ phone })} 
                                            value={this.state.phone} returnKeyType='done'
                                        />
                                        <TextInput style={MainStyle.txtInput} 
                                            placeholder='Cập nhật email' 
                                            onChangeText={(email) => this.setState({ email })} 
                                            value={this.state.email} returnKeyType='done' 
                                        />
                                        <TextInput style={MainStyle.txtInput} 
                                            placeholder={this.state.member.job == ''?'Cập nhật vị trí công việc':''} 
                                            onChangeText={(job) => this.setState({ job })} 
                                            value={this.state.job} returnKeyType='done' 
                                        />
                                        {/* {main_sex} */}

                                        <View style={{marginTop:10, paddingVertical:10, borderBottomColor:'#e0e0e0', borderBottomWidth:1}}>
                                            <RadioForm
                                            radio_props={radio_props}
                                            initial={this.state.gender == true ? 0 : 1}
                                            buttonColor={'#777777'}
                                            labelStyle={{paddingRight:10}}
                                            buttonSize={16}
                                            formHorizontal={true}
                                            labelStyle={{color: '#777777', paddingRight:10}}
                                            onPress={(value) => {this.setState({value:value})}}
                                            />
                                        </View>

                                        <TextInput style={MainStyle.txtInput} 
                                            placeholder= {this.state.member.birthday == ''?'Cập nhật ngày sinh của bạn':''}
                                            onChangeText={(birthday) => this.setState({ birthday })} 
                                            value={this.state.birthday} returnKeyType='done' 
                                        />
                                        <TextInput style={MainStyle.txtInput} 
                                            placeholder= {this.state.member.company == ''?'Tên công ty của bạn':''}
                                            onChangeText={(company) => this.setState({ company })} 
                                            value={this.state.company} returnKeyType='done' 
                                        />
                                        <View style={{borderBottomColor:'#e0e0e0', borderBottomWidth:1,marginTop:10, paddingVertical:10}}>
                                            <Picker
                                                selectedValue={this.state.city}
                                                style={{height:30, width: screenWidth-20}}
                                                onValueChange={(city, itemIndex) =>
                                                    this.setState({city: city})
                                                }>
                                                    {this.state.list_city.map((item, i)=>{return(
                                                        <Picker.Item key={i} label={this.state.city_name} value={item.id} />
                                                    )})}
                                            </Picker>

                                            
                                        </View>
                                        <TextInput style={MainStyle.txtInput} 
                                            placeholder= {this.state.member.address_detail == ''?'Cập nhật địa chỉ chi tiết':''} 
                                            onChangeText={(address_detail) => this.setState({ address_detail })} 
                                            value={this.state.address_detail} returnKeyType='done' 
                                        />
                                        <TouchableOpacity style={MainStyle.btnSignIn} onPress={() => this.updateInfo()}>
                                            <Text style={{color:'#ffffff', fontFamily:'RobotoBold', fontSize:18}}>CẬP NHẬT</Text>
                                        </TouchableOpacity>
                                    </View>
                            </View>
                            </View>
                        </View>
                    </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </Container>
        );
    }
}
 