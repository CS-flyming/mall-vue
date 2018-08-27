<template>
  <div style="padding-top: 36px;">
    <!-- <Sreach></Sreach> -->
    <GoodsListNav></GoodsListNav>
    <div class="container">
      <div class="bread-crumb">
        <Breadcrumb>
          <BreadcrumbItem to="/">
            <Icon type="ios-home-outline"></Icon> 首页
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Icon type="bag"></Icon>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <!-- 商品标签导航 -->
      <GoodsClassNav @handle-click="handleFilter"></GoodsClassNav>
      <!-- 商品展示容器 -->
      <div class="goods-box">
        <!-- <div class="as-box">
          <div class="item-as-title">
            <span>商品精选</span>
            <span>广告</span>
          </div>
          <div class="item-as" v-for="(item,index) in asItems" :key="index">
            <div class="item-as-img">
              <img :src="item.img" alt="">
            </div>
            <div class="item-as-price">
              <span>
                <Icon type="social-yen text-danger"></Icon>
                <span class="seckill-price text-danger">{{item.price}}</span>
              </span>
            </div>
            <div class="item-as-intro">
              <span>{{item.intro}}</span>
            </div>
            <div class="item-as-selled">
              已有<span>{{item.num}}</span>人评价
            </div>
          </div>
        </div> -->
        <div class="goods-list-box">
          <!-- <div class="goods-list-tool">
            <ul>
              <li v-for="(item,index) in goodsTool" :key="index" @click="orderBy(item.en, index)"><span :class="{ 'goods-list-tool-active': isAction[index]}">{{item.title}} <Icon :type="icon[index]"></Icon></span></li>
            </ul>
          </div> -->
          <div class="goods-list">
            <template v-if="orderGoodsList.length">
                <div class="goods-show-info" v-for="(item, index) in orderGoodsList" :key="index">
                  <router-link :to="{path:'/goodsDetail',query:{id:item.id,prcode:query.prcode,prname:query.prname}}">
                  <div class="goods-show-img">
                    <img v-lazy="item.file&&item.file.url+'?type=small'"/>
                  </div>
                  <div class="goods-show-price">
                    <span>
                      <Icon type="social-yen text-danger"></Icon>
                      <span class="seckill-price text-danger">{{item.value}}</span>
                    </span>
                  </div>
                  <div class="goods-show-detail">
                    <span>{{item.name}}</span>
                  </div>
                  <!-- <div class="goods-show-num">
                    已有<span>{{item.remarks}}</span>人评价
                  </div>
                  <div class="goods-show-seller">
                    <span>{{item.shopName}}</span>
                  </div> -->
                  </router-link>
                </div>
            </template>
           
            <div v-else class="goods-show-info" style="margin:0 auto;">
                <img src="/static/no-data.png" alt="" class="no-data" >
            </div>
          </div>
        </div>
      </div>
      <div class="goods-page">
        <!-- <Page :total="100" show-sizer></Page> -->
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
      </div>
    </div>
    <Footer></Footer>
    <Spin size="large" fix v-if="isLoading"></Spin>
  </div>
</template>

