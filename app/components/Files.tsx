import { DocumentPickerAsset } from "expo-document-picker"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface FileProps {
  file: DocumentPickerAsset
  onDelete: (name: string) => void
}

const File = (props: FileProps) => {
  return (
    <TouchableOpacity onPress={() => props.onDelete(props.file.name)}>
      <View style={styles.file_item}>
        <Text style={styles.file_name}>{props.file.name}</Text>
        <Image source={require('../../assets/delete.png')} style={styles.file_action} />
      </View>
    </TouchableOpacity>
  )
}

interface FilesProps {
  files: DocumentPickerAsset[]
  onDelete: (name: string) => void
}

export const Files = (props: FilesProps) => {
  if (!props.files.length) return null
  return (
    <View style={styles.file_list} >
      {props.files.map((file, index) => <File key={index} file={file} onDelete={props.onDelete} />)}
    </View>
  )
}

const styles = StyleSheet.create({
  file_list: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: "wrap",
    gap: 8
  },
  file_item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderRadius: 6,
    backgroundColor: '#ffffff'
  },
  file_name: {
    borderStyle: 'solid',
    borderRightWidth: 1,
    borderRightColor: '#DCDCDC',
    padding: 8
  },
  file_action: {
    margin: 8
  }
})