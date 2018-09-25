<template>
  <div>
    <!-- <div class="nav-item">
      <ul>
        <li v-for="(item,index) in nav" :key="index">
          <a href="#">{{item}}</a>
        </li>
      </ul>
    </div> -->
    <div class="nav-body">
      <!-- 侧边导航 -->
      <div class="nav-side" ref="navSide">
        <ul>
          <template v-for="(item, index) in navSideArr">
              <li :key="index" @mouseenter="showDetail(index)" @mouseleave="hideDetail(index)">
                <span class="nav-side-item">{{item.name}}</span>
              </li>
          </template>
          
          <!-- <li @mouseenter="showDetail(1)" @mouseleave="hideDetail(1)">
            <span class="nav-side-item">家用电器</span>
          </li>
          <li @mouseenter="showDetail(2)" @mouseleave="hideDetail(2)">
            <span class="nav-side-item">手机</span> /
            <span class="nav-side-item">运营商</span> /
            <span class="nav-side-item">数码</span>
          </li>
          <li @mouseenter="showDetail(1)" @mouseleave="hideDetail(1)">
            <span class="nav-side-item">电脑</span> /
            <span class="nav-side-item">办公</span>
          </li>
          <li @mouseenter="showDetail(2)" @mouseleave="hideDetail(2)">
            <span class="nav-side-item">家居</span> /
            <span class="nav-side-item">家具</span> /
            <span class="nav-side-item">家装</span> /
            <span class="nav-side-item">厨具</span>
          </li>
          <li @mouseenter="showDetail(1)" @mouseleave="hideDetail(1)">
            <span class="nav-side-item">男装</span> /
            <span class="nav-side-item">女装</span> /
            <span class="nav-side-item">童装</span> /
            <span class="nav-side-item">内衣</span>
          </li>
          <li @mouseenter="showDetail(2)" @mouseleave="hideDetail(2)">
            <span class="nav-side-item">美妆个护</span> /
            <span class="nav-side-item">宠物</span>
          </li>
          <li @mouseenter="showDetail(1)" @mouseleave="hideDetail(1)">
            <span class="nav-side-item">女鞋</span> /
            <span class="nav-side-item">箱包</span> /
            <span class="nav-side-item">钟表</span> /
            <span class="nav-side-item">珠宝</span>
          </li>
          <li @mouseenter="showDetail(2)" @mouseleave="hideDetail(2)">
            <span class="nav-side-item">男鞋</span> /
            <span class="nav-side-item">运动</span> /
            <span class="nav-side-item">户外</span>
          </li>
          <li @mouseenter="showDetail(1)" @mouseleave="hideDetail(1)">
            <span class="nav-side-item">汽车</span> /
            <span class="nav-side-item">汽车用品</span>
          </li>
          <li @mouseenter="showDetail(2)" @mouseleave="hideDetail(2)">
            <span class="nav-side-item">母婴</span> /
            <span class="nav-side-item">玩具乐器</span>
          </li>
          <li @mouseenter="showDetail(1)" @mouseleave="hideDetail(1)">
            <span class="nav-side-item">食品</span> /
            <span class="nav-side-item">酒类</span> /
            <span class="nav-side-item">生鲜</span> /
            <span class="nav-side-item">特产</span>
          </li>
          <li @mouseenter="showDetail(2)" @mouseleave="hideDetail(2)">
            <span class="nav-side-item">礼品鲜花</span> /
            <span class="nav-side-item">农资绿植</span>
          </li>
          <li @mouseenter="showDetail(1)" @mouseleave="hideDetail(1)">
            <span class="nav-side-item">医药保健</span> /
            <span class="nav-side-item">计生情趣</span>
          </li>
          <li @mouseenter="showDetail(2)" @mouseleave="hideDetail(2)">
            <span class="nav-side-item">图书</span> /
            <span class="nav-side-item">音像</span> /
            <span class="nav-side-item">电子书</span>
          </li> -->
        </ul>
      </div>
      <div class="nav-content">
        <!-- 幻灯片 -->
        <div>
          <Carousel arrow="never" :height="560" style="width:985px;">
              <CarouselItem >
                <!-- <router-link to="/goodsList">-->
                  <img src="/static/bg.png" style="width:100%;height:100%;">
                <!-- </router-link> -->
              </CarouselItem>
          </Carousel>
        </div>
        <!-- <div class="nav-show">
          <div class="nav-show-img" v-for="(item, index) in marketing.activity" :key="index">
            <router-link to="/goodsList">
              <img :src="item">
            </router-link>
          </div>
        </div> -->
      </div>
    </div>
    <template v-for="(it, index) in navSideArr" >
        <transition name="fade" :key="'fd'+index">
          <div class="detail-item-panel panel-1" :duration="{ enter: 100, leave: 100 }" v-show="panelActive===index" @mouseenter="showDetail(index)" :ref="'itemPanel'+index" @mouseleave="hideDetail(index)">
            <!-- <div class="nav-detail-item">
              <span v-for="(item, index) in panelData1.navTags" :key="index">{{item}} > </span>
            </div> -->
            <ul style="padding-top:15px;">
              
                <template v-if="it.nodes&&it.nodes.length">
                  
                    <li v-for="(items, index) in it.nodes" :key="index" class="detail-item-row">
                      <Row>
                        <Col span="2">
                          <!-- <router-link :to="'/goodsList?prcode='+items.id+'&prname='+items.name"> -->
                            <span class="detail-item-title" style="font-weight:700;">{{items.name}}
                              <span class="glyphicon glyphicon-menu-right"></span>
                            </span>
                          <!-- </router-link> -->
                        </Col>
                        <Col span="20">
                          <Row>
                            <li v-for="(items2) in items.nodes" :key="items2.id" class="detail-item-row">
                              
                                <Col span="4">
                                  <router-link :to="'/goodsList?prcode='+items2.id+'&prname='+items2.name">
                                    <span class="detail-item-title">{{items2.name}}
                                      <span class="glyphicon glyphicon-menu-right"></span>
                                    </span>
                                  </router-link>
                                </Col>
                            </li>
                          </Row>
                        </Col>
                       </Row>
                    </li>
                </template>
                <template v-else>
                  <li>暂无分类</li>
                </template>
             
            </ul>
          </div>
        </transition>
    </template>
    
    <!-- <transition name="fade">
      <div class="detail-item-panel panel-2" :duration="{ enter: 100, leave: 100 }" v-show="panel2" @mouseenter="showDetail(2)" ref="itemPanel2" @mouseleave="hideDetail(2)">
        <div class="nav-detail-item">
          <span v-for="(item, index) in panelData2.navTags" :key="index">{{item}} > </span>
        </div>
        <ul>
          <li v-for="(items, index) in panelData2.classNav" :key="index" class="detail-item-row">
            <span class="detail-item-title">{{items.title}}
              <span class="glyphicon glyphicon-menu-right"></span>
            </span>
            <router-link to="/goodsList" v-for="(item, subIndex) in items.tags" :key="subIndex">
              <span class="detail-item">{{item}}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </transition> -->
    <div class="seckill-content">
        <div class="gg-container">
          <Card >
            <p slot="title">
                <Icon type="android-notifications-none"></Icon>
                公告
            </p>
             <a href="#" slot="extra" @click.prevent="getMoreNotice">
                查看更多
               <Icon type="arrow-right-a"></Icon>
            </a>
            <Row style="min-height: 350px;">
              <Col span="24" v-for="(item3, index3) in ggArr" :key="index3" style="padding:5px;">
                     <router-link style="text-decoration: underline;" :to="'/notice-detail?nid='+item3.id+'&nname='+item3.name" >{{item3.name}}</router-link>
              </Col>
            </Row>
          </Card>
         
        </div>
        <div class="hot-container">
              <Card >
                <p slot="title">
                    <Icon type="android-notifications-none"></Icon>
                    热销商品
                </p>
                <Row style="min-height: 350px;">
                  <Col span="24" v-for="(item2, index2) in testArr" :key="index2" style="padding:5px;">
                         
                        <router-link style="color:#666;"  :to="{path:'/goodsDetail',query:{id:item2.productId,prcode:item2.code,prname:item2.name}}">
                          <Row>
                            <Col span="20">{{item2.name}}</Col>
                            <Col span="4" style="color:#57a3f3;"><Icon type="android-star-outline"></Icon>{{item2.num}}</Col>
                          </Row>
                        </router-link>
                  </Col>
                </Row>
              </Card>      
              </div>
            </div>
        </div>
  
