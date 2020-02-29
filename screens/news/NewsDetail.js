import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView,Dimensions, Alert, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";
import AutoHeightWebView from 'react-native-autoheight-webview';

import { getNewsDetail, getOtherNews} from '../../src/api/apiNews';
import {getStorage} from '../../src/api/storage';
import { getSearchProducts } from './../../src/api/apiProHot';
import global from '../../src/api/global';

let screenWidth = Dimensions.get('window').width;
export default class NewsDetail extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });

    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            news_detail: {},
            list_other : [],
            key:'',
            page:1
        }
        global.onChangeSearch = this.onChangeSearch.bind(this);
    }

    componentDidMount() {
        let id = this.props.navigation.state.params.id;
        this.makeRemoteRequest(id);
        
    }

    makeRemoteRequest = (id) => {

        this.setState({ loading: true});

            getNewsDetail(id)
            .then(resJSON => {
                const {news_detail, error } = resJSON;
                
                if(error == false){
                    this.setState({
                        news_detail: news_detail, 
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

            getOtherNews(id)
            .then(resJSON => {
                const {list_other, error } = resJSON;
                
                if(error == false){
                    this.setState({
                        list_other: list_other, 
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
                <HeaderBase page="news_detail" title={''} navigation={navigation} />
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
                           <View style={{width: screenWidth-20,marginLeft:10, marginTop:10}}>
                                <View style={{position:'relative', zIndex:0}}>
                                    <Image style={{width:screenWidth-20, height: screenWidth/2}}  source={{uri:this.state.news_detail.image}}/>
                                    <View>
                                        <Text style={{fontFamily:'RobotoBold', fontSize: 18, paddingTop:5}}>{this.state.news_detail.title}</Text>
                                        <Text style={{fontFamily:'Roboto', fontSize: 16, paddingTop:5, color:'#777777'}}><Icon type="FontAwesome" name="clock-o" style={{ color: '#777777', fontSize: 16}} /> {this.state.news_detail.created_time}</Text>
                                        <Text style={{fontFamily:'Roboto', fontSize: 16, paddingTop:5}}>{this.state.news_detail.summary}</Text>
                                        <AutoHeightWebView
                                            customScript={`document.body.style.background = 'transparent';`}
                                            style={{ width: screenWidth-20, marginTop: 10 }}
                                            files={[{
                                                href: global.BASE_URL+'/templates/default/css/app.css?v=333',
                                                type: 'text/css',
                                                rel: 'stylesheet'
                                            }]}
                                            source={{ html: this.state.news_detail.content }}
                                            zoomable={false}
                                        />
                                    </View>
                                </View>
                                
                                <View>

                                </View>

                                <View style={MainStyle.other_news}>
                                    <Text style={{fontFamily:'RobotoBold',color:'#ce1e1e', textTransform:'uppercase', borderBottomColor:'#eb1a20', borderBottomWidth:1, marginBottom:10}}>Các tin khác</Text>
                                    {this.state.list_other.map((item,i) =>{return(
                                        <TouchableOpacity key={i} onPress={() =>this.makeRemoteRequest(item.id)}>
                                            <Text style={{fontSize:14, lineHeight:25}}> <Icon type="Octicons" name="primitive-dot" style={{ color: '#d02929', fontSize: 15, fontFamily:'Roboto'}} /> {item.title} - <Text style={{color:'#ce1e1e'}}>{item.created_time}</Text></Text>
                                        </TouchableOpacity>
                                    )})}
                                </View>
                           </View>
                        </ScrollView>
                    }
                    </View>
                </View>
                <FooterBase navigation={navigation} page="news_detail"  />
            </Container>
        );
    }
}
 