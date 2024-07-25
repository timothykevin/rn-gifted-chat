import { IMessage } from 'react-native-gifted-chat'
import { DocumentPickerAsset } from 'expo-document-picker'

export interface TMessage extends IMessage {
  attachments?: DocumentPickerAsset[]
}

export interface IState {
  files: DocumentPickerAsset[];
  messages: TMessage[];
  step: number;
  loadEarlier?: boolean;
  isLoadingEarlier?: boolean;
  isTyping: boolean;
}
export interface StateAction {
  type: ActionKind;
  payload?: unknown;
}

export enum ActionKind {
  RESET_FILES = 'RESET_FILES',
  ADD_FILE = "ADD_FILE",
  REMOVE_FILE = "REMOVE_FILE",
  SEND_MESSAGE = "SEND_MESSAGE",
  APPEND_MESSAGE_CHUNK = "APPEND_MESSAGE_CHUNK",
  LOAD_EARLIER_MESSAGES = "LOAD_EARLIER_MESSAGES",
  LOAD_EARLIER_START = "LOAD_EARLIER_START",
  SET_IS_TYPING = "SET_IS_TYPING",
}