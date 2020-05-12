import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView,Dimensions, Alert, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";
import AutoHeightWebView from 'react-native-autoheight-webview';

import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';

import { getSearchProducts } from './../../src/api/apiProHot';
import global from '../../src/api/global';
import { getCatalogDetail, getOtherCatalog} from '../../src/api/apiCatalog';

import {getStorage, saveStorage} from '../../src/api/storage';

let screenWidth = Dimensions.get('window').width;
export default class CatalogDetail extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });

    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            catalog_detail: {},
            list_other_catalog : [],
            key:'',
            page:1
        }
        global.onChangeSearch = this.onChangeSearch.bind(this);
    }
    
    componentDidMount() {
        Permissions.askAsync(Permissions.CAMERA_ROLL).then(d => console.log(d))

        let id = this.props.navigation.state.params.id;
        let cat_id = this.props.navigation.state.params.cat_id;
        this.makeRemoteRequest(id, cat_id);
        
    }

    makeRemoteRequest = (id, cat_id) => {

        this.setState({ loading: true});

            getCatalogDetail(id)
            .then(resJSON => {
                const {catalog_detail, error } = resJSON;
                
                if(error == false){
                    this.setState({
                        catalog_detail: catalog_detail, 
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

            getOtherCatalog(id, cat_id)
            .then(resJSON => {
                const {list_other_catalog, error } = resJSON;
                
                if(error == false){
                    this.setState({
                        list_other_catalog: list_other_catalog, 
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

    async dowLoadFile(url){
        const uri = url;
        var filename = uri.substring(uri.lastIndexOf('/')+1);
        let fileUri = FileSystem.documentDirectory + filename;
        FileSystem.downloadAsync(uri, fileUri)
        .then(({ uri }) => {
            console.log(uri);
            this.saveFile(uri);
            Alert.alert('Thông báo', 'Lưu file thành công');
        })
        .catch(error => {
            console.error(error);
        })
    }

    saveFile = async (fileUri) => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === "granted") {
            const asset = await MediaLibrary.createAssetAsync(fileUri)
            await MediaLibrary.createAlbumAsync("Download", asset, false)
        }
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

    ProductDetail(id, cat_id, name){

        getStorage('history_search')
            .then(history_search => {
                var tmp = [];
                var existID = false;
                if(history_search != ''){
                    var arrSearch = JSON.parse(history_search);
                    arrSearch.map(c => {
                        if(c.id == id){
                            existID = true;
                        }
                        tmp.push(c);
                    })
                }
                if(existID == false){
                    tmp.push({
                        id: id,
                        cat_id: cat_id,
                        name: name
                    });
                }

                saveStorage('history_search', JSON.stringify(tmp));
                this.props.navigation.navigate('ProductDetailScreen',{id:id, cat_id:cat_id});
            })
            .catch(err => console.log(err+'Lỗi'));
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
                <HeaderBase page="catalog_detail" title={''} navigation={navigation} />
                <View style={[MainStyle.tContainerDefault]}>
                    <View style={[MainStyle.tDefaultContent, MainStyle.tDefaultContentFix]}>
                    { this.state.count > 0 ? 
                        <FlatList style={{ width:screenWidth  }}
                            data={this.state.list_search}
                            renderItem={({ item }) => (
                                <TouchableOpacity  onPress={()=>this.ProductDetail(item.id, item.cat_id, item.name)}>
                                <View style={{paddingLeft:20, paddingTop:10, paddingRight:20}}>
                                    <Text style={{fontFamily:'Roboto', color:'red',fontSize:15 }}>{item.name}</Text>
                                </View>
                                </TouchableOpacity>
                            )}
                            // numColumns={6}
                        />:
                        <ScrollView showsVerticalScrollIndicator={false} style={MainStyle.tDefaultScrollView,{marginBottom:130}}>
                           <View style={{width: screenWidth-20,marginLeft:10, marginTop:10}}>
                                <View style={{position:'relative',zIndex:0}}>
                                    <View>
                                        <Text style={{fontFamily:'RobotoBold', fontSize: 18, paddingTop:5}}>{this.state.catalog_detail.name}</Text>
                                        <Text style={{fontFamily:'Roboto', fontSize: 16, paddingTop:5, color:'#777777'}}><Icon type="FontAwesome" name="clock-o" style={{ color: '#777777', fontSize: 16}} /> {this.state.catalog_detail.time}</Text>
                                    
                                        <AutoHeightWebView
                                            customScript={`document.body.style.background = 'transparent';`}
                                            style={{ width: screenWidth-20, marginTop: 10 }}
                                            files={[{
                                                href: global.BASE_URL+'/templates/default/css/app.css?v=333',
                                                type: 'text/css',
                                                rel: 'stylesheet'
                                            }]}
                                            source={{ html: this.state.catalog_detail.summary}}
                                            zoomable={false}
                                        />
                                        <View style={MainStyle.dowloadFile}>
                                            <Icon type="FontAwesome" name="arrow-circle-o-down" style={{ color: '#de0000',fontSize:20,paddingRight:5}} />
                                            <TouchableOpacity onPress={()=>this.dowLoadFile(this.state.catalog_detail.file_upload)}>
                                                <Text style={{fontFamily:'RobotoBold', fontSize:14}}>Tải về</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View style={MainStyle.textCatalog}>
                                    <View style={{width:(screenWidth-20)/2, borderBottomColor:'#eb1a20', borderBottomWidth:1}}>
                                        <Text style={{fontFamily:'RobotoBold', color:'#ce1e1e', fontSize:17}}>CATALOG CÙNG HÃNG</Text>
                                    </View>
                                    <View style={{width:(screenWidth-20)/2, borderBottomColor:'#dddddd', borderBottomWidth:1}}>
                                        
                                    </View>
                                </View>
                                {this.state.list_other_catalog.map((item,i) =>{return(
                                <View key={i} style={MainStyle.info_other_catalog}>
                                    <View>
                                        <Image style={{ width: (screenWidth-20)/6, height:((screenWidth-20)/6)*61/52}} source={require('./../../assets/file.png')}/>
                                    </View>
                                    <View style={MainStyle.detailCatalog}>
                                        <Text style={{fontFamily:'RobotoBold', fontSize:16}}>{item.name}</Text>
                                        <Text>{item.summary}</Text>
                                        <TouchableOpacity onPress={()=>this.makeRemoteRequest(item.id, item.cat_id)}>
                                            <Text style={{fontStyle:'italic', fontFamily:'Roboto', color:'#de0000'}}>Chi tiết</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                )})}
                           </View>
                        </ScrollView>
                    }
                    </View>
                </View>
            </Container>
        );
    }
}
 