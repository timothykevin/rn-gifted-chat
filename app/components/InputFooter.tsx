import { StyleSheet, View } from 'react-native'
import { Composer, InputToolbar, InputToolbarProps } from 'react-native-gifted-chat';
import { DocumentPickerAsset } from 'expo-document-picker'

import { Files } from './Files'
import { TMessage } from './types'

interface InputFooterProps extends InputToolbarProps<TMessage> {
  files: DocumentPickerAsset[]
  onDelete: (fileName: string) => void
}

export const InputFooter = (props: InputFooterProps) => {
  const { files, onDelete, ...inputProps } = props
  return (
    <InputToolbar 
      {...inputProps} 
      primaryStyle={[styles.input_container]} 
      renderComposer={(composerProps) => (
        <View style={styles.input_composer}>
          <Files files={files} onDelete={onDelete} />
          <Composer {...composerProps} />
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  input_container: {
    padding: 12,
    margin: 24,
    borderWidth: 1,
    borderRadius: 6,
  },
  input_composer: {
    flex: 1
  }
})