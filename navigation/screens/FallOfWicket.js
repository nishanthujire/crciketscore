import { setStatusBarHidden } from 'expo-status-bar';
import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
// import AntDesign from 'react-native-vector-iconsAntDesign';

const data = [
    { label: 'Bowled', value: 'bowled' },
    { label: 'Catch out', value: 'catch out' },
    { label: 'Run out striker', value: 'run out striker' },
    { label: 'Run out non-striker', value: 'run out non-striker' },
    { label: 'Stumping', value: 'stumping' },
    { label: 'LBW', value: 'lbw' },
    { label: 'Hit wicket', value: 'hit wicket' },

];

export default FallOfWicket = ({ navigation }) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const [shouldShow, setshouldShow] = useState(false);
    const [newbatsman, setNewbatsman] = useState('');
    const [outt, setOutt] = useState('striker');
    const [outtype, setouttype] = useState('');
    const [support, setSupport] = useState('');

    var val;
    var out = "striker";
    const hide = () => {
        //console.log('inside hide');

        if (val == "catch out" || val == "run out striker" || val == "run out non-striker" || val == "stumping") {
            setshouldShow(true);

            if (val == "run out non-striker") {
                out = "nonstriker";
                setOutt(out);


            }
        }
        //hiding new batsman page
        else if (val == "bowled" || val == "lbw" || val == "hit wicket" || val == "stumping") {
            setshouldShow(false);
        }


    }

    useEffect(() => {
        setSupport
    }, [support])


    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>
                How wicket fall?
            </Text>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}

                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.value);
                    val = item.value;
                    setouttype(val);
                    hide();
                    console.log('val :', val);
                    setIsFocus(false);
                }}
            // renderLeftIcon={() => (
            //   // <AntDesign
            //   //   style={styles.icon}
            //   //   color={isFocus ? 'blue' : 'black'}
            //   //   name="Safety"
            //   //   size={20}
            //   // />
            // )}
            />
            <View>
                {
                    shouldShow ? (
                        <View>
                            <Text style={styles.sectitleText}>
                                Who helped?

                            </Text>
                            <TextInput
                                onChangeText={(value) => setSupport(value)}
                                style={styles.input}
                                placeholder=""
                                keyboardType="text"
                            />
                        </View>
                    ) : null
                }
            </View>
            <Text style={styles.sectitleText}>
                New batsman
            </Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="text"
                onChangeText={(value) => setNewbatsman(value)}
            />
            <TouchableOpacity style={styles.button} onPress={() => {
                if (support) {
                    console.log("inside support");
                    // Passing data into previous screen
                    //sending support player
                    var s =support;
                    console.log("p is ",s)
                    
                    navigation.navigate({
                        name: 'FirstInningsScreen',
                        params: { newbatsman: newbatsman, out: outt, outtype: outtype,support:s },
                        merge: true,
                       
                    });
                    

                }
                else {
                    //sending suppor null vaue
                    var k ='';
                    // Passing data into previous screen
                    navigation.navigate({
                        
                        name: 'FirstInningsScreen',
                        params: { newbatsman: newbatsman, out: outt, outtype: outtype,support:k },
                        merge: true,
                    });

                }




            }}>
                <Text style={styles.buttonText} >Done</Text>
            </TouchableOpacity>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    input: {
        height: 40,
        borderWidth: 1, padding: 10,
        marginBottom: 20,
        borderRadius: 10,
        borderColor: 'green',
    },
    button: {
        backgroundColor: "green",
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',

    },
    buttonText: {
        color: "white",
        fontSize: 20,
        alignItems: 'center'
    },
    titleText: {
        fontSize: 15,
        fontWeight: "bold",
        color: 'green',
        marginBottom: 20

    },
    sectitleText: {
        fontSize: 15,
        fontWeight: "bold",
        color: 'green',
        marginBottom: 20
    },
    dropdown: {
        marginBottom: 20,
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});