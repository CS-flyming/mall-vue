// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import iView from "iview";
import "iview/dist/styles/iview.css";
import $axios from "./util";
import VueLazyload from "vue-lazyload";
// import VueHtmlToPaper from "./libs/print";

// Vue.use(VueHtmlToPaper, options);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: "/static/img-err.png",
  loading: "/static/loading.gif",
  attempt: 1
});
Vue.use(iView);
Vue.config.productionTip = false;
Vue.prototype.$http = $axios;
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});

router.afterEach(route => {
  iView.LoadingBar.finish();
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
