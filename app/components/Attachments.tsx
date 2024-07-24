import { DocumentPickerAsset } from 'expo-document-picker'
import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'

interface AttachmentsProps {
  attachments: DocumentPickerAsset[]
}

export const Attachments: React.FC<AttachmentsProps> = (props) => {
  const { attachments } = props
  
  const renderAttachment = (attachment: DocumentPickerAsset, index: number) => {
    return (
      <TouchableOpacity key={index}>
        <View style={styles.attachment_item}>
          <Image
            source={attachment.mimeType.startsWith('image') ? 
              require("../../assets/image.png") : 
              require('../../assets/file.png')
            }
            style={styles.attachment_icon}
            resizeMode="contain"
          />
          <Text>{attachment.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  
  return (
    <View style={styles.attachment_container}>
      <Text style={{ fontWeight: 'bold' }}>{`${attachments.length} files`}</Text>
      <View style={styles.attachment_list}>{attachments.map(renderAttachment)}</View>
    </View>
  )
}
const styles = StyleSheet.create({
  attachment_container: {
    marginLeft: 48,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    padding: 16,
    backgroundColor: '#efefef',
    borderRadius: 8
  },
  attachment_list: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  attachment_item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 8,
    gap: 8,
  },
  attachment_icon: {
    width: 24,
    height: 24,
  }
})