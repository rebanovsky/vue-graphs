import axios from "axios";
import { ref } from "vue";
import keys from "@/assets/keys/keys";

export default function useInsider() {
  let key = keys[0].value;
  let insiders = ref("");
  let news = ref("");

  const getInsider = () => {
    axios("").then((response) => {
      let data = response.data;

      data.sort((a, b) => {
        return new Date(a.filingDate) - new Date(b.filingDate);
      });

    //   data.forEach((d) => {
    //     d.date = new Date(d.date);
    //     d.date = d.date.toLocaleTimeString([], timeOptions);

    //     d.flagUrl = `https://flags.fmcdn.net/data/flags/mini/${d.country.toLowerCase()}.png`;

    //     if (d.country == "EU") {
    //       d.flagUrl =
    //         "https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg";
    //     }

    //     d.diff = (d.actual / d.estimate - 1).toFixed(2);

    //     d.eventStripped = d.event.replace(/ \([\s\S]*?\)/g, "");

    //     d.eventCountry = d.eventStripped.concat(d.country);
    //   });


      insiders.value = data;

      return [ insiders.value ];
    });
  };


  return [ insiders, getInsider() ];
}