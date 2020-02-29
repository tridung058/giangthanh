import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView,Dimensions, Alert, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";

import { getNewsType} from '../../src/api/apiNews';
import {getStorage} from '../../src/api/storage';
import { getSearchProducts } from './../../src/api/apiProHot';
import global from '../../src/api/global';


let screenWidth = Dimensions.get('window').width;
export default class News extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });

    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            list_cat: [],
            type : ['1', '2', '3'],
            list_type: [],
            list_type1: {},
            list_type2 : [],
            list_type3 : [],
            key:'',
            page:1

        }
        global.onChangeSearch = this.onChangeSearch.bind(this);
    }

    componentDidMount() {
        let type = this.state.type;
        this.makeRemoteRequest(type);
        
    }

    makeRemoteRequest = (type) => {

        this.setState({ loading: true});

            getNewsType(type[0])
            .then(resJSON => {
                const {list_type, error } = resJSON;
                
                if(error == false){
                    this.setState({
                        list_type1: list_type[0], 
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
            getNewsType(type[1])
            .then(resJSON => {
                const {list_type, error } = resJSON;
                if(error == false){
                    this.setState({
                        list_type2: list_type[1], 
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
            getNewsType(type[2])
            .then(resJSON => {
                const {list_type, error } = resJSON;
                //console.log(list_sub_cat);
                if(error == false){
                    this.setState({
                        list_type3: list_type[2], 
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


    newDetail(id){
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

        return(
            <Container>
                <HeaderBase page="news" title={''} navigation={navigation} />
                <View style={[MainStyle.tContainerDefault]}>
                    <View style={[MainStyle.tDefaultContent, MainStyle.tDefaultContentFix]}>
                    { this.state.count > 0 ? 
                        <FlatList style={{ width:screenWidth  }}
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
                        <ScrollView showsVerticalScrollIndicator={false} style={MainStyle.tDefaultScrollView,{marginBottom:130}}>
                           <View>
                                <View style={{ position:'relative',zIndex:0 }}>
                                    <TouchableOpacity onPress={() =>this.newDetail(this.state.list_type1.id)}>
                                        <View style={{position:'relative'}}>
                                            <Image style={{width:screenWidth, height: screenWidth*(3/4)}}  source={{uri:this.state.list_type1.image}}/>
                                            <LinearGradient start={{ x: 1, y: 1 }} end={{ x: 1, y: 0 }}
                                                        colors={['rgba(20, 20, 20,0.5)', 'transparent']}
                                                        style={{
                                                            position: 'absolute',
                                                            left: 0,
                                                            right: 0,
                                                            top: 0,
                                                            height:screenWidth*(3/4),
                                                        }}
                                                    />
                                            <View style={{position:'absolute', bottom: 5, left: 20}}>
                                                <Text style={{fontFamily:'RobotoBold', fontSize: 20, color:'#ffffff'}}>{this.state.list_type1.title}</Text>
                                                <Text style={{fontFamily:'Roboto',fontSize:16, color:'#ffffff'}}>{this.state.list_type1.time}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{marginTop:10}}>
                                <ScrollView horizontal={true} showsVerticalScrollIndicator={false} >
                                    {this.state.list_type2.map((item,i) =>{return(
                                        <TouchableOpacity key={i} style={(i==0 || i == 1)?MainStyle.list_type2:''} onPress={() => this.newDetail(item.id)}>
                                            <View style={{position:'relative'}}>
                                                <Image style={{width:(screenWidth-20)*(2/3), height: screenWidth/3}}  source={{uri:item.image}}/>
                                                <LinearGradient start={{ x: 1, y: 1 }} end={{ x: 1, y: 0 }}
                                                    colors={['rgba(20, 20, 20,0.5)', 'transparent']}
                                                    style={{
                                                        position: 'absolute',
                                                        left: 0,
                                                        right: 0,
                                                        top: 0,
                                                        height:screenWidth/3,
                                                    }}
                                                />
                                                <View style={{position:'absolute', bottom: 10, left: 20}}>
                                                    <Text style={{fontFamily:'RobotoBold', fontSize: 16, color:'#ffffff'}}>{item.title}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                   )})}
                                </ScrollView>
                                </View>
                                <View style={{width: screenWidth-20,marginLeft:10, marginTop:10, marginBottom:20}}>
                                {this.state.list_type3.map((item,i) =>{return(
                                    <TouchableOpacity key={i} style={{marginBottom:20}} onPress={()=>this.newDetail(item.id)}>
                                        <View style={{position:'relative'}}>
                                            <Image style={{width:screenWidth-20, height: screenWidth/2}}  source={{uri:item.image}}/>
                                            <View >
                                                <Text style={{fontFamily:'RobotoBold', fontSize: 18, paddingTop:5}}>{item.title}</Text>
                                                <Text style={{fontFamily:'Roboto', fontSize: 16, paddingTop:5, color:'#777777'}}><Icon type="FontAwesome" name="clock-o" style={{ color: '#777777', fontSize: 16}} /> {item.time}</Text>
                                                <Text style={{fontFamily:'Roboto', fontSize: 16, paddingTop:5}}>{item.summary}</Text>
                                                <Text style={{fontFamily:'Roboto', color: '#ffffff', fontSize:15, width:(screenWidth-20)/3.5,marginTop:8, backgroundColor:'#eb1a20', paddingTop:5,paddingBottom:5,paddingLeft:10, paddingRight: 5}}>Xem thêm <Icon type="AntDesign" name="right" style={{ color: '#ffffff',fontSize:12,paddingLeft:10}} /></Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                   )})}
                                </View>
                           </View>
                        </ScrollView>
                    }
                    </View>
                </View>
                <FooterBase navigation={navigation} page="news"  />
            </Container>
        );
    }
}
 