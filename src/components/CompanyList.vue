<template>
  <div style="padding-top:36px;">
    <div class="shop-item-path" style="margin-top: 36px;">
      <div class="shop-nav-container">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem >供货商目录</BreadcrumbItem>
        </Breadcrumb>
      </div>
    </div>
    <div>
        <Table border :loading="isLoading" :columns="columns" :data="pData"></Table>
       <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="getList"></pagination>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Sreach from "@/components/Sreach";
import GoodsDetailNav from "@/components/nav/GoodsDetailNav";
import ShopHeader from "@/components/header/ShopHeader";
import Footer from "@/components/footer/Footer";
import ShowGoods from "@/components/goodsDetail/ShowGoods";
import ShowGoodsDetail from "@/components/goodsDetail/ShowGoodsDetail";
import { companyList } from "@/actions/index";
import pagination from "@/components/pagination";
export default {
  data() {
    return {
      pData: [],
      isLoading: false,
      total: 0,
      filter: {
        limit: 15,
        offset: 0
      },
      total: 0,
      columns: [
        {
          title: "供货商名称",
          key: "name"
        },
        {
          title: "联系人",
          key: "user"
        },
         {
          title: "地址",
          key: "address"
        },
         {
          title: "经营范围",
          key: "width"
        },
        {
          title: "备注",
          key: "info"
        },
         {
          title: "联系人电话",
          key: "phone"
        },
        {
          title: "录入时间",
          key: "createTime"
        },
      ]
    };
  },
  methods: {
    getList() {
      this.isLoading = true;
      companyList(this.filter).then(
        res => {
          this.isLoading = false;
          this.pData = res.data.rows;
          this.total = res.data.total;
        },
        () => {
          this.isLoading = false;
        }
      );
    }
  },
  created() {
    this.getList();
  },
  components: {
    Sreach,
    ShopHeader,
    GoodsDetailNav,
    ShowGoods,
    ShowGoodsDetail,
    Footer,
    pagination
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
  width: 98%;
}
</style>
