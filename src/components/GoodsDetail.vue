<template>
  <div style="padding-top:36px;">
    <Sreach></Sreach>
    <!-- <ShopHeader></ShopHeader> -->
    <!-- <GoodsDetailNav></GoodsDetailNav> -->
    <div class="shop-item-path">
      <div class="shop-nav-container">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem :to="{path:'/goodsList',query:query}">{{query.prname}}</BreadcrumbItem>
          <BreadcrumbItem>
            <Icon type="bag">{{pData.typeDesc}}</Icon>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
    </div>
    <!-- 商品信息展示 -->
    <ShowGoods :pData="pData"></ShowGoods>
    <!-- 商品详细展示 -->
    <ShowGoodsDetail :pData="pData"></ShowGoodsDetail>
    <Footer></Footer>
    <Spin size="large" fix v-if="isLoading"></Spin>
  </div>
</template>

<script>
import Sreach from "@/components/Sreach";
import GoodsDetailNav from "@/components/nav/GoodsDetailNav";
import ShopHeader from "@/components/header/ShopHeader";
import Footer from "@/components/footer/Footer";
import ShowGoods from "@/components/goodsDetail/ShowGoods";
import ShowGoodsDetail from "@/components/goodsDetail/ShowGoodsDetail";
import { getProductDetail } from "@/actions/index";
export default {
  name: "GoodsDetail",
  beforeRouteEnter(to, from, next) {
    window.scrollTo(0, 0);
    next();
  },
  data() {
    return {
      query: {},
      pData: {},
      isLoading: false
    };
  },
  created() {
    let { prcode, prname, id } = this.$route.query;
    this.query = this.$route.query;
    this.isLoading = true;
    getProductDetail(id).then(
      res => {
        this.isLoading = false;
        this.pData = res.data;
      },
      () => {
        this.isLoading = false;
      }
    );
  },
  components: {
    Sreach,
    ShopHeader,
    GoodsDetailNav,
    ShowGoods,
    ShowGoodsDetail,
    Footer
  }
};
</script>

<style scoped>
.shop-item-path {
  height: 38px;
  background-color: rgb(236, 235, 235);
  line-height: 38px;
  color: #2c2c2c;
}
.shop-nav-container {
  margin: 0px auto;
  width: 80%;
}
</style>
