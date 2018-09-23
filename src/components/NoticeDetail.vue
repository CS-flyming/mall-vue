<template>
  <div style="padding-top:36px;">
    <!-- <Sreach></Sreach> -->
    <!-- <ShopHeader></ShopHeader> -->
    <!-- <GoodsDetailNav></GoodsDetailNav> -->
    <div class="shop-item-path" style="margin-top: 36px;">
      <div class="shop-nav-container">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem >{{query.nname}}</BreadcrumbItem>
        </Breadcrumb>
      </div>
    </div>
    <div>
         <Card>
            <p slot="title">
                {{pData.name}}
            </p>
            <div>
                {{pData.info}}
            </div>
            <div style="margin-top:20px;">
                <Row>
                    <Col span="2">附件：</Col> 
                    <Col span="20">
                         <Row>
                            <Col v-for="item in pData.files" :key="item.id" span="6">
                                <a :href="item.url" target="_blanks">{{item.name}}</a>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </Card>
    </div>
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
import { getNoticeDetail } from "@/actions/index";
export default {
  name: "NoticeDetail",
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
    let { nid, nname } = this.$route.query;
    this.query = this.$route.query;
    this.isLoading = true;
    getNoticeDetail(nid).then(
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
