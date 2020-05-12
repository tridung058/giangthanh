import { StyleSheet, PixelRatio, Dimensions, Platform, StatusBar } from 'react-native';
import Constants from 'expo-constants';

const {width, height} = Dimensions.get('window');
const  screenWidth = Dimensions.get('window').width;

const diffHeight = (Platform.OS === 'android') ? 25 : 35;

const footerHeight = 65;

const barHeight = Constants.statusBarHeight;

export default { 
    tSplash:{
        width: width,
        height: height
    },
    tDefaultScrollView:{
    },
    bgHeaderHome:{
        flexDirection:'row',
        width:width,
        height:width*431/750,
        paddingTop:barHeight-20,
    },
    itemHeagerHome:{
        position:'absolute',
        zIndex:1,
    },
    headerItem:{
        flexDirection:'row',
        width:width,
        height:width/6,
        overflow:'hidden',
        marginTop:barHeight
    },
    headerItemCat:{
        flexDirection:'row',
        width:width,
        //height:width/5,
        overflow:'hidden',
        paddingTop:10
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
        marginRight:20

    },
    headerHomeRight:{
        width:width/3,
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
    SliderContainerStyle: {
       position:'relative',
    },
    tBoundHeader: {
        width: width,
        position: 'absolute',
        bottom: 0,
        marginLeft: width / 2,
    },

    tFooter:{
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
        position:'relative'
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
        width:screenWidth-40,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:20,
        
    },
    itemTouchMenu:{
        width:(screenWidth-90)/5,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:5,
        marginRight:5
    },
    logoMenu:{
        width:(width-40)/7,
        height:(width-40)/7
    },
    textMenu:{
        paddingTop:5,
        fontSize:12,
        color:'#333333',
        textAlign:'center',
        alignItems:'center',
        fontFamily: 'Roboto',
    },
    bodyHome:{
        marginTop:(width/3)+20,
        marginBottom:(screenWidth/3)+105+(screenWidth-40)/7,
        position:'relative',
        zIndex:-1
    },
    proHot:{
        marginTop:20
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
        marginBottom:30
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
        width:(screenWidth-80)/4,
        marginLeft:10,
        marginRight:10,
        marginBottom:5
    },
    nameCat:{
        fontFamily:'Roboto',
        fontSize:13,
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
        height:width*136/750+10,
        paddingTop:barHeight-20,
        position:'absolute',
        zIndex:0
    },
    heightHeader:{
        height:width*136/750+10,
        position:'relative'
    },
    subCat:{
        width:screenWidth,
        position:'relative',
        zIndex:0
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
        marginBottom:5
    },
    nameItem:{
        fontFamily:'Roboto',
        color:'#777777',
        height:60,
        paddingTop:5,
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
    },
    add_cart:{
        paddingTop: 8,
        flexDirection: 'row',
        paddingBottom: 8,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 11,
        height: 80,
        borderTopWidth:10,
        borderTopColor:'#eeeeee',
        backgroundColor:'#ffffff',
        justifyContent:'center',
        alignItems:'center'
    },
    bgAddCart:{
        flexDirection:'row', 
        backgroundColor:'#ce1e1e',
        width:screenWidth-20,
        justifyContent:'center',
        alignItems:'center',
        paddingTop:10,
        paddingBottom:10,
        
    },
    imageDetail:{
        borderColor:'#dddddd',
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        height: (screenWidth)*374/380
    },
    detailInfo:{
        width:screenWidth/3.5,
        fontFamily:'RobotoBold',
        fontSize:15
    },
    detailInfoPrice:{
        width:screenWidth/3.5,
        color:'#ce1e1e',
        fontFamily:'RobotoBold'
    },
    childDetail:{
        fontFamily:'Roboto'
    },
    childOrderNumber:{
        fontFamily:'Roboto',
        borderWidth:1,
        borderColor:'#dddddd',
        height:30,
        width:50,
        paddingLeft:5,
        textAlign:'center'
    },
    addCart:{
        paddingTop:20,
        justifyContent:'center',
        alignItems:'center'
    },
    contact:{
        marginTop:20
    },
    detailContact:{
        flexDirection:'row'
    },
    detailContactN:{
        flexDirection:'row',
        paddingTop:20
    },
    contactAdd:{
        fontFamily:'RobotoBold',
        fontSize:20
    },
    contactInfo:{
        fontFamily:'RobotoBold',
        paddingTop:5
    },
    callIcon:{
        width:(width-20)/8,
        height:(width-20)/8,
    },
    description:{
        flexDirection:'row',
        marginTop:20
    },
    des:{
        height:50,
        width:(screenWidth-20)/2,
        backgroundColor:'#f4f4f4',
        borderTopColor:'#e0e0e0',
        borderTopWidth:1,
        justifyContent:'center',
        alignItems:'center'
    },
    desActive:{
        height:50,
        width:(screenWidth-20)/2,
        borderTopColor:'#ce1e1e',
        borderTopWidth:1,
        justifyContent:'center',
        alignItems:'center'
    },
    titleDesActive:{
        color:'#ce1e1e',
        fontFamily:'RobotoBold',
        fontSize:15
    },
    titleDes:{
        fontSize:15
    },
    textComment:{
        flexDirection:'row',
        marginBottom:20
    },
    bgOtherPro:{
        borderTopColor:'#eeeeee',
        borderTopWidth:10,
        position:'relative',
        marginTop:5,
        marginBottom:10,
        backgroundColor:'#ce1e1e',
        height:(screenWidth*90/750)+10,
    },
    subCatalog:{
        width:width,
        position:'relative',
        zIndex:0
    },
    subCatalogDetail:{
        marginTop:10,
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'center',
        marginBottom:40
        
    },
    itemsubCatalog:{
        width:(screenWidth-60)/2,
        marginLeft:15,
        marginRight:15,
        marginBottom:10
    },
    nameCatalog:{
        fontFamily:'Roboto',
        height:45,
        padding:5
    },
    dowloadFile:{
        flexDirection:'row', 
        width:screenWidth-20,
        justifyContent:'center',
        alignItems:'center',
        paddingTop:10,
        paddingBottom:10,
        borderColor:'#dddddd',
        borderWidth:1
        
    },
    textCatalog:{
        flexDirection:'row',
        marginBottom:20,
        marginTop:20
    },
    info_other_catalog:{
        paddingBottom:10,
        flexDirection:'row',
        marginTop:10,
        borderBottomColor:'#cccccc',
        borderBottomWidth:1,
        borderStyle:'dotted'
    },
    detailCatalog:{
        paddingLeft:10,
        width: (screenWidth-20)*5/6
    },
    contact:{
        marginTop:10
    },


    //modal
    titleInfoCt:{
        fontFamily:'RobotoBold',
        fontSize:15,
        paddingTop:10,
        lineHeight:25
    },
    tContainerModal:{
        flex:1,
        backgroundColor: 'rgba(0,0,0, 0.6)',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    pBtnModal: {
        paddingTop: 12,
        paddingBottom: 12,
        backgroundColor: '#ffffff',
        position:'absolute',
        right: 0
    },
    pBtnModalText:{
        textAlign: 'center',
        fontFamily: 'RobotoBold',
        fontSize: 18,
    },
    pModalBody:{   
        backgroundColor:'#fff',
        width: screenWidth,
        overflow: 'hidden',
        padding: 0,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        position:'relative',
        zIndex:999
    },
    view_cart:{
        height: 60,
        justifyContent:'center',
        alignItems:'center',
    },
    bgViewCart:{
        flexDirection:'row', 
        backgroundColor:'#ce1e1e',
        width:screenWidth-20,
        justifyContent:'center',
        alignItems:'center',
        paddingTop:10,
        paddingBottom:10,
        
    },
    nameItemNoImage:{
        fontFamily:'Roboto',
        color:'#ffffff',
        height:60,
        backgroundColor:'#ce1e1e',
        padding:5,
        fontFamily:'RobotoBold',
        textTransform:'uppercase',
        fontSize:12
    },
    listCart:{ 
        flexDirection:'row', 
        justifyContent:'space-between',
        alignItems:'center',
        height:height/18,
        marginTop:10,
        backgroundColor:'#fff'
    },
    moneyStyle:{
        flexDirection:'row', 
        justifyContent:'space-between',
        alignItems:'center',
    },
    list_cart:{
        paddingTop: 8,
        paddingBottom: 8,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 11,
        height: height/6,
        borderTopWidth:10,
        borderTopColor:'#eeeeee',
        backgroundColor:'#ffffff',
        justifyContent:'space-between',
    },
    toMoney:{
        flexDirection:'row', 
        backgroundColor:'#ce1e1e',
        width:screenWidth-20,
        justifyContent:'center',
        alignItems:'center',
        paddingTop:10,
        paddingBottom:10,
        marginLeft:10
    },
    changeAmout:{
        flexDirection:'row',
    },
    changeAmoutStyle:{
        paddingTop:10,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    plusChangeAmout:{ 
        width:35, 
        height:35, 
        backgroundColor:'#e9e9e9', 
        paddingTop:5, 
        paddingLeft:5
    },
    changeTextAmout:{
        backgroundColor:'#f3f3f3', 
        width:35, 
        height:35, 
        textAlign:'center', 
        borderLeftWidth:1,
        borderLeftColor:'#fff', 
        borderRightWidth:1,
        borderRightColor:'#fff'
    },
    signInStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:20,
        
    },
    imageMember:{
        width:width/6,
        height:width/6,
    },
    txtWellcome:{
        flex:1,
        paddingLeft:20
    },
    infoOrder:{
        padding:20,
        borderTopColor:'#eeeeee',
        borderTopWidth:10
    },
    itemInfoOrderFirst:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingBottom:15,
        borderBottomColor:'#eeeeee',
        borderBottomWidth:1
    },
    itemInfoOrder:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical:15,
        borderBottomColor:'#eeeeee',
        borderBottomWidth:1
    },
    txtTitle:{
        flex:1,
        paddingHorizontal:10
    },
    txtStyle:{
        fontSize:15,
        fontFamily:'Roboto'
    },
    txtName:{
        fontFamily:'RobotoBold',
        fontSize:20
    },
    txtEmail:{
        fontFamily:'Roboto',
        fontSize:15,
        color:'#777777'
    },
    txtMemberTime:{
        fontFamily:'Roboto',
        fontSize:15,
        color:'#777777'
    },
    bgHeaderLogin:{
        width:width,
        height:width*300/750+10,
        paddingTop:barHeight-20,
        position:'absolute',
        zIndex:0
    },
    heightHeaderAuthentication:{
        height:width*300/750+10,
        position:'relative'
    },
    stateAuthentication:{
        flexDirection:'row',
        borderBottomColor:'#eeeeee',
        borderBottomWidth:1,
        height:height/15
    },
    signIn:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth:2,
        borderBottomColor:'#ffd735'
    },
    signUp:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    txtsignIn:{
        fontFamily:'Roboto',
        fontSize:16,
    },
    txtsignUp:{
        fontFamily:'Roboto',
        fontSize:16,
        color:'#777777'
    },
    formSignIn:{
        marginHorizontal:10,
    },
    formSignUp:{
        marginHorizontal:10,
    },
    txtInput:{
        marginTop:10,
        paddingVertical:10,
        borderBottomColor:'#e0e0e0',
        borderBottomWidth:1
    },
    txtInputCp:{
        marginTop:10,
        paddingVertical:10,
       // borderBottomColor:'#e0e0e0',
       // borderBottomWidth:1
    },
    btnSignIn:{
        marginVertical:20,
        height:height/18,
        backgroundColor:'#ce1e1e',
        justifyContent:'center',
        alignItems:'center'
    },
    commentStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical:10,
        borderBottomColor:'#f4f4f4',
        borderBottomWidth:1,
    },
    subCommentStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:40,
        borderBottomColor:'#f4f4f4',
        borderBottomWidth:1,
        paddingVertical:10
    },
    titleOrderDetail:{
        fontSize:18,
        fontFamily:'RobotoBold',
    },
    titleSubDetail:{
        fontFamily:'Roboto',
        color:'#777777',
        paddingVertical:3
    },
    codeProStyle:{
        flexDirection:'row',
        alignItems:'center'
    },
    txtCodeStyle:{
        fontFamily:'RobotoBold',
        flex:1,
    },
    txtResStyle:{
        flex:1,
        paddingVertical:3
    },
    changeInfo:{
        
    },
    notificationStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:10
    },
}
