import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView,Dimensions, Alert, FlatList } from 'react-native';
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";

import { getProductNotification, updateNotification } from './../../src/api/apiProHot';
import {getStorage} from '../../src/api/storage';
import global from '../../src/api/global';

let screenWidth = Dimensions.get('window').width;
export default class Notifi extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });

    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            list_cat: [],
            level: '1',
            key:'',
            page:1,
            id:''
        }
        global.onChangeSearch = this.onChangeSearch.bind(this);
    }

    componentDidMount() {
        let level = this.state.level;
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
                    is_login: true
                })
                //update
                updateNotification(this.state.id)
                .then(resJSON => {
                    const { error } = resJSON;
                    if(error == false){
                        this.setState({
                            loading: false, 
                        });
                    }
                        
                }).catch(err => {
                    console.log(err+ 'ERR UPDATE notification');
                });
                //get 
                getProductNotification(this.state.id)
                .then(resJSON => {
                    const {list, error } = resJSON;
                    //console.log(list_sub_cat);
                    if(error == false){
                        this.setState({
                            list: list, 
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
                    console.log(err+ 'ERR notification');
                    this.setState({ loading: false });
                });
            }
        })
        .catch((err)=>{
            console.log(err+ 'LOI');
        })
		
    }
    search(){
        //search
            getSearchProducts(this.state.page, this.state.key)
            .then(resJSON => {
                const { list_search,count, error} = resJSON;
                if (error == false) {
                    this.setState({
                        list_search: list_search,
                        refreshing: false,
                        loading: false,
                        count: count,
                    });
                
                }else{
                    this.setState({
                        count: 0,
                    });
                }
            }).catch(err => {
                // this.setState({ loaded: true });  
        });
    }
    onChangeSearch(key){
        this.setState({key: key},this.search );
    }

    ProductDetail(id, cat_id){
        this.props.navigation.navigate('ProductDetailScreen',{id:id, cat_id:cat_id});
    }
    NewsDetail(id, cat_id){
        this.props.navigation.navigate('NewsDetailScreen',{id:id});
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
        const {list} = this.state;
        return(
            <Container>
                <HeaderBase page="notifi" title={''} navigation={navigation} />
                <View style={[MainStyle.tContainerDefault]}>
                    <View style={[MainStyle.tDefaultContent, MainStyle.tDefaultContentFix]}>
                        <View showsVerticalScrollIndicator={false} style={MainStyle.tDefaultScrollView}>
                        { this.state.count > 0 ? 
                                <FlatList style={{   }}
                                    data={this.state.list_search}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity  onPress={()=>this.ProductDetail(item.id, item.cat_id)}>
                                        <View style={{paddingLeft:20, paddingTop:10, paddingRight:20}}>
                                            <Text style={{fontFamily:'Roboto', color:'red',fontSize:15 }}>{item.name}</Text>
                                        </View>
                                        </TouchableOpacity>
                                    )}
                                    // numColumns={6}
                                />:
                           <View style={{}}>
                                <View style={MainStyle.subCat}>
                                    <View style={{}}>
                                        <FlatList style={{   }}
                                            data={list}
                                            renderItem={({ item }) => (
                                            <View style={{borderBottomWidth:10, borderBottomColor:'#f4f4f4',}}>
                                                <View style={MainStyle.notificationStyle}>
                                                    <Image style={{ width: screenWidth/7, height:(screenWidth/7), borderRadius: (screenWidth/7)/2}} source={{uri:item.image}}/>
                                                    <View style={{flex:1, paddingHorizontal:15}}>
                                                        {item.type == 'news' ? 
                                                        <TouchableOpacity style={{}} onPress={() => this.NewsDetail(item.product_id, item.cat_id)}>
                                                            <Text style={{fontFamily:'RobotoBold', color:'#000000', textTransform:'uppercase'}}>{item.title}</Text>
                                                            <View style={{flexDirection:'row', paddingVertical:5}}>
                                                                <Text style={{fontFamily:'Roboto', color:'#333333'}}>mới được </Text>
                                                                <Text style={{fontFamily:'RobotoBold'}}>{item.member}</Text>
                                                                <Text style={{color:'red'}}> đăng (tin tức)</Text>
                                                            </View>
                                                            <Text style={{fontFamily:'Roboto', color:'#333333'}}>{item.time}</Text>
                                                            <View/>
                                                        </TouchableOpacity>
                                                        :<TouchableOpacity style={{}} onPress={() => this.ProductDetail(item.product_id, item.cat_id)}>
                                                            <Text style={{fontFamily:'RobotoBold', color:'#000000', textTransform:'uppercase'}}>{item.title}</Text>
                                                            <View style={{flexDirection:'row', paddingVertical:5}}>
                                                                <Text style={{fontFamily:'Roboto', color:'#333333'}}>mới được </Text>
                                                                <Text style={{fontFamily:'RobotoBold'}}>{item.member}</Text>
                                                                <Text style={{color:'red'}}> đăng bán (sản phẩm)</Text>
                                                            </View>
                                                            <Text style={{fontFamily:'Roboto', color:'#333333'}}>{item.time}</Text>
                                                            <View/>
                                                        </TouchableOpacity>
                                                    }
                                                    </View>
                                                    <View/>
                                                </View>
                                            </View>
                                            )}
                                        />
                                    </View>
                                </View>
                           </View>
                        }
                        </View>
                    </View>
                </View>
                <FooterBase navigation={navigation} page="notifi"  />
            </Container>
        );
    }
}
 