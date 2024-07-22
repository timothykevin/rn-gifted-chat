import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  IMessage,
  MessageProps as GiftedMessageProps,
} from "react-native-gifted-chat";

interface ReactionsProps extends GiftedMessageProps<IMessage> {}

export const Reactions: React.FC<ReactionsProps> = (props) => {
  const onPress = () => {
    alert("clicked"); // dummy function
  };

  const renderReactions = () => {
    const showReactions = props.currentMessage.user._id !== 1;
    const botReactionsButton = (
      <View style={styles.reactionsView}>
        <TouchableOpacity onPress={onPress}>
          <Image
            source={require("../../assets/copy.png")}
            style={styles.image_reaction}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress}>
          <Image
            source={require("../../assets/reload.png")}
            style={styles.image_reaction}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress}>
          <Image
            source={require("../../assets/not_good.png")}
            style={styles.image_reaction}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress}>
          <Image
            source={require("../../assets/good.png")}
            style={styles.image_reaction}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
    const humanReactionsButton = (
      <View style={styles.reactionsView}>
        <TouchableOpacity onPress={onPress}>
          <Image
            source={require("../../assets/create.png")}
            style={styles.image_reaction}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
    return showReactions ? botReactionsButton : humanReactionsButton;
  };

  return <View>{renderReactions()}</View>;
};

const styles = StyleSheet.create({
  reactionsView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 10,
    paddingLeft: 50,
    paddingBottom: 10,
    marginRight: 20,
  },
  image_reaction: {
    width: 30, // specify your desired width
    height: 30, // specify your desired height
    marginHorizontal: 2,
  },
});

export default Reactions;
