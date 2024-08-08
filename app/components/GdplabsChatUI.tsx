import { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GiftedChat, MessageProps, Send } from "react-native-gifted-chat";

import { InputFile } from "./InputFile";
import { Message } from "./Message";
import { WelcomePage } from "./WelcomePage";
import { Header } from "./Header";
import { TMessage } from "./types";
import { InputFooter } from "./InputFooter";
import { RecordButton } from "./RecordButton";

interface GdplabsChatUIProps {
  listOfPrompt: any[];
  messages: TMessage[];
  user: { _id: number; name: string };
  isTyping: boolean;
  files: any[];
  onSendText(messages: TMessage[]): void;
  onDeleteFile(fileName: any): void;
  onSelectFile(): void;
  onInputAudio?(): void;
}

export const GdplabsChatUI: React.FC<GdplabsChatUIProps> = (props) => {
  const [inputText, setInputText] = useState("");

  // const renderSend = (props) => {
  //   return (
  //     <Send {...props} containerStyle={{ justifyContent: "center" }}>
  //       <View style={{ marginTop: 4, marginRight: 9 }}>
  //         <Image
  //           source={
  //             inputText.trim().length > 0
  //               ? require("../../assets/button.png")
  //               : require("../../assets/microphone.png")
  //           }
  //           style={styles.image}
  //         />
  //       </View>
  //     </Send>
  //   );
  // };

  const renderMainButton = (props: any) => {
    return inputText.trim() ? (
      <Send {...props} containerStyle={{ justifyContent: "center" }}>
        <View style={{ marginTop: 4, marginRight: 9 }}>
          <Image
            source={require("../../assets/button.png")}
            style={styles.image}
          />
        </View>
      </Send>
    ) : (
      <RecordButton />
    );
  };

  const handleMainAction = (messages: any) => {
    if (!inputText) {
      props.onInputAudio();
    } else {
      props.onSendText(messages);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header></Header>
      <View style={{ width: "100%", flex: 1 }}>
        <GiftedChat<TMessage>
          renderActions={() => (
            <InputFile onFileSelected={props.onSelectFile} />
          )}
          renderSend={renderMainButton}
          messages={props.messages}
          placeholder='Type a message or type "/" for commands'
          onSend={handleMainAction}
          alwaysShowSend
          showAvatarForEveryMessage
          messagesContainerStyle={{ paddingBottom: 65 }}
          user={props.user}
          isTyping={props.isTyping}
          renderAvatarOnTop
          onInputTextChanged={(text) => setInputText(text)}
          renderChatEmpty={() => (
            <WelcomePage listOfPrompt={props.listOfPrompt} />
          )}
          renderInputToolbar={(inputToolbarProps) => (
            <InputFooter
              {...inputToolbarProps}
              files={props.files}
              onDelete={props.onDeleteFile}
            />
          )}
          renderMessage={(props: MessageProps<TMessage>) => (
            <Message
              {...props}
              position="left"
              userType={props.user._id === 1 ? "human" : "ai"}
              attachments={props.currentMessage?.attachments}
            />
          )}
        />
      </View>
      <Text style={styles.text}>
        Information from AI about people, places, or facts may be inaccurate.
        Powered by GPT technology.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    paddingBottom: 8,
    textAlign: "center",
  },
  image: {
    width: 25,
    height: 25,
  },
  avatar_bot: {
    width: 10,
    height: 10,
  },
  text_input: {
    width: 335,
    height: 64,
    padding: 10,
    margin: 24,
    borderWidth: 1,
    borderRadius: 6,
  },
});

export default GdplabsChatUI;
