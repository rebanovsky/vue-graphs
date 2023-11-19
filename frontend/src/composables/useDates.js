import { ref } from 'vue';

export default function useDates() {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1; // getMonth() is zero-based
    let day = today.getDate();

    // Pad the month and day with leading zeros if needed
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }

    let formattedDate = year + "-" + month + "-" + day;

    let date = ref(formattedDate);

    return { date }
}