<script>
import Sreach from "@/components/Sreach";
import GoodsListNav from "@/components/nav/GoodsListNav";
import GoodsClassNav from "@/components/nav/GoodsClassNav";
import Footer from "@/components/footer/Footer";
import { getProductList } from "@/actions/index";
import pagination from "@/components/pagination";
export default {
  name: "GoodsList",
  beforeRouteEnter(to, from, next) {
    window.scrollTo(0, 0);
    next();
  },
  data() {
    return {
      sreachItem: "",
      // isAction: [true, false, false],
      icon: ["arrow-up-a", "arrow-down-a", "arrow-down-a"],
      isLoading: false,
      orderGoodsList: [],
      // orderGoodsList1: [
      //   {
      //     img: "static/img/goodsList/item-show-1.jpg",
      //     price: 36.6,
      //     intro:
      //       "SKSK 苹果7/7plus手机壳 iPhone 7 Plus保护套全包硬壳男女磨砂防摔 火影红(苹",
      //     remarks: 6160,
      //     shopName: "元亨利配件专营店",
      //     sale: 9900
      //   },
      //   {
      //     img: "static/img/goodsList/item-show-2.jpg",
      //     price: 28.0,
      //     intro:
      //       "蒙奇奇 苹果6s手机壳磨砂防摔保护套 适用于iphone6/6s/6sPlus/6plus 6/6s 4.7英",
      //     remarks: 3000,
      //     shopName: "monqiqi旗舰店",
      //     sale: 9600
      //   },
      //   {
      //     img: "static/img/goodsList/item-show-3.jpg",
      //     price: 15.0,
      //     intro: "BIAZE 苹果6/6s手机壳 苹果iphone6s 4.7英寸透明手机套 清爽系列",
      //     remarks: 2800,
      //     shopName: "BIAZE官方旗舰店",
      //     sale: 8900
      //   },
      //   {
      //     img: "static/img/goodsList/item-show-4.jpg",
      //     price: 29.9,
      //     intro: "慕臣 苹果6s手机壳全包防摔磨砂软保护套男女 适用于iPhone6splus",
      //     remarks: 9000,
      //     shopName: "歌乐力手配专营店",
      //     sale: 8600
      //   },
      //   {
      //     img: "static/img/goodsList/item-show-5.jpg",
      //     price: 15.0,
      //     intro: "BIAZE 苹果6/6s手机壳 苹果iphone6s 4.7英寸透明手机套 清爽系列",
      //     remarks: 6160,
      //     shopName: "BIAZE官方旗舰店",
      //     sale: 8560
      //   },
      //   {
      //     img: "static/img/goodsList/item-show-6.jpg",
      //     price: 28.0,
      //     intro: "慕臣 苹果6s手机壳全包防摔磨砂软保护套男女 适用于iPhone6splus",
      //     remarks: 9006,
      //     shopName: "歌乐力手配专营店",
      //     sale: 8530
      //   },
      //   {
      //     img: "static/img/goodsList/item-show-7.jpg",
      //     price: 15.0,
      //     intro: "BIAZE 苹果6/6s手机壳 苹果iphone6s 4.7英寸透明手机套 清爽系列",
      //     remarks: 8666,
      //     shopName: "BIAZE官方旗舰店",
      //     sale: 8360
      //   },
      //   {
      //     img: "static/img/goodsList/item-show-8.jpg",
      //     price: 29.9,
      //     intro: "慕臣 苹果6s手机壳全包防摔磨砂软保护套男女 适用于iPhone6splus",
      //     remarks: 6080,
      //     shopName: "歌乐力手配专营店",
      //     sale: 7560
      //   },
      //   {
      //     img: "static/img/goodsList/item-show-1.jpg",
      //     price: 36.6,
      //     intro:
      //       "SKSK 苹果7/7plus手机壳 iPhone 7 Plus保护套全包硬壳男女磨砂防摔 火影红(苹",
      //     remarks: 6160,
      //     shopName: "元亨利配件专营店",
      //     sale: 7360
      //   },
      //   {
      //     img: "static/img/goodsList/item-show-2.jpg",
      //     price: 28.0,
      //     intro:
      //       "蒙奇奇 苹果6s手机壳磨砂防摔保护套 适用于iphone6/6s/6sPlus/6plus 6/6s 4.7英",
      //     remarks: 3000,
      //     shopName: "monqiqi旗舰店",
      //     sale: 6960
      //   },
      //   {
      //     img: "static/img/goodsList/item-show-3.jpg",
      //     price: 15.0,
      //     intro: "BIAZE 苹果6/6s手机壳 苹果iphone6s 4.7英寸透明手机套 清爽系列",
      //     remarks: 2800,
      //     shopName: "BIAZE官方旗舰店",
      //     sale: 6560
      //   },
      //   {
      //     img: "static/img/goodsList/item-show-4.jpg",
      //     price: 29.9,
      //     intro: "慕臣 苹果6s手机壳全包防摔磨砂软保护套男女 适用于iPhone6splus",
      //     remarks: 9000,
      //     shopName: "歌乐力手配专营店",
      //     sale: 6360
      //   },
      //   {
      //     img: "static/img/goodsList/item-show-5.jpg",
      //     price: 15.0,
      //     intro: "BIAZE 苹果6/6s手机壳 苹果iphone6s 4.7英寸透明手机套 清爽系列",
      //     remarks: 6160,
      //     shopName: "BIAZE官方旗舰店",
      //     sale: 5530
      //   },
      //   {
      //     img: "static/img/goodsList/item-show-6.jpg",
      //     price: 28.0,
      //     intro: "慕臣 苹果6s手机壳全包防摔磨砂软保护套男女 适用于iPhone6splus",
      //     remarks: 9006,
      //     shopName: "歌乐力手配专营店",
      //     sale: 5560
      //   },
      //   {
      //     img: "static/img/goodsList/item-show-7.jpg",
      //     price: 15.0,
      //     intro: "BIAZE 苹果6/6s手机壳 苹果iphone6s 4.7英寸透明手机套 清爽系列",
      //     remarks: 8666,
      //     shopName: "BIAZE官方旗舰店",
      //     sale: 5260
      //   },
      //   {
      //     img: "static/img/goodsList/item-show-8.jpg",
      //     price: 29.9,
      //     intro: "慕臣 苹果6s手机壳全包防摔磨砂软保护套男女 适用于iPhone6splus",
      //     remarks: 6080,
      //     shopName: "歌乐力手配专营店",
      //     sale: 3560
      //   }
      // ],
      filter: {
        limit: 10,
        offset: 0,
        name: "",
        type: ""
      },
      total: 0,
      query: {
        prcode: "",
        prname: ""
      }
    };
  },
  computed: {},
  methods: {
    loadData() {
      this.isLoading = true;
      getProductList(this.filter).then(
        res => {
          this.isLoading = false;
          this.orderGoodsList = res.data.rows;
          this.total = res.data.total;
        },
        () => {
          this.isLoading = false;
        }
      );
    },
    handleFilter(type) {
      this.filter.type = type;
      this.filter.offset = 0;
      this.loadData();
    }
  },
  created() {
    let { prcode, prname, sreachItem } = this.$route.query;
    this.query = this.$route.query;
    this.filter.type = prcode;
    this.filter.name = sreachItem;
    // this.loadData();
  },
  components: {
    Sreach,
    GoodsListNav,
    GoodsClassNav,
    Footer,
    pagination
  }
};
</script>

