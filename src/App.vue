<template>
  <div id="app">
    <div class="container-fluid">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      language: ""
    };
  },
  mounted() {
    let language = "fa";
    window.sessionStorage.setItem("language", language);
    this.$i18n.locale = window.sessionStorage.getItem("language");
    this.language = window.sessionStorage.getItem("language");
    if (language == "fa") {
      document.documentElement.setAttribute("dir", "rtl");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
    }
  }
};
</script>