</template>

<script>
import store from "@/vuex/store";
import { mapState } from "vuex";
import {
  getPro,
  getProductList,
  getProductHot,
  getGgList
} from "@/actions/index";
export default {
  name: "HomeNav",
  data() {
    return {
      testArr: [],
      ggArr: [],
      panel1: false,
      panel2: false,
      panelActive: "",
      navSideArr: []
    };
  },
  computed: {
    ...mapState(["marketing"])
  },
  methods: {
    getMoreNotice() {
      this.$router.push({
        name: "NoticesList"
      });
    },
    showDetail(index) {
      this.panelActive = index;
    },
    getGgList() {
      getGgList().then(res => {
        this.ggArr = res.data.rows;
      });
    },
    hideDetail(index) {
      this.panelActive = "";
      // index === 1 ? (this.panel1 = false) : (this.panel2 = false);
    },
    getProductHot() {
      //debugger;
      getProductHot().then(res => {
        this.testArr = res.data;
      });
    }
  },

  created() {
    getPro().then(res => {
      this.navSideArr = res.data;
      this.$nextTick(() => {
        this.navSideArr.map((v, index) => {
          // console.log(this.$refs.navSide.offsetTop);
          this.$refs["itemPanel" + index][0].style.left =
            this.$refs.navSide.offsetLeft +
            this.$refs.navSide.offsetWidth +
            "px";

          this.$refs["itemPanel" + index][0].style.top =
            this.$refs.navSide.offsetTop + "px";
          // this.$refs.itemPanel2.style.top = this.$refs.navSide.offsetTop + "px";
        });
      });
    });
    this.getProductHot();
    this.getGgList();
  },
  mounted() {},
  updated() {
    // this.$refs.itemPanel1.style.left =
    //   this.$refs.navSide.offsetLeft + this.$refs.navSide.offsetWidth + "px";
    // this.$refs.itemPanel2.style.left =
    //   this.$refs.navSide.offsetLeft + this.$refs.navSide.offsetWidth + "px";
    // this.$refs.itemPanel1.style.top = this.$refs.navSide.offsetTop + "px";
    // this.$refs.itemPanel2.style.top = this.$refs.navSide.offsetTop + "px";
    // this.navSideArr.map((v, index) => {
    //   this.$refs["itemPanel" + index][0].style.left =
    //     this.$refs.navSide.offsetLeft + this.$refs.navSide.offsetWidth + "px";
    //   this.$refs["itemPanel" + index][0].style.top =
    //     this.$refs.navSide.offsetTop + "px";
    // this.$refs.itemPanel2.style.top = this.$refs.navSide.offsetTop + "px";
    // });
  },
  store
};
</script>

