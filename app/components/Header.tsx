import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";

export const Header = () => {
  const renderHeader = () => {
    const view = (
      <View style={styles.container}>
        <TouchableOpacity style={styles.setting_view}>
          <Image
            source={require("../../assets/list.png")}
            style={styles.setting_icon}
            resizeMode="contain"
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity style={styles.setting_view}>
          <Text style={styles.setting_text}>Chat Setting</Text>
          <Image
            source={require("../../assets/customize.png")}
            style={styles.setting_icon}
            resizeMode="contain"
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity style={styles.add_button}>
          <Image
            source={require("../../assets/plus_icon.png")}
            style={styles.setting_icon_plus}
            resizeMode="contain"
          ></Image>
        </TouchableOpacity>
      </View>
    );
    return view;
  };

  return <View>{renderHeader()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: 375,
    height: 40,
    justifyContent: "space-between",
  },
  setting_view: {
    flexDirection: "row",
    height: 40,
    padding: 8,
    margin: 8,
    alignContent: "center",
  },
  setting_text: {
    fontFamily: "Inter_600Bold",
    fontSize: 16,
    fontWeight: "bold",
  },
  setting_icon: {
    width: 24, // specify your desired width
    height: 24, // specify your desired height
    marginHorizontal: 2,
  },
  setting_icon_plus: {
    width: 16, // specify your desired width
    height: 16, // specify your desired height
  },
  add_button: {
    width: 50, // specify your desired width
    height: 36, // specify your desired height
    margin: 2,
    borderRadius: 100,
    paddingTop: 10,
    paddingRight: 17,
    paddingBottom: 10,
    paddingLeft: 17,
    borderWidth: 1,
  },
});

export default Header;
