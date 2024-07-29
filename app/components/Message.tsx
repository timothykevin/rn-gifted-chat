import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Platform,
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
  const [choosenModal, setChoosenModal] = useState("");
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);
  const handleOptionClick = (option: string) => {
    setSelectedFeedback(selectedFeedback === option ? null : option);
  };

  const setToBadResponseModal = () => {
    setChoosenModal("BadResponse");
  };

  const changeToMoreBadResponseModal = () => {
    setChoosenModal("MoreBadResponse");
  };

  const handleTouchOutsideModal = () => {
    setModalVisible(false);
    setChoosenModal(null);
  };

  const handleScroll = (event) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    if (yOffset < -40) {
      setModalVisible(false);
      setChoosenModal(null);
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
        onLongPress={() =>
          Platform.OS !== "web" && props.currentMessage.user._id !== 1
            ? setModalVisible(true)
            : null
        }
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

  const renderBadResponseModal = () => {
    return (
      <View>
        <TouchableOpacity style={{ paddingTop: 20, paddingBottom: 10 }}>
          <Image
            source={require("../../assets/Rectangle 8.png")}
            style={styles.dropdown_icon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.modal_dislike_header}>
          <Image
            source={require("../../assets/not_good.png")}
            style={styles.icon_on_long_press_option}
            resizeMode="contain"
          />
          <Text style={styles.modal_dislike_header_text}>Bad response</Text>
        </View>
        <View style={styles.modal_dislike_more_response}>
          {[
            "Don't like the style",
            "Not factually correct",
            "Hallucinated answer",
            "Didn't fully follow instructions",
          ].map((text, index) => (
            <TouchableOpacity
              key={index}
              style={
                selectedFeedback === text
                  ? styles.feedback_choosen
                  : styles.feedback
              }
              onPress={() => handleOptionClick(text)}
            >
              <Text
                style={selectedFeedback === text ? styles.text_choosen : {}}
              >
                {text}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.feedback}
            onPress={changeToMoreBadResponseModal}
          >
            <Text> More...</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderMoreBadResponseModal = () => {
    return (
      <View>
        <TouchableOpacity style={{ paddingTop: 20, paddingBottom: 10 }}>
          <Image
            source={require("../../assets/Rectangle 8.png")}
            style={styles.dropdown_icon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.modal_dislike_header}>
          <Image
            source={require("../../assets/not_good.png")}
            style={styles.icon_on_long_press_option}
            resizeMode="contain"
          />
          <Text style={styles.modal_dislike_header_text}>More reason</Text>
        </View>
        <View style={styles.modal_dislike_more_response}>
          {[
            "Don't Know",
            "Confused",
            "Same as before",
            "Not Sure",
            "Don't feel happy",
          ].map((text, index) => (
            <TouchableOpacity
              key={index}
              style={
                selectedFeedback === text
                  ? styles.feedback_choosen
                  : styles.feedback
              }
              onPress={() => handleOptionClick(text)}
            >
              <Text
                style={selectedFeedback === text ? styles.text_choosen : {}}
              >
                {text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.modal_textbox_more_reason}>
          <Text style={styles.modal_textbox_text}>More reason</Text>
          <TextInput
            style={styles.text_input}
            placeholder="Write another reason here"
          />
        </View>
        <TouchableOpacity style={styles.more_reason_submit_button}>
          <Text style={styles.submit_text}>Send</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderOnLongPressReactionModal = () => {
    return (
      <View>
        <TouchableOpacity style={{ paddingTop: 20, paddingBottom: 10 }}>
          <Image
            source={require("../../assets/Rectangle 8.png")}
            style={styles.dropdown_icon}
            resizeMode="contain"
          />
        </TouchableOpacity>
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
        <TouchableOpacity
          onPress={setToBadResponseModal}
          style={styles.on_long_press_options}
        >
          <Image
            source={require("../../assets/not_good.png")}
            style={styles.icon_on_long_press_option}
            resizeMode="contain"
          />
          <Text style={styles.on_long_press_options_text}>Bad Response</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.on_long_press_options}>
          <Image
            source={require("../../assets/good.png")}
            style={styles.icon_on_long_press_option}
            resizeMode="contain"
          />
          <Text style={styles.on_long_press_options_text}>Good Response</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const setModal = () => {
    switch (choosenModal) {
      case "MoreBadResponse":
        return renderMoreBadResponseModal();
      case "BadResponse":
        return renderBadResponseModal();
      default:
        return renderOnLongPressReactionModal();
    }
  };

  const renderOnLongPressModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableWithoutFeedback onPress={handleTouchOutsideModal}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <ScrollView
                contentContainerStyle={
                  choosenModal == "MoreBadResponse"
                    ? styles.modal_dislike_details_view
                    : styles.modal_reaction_view
                }
                onScroll={handleScroll}
                scrollEventThrottle={16}
              >
                {setModal()}
              </ScrollView>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.avatarAndBubbleContainer]}>
        {renderAvatar()}
        {renderBubble()}
      </View>
      {renderAttachments()}
      {renderReactions()}
      {renderOnLongPressModal()}
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
    paddingLeft: 35,
  },
  on_long_press_options_text: {
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "400",
    lineHeight: 20,
    color: "black",
  },
  dropdown_icon: {
    alignSelf: "center",
  },
  overlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)", // semi-transparent dark background
  },
  modal_reaction_view: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: "100%",
    height: "100%",
    top: "69%",
    borderRadius: 30,
  },
  modal_dislike_details_view: {
    backgroundColor: "white",
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
    top: "50%",
    borderRadius: 30,
  },
  icon_on_long_press_option: {
    width: 28,
    height: 28,
  },
  modal_dislike_header: {
    flexDirection: "row",
    height: 40,
    gap: 8,
    paddingTop: 10,
    paddingLeft: 35,
    paddingRight: 35,
  },
  modal_dislike_header_text: {
    width: 225,
    height: 24,
    fontFamily: "Inter_600Bold",
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 24,
  },
  modal_dislike_more_response: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    paddingTop: 15,
    gap: 24,
    paddingLeft: 35,
    paddingBottom: 20,
  },
  feedback: {
    alignSelf: "flex-start",
    height: 30,
    paddingTop: 5,
    paddingRight: 13,
    paddingBottom: 5,
    paddingLeft: 13,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DCDCDC",
  },
  feedback_choosen: {
    alignSelf: "flex-start",
    height: 30,
    paddingTop: 5,
    paddingRight: 13,
    paddingBottom: 5,
    paddingLeft: 13,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#0304EF",
  },
  modal_textbox_more_reason: {
    gap: 4,
    paddingLeft: 35,
    paddingRight: 35,
    marginBottom: 15,
    paddingBottom: 15,
  },
  modal_textbox_text: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "bold",
  },
  text_input: {
    height: 44,
    paddingTop: 12,
    gap: 8,
    borderRadius: 6,
    borderWidth: 1,
    textAlign: "center",
  },
  text_choosen: {
    color: "blue",
  },
  more_reason_submit_button: {
    padding: 12,
    backgroundColor: "#3d7ee0",
    width: 80,
    borderRadius: 20,
    marginLeft: "70%",
  },
  submit_text: {
    color: "white",
    textAlign: "center",
  },
});

export default Message;
