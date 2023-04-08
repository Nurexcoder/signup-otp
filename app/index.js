import { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import axios from "axios";
import { Stack, useRouter } from "expo-router";
import HeaderSignUp from "../components/common/HeaderSignUp";
import { COLORS, SIZES } from "../constants/index";
import { useSearchParams } from "expo-router"
const style = {
  headerStyle: {
    height: "30%",
    width: "100%",
    backgroundColor: COLORS.gray2,
    alignItems: "center",
    justifyContent: "center",
    // marginTop:30
  },
  headerText: {
    fontSize: 45,
    color: "blue",
    fontWeight: "bold",
  },
  inputContainerCode: {
    margin: 0,
    width: "30%",
    marginLeft: 0,
  },
  inputContainerNo: {
    margin: 0,
    width: "60%",
    // marginLeft:10
  },
  searchInputCountryCode: {
    width: "100%",
    paddingHorizontal: SIZES.medium,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
  },
  searchInputNo: {
    width: "100%",
    paddingHorizontal: SIZES.medium,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
  },
  searchWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: 60,
    width: "100%",
    padding: SIZES.medium,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  titleStyle: {
    margin: SIZES.medium,
    height: "20%",
    // borderWidth:10
  },
  titleStyleText: {
    fontSize: SIZES.large * 1.7,
    color: COLORS.tertiary,
    fontWeight: "bold",
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  button: {
    backgroundColor: "blue",
    width: "80%",
    paddingBottom: 10,
    paddingTop: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
  },
  messageContainer: {
    marginTop: 10,
    // flex:1,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    flexDirection: "row",
    // fontSize:10
  },
  messageText: {
    fontSize: SIZES.medium,
    alignItems: "center",
    justifyContent: "center",
    // height:60,
  },
  messageHighlight: {
    color: "blue",
    fontWeight: "bold",
    marginRight: 5,
  },
  circle: {
    marginLeft: 5,
    marginRight: 5,
    height: 25,
    width: 25,
    borderWidth: 1,
    borderRadius: 12.5,
    alignItems: "center",
    justifyContent: "center",
  },
  circleText: {
    alignItems: "center",
    justifyContent: "center",
  },
};
const SignUp = () => {
  const [phoneNo, setphoneNo] = useState("");
  const [countryCode, setcountryCode] = useState("");
  const router = useRouter();
  const { phoneNoParams } = useSearchParams();
  console.log(phoneNoParams)
  const handleSubmit = () => {
    // const axios = require("axios");
    let data = JSON.stringify({
      number: phoneNo,
      countryCode: countryCode,
    });
    // console.log(data)
    // return
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://e09c37a5-14eb-45dc-80c4-10bba73dd7b4.mock.pstmn.io/api/v1/getOtp/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        router.push('/verifyOtp')
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <SafeAreaView
      style={{
        // flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#D3D3D3",
            height: "40%",
            
          },
          headerShadowVisible: false,
          header: () => <HeaderSignUp />,

          headerTitle: "",
        }}
      />
      <View style={style.headerStyle}>
        <Text style={style.headerText}>Super Heros</Text>
      </View>
      {/* <View> */}
      <View style={style.titleStyle}>
        <Text style={style.titleStyleText}>Login to Continue</Text>
      </View>
      <View style={style.searchWrapper}>
        <View style={style.inputContainerCode}>
          <Text style={{ fontSize: SIZES.small, color: COLORS.gray }}>
            Country Code
          </Text>
          <TextInput
            value={countryCode}
            onChangeText={(e) => setcountryCode(e.includes("+") ? e : "+" + e)}
            style={style.searchInputCountryCode}
            keyboardType="numeric"
          />
        </View>
        <View style={style.inputContainerNo}>
          <Text style={{ fontSize: SIZES.small, color: COLORS.gray }}>
            Phone no
          </Text>
          <TextInput
            value={phoneNo}
            onChangeText={(e) => setphoneNo(e)}
            style={style.searchInputNo}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={style.actionContainer}>
        <TouchableOpacity onPress={handleSubmit} style={style.button}>
          <Text style={style.buttonText}>GET OTP</Text>
        </TouchableOpacity>
        <View style={style.messageContainer}>
          {/* <Text style={style.messageText}> */}
          <Text style={style.messageHighlight}>Resend Otp </Text>
          <Text>in</Text>
          <View style={style.circle}>
            <Text style={style.circleText}>30</Text>
          </View>

          <Text>seconds</Text>
        </View>
      </View>
      {/* </View> */}
    </SafeAreaView>
  );
};

export default SignUp;
