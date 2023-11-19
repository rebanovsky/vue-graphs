import { ref, reactive } from "vue";
import axios from "axios";

export default function useQuestions() {
  const question = ref("");
  const response = ref("");
  const isFetching = ref(false);
  const askedQuestions = ref([]);

  const askQuestion = async (accessionNo) => {
    isFetching.value = true;
    const newQuestion = reactive({
      question: question.value,
      response: null,
    });
    askedQuestions.value.push(newQuestion);

    // Clear the input box
    question.value = "";

    try {
      // Get the response from the server
      const res = await axios.post("/api/query", {
        question: newQuestion.question,
        accessionNo: accessionNo,
      });

      if (res.data) {
        newQuestion.response = res.data;
      } else {
        newQuestion.response = {
          output_text: "No response from server",
        };
      }
    } catch (err) {
      // Set the response to error message
      newQuestion.response = {
        output_text: "Error occurred while getting the answer.",
      };
      console.error(err);
    } finally {
      isFetching.value = false;
    }
  };

  return { question, response, askQuestion, askedQuestions, isFetching };
}
