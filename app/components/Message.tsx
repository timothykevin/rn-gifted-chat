import React from "react";
import { View } from "react-native";
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
    return <Avatar {...avatarProps} />;
  };

  const renderBubble = () => {
    const { containerStyle, onMessageLayout, ...bubbleProps } = props;
    return <Bubble {...bubbleProps} />;
  };

  return (
    <View>
      {renderAvatar()}
      {renderBubble()}
    </View>
  );
};

export default Message;
