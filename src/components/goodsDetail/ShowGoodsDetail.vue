<template>
  <div>
    <div class="item-intro-show">
      <div class="item-intro-detail" ref="itemIntroDetail">
        <!-- <div class="item-intro-nav item-tabs"> -->
          <Tabs>
            <TabPane label="商品介绍">
              <div class="remarks-title">
                <span>商品介绍</span>
              </div>
              <div class="item-intro-img" ref="itemIntroGoods">
                <img v-lazy="pData.file&&pData.file.url">
              </div>
            </TabPane>
            <TabPane label="规格参数">
              <div class="remarks-title">
                <span>规格参数</span>
              </div>
              <dl class="item-param-container">
                <dl class="item-param-box" v-for="(value,key) in param" :key="key">
          
                  <dt class="item-param-title">{{key}} </dt>
                  <dd class="item-param-content">{{value}}</dd>
                </dl>
              </dl>
            </TabPane>
          </Tabs>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowGoodsDetail",
  props: {
    pData: {
      type: Object,
      default: function() {
        return {
          id: "",
          name: "",
          value: 0,
          type: "",
          typeDesc: "",
          types: [],
          typeDescs: "",
          json: "",
          standard: "",
          status: "",
          model: "",
          buyType: "",
          createTime: "",
          allCount: null,
          num: null,
          wjIds: null,
          wjId: null,
          file: null,
          files: [],
          code: ""
        };
      }
    }
  },
  computed: {
    param() {
      return this.pData.json && JSON.parse(this.pData.json);
    }
  },
  data() {
    return {};
  },
  methods: {
    changeHeight() {
      let heightCss = window.getComputedStyle(this.$refs.itemIntroGoods).height;
      heightCss = parseInt(heightCss.substr(0, heightCss.length - 2)) + 89;
      this.$refs.itemIntroDetail.style.height = heightCss + "px";
    }
  }
};
</script>

<style scoped>
/***************商品详情介绍和推荐侧边栏开始***************/
.item-intro-show {
  width: 80%;
  margin: 15px auto;
  display: flex;
  flex-direction: row;
  background-color: #fff;
}
.item-intro-recommend {
  width: 200px;
  display: flex;
  flex-direction: column;
}
.item-intro-recommend-column {
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 5px #999;
}
.item-recommend-title {
  width: 100%;
  height: 38px;
  font-size: 16px;
  line-height: 38px;
  color: #fff;
  background-color: #e4393c;
  box-shadow: 0px 0px 5px #e4393c;
  text-align: center;
}
.item-recommend-column {
  margin-top: 15px;
}
.item-recommend-intro {
  padding: 5px 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
  cursor: pointer;
}
.item-recommend-img {
  width: 80%;
  margin: 0px auto;
  cursor: pointer;
}
.item-recommend-img img {
  width: 100%;
}
.item-recommend-top-num {
  color: #fff;
  margin: 0px 2px;
  padding: 1px 5px;
  border-radius: 12px;
  background-color: #e4393c;
}
.item-recommend-price {
  color: #e4393c;
  font-weight: bolder;
}
.item-intro-nav {
  width: 100%;
  height: 38px;
  background-color: #f7f7f7;
  border-bottom: 1px solid #e4393c;
}
.item-intro-nav ul {
  margin: 0px;
  padding: 0px;
  list-style: none;
}
.item-intro-nav li {
  float: left;
  height: 100%;
  width: 120px;
  line-height: 38px;
  text-align: center;
  color: #e4393c;
}
.item-intro-nav li:first-child {
  background-color: #e4393c;
  color: #fff;
}
.item-intro-img {
  width: 100%;
}
.item-intro-img img {
  width: 100%;
}
/************* 商品参数 *************/
.item-param-container {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
.item-param-box {
  position: relative;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  line-height: 2.2;
  clear: both;
}
.item-param-title {
  display: block;
  color: #232323;
  width: 300px;
  font-size: 14px;
  float: left;
  text-align: right;
  padding-right: 30px;
}
.item-param-content {
   font-size: 14px;
  display: block;
  margin-inline-start: 40px;
  margin-left: 350px;
  color: #999;
  word-break:break-all;
}

.remarks-title {
  padding-left: 15px;
  height: 36px;
  font-size: 16px;
  font-weight: bolder;
  line-height: 36px;
  color: #666666;
  background-color: #f7f7f7;
}
.remarks-analyse-box {
  padding: 15px;
  display: flex;
  align-items: center;
}
.remarks-analyse-goods {
  margin-left: 15px;
  margin-right: 15px;
}
.remarks-analyse-num {
  font-size: 26px;
}
.remarks-analyse-title {
  font-size: 12px;
  line-height: 20px;
}
.remarks-bar {
  padding-left: 15px;
  height: 36px;
  line-height: 36px;
  color: #666666;
  background-color: #f7f7f7;
}
.remarks-bar span {
  margin-right: 15px;
}
.remarks-box {
  padding: 15px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px #ccc dotted;
}
.remarks-user {
  width: 180px;
}
.remarks-user-name {
  padding-left: 15px;
}
.remarks-content-box {
  width: calc(100% - 180px);
}
.remarks-star {
  background-color: #fff;
}
.remarks-content {
  font-size: 14px;
  color: #232323;
  line-height: 28px;
}
.remarks-sub {
  margin-top: 15px;
  color: #ccc;
}
.remarks-time {
  margin-left: 15px;
}
.remarks-page {
  margin: 15px;
  display: flex;
  justify-content: flex-end;
}
/***************商品详情介绍和推荐侧边栏结束***************/
</style>

<style>
/* 改变便签页样式 */
.ivu-tabs-ink-bar {
  background-color: #e4393c !important;
}
.item-intro-detail > .ivu-tabs > .ivu-tabs-bar .ivu-tabs-tab {
  border-radius: 0px;
  color: #999;
  height: 38px;
  background: #f7f7f7;
}
.item-intro-detail > .ivu-tabs > .ivu-tabs-bar .ivu-tabs-tab-active {
  color: #fff;
  background-color: #e4393c;
}
.item-intro-detail > .ivu-tabs > .ivu-tabs-bar .ivu-tabs-tab-active:before {
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  color: #fff;
  background: #f7f7f7;
  position: absolute;
  top: 0;
  left: 0;
}
.ivu-rate-star-full:before,
.ivu-rate-star-half .ivu-rate-star-content:before {
  color: #e4393c;
}
</style>
