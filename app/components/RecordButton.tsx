import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";
import {} from "react-native-gifted-chat";

export const RecordButton = () => {
  const [recording, setRecording] = React.useState<
    Audio.Recording | undefined
  >();
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  async function startRecording() {
    try {
      if (permissionResponse.status !== "granted") {
        console.log("Requesting permission..");
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    console.log("Recording stopped and stored at", uri);
  }

  return (
    <TouchableOpacity onPress={recording ? stopRecording : startRecording}>
      <View style={{ marginTop: 4, marginRight: 9 }}>
        <Image
          source={require("../../assets/microphone.png")}
          style={{ width: 25, height: 25 }}
        />
      </View>
    </TouchableOpacity>
  );
};
