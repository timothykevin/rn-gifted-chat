import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { DocumentPickerAsset } from "expo-document-picker";
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
  attachments?: DocumentPickerAsset[];
}

export const Message: React.FC<MessageProps> = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleScroll = (event) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    if (yOffset < -40) {
      setModalVisible(false);
    }
  };

  const renderAvatar = () => {
    const { ...avatarProps } = props;
    return <Avatar {...avatarProps} imageStyle={{ left: [styles.avatar] }} />;
  };

  const renderBubble = () => {
    const { ...bubbleProps } = props;
    return (
      <Bubble
        {...bubbleProps}
        onLongPress={() => setModalVisible(true)}
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
    const { attachments } = props;
    if (!attachments?.length) return null;
    return <Attachments attachments={attachments} />;
  };

  return (
    <View style={styles.container}>
      <View style={[styles.avatarAndBubbleContainer]}>
        {renderAvatar()}
        {renderBubble()}
      </View>
      {renderAttachments()}
      {renderReactions()}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centered_view}>
          <ScrollView
            contentContainerStyle={styles.modal_view}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            <Image
              source={require("../../assets/Rectangle 8.png")}
              style={styles.dropdown_icon}
              resizeMode="contain"
            />
            <TouchableOpacity style={styles.on_long_press_options}>
              <Image
                source={require("../../assets/copy.png")}
                style={styles.icon_on_long_press_option}
                resizeMode="contain"
              />
              <Text style={styles.on_long_press_options_text}>Copy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.on_long_press_options}>
              <Image
                source={require("../../assets/reload.png")}
                style={styles.icon_on_long_press_option}
                resizeMode="contain"
              />
              <Text style={styles.on_long_press_options_text}>Regenerate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.on_long_press_options}>
              <Image
                source={require("../../assets/not_good.png")}
                style={styles.icon_on_long_press_option}
                resizeMode="contain"
              />
              <Text style={styles.on_long_press_options_text}>
                Bad Response
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.on_long_press_options}>
              <Image
                source={require("../../assets/good.png")}
                style={styles.icon_on_long_press_option}
                resizeMode="contain"
              />
              <Text style={styles.on_long_press_options_text}>
                Good Response
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
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
  on_long_press_options: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingTop: 8,
    paddingBottom: 8,
  },
  on_long_press_options_text: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    fontWeight: "400",
    lineHeight: 20,
    color: "black",
  },
  dropdown_icon: {
    alignSelf: "center",
  },
  centered_view: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)", // semi-transparent dark background
  },
  modal_view: {
    backgroundColor: "white",
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    height: "100%",
    top: "70%",
    borderRadius: 30,
  },
  icon_on_long_press_option: {
    width: 28,
    height: 28,
  },
});

export default Message;
