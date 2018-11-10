<template>
  <div>
    <Card class="filter-wrap">
        <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right" :label-width="120" >
            <Row>
                <Col span="12">
             <FormItem label="开始时间" prop="startTime">
                    <DatePicker v-model="filter.startTime"  format="yyyy-MM-dd"   type="date"  placeholder="选择开始时间" style="width: 100%;"></DatePicker>
                </FormItem>
                <FormItem label="结束时间" prop="endTime">
                    <DatePicker v-model="filter.endTime"  format="yyyy-MM-dd"   type="date"  placeholder="选择结束时间" style="width: 100%;"></DatePicker>
                </FormItem>     
                </Col>
                 <Col span="12">
                <FormItem label="订单状态">
                      <Select v-model="filter.status" clearable>
                          <Option value="1">初审中</Option>
                          <Option value="2">复审中</Option>
                          <Option value="3">拒绝</Option>
                          <Option value="5">完成</Option>
                          <Option value="6">入库</Option>
                      </Select>
                  </FormItem>
                  <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                </FormItem>
              </Col>
             
            </Row>
            
        </Form>
    </Card>
    <Table border :columns="columns" :data="data" size="default" no-data-text="你还有订单，快点去购物吧"></Table>
    <div class="page-size">
      <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
    </div>
    <Spin size="large" fix v-if="spinShow"></Spin>
    <Modal
        v-model="showDetailModalFlag"
        width="800"
        title="订单详情">
        <Table border ref="selection" :columns="columns2" :data="selectOrder" size="large" ></Table>
        <div slot="footer">
             
        </div>
    </Modal>
  </div>
</template>

<script>
import pagination from "@/components/pagination";
import { getOrderInList, getOrderDetail, takeProduct,exportOrder } from "@/actions/index";
export default {
  name: "MyOrder",
  components: {
    pagination
  },
  data() {
    return {
      data: [],
      total: 0,
      spinShow: false,
      columns2: [
        {
          title: "商品名称",
          render: (h, params) => {
            return h("div", params.row.product.name || "--");
          }
        },
        {
          title: "规格",
          render: (h, params) => {
            return h("div", params.row.product.standard || "--");
          }
        },
        {
          title: "型号",
          render: (h, params) => {
            return h("div", params.row.product.model || "--");
          }
        },
        {
          title: "价格",
          render: (h, params) => {
            return h("div", params.row.product.value || "--");
          }
        },
        {
          title: "采购数量",
          key: "num",
          align: "center"
        },
        {
          title: "经费类型",
          key: "typeDesc",
          align: "center"
        }
      ],
      columns: [
        {
          title: "订单号",
          key: "orderNo",
          width: 140,
          align: "center"
        },
        {
          title: "金额",
          key: "zj",
          
        },
        {
          title: "状态",
          key: "statusDesc",
           width: 300
        },
        {
          title: "提交时间",
          width: 150,
          key: "createTime",
          align: "center"
        },
        {
          title: "操作",
          width: 200,
          align:"left",
          render: (h, params) => {
            let sh =
              params.row.status == "5"
                ? h(
                    "Poptip",
                    {
                      props: {
                        confirm: true,
                        title: "您确定要收货?",
                        transfer: true
                      },
                      on: {
                        "on-ok": () => {
                          takeProduct(params.row.id).then(res => {
                            this.$Message.success("收货成功");
                            this.handleFilter();
                          });
                        }
                      }
                    },
                    [
                      h(
                        "Button",
                        {
                          style: {
                            margin: "0 5px"
                          },
                          props: {
                            type: "error",
                            placement: "top"
                          }
                        },
                        "收货"
                      )
                    ]
                  )
                : "";
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary"
                  },
                  on: {
                    click: () => {
                      window.location.href= axios.defaults.baseURL+"/export/order/my"+params.row.id;
                      //exportOrder(params.row.id);
                    }
                  }
                },
                "导出"
              ),
              sh
            ]);
          }
        }
      ],
      filter: {
        limit: 10,
        offset: 0,
        status: "",
        level: "",
        type: "",
        startTime:"",
        endTime:""
      },
      selectOrder: [],
      showDetailModalFlag: false
    };
  },
  methods: {
    loadData() {
      this.loading = true;
      getOrderInList(this.filter).then(res => {
        this.loading = false;
        this.data = res.data.rows;
        this.total = res.data.total;
      });
    },
    handleFilter() {
      this.filter.offset = 0;
      this.loadData();
    },
    showDetailModal(id) {
      this.spinShow = true;
      getOrderDetail(id).then(
        res => {
          this.spinShow = false;
          this.selectOrder = res.data;
          this.showDetailModalFlag = true;
        },
        () => {
          this.spinShow = false;
        }
      );
    }
  }
};
</script>

<style scoped>
.page-size {
  margin: 15px 0px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