<style scoped>
.nav-item {
  width: 680px;
  height: 36px;
  margin: 0px auto;
}
.nav-item ul {
  list-style: none;
  margin-left: 15px;
}
.nav-item li {
  float: left;
  font-size: 16px;
  font-weight: bold;

  margin-left: 30px;
}
.nav-item a {
  text-decoration: none;
  color: #555555;
}
.nav-item a:hover {
  color: #d9534f;
}
/*大的导航信息，包含导航，幻灯片等*/
.nav-body {
  width: 1200px;
  max-width: 1200px;
  height: 560px;
  min-height: 560px;
  margin: 0px auto;
}
.nav-side {
  width: 200px;
  height: 100%;
  min-height: 560px;
  padding: 0px;
  color: #888;
  float: left;
  background-color: #fff;
}
.nav-side ul {
  width: 100%;
  padding: 0px;
  padding-top: 15px;
  list-style: none;
}
.nav-side li {
  padding: 8px;
  padding-left: 25px;
  font-size: 17px;
  line-height: 26px;
  white-space: pre;
}
.nav-side li:hover {
  background: #f6f6f6;
}
.nav-side-item:hover {
  cursor: pointer;
  color: #c81623;
}

/*导航内容*/
.nav-content {
  width: 985px;
  max-width: 985px;
  max-height: 560px;
  margin-left: 15px;
  overflow: auto;
  float: left;
}
/*导航图片*/
.nav-show-img {
  margin-top: 10px;
  float: left;
}
.nav-show-img:nth-child(2) {
  margin-left: 12px;
}
/*显示商品*/
.content {
  width: 100%;
}
/*显示商品详细信息*/
.detail-item-panel {
  width: 1000px;
  height: 560px;
  min-height: 560px;
  background-color: #ffffff;
  border: 1px solid #f6f6f6;
  position: absolute;
  top: 168px;
  left: 389px;
  z-index: 999;
}
.nav-detail-item {
  margin-left: 26px;
  margin-top: 15px;
  margin-bottom: 15px;
  cursor: pointer;
  color: #eee;
}
.nav-detail-item span {
  padding: 6px;
  padding-left: 12px;
  margin-left: 15px;
  font-size: 12px;
  background-color: #6e6568;
}
.nav-detail-item span:hover {
  margin-left: 15px;
  background-color: #f44336;
}
.detail-item-panel ul {
  list-style: none;
}
.detail-item-panel li {
  line-height: 38px;
  margin-left: 40px;
}
.detail-item-title {
  padding-right: 6px;
  font-weight: 400;
  font-size: 14px;
  cursor: pointer;
  color: #181818;
}
.detail-item-title:hover {
  color: #d9534f;
}
.detail-item-row a {
  color: #555555;
}
.detail-item {
  font-size: 14px;
  padding-left: 12px;
  padding-right: 8px;
  cursor: pointer;
  border-left: 1px solid #ccc;
}
.detail-item:hover {
  color: #d9534f;
}
.seckill {
  width: 100%;
  height: 330px;
  margin: 15px auto;
  background-color: #fff;
}
.seckill-head {
  width: 100%;
  height: 50px;
  background-color: #e01222;
}
.seckill-icon {
  width: 68px;
  height: 100%;
  float: left;
}
.seckill-icon img {
  width: 35px;
  height: 35px;
  margin-top: 6px;
  margin-left: 15px;
  animation-name: shake-clock;
  animation-duration: 0.3s;
  animation-iteration-count: infinite; /*设置无线循环*/
}
/*定义闹钟震动动画关键帧*/
@keyframes shake-clock {
  0% {
    transform: rotate(-8deg);
  }
  50% {
    transform: rotate(8deg);
  }
  100% {
    transform: rotate(-8deg);
  }
}
.seckill-text {
  width: 300px;
  height: 100%;
  float: left;
}
.seckill-text .seckill-title {
  font-size: 22px;
  line-height: 50px;
  color: #fff;
}
.seckill-text .seckill-remarks {
  margin-left: 5px;
  font-size: 10px;
  color: #fff;
}
/*倒计时*/
.count-down {
  height: 100%;
  margin-right: 30px;
  line-height: 50px;
  float: right;
}
.count-down-text {
  color: #fff;
}
.count-down-num {
  padding: 3px;
  border-radius: 5px;
  background-color: #440106;
  font-size: 26px;
  font-weight: bold;
  color: #f90013;
}
.count-down-point {
  font-size: 26px;
  font-weight: bold;
  color: #440106;
}

