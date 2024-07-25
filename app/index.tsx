import { polyfill as polyfillReadableStream } from "react-native-polyfill-globals/src/readable-stream";
import { polyfill as polyfillFetch } from "react-native-polyfill-globals/src/fetch";
import { useCallback, useReducer, Dispatch, useState } from "react";
import { StyleSheet, View, Platform, Text, Image } from "react-native";
import { DocumentPickerAsset, getDocumentAsync } from "expo-document-picker";
import { StatusBar } from "expo-status-bar";
import { GiftedChat, MessageProps, Send } from "react-native-gifted-chat";
import { TextDecoder } from "text-encoding";

import { InputFile } from "./components/InputFile";
import { InputFooter } from "./components/InputFooter";
import { Message } from "./components/Message";
import { WelcomePage } from "./components/WelcomePage";
import { Header } from "./components/Header";
import { ActionKind, IState, StateAction, TMessage } from "./components/types";

const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.floor(Math.random() * 16);
    const v = c === "x" ? r : (r % 4) + 8;
    return v.toString(16);
  });
};

const user = {
  _id: 1,
  name: "Alice",
};

const ai = {
  _id: 2,
  name: "Chatbot",
  avatar: require("../assets/avatar.png"),
};

const decoder = new TextDecoder();
export function decodeAIStreamChunk(chunk?: Uint8Array): string {
  return chunk ? decoder.decode(chunk) : "";
}

function reducer(state: IState, action: StateAction) {
  switch (action.type) {
    case ActionKind.RESET_FILES: {
      return { ...state, files: [] };
    }
    case ActionKind.REMOVE_FILE: {
      return {
        ...state,
        files: state.files.filter(
          (file) => file.name !== (action.payload as string)
        ),
      };
    }
    case ActionKind.ADD_FILE: {
      return {
        ...state,
        files: [...state.files, ...(action.payload as DocumentPickerAsset[])],
      };
    }
    case ActionKind.SEND_MESSAGE: {
      return {
        ...state,
        step: state.step + 1,
        messages: action.payload as TMessage[],
      };
    }
    case ActionKind.APPEND_MESSAGE_CHUNK: {
      const { chunk, id } = action.payload as { chunk: string; id: string };
      const found = state.messages.find((m) => m._id === id);
      if (found) {
        return {
          ...state,
          messages: state.messages.map((m) => {
            if (m._id === id) {
              return {
                ...m,
                text: m.text + chunk,
              };
            }
            return m;
          }),
        };
      }
      const newMessage = {
        _id: id,
        text: chunk,
        createdAt: new Date(),
        user: ai,
      };
      return {
        ...state,
        messages: GiftedChat.append(state.messages, [newMessage]),
      };
    }
    case ActionKind.LOAD_EARLIER_MESSAGES: {
      return {
        ...state,
        loadEarlier: true,
        isLoadingEarlier: false,
        messages: action.payload as TMessage[],
      };
    }
    case ActionKind.LOAD_EARLIER_START: {
      return {
        ...state,
        isLoadingEarlier: true,
      };
    }
    case ActionKind.SET_IS_TYPING: {
      return {
        ...state,
        isTyping: action.payload as boolean,
      };
    }
  }
}

async function send(dispatch: Dispatch<StateAction>) {
  dispatch({ type: ActionKind.SET_IS_TYPING, payload: true });
  try {
    const url = `${process.env.EXPO_PUBLIC_API_URL}/process-ui-message?api_key=${process.env.EXPO_PUBLIC_API_KEY}`;
    const body = JSON.stringify({
      message: {
        content: "what is bca?",
        role: "user",
      },
      topic: "bca",
      token: process.env.EXPO_PUBLIC_AUTH_TOKEN,
    });
    const resp = await fetch(url, {
      reactNative: { textStreaming: true },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    const reader = resp.body.getReader();
    if (!reader) {
      console.error("_❗Response body not found❗_");
    }
    const newId = uuidv4();
    while (true) {
      const chunk = await reader?.read();
      const { done, value } = chunk;
      if (done) {
        break;
      }
      dispatch({
        type: ActionKind.APPEND_MESSAGE_CHUNK,
        payload: { chunk: decodeAIStreamChunk(value), id: newId },
      });
    }
  } catch (error) {
  } finally {
    dispatch({ type: ActionKind.SET_IS_TYPING, payload: false });
  }
}

export default function App() {
  if (Platform.OS !== "web") {
    polyfillFetch();
    polyfillReadableStream();
  }

  const [state, dispatch] = useReducer(reducer, {
    messages: [],
    files: [],
    step: 0,
    loadEarlier: true,
    isLoadingEarlier: false,
    isTyping: false,
  });

  const [inputText, setInputText] = useState("");

  const renderSend = (props) => {
    return (
      <Send {...props} containerStyle={{ justifyContent: "center" }}>
        <View style={{ marginTop: 4, marginRight: 9 }}>
          <Image
            source={
              inputText.trim().length > 0
                ? require("../assets/button.png")
                : require("../assets/microphone.png")
            }
            style={styles.image}
          />
        </View>
      </Send>
    );
  };

  const onSendText = useCallback(
    (messages: TMessage[]) => {
      if (state.files.length) {
        dispatch({ type: ActionKind.RESET_FILES });
      }
      const sentMessages = [
        {
          ...messages[0],
          sent: true,
          received: true,
          attachments: state.files,
        },
      ];
      const newMessages = GiftedChat.append(state.messages, sentMessages);
      dispatch({ type: ActionKind.SEND_MESSAGE, payload: newMessages });
      send(dispatch);
    },
    [state.files, state.messages]
  );

  const onSelectFile = useCallback(async () => {
    const result = await getDocumentAsync();
    if (!result.canceled) {
      dispatch({ type: ActionKind.ADD_FILE, payload: result.assets });
    }
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header></Header>
      <View style={{ width: "100%", flex: 1 }}>
        <GiftedChat<TMessage>
          renderActions={() => <InputFile onFileSelected={onSelectFile} />}
          renderSend={renderSend}
          messages={state.messages}
          placeholder='Type a message or type "/" for commands'
          onSend={onSendText}
          alwaysShowSend
          showAvatarForEveryMessage
          messagesContainerStyle={{ paddingBottom: 65 }}
          user={user}
          isTyping={state.isTyping}
          renderAvatarOnTop
          onInputTextChanged={(text) => setInputText(text)}
          renderChatEmpty={() => <WelcomePage />}
          renderInputToolbar={(props) => (
            <InputFooter
              {...props}
              files={state.files}
              onDelete={(fileName) =>
                dispatch({ type: ActionKind.REMOVE_FILE, payload: fileName })
              }
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
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  text: {
    fontFamily: "Inter_400Regular",
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
