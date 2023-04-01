import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    Animated, BackHandler,
    Keyboard,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    useWindowDimensions,
    View
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {UserService} from "../../http/service/userService";
import {useDispatch} from "react-redux";
import {SET_CAR} from "../../store/reducers/userReducer";

const AutoInfo = ({navigation}) => {
    const dispatch=useDispatch()
    const [input1,setInput1]=useState('')
    const [input1Focus,setInput1Focus]=useState(false)
    const [input1Tap,setInput1Tap]=useState(false)

    const [input2,setInput2]=useState('')
    const [input2Focus,setInput2Focus]=useState(false)
    const [input2Tap,setInput2Tap]=useState(false)

    const [input3,setInput3]=useState("1")

    const [input4,setInput4]=useState("")

    const [make,setMake]=useState([])
    const [model,setModel]=useState([])

    const [id,setId]=useState(null)
    console.log('com',id)
    const [model_id,setModal_Id]=useState(null)
    const {width}=useWindowDimensions()

    const translate =useRef(new Animated.Value(0)).current
    const translateIn=(value)=>{
        Animated.timing(translate,{
            toValue:value,
            duration:300,
            useNativeDriver:false
        }).start(()=>translate.setValue(value))
    }




    function debounce(func, timeout = 300){
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }



    function getCarMake(){
        UserService.getCarManufactures(input1).then(data=>{
            setMake(data)
        })
    }
    function getCarModel(){
        UserService.getCarModel(id,input2).then(data=>{
            setModel(data)
        })
    }
    getCarModel=useCallback(debounce(getCarModel,400),[input2])
    getCarMake = useCallback(debounce(getCarMake,400),[input1])

    function handleVariable(value) {
        Keyboard.dismiss()
        setInput1(value)
        setInput1Tap(true)
    }
    function handleModelVariable(value) {
        Keyboard.dismiss()
        setInput2(value)
        setInput2Tap(true)
    }



        useEffect(()=>{

            BackHandler.addEventListener('hardwareBackPress',function (e){
                console.log('rre')
                if(Number.parseInt(JSON.stringify(translate))!==0)
                    translateIn(width+Number.parseFloat(JSON.stringify(translate)))
            })
            navigation.addListener('beforeRemove',function (e){
                e.preventDefault()
            })
            return BackHandler.removeEventListener('hardwareBackPress')
        },[navigation])


    function handleCreateAuto() {
        UserService.createCar(+model_id,+id,input4,+input3).then(()=>{
            UserService.getDataAuto().then((data)=>{
                dispatch(SET_CAR(data))
                navigation.navigate('Create')

            })

        })
    }

    return (
        <View>
            <Pressable style={styles.cancel}>
            <Icon name={'close-outline'} size={40} color={'blue'} solid/>
        </Pressable>
    <Animated.View style={[styles.form,{transform:[{translateX:translate}]}]}>
        <View style={[styles.formEl]}>
            <Text style={styles.text}>Сar make</Text>
            <View style={[styles.inputWrapper]}>
                <Icon name={'car-outline'} size={35} />
                <TextInput style={[styles.input,]} value={input1} onFocus={()=>{setInput1Tap(false); setInput1Focus(true); getCarMake()}} onBlur={()=>setInput1Focus(false)} onChangeText={(e)=>setInput1(e)} onKeyPress={getCarMake} returnKeyType="done"  placeholder={'Car make...'}/>
            </View>
            {make?.length>0&&input1Focus&&
                <ScrollView keyboardShouldPersistTaps={'handled'} style={styles.scrollCar} contentContainerStyle={styles.carBonus}>
                    {make.map(data=>
                        <Pressable key={data.id} onPress={()=>{handleVariable(data.name);setId(data.id)}}>
                            <Text style={styles.carBonusText}>{data.name}</Text>
                        </Pressable>)
                    }
                </ScrollView>
            }
            {input1Tap&&
                <Pressable style={styles.btn1} onPressIn={()=> translateIn(-width+Number.parseFloat(JSON.stringify(translate)))}>
                    <Text style={{fontSize:16,color:'white',fontWeight:'bold'}}>CONTINUE</Text>
                </Pressable>
            }


        </View>
        <View style={styles.formEl}>
            <Text style={styles.text}>Car model</Text>
            <View style={[styles.inputWrapper,]}>
                <Icon name={'car-outline'} size={35} />
                <TextInput style={styles.input} value={input2} onFocus={()=>{setInput2Tap(false); setInput2Focus(true); getCarModel()}} onBlur={()=>setInput2Focus(false)} onChangeText={setInput2}  returnKeyType="done"  placeholder={'Input model...'}/>
            </View>
            {model?.length>0&&input2Focus&&
                <ScrollView keyboardShouldPersistTaps={'handled'} style={styles.scrollCar} contentContainerStyle={styles.carBonus}>
                    {model.map(data=>
                        <Pressable key={data.id} onPress={()=>{handleModelVariable(data.name);setModal_Id(data.id)}}>
                            <Text style={styles.carBonusText}>{data.name}</Text>
                        </Pressable>)
                    }
                </ScrollView>
            }
            {input2Tap&&
                <Pressable style={styles.btn1} onPressIn={()=> translateIn(-width+Number.parseFloat(JSON.stringify(translate)))}>
                    <Text style={{fontSize:16,color:'white',fontWeight:'bold'}}>CONTINUE</Text>
                </Pressable>
            }
        </View>
        <View style={styles.formEl}>
            <Text style={styles.text}>How many passengers are you willing to carry?{"\n"}(1-4)</Text>
            <View style={[styles.inputWrapper,]}>
                <Icon name={'person-outline'} size={35} />
                <TextInput style={styles.input} value={input3} autoFocus={true}   onChangeText={setInput3}  returnKeyType="next" onSubmitEditing={()=> translateIn(-width+Number.parseFloat(JSON.stringify(translate)))}  keyboardType={"numeric"} placeholder={'Count...'}/>
            </View>
        </View>
        <View style={styles.formEl}>
            <Text style={styles.text}>Name the car{"\n"}(only you will see it)</Text>
            <View style={[styles.inputWrapper,]}>
                <Icon name={'person-outline'} size={35} />
                <TextInput style={styles.input} value={input4} autoFocus={true}  onChangeText={setInput4}  returnKeyType="send" onSubmitEditing={handleCreateAuto}   placeholder={'Car name...'}/>
            </View>
        </View>
    </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    scrollCar:{
        width:'85%',
        borderStyle:'solid',
        borderLeftWidth:1,
        borderRightWidth:1,
        borderColor:'#b0b0ab',
        maxHeight:150,
        paddingVertical:1
    },
    carBonusText:{
        fontSize:25,
        height:50,
        borderBottomWidth:1,
        borderStyle:'solid',
        borderColor:'#b0b0ab',
        textAlignVertical:'center'
    },
    carBonus:{
        backgroundColor:'white',
    },
    btn1:{
        marginTop:40,
        display:'flex',
        alignItems:'center',
        padding:10,
        backgroundColor:'#00bbff',
        borderRadius:10,
        marginBottom:10
    },
    btnDate:{
        backgroundColor:'blue'
    },
    textDate:{
        fontSize:20,
        marginTop:30
    },
    padding20:{
        paddingHorizontal:10
    },
    textErr:{
        marginTop:10,
        color:'red'
    },
    formEl:{

        width:'100%',
        display:'flex',
        alignItems:'center',
    },
    form:{
        width:'100%',
        flexDirection:'row'
    },
    input:{
        flex:1,
        paddingLeft:10,
        fontWeight:'bold',
        fontSize:20,
        display:'flex',
        textAlignVertical:'center',
    },
    inputWrapper:{
        backgroundColor:'rgba(0,0,0,0.1)',
        marginTop:30,
        display:'flex',
        alignItems:'center',
        padding:5,
        flexDirection:'row',
        borderRadius:10,
        marginHorizontal:30,
        borderStyle:'solid',
        borderWidth:1
    },
    text:{
        marginTop:50,
        textAlign:'center',
        fontSize:35,
        fontWeight:'bold',
        width:'100%'
    },
    modalView: {
        flex:1,
        backgroundColor: 'white',
    },
});
export default AutoInfo;