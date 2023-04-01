import React, {useState} from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Pressable, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {useSelector} from "react-redux";

const OrderInfo = ({navigation}) => {
     const [dateVisible,setDateVisible]=useState(false);
     const [dateValue,setDateValue]=useState('')

    const [timeVisible,setTimeVisible]=useState(false);
    const [timeValue,setTimeValue]=useState('')

    const [seats,setSeats]=useState(1)

    const [cash,setCash]=useState('')

    const {carList}=useSelector(state=>state.user)
    console.log(carList[0])
    const hideDatePicker = () => {
        setDateVisible(false);
    };
    const hideTimePicker = () => {
        setTimeVisible(false);
    };

    const handleConfirm = (date) => {

        setDateValue(date)
        hideDatePicker();
    };
    const handleConfirmTime = (time) => {

        const timeValue=time.toString().split(' ')[4].substring(0,5)
        let [hours,min]=timeValue.split(':')
        let vector='AM'
        if(hours>=12){
            vector='PM'
            hours=hours-12
        }
        const result=hours+':'+min+' '+vector

        setTimeValue(result)
        hideTimePicker();
    };
    return (
        <ScrollView >
            <Text style={{fontSize:30,textAlign:'center',marginTop:40}}>Date</Text>
            <Pressable onPress={()=>setDateVisible(true)} style={[styles.inputWrapper,,{borderColor:'rgba(0,0,0,0)'}]}>
                <Icon name={'calendar-outline'} size={35} />
                <View  >
                    <Text style={[styles.input,styles.padding20]}>{dateValue?dateValue.toDateString():'ENTER'}</Text>
                </View>

            </Pressable>
            <Text style={{fontSize:30,textAlign:'center',marginTop:40}}>Time</Text>
            <Pressable onPress={()=>setTimeVisible(true)} style={[styles.inputWrapper,,{borderColor:'rgba(0,0,0,0)'}]}>
                <Icon name={'time-outline'} size={35} />
                <View>
                    <Text style={[styles.input,styles.padding20]}>{timeValue?timeValue:'ENTER'}</Text>
                </View>

            </Pressable>
            <Text style={{fontSize:30,textAlign:'center',marginTop:40}}>Price</Text>
            <Pressable  style={[styles.inputWrapper,,{borderColor:'rgba(0,0,0,0)'}]}>
                <Icon name={'cash-outline'} size={35} />
                <View style={{flex:1}}>
                    <TextInput value={cash} onChangeText={setCash} Input={setCash}   keyboardType={'numeric'} style={{fontSize:20,paddingLeft:10}}></TextInput>
                </View>

            </Pressable>
            <Text style={{fontSize:30,textAlign:'center',marginTop:40}}>Car</Text>
            <Pressable  style={[styles.inputWrapper,,{borderColor:'rgba(0,0,0,0)'}]}>
                <Icon name={'car-outline'} size={35} />
                <View>
                    <Text style={[styles.input,styles.padding20]}>{carList[0].manufacturer+' '+carList[0].model}</Text>
                </View>

            </Pressable>
            <Text style={{fontSize:30,textAlign:'center',marginTop:40}}>Number of seats</Text>
            <View  style={[styles.inputWrapper,,{borderColor:'rgba(0,0,0,0)'}]}>
                <Icon name={'person-outline'} size={35} />
                <View style={{justifyContent:'space-between',flexDirection:'row',flex:1}}>
                    <Text style={[styles.input,styles.padding20]}>{seats}</Text>
                    <View style={{flexDirection:'row'}}>
                        <Pressable onPress={()=>setSeats(s=>s===1?s:s-=1)} style={{width:40,backgroundColor:seats===1?'rgba(0,0,0,0.1)':'rgba(0,0,0,0.3)',borderRadius:5,marginRight:10}}>
                            <Text style={{fontSize:25,textAlign:'center',fontWeight:'bold'}}>-</Text>
                        </Pressable>
                        <Pressable onPress={()=>setSeats(s=>s>=10?s:s+=1)} style={{width:40,backgroundColor:seats>=10?'rgba(0,0,0,0.1)':'rgba(0,0,0,0.3)',borderRadius:5,marginRight:10}}>
                            <Text style={{fontSize:25,textAlign:'center',fontWeight:'bold'}}>+</Text>
                        </Pressable>
                    </View>
                </View>


            </View>

            <Pressable style={styles.point} onPress={()=>navigation.navigate('CreateRoadOptions',{date:dateValue.toDateString()+' '+timeValue,price:cash,car:carList[0].manufacturer+' '+carList[0].model,number_of_seats:seats,carId:carList[0].id})}>
                <Text style={styles.pointText}>Add info</Text>
            </Pressable>


            <DateTimePickerModal
                isVisible={dateVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            >
            </DateTimePickerModal>
            <DateTimePickerModal
                isVisible={timeVisible}
                mode="time"
                is24Hour={false}
                onConfirm={handleConfirmTime}
                onCancel={hideTimePicker}
            >
            </DateTimePickerModal>
            <Text></Text>
        </ScrollView>
    );
};

const styles=StyleSheet.create({
    pointText:{
        color:'white',
        fontWeight:'bold',
        fontSize:30,
        textAlign:'center'
    },
    point:{
        padding:10,
        marginTop:40,
        width:'80%',
        backgroundColor:'blue',
        borderRadius:20,
        alignSelf:'center'
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
        marginTop:5,
        display:'flex',
        alignItems:'center',
        padding:5,
        flexDirection:'row',
        borderRadius:10,
        marginHorizontal:30,
        borderStyle:'solid',
        borderWidth:1
    },
})
export default OrderInfo;

