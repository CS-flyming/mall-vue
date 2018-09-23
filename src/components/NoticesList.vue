<template>
  <div style="padding-top:36px;">
    <!-- <Sreach></Sreach> -->
    <!-- <ShopHeader></ShopHeader> -->
    <!-- <GoodsDetailNav></GoodsDetailNav> -->
    <div class="shop-item-path" style="margin-top: 36px;">
      <div class="shop-nav-container">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem >公告列表</BreadcrumbItem>
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
import { getNoticeList } from "@/actions/index";
import pagination from "@/components/pagination";
export default {
  name: "NoticeDetail",
  beforeRouteEnter(to, from, next) {
    window.scrollTo(0, 0);
    next();
  },
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
          title: "公告标题",
          key: "name"
        },
        {
          title: "发布时间",
          key: "createTime"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path:
                          "/notice-detail?nid=" +
                          params.row.id +
                          "&nname=" +
                          params.row.name
                      });
                    }
                  }
                },
                "详情"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    getList() {
      this.isLoading = true;
      getNoticeList(this.filter).then(
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
  width: 80%;
}
</style>
