import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";

export const WelcomePage = () => {
  const renderWelcomePage = () => {
    const view = (
      <ScrollView
        style={
          Platform.OS !== "android"
            ? styles.container
            : styles.container_android
        }
      >
        <Text style={styles.title}>Ask anything like we do</Text>
        <View style={styles.predefined_question_view}>
          <TouchableOpacity style={styles.predefined_question_button}>
            <Text style={styles.predefined_question_title}>
              Question and Answer
            </Text>
            <Text style={styles.predefined_question_description}>
              Ask VonBot® about legal terms and all mattersrelated to the Von
              Wobeser y Sierra Firm
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.predefined_question_button}>
            <Text style={styles.predefined_question_title}>
              Judicial Precedent
            </Text>
            <Text style={styles.predefined_question_description}>
              Identify binding precedents issued bythe Mexican Supreme Court
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.predefined_question_button}>
            <Text style={styles.predefined_question_title}>Summarization</Text>
            <Text style={styles.predefined_question_description}>
              Summarize the commission's decision regarding Metal Packaging
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.predefined_question_button}>
            <Text style={styles.predefined_question_title}>Document Draft</Text>
            <Text style={styles.predefined_question_description}>
              Draft a one-page memorandum about LegalObligations in Foreign
              Investment Matters
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
    return view;
  };

  return <View>{renderWelcomePage()}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: 375,
    height: 530,
    paddingLeft: 20,
    paddingRight: 20,
    transform: [{ scaleX: 1 }, { scaleY: -1 }],
  },
  container_android: {
    width: 375,
    height: 530,
    paddingRight: 20,
    transform: [{ scaleX: -1 }, { scaleY: -1 }],
  },
  title: {
    width: 335,
    height: 28,
    fontFamily: "Inter_700Bold",
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 28,
    textAlign: "center",
    marginBottom: 20,
  },
  predefined_question_view: {
    width: 335,
    height: 412,
  },
  predefined_question_button: {
    width: 335,
    paddingTop: 14,
    paddingRight: 16,
    paddingBottom: 14,
    paddingLeft: 16,
    borderRadius: 6,
    borderWidth: 1,
    margin: 4,
  },
  predefined_question_title: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 19.84,
    alignContent: "center",
  },
  predefined_question_description: {
    fontFamily: "Inter_400Bold",
    fontSize: 14,
    lineHeight: 19.88,
    alignContent: "center",
  },
});

export default WelcomePage;
