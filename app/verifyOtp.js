import { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
// import axios from "axios";
import { Link, Stack, useRouter, useSearchParams } from "expo-router";
import HeaderSignUp from "../components/common/HeaderSignUp";
import { COLORS, SIZES } from "../constants/index";
import axios from "axios";
// import OtpInputs from "react-native-otp-inputs";

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
    width: "100%",
    justifyContent:"center"
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
    height: 20,
    width: "100%",
    padding: SIZES.medium,
    flexDirection: "column",
    // justifyContent: "space-between",
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
  otpContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    width:"60%"
  },
  otpInput:{
    width:50,
    height:40,
    borderWidth:1,
    alignItems:"center",
    textAlign:"center",
  }
};

const VerifyOtp = () => {
  const router = useRouter();
  const otpStr = "1234";
  const otpArray = otpStr.split("");
  const [otp, setOtp] = useState([]);
  console.log(otp);
  const handleOtpChange = (text, i) => {
    console.log(i);
    // setOtp([])
    // retu
    let tempOtp = [...otp];
    if (!otp.length) {
      otpArray.map((ele) => tempOtp.push("0"));
    }
    tempOtp[i] = text;
    setOtp(tempOtp)
    
  };
  const handleSubmit = () => {
    let data = JSON.stringify({
      number: "8365733892",
      countryCode: "+91",
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
        router.push("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const { phoneNo } = useSearchParams();
  console.log(phoneNo)
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
        <Text style={style.titleStyleText}>Verify Otp</Text>
      </View>
      <View style={style.searchWrapper}>
          <Text style={{ fontSize: SIZES.medium, color: COLORS.gray,marginBottom:SIZES.medium }}>
            Enter Otp
          </Text>
          <View style={style.otpContainer}>
            {otpArray.map((ele, i) => (
              <TextInput
                style={style.otpInput}
                defaultValue="0"
                keyboardType="numeric"
                key={i}
                onChangeText={(text) => handleOtpChange(text, i)}
              />
            ))}
        </View>
      </View>
      <View style={style.actionContainer}>
        <TouchableOpacity onPress={handleSubmit} style={style.button}>
          <Text style={style.buttonText}>VERIFY</Text>
        </TouchableOpacity>
        <View style={style.messageContainer}>
          {/* <Text style={style.messageText}> */}
          <Link href="/?phoneNoParams=9365722389">

          <Text style={style.messageHighlight} >Change Number </Text>
          </Link>
        </View>
      </View>
      {/* </View> */}
    </SafeAreaView>
  );
};

export default VerifyOtp;
