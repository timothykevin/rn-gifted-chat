import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Alert,
  Modal,
  TextInput,
  Pressable,
} from "react-native";
import {
  IMessage,
  MessageProps as GiftedMessageProps,
} from "react-native-gifted-chat";

interface ReactionsProps extends GiftedMessageProps<IMessage> {}

export const Reactions: React.FC<ReactionsProps> = (props) => {
  const [dislikeClicked, setDislike] = useState(false);
  const onPress = () => {
    Alert.alert("You clicked on the reaction");
  };

  const showDislikeDetails = () => {
    setDislike(!dislikeClicked);
  };

  const renderReactions = () => {
    const showReactions = props.currentMessage.user._id !== 1;
    const botReactionsButton = (
      <View style={styles.reactions_view}>
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
        <TouchableOpacity onPress={showDislikeDetails}>
          <Image
            source={
              dislikeClicked
                ? require("../../assets/bad response clicked.png")
                : require("../../assets/not_good.png")
            }
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
      <View style={styles.reactions_view}>
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

  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);
  const handleOptionClick = (option: string) => {
    setSelectedFeedback(selectedFeedback === option ? null : option);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const dislikeDetailsView = (
    <View>
      <View style={styles.tell_us_dislike}>
        <Text style={styles.tell_us_text}> Tell us more:</Text>
      </View>
      <View style={styles.feedback_details_view}>
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
            <Text style={selectedFeedback === text ? styles.text_choosen : {}}>
              {text}
            </Text>
          </TouchableOpacity>
        ))}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.centered_view}>
            <View style={styles.modal_view}>
              <View style={styles.modal_header}>
                <Text style={styles.modal_header_text}>More reason</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Image
                    source={require("../../assets/x.png")}
                    style={styles.image_reaction}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.modal_more_response}>
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
                      style={
                        selectedFeedback === text ? styles.text_choosen : {}
                      }
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
              <Pressable style={styles.more_reason_submit_button}>
                <Text style={styles.submit_text}>Send</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          style={styles.feedback}
          onPress={() => setModalVisible(true)}
        >
          <Text> More...</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderDislikeDetails = () => {
    return dislikeClicked ? (
      <View style={styles.reactions_details_view}>{dislikeDetailsView}</View>
    ) : null;
  };

  return (
    <View>
      <View>{renderReactions()}</View>
      {renderDislikeDetails()}
    </View>
  );
};

const styles = StyleSheet.create({
  reactions_view: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 10,
    paddingLeft: 50,
    paddingBottom: 10,
    marginRight: 20,
  },
  reactions_details_view: {
    flexDirection: "row",
    justifyContent: "flex-start",
    borderRadius: 8,
    borderWidth: 1,
    marginLeft: 50,
    padding: 17,
    gap: 12,
    width: 287,
    height: 280,
    borderColor: "#DCDCDC",
  },
  modal_view: {
    margin: 20,
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
    width: 335,
    height: 402,
    top: 204,
    left: 20,
    borderRadius: 12,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  button_close: {
    backgroundColor: "#2196F3",
  },
  text_style: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  tell_us_dislike: {
    width: 253,
    height: 20,
  },
  tell_us_text: {
    fontSize: 14,
    fontWeight: 400,
  },
  feedback_details_view: {
    width: 253,
    height: 260,
    gap: 16,
    paddingTop: 10,
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
  modal_text: {
    marginBottom: 15,
    textAlign: "center",
  },
  modal_header: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 40,
    gap: 8,
    borderBottomWidth: 1,
  },
  centered_view: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)", // semi-transparent dark background
  },
  text_choosen: {
    color: "blue",
  },
  modal_header_text: {
    width: 225,
    height: 24,
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 24,
  },
  image_reaction: {
    width: 30,
    height: 30,
    marginHorizontal: 2,
  },
  modal_more_response: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    paddingTop: 24,
    gap: 24,
  },
  modal_textbox_more_reason: {
    gap: 4,
    paddingTop: 24,
  },
  modal_textbox_text: {
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
  more_reason_submit_button: {
    marginTop: 24,
    padding: 12,
    backgroundColor: "#3d7ee0",
    width: 80,
    borderRadius: 20,
    marginLeft: 200,
  },
  submit_text: {
    color: "white",
    textAlign: "center",
  },
});

export default Reactions;
