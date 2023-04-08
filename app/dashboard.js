import { Stack } from "expo-router";
import styled from "styled-components/native";
import HeaderSignUp from "../components/common/HeaderSignUp";
import { IMAGE, SIZES } from "../constants";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  TouchableOpacity,
  VirtualizedList,
} from "react-native";
import axios from "axios";

const Component = styled.SafeAreaView`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
`;
const HeaderContainer = styled.View`
  width: 100%;
  height: 10%;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 10px;
  flex-direction: row;
`;
const LeftHeader = styled.View`
  width: 40%;
  /* border: 1px; */
`;
const RightHeader = styled.View``;
const HomeIcon = styled.Image`
  width: 30px;
  height: 30px;
`;

const SearchButton = styled.TouchableOpacity``;
const SearchButtonImage = styled.Image`
  width: 30px;
  height: 30px;
`;
const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: blue;
  margin-left: 20px;
`;
const TitleContainer = styled.View`
  width: 100%;
  height: 10%;
  justify-content: flex-end;
  margin: 20px 0;
`;
const BodyContainer = styled.SafeAreaView`
  width: 100%;
  height: 80%;
  justify-content: space-between;
`;
const Box = styled.View`
  width: 100%;
  height: auto;
  border: 1px;
`;
const BoxImage = styled.Image`
  width: 100%;
  height: 300px;
  /* height: auto; */
  /* height: 80%; */
`;
const BoxText = styled.Text`
  font-size: 18px;
  text-align: center;
`;
const dashboard = () => {
  const [query, setQuery] = useState("Batman");
  const [data, setData] = useState([]);
  const getSuperHeroData = async () => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `https://superheroapi.com/api/1439196470152607/search/${query}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        setData(response.data.results);
        // console.log(response.data.results[0].image.url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getSuperHeroData();
  }, []);
  console.log(data);

  return (
    <Component>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#D3D3D3",
            height: "40%",
          },
          headerShadowVisible: true,
          header: () => <HeaderSignUp />,

          headerTitle: "",
        }}
      />
      <HeaderContainer style={{}}>
        <LeftHeader>
          <HomeIcon source={IMAGE.HomeIcon} />
        </LeftHeader>
        <RightHeader>
          <SearchButton>
            <SearchButtonImage source={IMAGE.SearchIcon} />
          </SearchButton>
        </RightHeader>
      </HeaderContainer>
      <TitleContainer>
        <Title>Super Hero Team</Title>
      </TitleContainer>
      <BodyContainer
        vertical
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          //   justifyContent: "space-between",
          width: "100%",
        }}
      >
        <FlatList
          data={data}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                width: 150,
                height: 200,
              }}
              onPress={() => console.log(item.image.url)}
            >
              <Box>
                <Image
                  style={{
                    height: "80%",
                    width: "100%",
                  }}
                  source={{url:item.image.url}}
                />
                <BoxText >{item.name}</BoxText>
              </Box>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            columnGap: SIZES.large,
            justifyContent: "center",
            padding:20
          }}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          //   horizontal
        />
      </BodyContainer>
    </Component>
  );
};

export default dashboard;
