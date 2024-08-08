import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";

interface WelcomePageProps {
  listOfPrompt?: string[];
}

export const WelcomePage: React.FC<WelcomePageProps> = (props) => {
  const questions = props.listOfPrompt
    ? props.listOfPrompt
    : [
        {
          title: "",
          description: "",
        },
      ];

  const PredefinedQuestions = () => (
    <View style={styles.predefined_question_view}>
      {questions.map((question, index) => (
        <TouchableOpacity key={index} style={styles.predefined_question_button}>
          <Text style={styles.predefined_question_title}>{question.title}</Text>
          <Text style={styles.predefined_question_description}>
            {question.description}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

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
        {PredefinedQuestions()}
      </ScrollView>
    );
    return view;
  };

  return <View>{props.listOfPrompt ? null : renderWelcomePage()}</View>;
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
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 19.84,
    alignContent: "center",
  },
  predefined_question_description: {
    fontSize: 14,
    lineHeight: 19.88,
    alignContent: "center",
  },
});

export default WelcomePage;
