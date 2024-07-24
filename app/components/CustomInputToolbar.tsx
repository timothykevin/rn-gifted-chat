import React from "react";
import { View, StyleSheet, Image } from "react-native";
import {
  IMessage,
  InputToolbarProps,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";

interface CustomInputToolbarProps extends InputToolbarProps<IMessage> {
  text: "";
}
const renderSend = (props) => {
  return (
    <Send {...props} containerStyle={{ justifyContent: "center" }}>
      <View style={{ marginTop: 4, marginRight: 9 }}>
        <Image
          source={require("../../assets/button.png")}
          style={styles.image}
        />
      </View>
    </Send>
  );
};

const renderMicrophone = (props) => {
  return (
    <Send {...props} containerStyle={{ justifyContent: "center" }}>
      <View style={{ marginTop: 4, marginRight: 9 }}>
        <Image
          source={require("../../assets/microphone.png")}
          style={styles.image}
        />
      </View>
    </Send>
  );
};

export const CustomInputToolbar: React.FC<CustomInputToolbarProps> = (
  props
) => {
  const renderCustomInputToolbar = () => {
    return (
      <InputToolbar
        renderActions={props.renderActions}
        renderSend={props.text == "" ? renderMicrophone : renderSend}
        primaryStyle={props.primaryStyle}
      />
    );
  };
  return <View>{renderCustomInputToolbar()}</View>;
};

const styles = StyleSheet.create({
  image: {
    width: 32,
    height: 32,
  },
});

export default CustomInputToolbar;
