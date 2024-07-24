import { DocumentPickerAsset } from "expo-document-picker";
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import {
  Avatar,
  Bubble,
  IMessage,
  MessageProps as GiftedMessageProps,
} from "react-native-gifted-chat";
import Reactions from "./Reactions";
import { Attachments } from "./Attachments";

interface MessageProps extends GiftedMessageProps<IMessage> {
  userType: "human" | "ai";
  attachments?: DocumentPickerAsset[]
}

export const Message: React.FC<MessageProps> = (props) => {
  const renderAvatar = () => {
    const { ...avatarProps } = props;
    return <Avatar {...avatarProps} imageStyle={{ left: [styles.avatar] }} />;
  };

  const renderBubble = () => {
    const { ...bubbleProps } = props;
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

  const renderReactions = () => {
    const { ...reactionsPros } = props;
    return <Reactions {...reactionsPros} />;
  };

  const renderAttachments = () => {
    const { attachments } = props
    if (!attachments?.length) return null
    return <Attachments attachments={attachments} />
  }

  return (
    <View style={styles.container}>
      <View style={[styles.avatarAndBubbleContainer]}>
        {renderAvatar()}
        {renderBubble()}
      </View>
      {renderAttachments()}
      {renderReactions()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  avatarAndBubbleContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },
  avatar: {
    height: 30,
    width: 30,
  },
});

export default Message;
