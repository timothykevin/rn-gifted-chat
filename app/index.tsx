import { polyfill as polyfillReadableStream } from "react-native-polyfill-globals/src/readable-stream";
import { polyfill as polyfillFetch } from "react-native-polyfill-globals/src/fetch";
import { useCallback, useReducer, Dispatch } from "react";
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import { TextDecoder } from "text-encoding";

import { Message } from "./components/Message";

const user = {
  _id: 1,
  name: "Alice",
};

const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.floor(Math.random() * 16);
    const v = c === "x" ? r : (r % 4) + 8;
    return v.toString(16);
  });
};

const decoder = new TextDecoder();
export function decodeAIStreamChunk(chunk?: Uint8Array): string {
  return chunk ? decoder.decode(chunk) : "";
}

interface IState {
  messages: any[];
  step: number;
  loadEarlier?: boolean;
  isLoadingEarlier?: boolean;
  isTyping: boolean;
}

enum ActionKind {
  SEND_MESSAGE = "SEND_MESSAGE",
  APPEND_MESSAGE_CHUNK = "APPEND_MESSAGE_CHUNK",
  LOAD_EARLIER_MESSAGES = "LOAD_EARLIER_MESSAGES",
  LOAD_EARLIER_START = "LOAD_EARLIER_START",
  SET_IS_TYPING = "SET_IS_TYPING",
}

interface StateAction {
  type: ActionKind;
  payload?: any;
}

function reducer(state: IState, action: StateAction) {
  switch (action.type) {
    case ActionKind.SEND_MESSAGE: {
      return {
        ...state,
        step: state.step + 1,
        messages: action.payload,
      };
    }
    case ActionKind.APPEND_MESSAGE_CHUNK: {
      const { chunk, id } = action.payload;
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
        user: {
          _id: 2,
          name: "Chatbot",
          avatar: require("../assets/avatar.png"),
        },
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
        messages: action.payload,
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
        isTyping: action.payload,
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

const renderSend = (props) => {
  return (
    <Send {...props} containerStyle={{ justifyContent: "center" }}>
      <View style={{ marginTop: 4, marginRight: 9 }}>
        <Image source={require("../assets/button.png")} style={styles.image} />
      </View>
    </Send>
  );
};

const renderCustomView = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 5,
      }}
    >
      <TouchableOpacity>
        <Image source={require("../assets/button.png")} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

const renderActions = (props) => (
  <View style={{ marginLeft: 8, marginBottom: 11 }}>
    <Image
      source={require("../assets/plus_icon.png")}
      style={styles.image_reaction}
    />
  </View>
);
export default function App() {
  if (Platform.OS !== "web") {
    polyfillReadableStream();
    polyfillFetch();
  }

  const [state, dispatch] = useReducer(reducer, {
    messages: [],
    step: 0,
    loadEarlier: true,
    isLoadingEarlier: false,
    isTyping: false,
  });

  const onSend = useCallback(
    (messages: any[]) => {
      const sentMessages = [{ ...messages[0], sent: true, received: true }];
      const newMessages = GiftedChat.append(state.messages, sentMessages);
      dispatch({ type: ActionKind.SEND_MESSAGE, payload: newMessages });
      send(dispatch);
    },
    [dispatch, state.messages]
  );
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={{ width: "100%", flex: 1 }}>
        <GiftedChat
          renderActions={renderActions}
          renderSend={renderSend}
          messages={state.messages}
          placeholder='Type a message or type "/" for commands'
          onSend={onSend}
          alwaysShowSend
          user={user}
          isTyping={state.isTyping}
          renderAvatarOnTop
          renderMessage={(props) => (
            <Message
              {...props}
              position="left"
              userType={props.user._id === 1 ? "human" : "ai"}
            />
          )}
        />
      </View>
      <Text style={styles.text}>hehe</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  text: {
    fontSize: 14,
    paddingBottom: 8,
  },
  image: {
    width: 30, // specify your desired width
    height: 30, // specify your desired height
  },
  image_reaction: {
    width: 20, // specify your desired width
    height: 20, // specify your desired height
  },
  avatar_bot: {
    width: 10,
    height: 10,
  },
});
