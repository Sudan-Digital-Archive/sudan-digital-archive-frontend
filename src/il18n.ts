import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      about_heading: "Who are we?",
      about_sentence_one_part_one: "We are a ",
      about_sentence_one_part_two_bold: "grassroots ",
      about_sentence_one_part_three_before_flag:
        "organization of people who care about what is going on in Sudan ",
      about_sentence_two_part_one:
        " We don't want important historical events to go ",
      about_sentence_two_part_two_bold: "undocumented",
      about_sentence_two_part_three: ". ",
      about_sentence_three_part_one: "You might think that's ",
      about_sentence_three_part_two_bold: "impossible",
      about_sentence_three_part_three:
        " - everything goes online these days! But that's exactly the problem, there's so much content on the internet that it can be ",
      about_sentence_three_part_four_bold: "hard to find ",
      about_sentence_three_part_five:
        "what you are looking for. Even worse, things often ",
      about_sentence_three_part_six_bold: "disappear ",
      about_sentence_three_part_seven: "within a few years.",
      about_sentence_four: "So, we decided to build an archive.",
      landing_heading: "Sudan Digital Archive",
      landing_sentence_one_part_one: "A ",
      landing_sentence_one_part_two_highlight: "collective ",
      landing_sentence_one_part_three: "memory. ",
      landing_sentence_two_part_one: "We aim to create future ",
      landing_sentence_two_part_two_highlight: "justice ",
      landing_sentence_two_part_three: "and ",
      landing_sentence_two_part_four_highlight: "accountability ",
      landing_sentence_two_part_five: "for the wonderful people of ",
      landing_sentence_two_part_six_highlight: "Sudan",
      landing_sentence_two_part_seven: ".",
      the_archive_header: "The archive is coming soon!",
      the_archive_sentence_one: "In fact, it already exists.",
      the_archive_sentence_two: "We just haven't made it public yet.",
      the_archive_sentence_three:
        "It contains a lot of sensitive information, so we are working on a way to share it safely.",
      the_archive_sentence_four: "Until then, watch this space!",
      nav_about: "About",
      nav_the_archive: "The Archive",
      footer_text: "This website is made with free open source software that lives on",
    },
  },
  ar: {
    translation: {
      about_heading: "من نحن؟",
      about_sentence_one_part_one: " نحن منظمة",
      about_sentence_one_part_two_bold: " شعبية",
      about_sentence_one_part_three_before_flag:
        "نحن منظمة شعبية من الناس الذين يهتمون بما يحدث في السودان",
      about_sentence_two_part_one:
        " حن لا نريد أن تمر الأحداث التاريخية المهمة دون",
      about_sentence_two_part_two_bold: " توثيقها",
      about_sentence_two_part_three: ". ",
      about_sentence_three_part_one: "قد تعتقد أن هذا ",
      about_sentence_three_part_two_bold: " مستحيل",
      about_sentence_three_part_three:
        "كل شيء متاح على الإنترنت هذه الأيام! ولكن هذه هي المشكلة بالضبط، فهناك الكثير من المحتوى على الإنترنت مما يجعل من الصعب العثور على ما تبحث عنه. والأسوأ من ذلك أن الأشياء تختفي غالبًا في غضون بضع سنوات.",
      // I gave up here with the bolding but if you're ambitious you can split it up!
      about_sentence_three_part_four_bold: "",
      about_sentence_three_part_five: "",
      about_sentence_three_part_six_bold: "",
      about_sentence_three_part_seven: "",
      about_sentence_four: "لذلك قررنا إنشاء أرشيف.",
      landing_heading: "الأرشيف الرقمي للسودان",
      landing_sentence_one_part_one: "ذاكرة",
      landing_sentence_one_part_two_highlight: " جماعية",
      landing_sentence_one_part_three: ". ",
      landing_sentence_two_part_one: " هدفنا هو خلق",
      landing_sentence_two_part_two_highlight: " والمساءلة ",
      landing_sentence_two_part_three: " في",
      landing_sentence_two_part_four_highlight: " المساءلة",
      landing_sentence_two_part_five: " لشعب",
      landing_sentence_two_part_six_highlight: " السودان",
      landing_sentence_two_part_seven: " الرائع.",
      the_archive_header: "الأرشيف قادم قريبا!",
      the_archive_sentence_one: "في الواقع، إنه موجود بالفعل.",
      the_archive_sentence_two: "لم نجعل الأمر عامًا بعد.",
      the_archive_sentence_three:
        "يحتوي على الكثير من المعلومات الحساسة، لذا نحن نعمل على إيجاد طريقة لمشاركتها بأمان.",
      the_archive_sentence_four: "حتى ذلك الحين، راقبوا هذه المساحة!",
      nav_about: "عن",
      nav_the_archive: "الأرشيف",
      footer_text: "تم إنشاء هذا الموقع باستخدام برنامج مفتوح المصدر مجاني يعتمد على"
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
