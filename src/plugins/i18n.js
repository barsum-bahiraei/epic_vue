import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

import languages from "@/languages/index";

export default new VueI18n(languages);
