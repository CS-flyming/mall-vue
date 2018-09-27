<template>
  <div class="box">
    <div class="nav">
      <ul class="location">
        <li>
          <span style="font-size:14px;">{{nowDate}}</span>
          <!-- <Dropdown  placement="bottom-start">
            <a href="javascript:void(0)">
              <Icon type="ios-location" class="icon"></Icon> {{city}}
            </a>
            <DropdownMenu slot="list">
              <div class="city">
                <p v-for="(items, index) in cityArr" :key="index">
                  <span v-for="(item, index) in items"  class="city-item" :key="index" @click="changeCity(item)">{{item}}</span>
                </p>
              </div>
            </DropdownMenu>
          </Dropdown> -->
        </li>
      </ul>
      <ul class="detail">
        <li class="first" v-show="!userInfo">
          你好，请<router-link :to="{path:loginUrl}">登录 <Icon type="person"></Icon></router-link> 
          <!-- |<span class="text-color-red"><router-link to="/SignUp">免费注册 <Icon type="person-add"></Icon></router-link></span> -->
        </li>
        <li v-show="!!userInfo">
          <Dropdown>
            <p class="username-p">
              <Avatar class="person-icon" icon="person" size="small" /> <span class="username">{{userInfo&&userInfo.name}} </span>
            </p>
            <DropdownMenu slot="list">
                <div class="my-page">
                  <div class="sign-out" @click="signOutFun">
                    <Icon type="log-out"></Icon>
                    <p>退出登陆</p>
                  </div>
                </div>
            </DropdownMenu>
          </Dropdown>
        </li>
        <template v-show="!userInfo">
            <li>
              <Dropdown  placement="bottom-start">
               <router-link :to="{name:'MyShoppingCart'}"><Icon type="ios-cart-outline"></Icon> 购物车</router-link>
              </Dropdown>
            </li>
            <li>
              <Dropdown  placement="bottom-start">
                <router-link :to="{name:'index'}"><Icon type="pricetags"></Icon> 我的订单</router-link>
              </Dropdown>
            </li>
        </template>
        
        <!-- <li><router-link to="/">网站导航</router-link></li> -->
        <!-- <li><router-link to="/freeback">意见反馈</router-link></li> -->
        <li><router-link to="/">商城首页</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  name: "M-Header",
  created() {
    this.loginUrl =
      "/login?url=" + window.btoa(window.encodeURIComponent(location.href));
    this.userInfo = Cookies.get("user") && JSON.parse(Cookies.get("user"));
    this.nowDate = this.formatDate();
  },
  data() {
    return {
      loginUrl: "/login",
      userInfo: "",
      nowDate: ""
    };
  },
  methods: {
    signOutFun() {
      localStorage.clear();
      window.location.reload();
    },
    formatDate(time) {
      var date = time ? new Date(time) : new Date();
      let weekday = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ];
      var year = date.getFullYear(),
        month = date.getMonth() + 1, //月份是从0开始的
        day = date.getDate(),
        xq = date.getDay();
      var newTime = year + "年" + month + "月" + day + "日  " + weekday[xq];
      return newTime;
    }
  },
  watch: {
    "$route.name"(val) {
      this.loginUrl =
        "/login?url=" + window.btoa(window.encodeURIComponent(location.href));
      this.userInfo = Cookies.get("user") && JSON.parse(Cookies.get("user"));
    }
  }
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 50px;
  background-color: #33bbff;
  position: fixed;
  /* max-width: 1200px; */
  z-index: 999;
  top: 0;
  left: 0;
}
.nav {
  margin: 0% auto;
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.nav ul {
  list-style: none;
}
.nav li {
  float: left;
  font-size: 14px;
  line-height: 50px;
  margin-right: 15px;
  font-weight: bold;
}
.nav a {
  text-decoration: none;
  color: #fff;
  padding-left: 15px;
  border-left: 1px solid #ccc;
  cursor: pointer;
}
.location a {
  border-left: none;
}
.nav a:hover {
  color: #d9534f;
}
.location {
  color: #fff;
}
.icon {
  color: #d9534f;
}
.first {
  color: #fff;
}
.first a:first-child {
  padding-left: 3px;
  border-left: none;
}
.city {
  padding: 10px 15px;
}
.city-item {
  font-weight: bold;
  cursor: pointer;
  padding: 5px;
}
.city-item:hover {
  color: #d9534f;
}
.person-icon {
  color: #d9534f;
  background-color: #f0cdb2;
}
.username {
  color: #fff;
}
.shopping-cart-list {
  padding: 3px 15px;
}
.shopping-cart-box {
  margin: 8px 0px;
  margin-top: 15px;
  padding-bottom: 15px;
  height: 40px;
  display: flex;
  align-items: center;
  border-bottom: 1px #ccc dotted;
}
.shopping-cart-box:first-child {
  margin-top: 8px;
}
.shopping-cart-img {
  margin-right: 15px;
  width: 40px;
  height: 40px;
}
.shopping-cart-img img {
  width: 100%;
}
.shopping-cart-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-between;
  width: 200px;
  overflow: hidden;
  font-size: 12px;
  line-height: 20px;
  color: #fff;
}
.shopping-cart-detail {
  color: #999999;
}
.shopping-cart-text {
  color: #ccc;
}
.go-to-buy {
  display: flex;
  justify-content: flex-end;
}
.shopping-cart-null {
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.cart-null-icon {
  font-size: 38px;
  margin-bottom: 15px;
}
.shopping-cart-null span {
  color: #999999;
  font-size: 12px;
  line-height: 16px;
}
.username-p {
  cursor: pointer;
}
.my-page {
  padding: 3px 5px;
  width: 180px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.my-page a {
  margin: 0px;
  padding: 0px;
  border: none;
}
.my-info {
  padding: 5px;
  width: 50%;
  height: 100%;
  text-align: center;
  cursor: pointer;
}
.my-info:hover {
  box-shadow: 0px 0px 5px #ccc;
}
.my-info i {
  font-size: 28px;
}
.my-info p {
  font-size: 12px;
}
.sign-out {
  padding: 5px;
  width: 50%;
  height: 100%;
  text-align: center;
  cursor: pointer;
}
.sign-out:hover {
  box-shadow: 0px 0px 5px #ccc;
}
.sign-out i {
  font-size: 28px;
}
.sign-out p {
  font-size: 12px;
}
</style>
