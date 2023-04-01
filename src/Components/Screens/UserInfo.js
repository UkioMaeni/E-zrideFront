import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
    Animated,
    BackHandler,
    Keyboard,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    useWindowDimensions,
    View
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker"
import Icon from "react-native-vector-icons/Ionicons";
import {Calendar} from "react-native-calendars";
import {CalendarUtils} from "react-native-calendars/src/index";
import {getMoment} from "react-native-calendars/src/momentResolver";
import {UserService} from "../../http/service/userService";
import {lightDate} from "../../helpers/dateHelper";
import {re} from "@babel/core/lib/vendor/import-meta-resolve";

const UserInfo = ({navigation}) => {
    const [input1,setInput1]=useState('')
    const [input1Err,setInput1Err]=useState({
        error:false,
        text:''
    })
    const [input2,setInput2]=useState('')
    const [input2Err,setInput2Err]=useState({
        error:false,
        text:''
    })
    const [input3,setInput3]=useState('')
    const [input3Err,setInput3Err]=useState({
        error:false,
        text:''
    })

    const handleInput1=(e)=>{
        if(input1Err) setInput1Err({
            error: false,
            text: ''
        })
        setInput1(e)
    }
    const handleInput2=(e)=>{
        if(input2Err) setInput2Err({
            error: false,
            text: ''
        })
        setInput2(e)
    }
    const handleInput3=(e)=>{
        if(input3Err) setInput3Err({
            error: false,
            text: ''
        })
        setInput3(e)
    }

    const {height, width} = useWindowDimensions();

    const validationParams={
        name:{
            min:2,
            max:10
        },
        surname:{
            min:2,
            max:15
        },
        age:{
            min:18,
        }
    }
    const validationLength=(params)=>{
        switch (params){
            case 'name':
                if(input1.length>=validationParams.name.min&&input1.length<=validationParams.name.max) return true
                else{
                    setInput1Err({
                        error: true,
                        text: 'The name is 2-10 characters long'
                    })
                    return false
                }
                break
            case 'surname':
                if(input2.length>=validationParams.surname.min&&input2.length<=validationParams.surname.max) return true
                else{
                    setInput2Err({
                        error: true,
                        text: 'The surname is 2-15 characters long'
                    })
                    return false
                }
                break
            case 'age':
                if(parseInt(input3)>=validationParams.age.min) return true
                else{
                    setInput3Err({
                        error: true,
                        text: 'Age must be over 18 years old'
                    })
                    return false
                }
                break
            default : return false
        }
    }

    const regExpStr=/^[a-zA-Z]+$/
    const regExpDate=/^([0-9]{2}.[0-9]{2}.[0-9]{4})+$/
    const validationChar=(param)=>{
        switch (param){
            case 'name':
                if(regExpStr.test(input1)) return true
                else{
                    setInput1Err({
                        error: true,
                        text: 'The name can only consist of characters A - Z'
                    })
                    return false
                }
                break
            case 'surname':
                if(regExpStr.test(input2)) return true
                else{
                    setInput2Err({
                        error: true,
                        text: 'The surname can only consist of characters A - Z'
                    })
                    return false
                }
                break
            case 'age':
                if(!regExpDate.test(input3)){
                    const [mm,dd,yyyy]=input3
                    const date=new Date()
                }
                    setInput3Err({
                        error: true,
                        text: 'Age consists only of numbers 0 - 9'
                    })
                    return false

                break
            default : return false
        }
    }
    const translateIn=(value)=>{
        Animated.timing(translate,{
            toValue:value,
            duration:300,
            useNativeDriver:false
        }).start(()=>translate.setValue(value))
    }


    const translate =useRef(new Animated.Value(0)).current



    function handleTranslate(param) {
        if(validationLength(param)&&validationChar(param)){
            if(Number.parseInt(JSON.stringify(translate))!==3)
                translateIn(-width+Number.parseFloat(JSON.stringify(translate)))
        }

    }
    useEffect(()=>{
        BackHandler.addEventListener('hardwareBackPress',function (e){
            console.log(translate)
            if(Number.parseInt(JSON.stringify(translate))!==0)
                translateIn(width+Number.parseFloat(JSON.stringify(translate)))
        })
        navigation.navigate('UserInfo')
        navigation.addListener('beforeRemove',function (e){
            e.preventDefault()
            navigation.navigate('UserInfo')
        })
    return BackHandler.removeEventListener('hardwareBackPress')
    },[navigation])
    useEffect(()=>{

    })
        const [dayValue,setDayValue]=useState('')

        const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

        const showDatePicker = () => {
            setDatePickerVisibility(true);
        };

        const hideDatePicker = () => {
            setDatePickerVisibility(false);
        };

        const handleConfirm = (date) => {
            setDayValue(date)
            hideDatePicker();
        };

        const date= new Date()
        date.setFullYear(date.getFullYear()-18)

    function handleUserData() {
        UserService.setDataUser(input1,input2,lightDate(dayValue)).then(()=>{
            UserService.dataUser().then((data)=>{
                navigation.navigate('Menu',data)
            })
        })
    }

    return (
        <View style={styles.modalView}>
            <Pressable style={styles.cancel}>
                <Icon name={'close-outline'} size={40} color={'blue'} solid/>
            </Pressable>
            <Animated.View style={[styles.form,{transform:[{translateX:translate}]}]}>
                <View style={[styles.formEl,]}>
                    <Text style={styles.text}>Name</Text>
                    <View style={[styles.inputWrapper,{borderColor:input1Err.error?'red':'rgba(0,0,0,0)'}]}>
                        <Icon name={'person-outline'} size={35} />
                        <TextInput style={[styles.input,]} value={input1} onChangeText={handleInput1}  returnKeyType="next" onSubmitEditing={()=>handleTranslate('name')} placeholder={'Input name...'}/>
                    </View>
                    {input1Err.error&&<Text style={styles.textErr}>*{input1Err.text}</Text>}
                </View>
                <View style={styles.formEl}>
                    <Text style={styles.text}>Surname</Text>
                    <View style={[styles.inputWrapper,{borderColor:input2Err.error?'red':'rgba(0,0,0,0)'}]}>
                        <Icon name={'person-outline'} size={35} />
                        <TextInput style={styles.input} value={input2} onChangeText={handleInput2}  returnKeyType="next" onSubmitEditing={()=>handleTranslate('surname')} placeholder={'Input name...'}/>
                    </View>
                    {input2Err.error&&<Text style={styles.textErr}>*{input2Err.text}</Text>}
                </View>
                <View style={styles.formEl}>
                    <Text style={styles.text}>Birthday</Text>
                    <View style={[styles.inputWrapper,,{borderColor:input2Err.error?'red':'rgba(0,0,0,0)'}]}>
                        <Icon name={'calendar-outline'} size={35} />
                        <Pressable  onPressIn={()=>setDatePickerVisibility(true)}>
                            <Text style={[styles.input,styles.padding20]}>ENTER</Text>
                        </Pressable>

                    </View>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                        maximumDate={date}
                    />
                        <Text style={styles.textDate}>{dayValue?dayValue.toDateString():''}</Text>
                    {dayValue?<Pressable onPressIn={handleUserData} style={styles.btn1}><Text style={{fontSize:16,color:'white',fontWeight:'bold'}} >CONTINUE</Text></Pressable>:null}
                </View>
            </Animated.View>

        </View>
    );
};
const styles = StyleSheet.create({
    btn1:{
        marginTop:20,
        width:'80%',
        display:'flex',
        alignItems:'center',
        padding:10,
        backgroundColor:'#00bbff',
        borderRadius:20,
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
        justifyContent:'center',
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
        width:'50%'
    },
    modalView: {
        flex:1,
        backgroundColor: 'white',
    },
});
export default UserInfo;