import React from "react";
import { View, StyleSheet, Image } from "react-native";
import {
  Avatar,
  Bubble,
  IMessage,
  MessageProps as GiftedMessageProps,
} from "react-native-gifted-chat";

interface MessageProps extends GiftedMessageProps<IMessage> {
  userType: "human" | "ai";
}

export const Message: React.FC<MessageProps> = (props) => {
  const renderAvatar = () => {
    const { containerStyle, onMessageLayout, ...avatarProps } = props;
    return <Avatar {...avatarProps} imageStyle={{ left: [styles.avatar] }} />;
  };

  const renderBubble = () => {
    const { containerStyle, onMessageLayout, ...bubbleProps } = props;
    return (
      <Bubble
        {...bubbleProps}
        wrapperStyle={{
          left: {
            width: "100%",
            backgroundColor: "transparent",
          },
        }}
      />
    );
  };

  return (
    <View>
      <View style={[styles.avatarAndBubbleContainer]}>
        {renderAvatar()}
        {renderBubble()}
      </View>
      <View style={styles.reactionsView}>
        <Image
          source={require("../../assets/copy.png")}
          style={styles.image_reaction}
          resizeMode="contain"
        />
        <Image
          source={require("../../assets/reload.png")}
          style={styles.image_reaction}
          resizeMode="contain"
        />
        <Image
          source={require("../../assets/not_good.png")}
          style={styles.image_reaction}
          resizeMode="contain"
        />
        <Image
          source={require("../../assets/good.png")}
          style={styles.image_reaction}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    marginLeft: 8,
    marginRight: 0,
    marginBottom: 10,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  avatarAndBubbleContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    marginLeft: 8,
    marginRight: 0,
    marginBottom: 10,
  },
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
  avatar: {
    // The bottom should roughly line up with the first line of message text.
    height: 30,
    width: 30,
  },
});

export default Message;
