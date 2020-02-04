import { StyleSheet, PixelRatio, Dimensions, Platform, StatusBar } from 'react-native';

const {width, height} = Dimensions.get('window');
const  screenWidth = Dimensions.get('window').width;

const diffHeight = (Platform.OS === 'android') ? 25 : 35;

const footerHeight = 65;

import Constants from 'expo-constants';
const barHeight = Constants.statusBarHeight;

export default { 
    bgHeaderHome:{
        flexDirection:'row',
        width:width,
        height:width*431/750,
    },
    itemHeagerHome:{
        position:'absolute',
        zIndex:1,
    },
    headerItem:{
        flexDirection:'row',
        width:width,
        height:width/6,
        overflow:'hidden'
    },
    headerItemCat:{
        flexDirection:'row',
        width:width,
        height:width/5,
        overflow:'hidden',
    },
    goBack:{
        position:'relative'
    },
    headerHomeLeft:{
        width:width/3
    },
    headerHomeCenter:{
        width:width/3
    },
    headerHomeLeftCat:{
        width:width/8
    },
    headerHomeCenterCat:{
        width:width*(6/8)
    },
    headerHomeRightCat:{
        width:width/8
    },
    logoHome:{
        width:width/4,
        height:(width/4)*41/153,
    },
    icon_cart:{
        width:width/13,
        height:(width/13)*44/50,
        right:30

    },
    headerHomeRight:{
        width:width/3
    },
    searchBox:{
        width:width,
        //height:width/6,
        marginTop:20,
        alignItems:'center',
        position:'relative',
    },
    tHeader:{
        flexDirection:'row',
        paddingTop: barHeight,
    },
    tHeaderIconMenu:{
        marginTop: 15,
        marginLeft:15,
        color: '#ffffff',
        fontSize: 30
    },
    tHeaderBody:{
        width: width - 160,
        justifyContent:'center',
        alignItems:'center'
    },
    tHeaderRight:{
        width: 80
    },
    tHeaderIconCart:{
        fontSize: 40,
        color:'#ffffff',
        right:30,
        top:0
    },
    tSliderContainerStyle: {
       position:'relative',
    },
    tBoundHeader: {
        width: width,
        position: 'absolute',
        bottom: 0,
        marginLeft: width / 2,
    },

    tFooter:{
        backgroundColor: "#red",
        paddingTop: 8,
        flexDirection: 'row',
        paddingBottom: 8,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 11,
        height: footerHeight,
        borderTopWidth:1,
        borderTopColor:'#b3b3b3',
        backgroundColor:'#ffffff'
    },
    tFItem:{
        flex: 1,
        textAlign: "center",
        alignItems: 'center',
    },
    textFooterBase:{
        fontFamily:'Roboto',
        fontSize:14
    },
    slideBg:{
        height:width/3,
        width:width-40,
        marginTop:15,
        alignItems:'center',
        justifyContent:'center',
        marginLeft:20
    },
    menu:{
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:20,
        marginTop:20,
    },
    itemTouchMenu:{
        width:(screenWidth-90)/5,
        marginLeft:5,
        marginRight:5,
        justifyContent:'center',
        alignItems:'center',
    },
    logoMenu:{
        width:(width-40)/7,
        height:(width-40)/7
    },
    textMenu:{
        paddingTop:5,
        fontSize:14,
        color:'#333333',
        textAlign:'center',
        alignItems:'center',
        fontFamily: 'Roboto',
    },
    bodyHome:{
        marginTop:(width/3)+20,
        marginBottom:(screenWidth/3)+105+(screenWidth-40)/7,
    },
    proHot:{

    },
    bgProHot:{
       position:'relative',
       borderTopColor:'#eeeeee',
       borderTopWidth:10
    },
    textProHot:{
       position:'absolute',
       left:20,
       top:13,
       fontFamily:'RobotoBold',
       fontSize:16,
       zIndex:1,
       color:'#ffffff',

    },
    viewMoreProHot:{
        position:'absolute',
        right:20,
        top:13,
    },
    textVm:{
        fontFamily:'Roboto',
        fontSize:16,
        zIndex:1,
        color:'#ffffff',
        textTransform:'uppercase'
    },
    showProHot:{
        marginTop:10,
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'center',
    },
    itemProHot:{
        width:(screenWidth-60)/3,
        marginLeft:10,
        marginRight:10,
    },
    namePro:{
        fontFamily:'RobotoBold',
        fontSize:14,
        color:'#333333',
        paddingTop:5
    },
    pricePro:{
        color:'#ce1e1e',
        fontFamily:'RobotoBold',
        fontSize:14,
        paddingBottom:5,
    },
    showCat:{
        marginTop:10,
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'center',
    },
    colorBgCat:{
        backgroundColor:'#eeeeee',
        borderRadius:10
    },
    itemCat:{
        width:(screenWidth-90)/4,
        marginLeft:10,
        marginRight:10,
    },
    nameCat:{
        fontFamily:'Roboto',
        fontSize:14,
        paddingTop:5,
        color:'#333333',
        height:40
    },
    bgSewing:{
        borderTopColor:'#eeeeee',
        borderTopWidth:10,
        position:'relative',
        marginTop:5,
        marginBottom:10,
        backgroundColor:'#ce1e1e',
        height:(screenWidth*90/750)+10,
    },
    catLevel:{
        marginRight:10
    },
    boxCatLevel:{
        backgroundColor: '#252525',
        borderRadius:5,
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:10,
        paddingRight:10
    },
    boxCatLevelActive:{
        borderRadius:5,
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:10,
        paddingRight:10,
        borderColor:'#bcbcbc',
        borderWidth:1
    },
    nameCatLevel:{
        color:'#ffffff',
        fontSize:16,
        fontFamily:'Roboto',
    },
    nameCatLevelActvie:{
        fontSize:16,
        fontFamily:'Roboto',
        color:'#333333'
    },
    moreCatMcTeach:{
        marginTop:10,
        alignItems:'center',
        borderTopColor:'#eeeeee',
        borderTopWidth:1,
    },
    boxMoreCat:{
        position:'relative',
        paddingLeft:20,
        paddingRight:20,
        paddingTop:10,
        paddingBottom:10
    },
    textMoreCatMcTeach:{
        fontFamily:'Roboto',
        textTransform:'uppercase',
        color:'#228fca',
    },
    showPurchase:{
        marginTop:10,
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'center',
    },
    itemPurchase:{
        width:(screenWidth-120)/3,
        marginLeft:20,
        marginRight:20,
    },
    namePurchase:{
        fontFamily:'RobotoBold',
        fontSize:14,
        color:'#333333',
        paddingTop:5,
        height:40,
        textAlign:'center'
    },
    //screen category
    bgHeaderCategory:{
        flexDirection:'row',
        width:width,
        height:width*136/750,
    },
    subCat:{
        width:width,
    },
    subCatDetail:{
        marginTop:10,
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'center',
        
    },
    itemSubCat:{
        width:(screenWidth-120)/3,
        marginLeft:20,
        marginRight:20,
        marginBottom:10
    },
    nameItem:{
        fontFamily:'Roboto',
        color:'#777777',
        height:40,
        paddingTop:5
    },
    list_type2:{
        marginRight:10
    },
    other_news:{
        marginTop:10,
        marginBottom:30
    },
    headerHomeLeftProduct:{
        width:screenWidth/8
    },
    headerHomeCenterProduct:{
        width:screenWidth/8
    },
    headerHomeRightProduct:{
        width:(screenWidth*6)/8,
    },
    leftProductDetail:{
        flexDirection:'row',
        paddingRight:15
    },
    icon_cart_pro:{
        width:width/13,
        height:(width/13)*44/50,
        paddingTop:5,
        paddingRight:5
    }
}
