import { Image, TouchableOpacity } from 'react-native'

interface InputFileProps {
  onFileSelected: () => void
}

export const InputFile = (props: InputFileProps) => {
  const { onFileSelected } = props
  return (
    <TouchableOpacity
      style={{ marginLeft: 8, marginBottom: 11 }}
      onPress={onFileSelected}
    >
      <Image
        source={require("../../assets/paperclip.png")}
        style={{ width: 20, height: 20}}
      />
    </TouchableOpacity>
  )
}