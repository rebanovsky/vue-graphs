<template>
  <div
    class="ai-conversation-wrapper text-[12px] h-[400px] overflow-y-auto border-[0px] border-slate-200 flex-grow flex justify-center"
  >
    <div
      ref="conversationFeed"
      class="ai-conversation-feed overflow-y-auto border-x-[1px] border-slate-300 border-dashed dark:border-slate-700 flex flex-col gap-[20px] w-[720px] p-[12px]"
    >
      <div
        v-for="message in conversation"
        :key="message.content"
        class="flex items-center gap-[8px] w-[100%] border-[1px] p-[8px] rounded-[20px] border-slate-300"
      >
        <font-awesome-icon
          v-if="message.type === 'user'"
          class="w-[14px] h-[14px]"
          :icon="['fas', 'user']"
        />
        <div
          v-if="message.type === 'ai'"
          class="ai-icon w-[12px] h-[12px]"
        >
          <img :src="aiIcon" class="icon w-[18px] h-[18px]" />
        </div>
        <div class="flex  text-[14px]">{{ message.content }}</div>
      </div>
    </div>
  </div>
  <div
    class="ai-prompt w-[100%] justify-center h-[100px] flex items-center border-t-[1px] border-slate-300 dark:border-slate-700 border-dashed"
  >
    <form class="flex gap-[12px] items-center">
      <textarea
        v-model="userContent"
        rows="1"
        @keydown="submitWithEnter"
        placeholder="Prompt"
        class="custom-textarea dark:focus:border-slate-100 focus:shadow-boxshlight transition ease transition ease resize-none w-[280px] border-[1px] border-slate-300 dark:border-slate-700 py-[8px] px-[16px] rounded-[32px] bg-slate-100 dark:bg-slate-800 placeholder:text-[16px] placeholder:font-light"
      ></textarea>
      <div
        class="h-[32px] w-[32px] mr-[12px] mt-[8px] hover:fill-slate-900 transition ease duration-100 flex justify-center items-center cursor-pointer"
        @click="sendPrompt"
      >
        <img :src="sendIcon" />
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import aiIcon from "@/assets/icons/ai_noun_project.svg";
import sendIcon from "@/assets/icons/send_noun_project.svg";

export default {
  setup() {
    const userContent = ref("");
    const conversation = ref([]);
    const conversationFeed = ref(null);

    const sendPrompt = async () => {
      try {
        conversation.value.push({ type: "user", content: userContent.value });
        const response = await axios.post(
          "http://localhost:3000/run-conversation",
          { content: userContent.value }
        );
        conversation.value.push({
          type: "ai",
          content: response.data.choices[0].message.content,
        });
        userContent.value = "";
        conversationFeed.value.scrollTop = conversationFeed.value.scrollHeight;
      } catch (error) {
        console.error("Error sending prompt:", error);
      }
    };

    const submitWithEnter = (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendPrompt();
        userContent.value = "";
      }
    };

    conversation.value = [
      { type: "user", content: "Hi there!" },
      { type: "ai", content: "Hello! How can I help you today?" },
      { type: "user", content: "I'm looking for flight tickets to Paris." },
      {
        type: "ai",
        content: "Sure, I can help with that. When would you like to depart?",
      },
      { type: "user", content: "Next Monday." },
      {
        type: "ai",
        content:
          "Alright, I found several options for flights to Paris next Monday. Would you like the cheapest or the shortest flight?",
      },
      { type: "user", content: "Show me the cheapest option, please." },
      {
        type: "ai",
        content:
          "The cheapest flight I found is $450, departing at 7 AM and arriving at 3 PM. Would you like to book this flight?",
      },
      { type: "user", content: "Yes, that sounds good." },
      {
        type: "ai",
        content:
          "Great! I have booked your flight. You will receive an email with the details shortly.",
      },
      { type: "user", content: "Thank you for your help!" },
      { type: "ai", content: "You're welcome! Have a great trip to Paris!" },
    ];

    return {
      userContent,
      sendPrompt,
      aiIcon,
      sendIcon,
      conversation,
      conversationFeed,
      submitWithEnter,
    };
  },
};
</script>

<style lang="scss" scoped>
.custom-textarea {
  width: 500px;
  resize: none;
  overflow: hidden;
  padding: 10px 18px;
  box-sizing: border-box;
}

.input-container {
  max-width: 500px;
}
</style>