.seckill-content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.gg-container {
  flex: 1;
  padding: 10px;
}
.hot-container {
  flex: 0 0 680px;
  padding: 10px;
}
.seckill-item {
  width: 183px;
  height: 250px;
  margin-top: 15px;
  margin-left: 15px;
  box-shadow: 0px 0px 8px #ccc;
  cursor: pointer;
  float: left;
}
.seckill-item-img {
  width: 160px;
  height: 160px;
  margin: 0px auto;
  overflow: hidden;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
}
.seckill-item-img img {
  width: 130px;
  height: 130px;
  margin-left: 15px;
  margin-top: 15px;
  transition: margin-top 0.3s;
}
.seckill-item-img:hover img {
  margin-top: 6px;
  transition: margin-top 0.3s;
}
.seckill-item-info {
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 12px;
  color: #009688;
}
.seckill-item-info i:first-child {
  font-size: 14px;
}
.seckill-price {
  margin-right: 5px;
  font-size: 25px;
  font-weight: bold;
}
/*****************************秒杀专栏结束*****************************/

/*****************************商品专栏开始*****************************/
.item-class {
  width: 100%;
  height: 470px;
  margin-top: 15px;
  background-color: #fff;
}
.item-class-head {
  width: 100%;
  height: 50px;
  background-color: #4488a7;
}
.item-class-eat-head {
  background-color: #ecb226;
}
.item-class-head ul {
  list-style: none;
  float: right;
  margin-right: 30px;
  line-height: 50px;
}
.item-class-head a {
  padding: 6px;
  margin-left: 15px;
  font-size: 12px;
  background-color: #6da6be;
  border: 1px solid #6da6be;
  text-decoration: none;
  color: #fff;
}
.item-class-eat-head a {
  background-color: #eeb955;
  border: 1px solid #eeb955;
}
.item-class-head a:hover {
  border: 1px solid #fff;
}
.item-class-head li {
  float: left;
}
.item-class-title {
  font-size: 25px;
  line-height: 50px;
  color: #fff;
  margin-left: 15px;
}
.item-class-content {
  width: 49%;
  cursor: pointer;
  border-right: 1px solid #ccc;
  margin-left: 0.9%;
  /*background-color: #cff;*/
  float: left;
}
.item-class-content:nth-child(odd) {
  border: none;
}
.item-content-top {
  width: 100%;
  height: 260px;
}
.item-big-img {
  width: 180px;
  height: 260px;
  overflow: hidden;
  float: left;
}
.item-big-img img {
  margin-left: 0px;
  transition: margin-left 0.3s;
}
.item-big-img:hover img {
  margin-left: -15px;
  transition: margin-left 0.3s;
}
.item-four-img {
  width: 303px;
  margin-left: 8px;
  float: left;
}
.item-four-detail img {
  margin-left: 0px;
  transition: margin-left 0.3s;
}
.item-four-detail:hover img {
  margin-left: -6px;
  transition: margin-left 0.3s;
}
.item-four-detail {
  width: 152px;
  height: 130px;
  margin-left: -1px;
  float: left;
}
.item-four-detail:first-child {
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.item-four-detail:last-child {
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
}
.item-four-detail-text {
  width: 50px;
  margin-left: 5px;
  margin-top: 15px;
  float: left;
}
.item-four-detail-img {
  width: 96px;
  margin-top: 15px;
  overflow: hidden;
  float: left;
}
.item-four-detail-img img {
  margin-left: 5px;
  width: 90px;
}
.pt_bi_tit {
  font-weight: bold;
  font-size: 12px;
  color: #4488a7;
}
.pt_bi_tit-eat {
  color: #ecb127;
}
.pt_bi_promo {
  color: #00695c;
}
.item-content-bottom {
  width: 100%;
  margin-top: 8px;
}
.item-content-bottom-img {
  width: 156px;
  margin-right: 8px;
  overflow: hidden;
  float: left;
}
.item-content-bottom-img img {
  margin-left: 0px;
  transition: margin-left 0.3s;
}
.item-content-bottom-img:hover img {
  margin-left: -15px;
  transition: margin-left 0.3s;
}
</style>