<style scoped>
.container {
  margin: 15px auto;
  width: 93%;
  min-width: 1000px;
}
.text-danger {
  color: #a94442;
}
.seckill-price {
  margin-right: 5px;
  font-size: 25px;
  font-weight: bold;
}
.goods-box {
  display: flex;
}
/* ---------------侧边广告栏开始------------------- */
.as-box {
  width: 200px;
  border: 1px solid #ccc;
}
.item-as-title {
  width: 100%;
  height: 36px;
  color: #b1191a;
  line-height: 36px;
  font-size: 18px;
}
.item-as-title span:first-child {
  margin-left: 20px;
}
.item-as-title span:last-child {
  float: right;
  margin-right: 15px;
  font-size: 10px;
  color: #ccc;
}
.item-as {
  width: 160px;
  margin: 18px auto;
}
.item-as-img {
  width: 160px;
  height: 160px;
  margin: 0px auto;
}
.item-as-price span {
  font-size: 18px;
}
.item-as-intro {
  margin-top: 5px;
  font-size: 12px;
}
.item-as-selled {
  margin-top: 5px;
  font-size: 12px;
}
.item-as-selled span {
  color: #005aa0;
}
/* ---------------侧边广告栏结束------------------- */

/* ---------------商品栏开始------------------- */
.goods-list-box {
  /* margin-left: 15px;
  width: calc(100% - 215px); */
  width: 1200px;
  margin: 0 auto;
}
.goods-list-tool {
  width: 100%;
  height: 38px;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
}
.goods-list-tool ul {
  padding-left: 15px;
  list-style: none;
}
.goods-list-tool li {
  cursor: pointer;
  float: left;
}
.goods-list-tool span {
  padding: 5px 8px;
  border: 1px solid #ccc;
  border-left: none;
  line-height: 36px;
  background-color: #fff;
}
.goods-list-tool span:hover {
  border: 1px solid #e4393c;
}
.goods-list-tool i:hover {
  color: #e4393c;
}
.goods-list-tool-active {
  color: #fff;
  border-left: 1px solid #ccc;
  background-color: #e4393c !important;
}

.goods-list {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
}
.goods-show-info {
  flex: 0 0 240px;
  /* width: 240px; */
  padding: 10px;
  margin: 15px 0px;
  border: 1px solid #fff;
  cursor: pointer;
}
.goods-show-info:hover {
  border: 1px solid #ccc;
  box-shadow: 0px 0px 15px #ccc;
}
.goods-show-img img {
  width: 200px;
  height: 200px;
}
.goods-show-price {
  margin-top: 6px;
}
.goods-show-detail {
  font-size: 12px;
  margin: 6px 0px;
}
.goods-show-num {
  font-size: 12px;
  margin-bottom: 6px;
  color: #009688;
}
.goods-show-num span {
  color: #005aa0;
  font-weight: bold;
}
.goods-show-seller {
  font-size: 12px;
  color: #e4393c;
}
.goods-page {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
/* ---------------商品栏结束------------------- */
</style>
