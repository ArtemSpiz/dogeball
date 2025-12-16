import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import vi from "./locales/vi.json";
import de from "./locales/de.json";
import nl from "./locales/nl.json";
import ja from "./locales/ja.json";
import tr from "./locales/tr.json";
import ar from "./locales/ar.json";
import it from "./locales/it.json";
import no from "./locales/no.json";
import zh from "./locales/zh.json";
import ru from "./locales/ru.json";
import fr from "./locales/fr.json";
import pt from "./locales/pt.json";
import es from "./locales/es.json";
import fi from "./locales/fi.json";
import da from "./locales/da.json";
import th from "./locales/th.json";

// Get saved language from localStorage or default to English
const savedLocale = localStorage.getItem("locale") || "en";

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: "en",
  messages: {
    en,
    vi,
    de,
    nl,
    ja,
    tr,
    ar,
    it,
    no,
    zh,
    ru,
    fr,
    pt,
    es,
    fi,
    da,
    th,
  },
});

export default i18n;
