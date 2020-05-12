import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView,Dimensions, Alert, FlatList } from 'react-native';
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";

//import { getKeyHot} from '../../src/api/apiCatProduct';
import { getSearchProducts, getKeyHot } from './../../src/api/apiProHot';
import {getStorage, saveStorage} from '../../src/api/storage';
import global from '../../src/api/global';

let screenWidth = Dimensions.get('window').width;
export default class Search extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });

    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            list: [],
            level: '1',
            key:'',
            page:1,
            id: '',
            history_search:[]
        }
        global.onChangeSearch = this.onChangeSearch.bind(this);
    }

    componentDidMount() {
        
        this.makeRemoteRequest();
        
    }

    makeRemoteRequest = () => {

        this.setState({ loading: true});
		
		getKeyHot()
        .then(resJSON => {
            const {list, error } = resJSON;
			if(error == false){
				this.setState({
					list: list, 
					loading: false, 
                    refreshing: false ,
				});
			}else{
				this.setState({ 
					loading: false, 
					allow_more: false
				});
			}
				
        }).catch(err => {
			 console.log(err + 'ERR key');
			this.setState({ loading: false });
        });

        getStorage('history_search')
            .then((history_search)=>{
                if(history_search !=''){
                    this.setState({
                        history_search:JSON.parse(history_search),
                    })
                    console.log(this.state.history_search);
                }else{
                    console.log('NULL');
                }
            })
            .catch((err)=>{
                console.log(err+ 'LOI history_search');
            })
    }
    //search 
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

    goCatDetail(id, name){
        this.props.navigation.navigate('CatProductScreen',{id:id, name:name});
    }
    //del history search
    delHistorySearch(id){
        var historySearch = (this.state.history_search);
        var tmp = [];
        historySearch.map((item,i)=>{
                if(item.id != id){
                    tmp.push(item);
                }
            })
            saveStorage('history_search', JSON.stringify(tmp));
            this.makeRemoteRequest();
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
    gotoSearchByKey(key){
        this.props.navigation.navigate('SearchKeyScreen',{key:key});
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
                <HeaderBase page="search" title={''} navigation={navigation} />
                <View style={[MainStyle.tContainerDefault]}>
                    <View style={[MainStyle.tDefaultContent, MainStyle.tDefaultContentFix]}>
                        <View showsVerticalScrollIndicator={false} style={MainStyle.tDefaultScrollView}>
                           <View style={{borderTopWidth:10, borderTopColor:'#eeeeee'}}>
                           { this.state.count > 0 ? 
                                <FlatList style={{   }}
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
                                <ScrollView>
                                    <View style={MainStyle.subCat}>
                                        <View style={{padding:10, justifyContent:'center', position:'relative', zIndex:0}}>
                                            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingVertical:10}}>
                                                <Icon style={{fontSize:25,color:'#ff4300'}} type="FontAwesome5" name="fire"  />
                                                <Text style={{fontFamily:'RobotoBold', fontSize:18, flex:1, paddingHorizontal:20}}>Từ khóa hot</Text>
                                                <View/>
                                            </View>
                                            {this.state.list.map((item, i) =>{ return(
                                                <TouchableOpacity key={i}
                                                    onPress={()=>{this.gotoSearchByKey(item.title)}}
                                                    style={{borderTopWidth:1, borderTopColor:'#e7e8ea', paddingVertical:10}}>
                                                    <Text style={{ fontFamily:'Roboto', fontSize:16}}>{item.title}</Text>
                                                </TouchableOpacity>
                                            )})}
                                        </View>
                                        <View style={{borderTopWidth:10, borderTopColor:'#eeeeee', paddingVertical:10}}>
                                            <View style={{padding:10}}>
                                                <Text style={{fontFamily:'RobotoBold', fontSize:18, paddingVertical:10}}>Lịch Sử Tìm Kiếm</Text>
                                                    {this.state.history_search.map((res, key) =>{
                                                        return(
                                                            <View key={key}>
                                                                <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center', paddingVertical:10, borderTopColor:'#e7e8ea',borderTopWidth:1}}>
                                                                    <TouchableOpacity style={{flex:1}} key={key} onPress={() => this.ProductDetail(res.id, res.cat_id, res.name)}>
                                                                        <Text style={{ fontFamily:'Roboto', fontSize:16, }}>{res.name}</Text>
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity onPress={() => this.delHistorySearch(res.id)}>
                                                                        <Icon style={{fontSize:20,color:'#ff4300'}} type="AntDesign" name="delete"  />
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </View>
                                                        )
                                                    })}
                                            </View>
                                        </View>
                                    </View>
                                </ScrollView>
                            }
                           </View>
                        </View>
                    </View>
                </View>
            </Container>
        );
    }
}
 