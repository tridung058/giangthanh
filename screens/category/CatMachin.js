import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView,Dimensions, Alert, FlatList } from 'react-native';
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";

import { getSearchProducts } from './../../src/api/apiProHot';
import global from '../../src/api/global';
import { getCatAllMachin} from '../../src/api/apiCatProduct';
import {getStorage, saveStorage} from '../../src/api/storage';

let screenWidth = Dimensions.get('window').width;
export default class CatMachin extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });

    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            list_cat: [],
            key:'',
            page:1
        }
        global.onChangeSearch = this.onChangeSearch.bind(this);
    }

    componentDidMount() {
        let type = this.props.navigation.state.params.type;
    
        this.makeRemoteRequest(type);
        
    }

    makeRemoteRequest = (type) => {

        this.setState({ loading: true});
		
		getCatAllMachin(type)
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

    goCatDetail(id, name){
        this.props.navigation.navigate('CatProductScreen',{id:id, name:name});
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
                <HeaderBase page="cat_machine" title={''} navigation={navigation} />
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
                        <ScrollView showsVerticalScrollIndicator={false} style={MainStyle.tDefaultScrollView}>
                           <View style={{borderTopWidth:10, borderTopColor:'#eeeeee'}}>
                                <View style={MainStyle.subCat}>
                                    <View style={MainStyle.showCat}>
                                        {this.state.list_cat.map((item,i) =>{return(
                                            <TouchableOpacity key={i} style={MainStyle.itemCat} onPress={()=>(this.goCatDetail(item.id, item.name))}>
                                                {item.type !=='2'?
                                                <View>
                                                    <View style={MainStyle.colorBgCat}>
                                                        <Image style={{width:(screenWidth-100)/4, height:((screenWidth-100)/4)}}  source={{uri:item.image}}/>
                                                    </View>
                                                    <Text style={MainStyle.nameCat}>{item.name}</Text>
                                                </View>:
                                                <View>
                                                    <Text style={MainStyle.nameItemNoImage}>{item.name}</Text>
                                                </View>
                                                }
                                            </TouchableOpacity>
                                        )})}
                                    </View>
                                </View>
                           </View>
                        </ScrollView>
                    }
                    </View>
                </View>
                <FooterBase navigation={navigation} page="cat"  />
            </Container>
        );
    }
}
 