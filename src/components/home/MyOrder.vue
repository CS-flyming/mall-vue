<style lang="less">
#printMe {
  width: 595px;
  margin: 0 auto;
  color: #333;
  font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;
}
.print-content {
  width: 100%;
  position: relative;
  border: 1px solid #888;
}
.print-header {
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  padding: 5px 0;
}
.print-base-info,
.print-order-info,
.print-order-content {
  font-size: 12px;
  border-top: 1px solid #888;
}
.print-flex {
  display: flex;
}
.print-flex-item {
  flex: 1;
  min-height: 20px;
  padding: 2px;
}
.print-flex-item1 {
  flex: 1;
  min-height: 40px;
  max-width: 60px;
  padding: 2px;
}
.print-flex-item2 {
  flex: 1;
  min-height: 40px;
  padding: 2px;
}
.print-border-left {
  border-left: 1px solid #888;
}
.print-float-right {
  float: right;
}
.mg-rt-8 {
  margin-right: 8px;
}

.flex-3 {
  flex: 0 0 30%;
  word-break: break-all;
}
.flex-1 {
  flex: 0 0 10%;
  word-break: break-all;
}
.flex-2 {
  flex: 0 0 25%;
  word-break: break-all;
}
.flex-7 {
  flex: 0 0 70%;
  word-break: break-all;
}
</style>
<template>
  <div>
    <Card class="filter-wrap">
      <Form
        @submit.native.prevent="handleFilter"
        :model="filter"
        ref="filterForm"
        label-position="right"
        :label-width="120"
      >
        <Row>
          <Col span="8">
            <FormItem label="采购类型">
              <Select v-model="filter.type" clearable>
                <Option value="1">集中采购</Option>
                <Option value="2">自行采购</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="紧急程度">
              <Select v-model="filter.level" clearable>
                <Option value="1">月度上报</Option>
                <Option value="2">紧急购买</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="订单状态">
              <Select v-model="filter.status" clearable>
                <Option value="1">初审中</Option>
                <Option value="2">复审中</Option>
                <Option value="3">拒绝</Option>
                <Option value="5">完成</Option>
                <Option value="6">入库</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem class="submit">
              <Button type="primary" html-type="submit">筛选</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <Table border :columns="columns" :data="data" size="large" no-data-text="你还有订单，快点去购物吧"></Table>
    <div class="page-size">
      <pagination
        :total="total"
        :limit.sync="filter.limit"
        :offset.sync="filter.offset"
        @on-load="loadData"
      ></pagination>
    </div>
    <Spin size="large" fix v-if="spinShow"></Spin>
    <Modal v-model="showDetailModalFlag" width="800" title="订单详情">
      <Table border ref="selection" :columns="columns2" :data="selectOrder" size="large"></Table>
      <div slot="footer">
        <Button type="primary" @click="shOrder" v-if="shForm.status=='7'">收货</Button>
      </div>
    </Modal>

    <Modal v-model="showVerifyModal5" title="编辑" @on-cancel="handleCacelModal5">
      <Form
        :model="verifyForm5"
        ref="verifyForm5"
        label-position="right"
        :label-width="120"
        :rules="rules5"
      >
        <FormItem label="存储位置" prop="location">
          <Input v-model="verifyForm5.location" placeholder="存储位置" style="width:100%;"/>
        </FormItem>
        <FormItem label="负责人" prop="fzr">
          <Input v-model="verifyForm5.fzr" placeholder="负责人" style="width:100%;"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="handleVerifyFirst5" :loading="modalLoading5">确定</Button>
      </div>
    </Modal>

    <Modal v-model="printModal" title="打印预览" @on-ok="print" width="640">
      <div id="printMe">
        <div class="print-content">
          <div class="print-header">紧急采购物资审批单</div>
          <div class="print-base-info print-flex">
            <div class="print-flex-item">{{printType=='out'?'出库单位':'入库单位'}}：{{printData.departName}}</div>
            <div class="print-flex-item print-border-left">
              采购日期：
              <span class="print-float-right mg-rt-8">{{printData.date}}</span>
            </div>
          </div>
          <div class="print-order-info print-flex">
            <div class="print-flex-item flex-1">序号</div>
            <div class="print-flex-item flex-3 print-border-left">名称</div>
            <div class="print-flex-item flex-1 print-border-left">数量</div>
            <div class="print-flex-item flex-2 print-border-left">理由</div>
            <div class="print-flex-item flex-2 print-border-left">供货商</div>
          </div>
          <div class="print-order-content print-flex" v-for="item in printData.list" :key="item.xh">
            <div class="print-flex-item flex-1">{{item.xh}}</div>
            <div class="print-flex-item flex-3 print-border-left">{{item.name}}</div>
            <div class="print-flex-item flex-1 print-border-left">{{item.sl}}</div>
            <div class="print-flex-item flex-2 print-border-left">{{item.jjyy}}</div>
            <div class="print-flex-item flex-2 print-border-left">{{item.ghs}}</div>
          </div>
          <div class="print-order-content print-flex">
            <div class="print-flex-item1">采购部门审批意见</div>
            <div class="print-flex-item2 print-border-left"></div>
            <div class="print-flex-item1 print-border-left">财务部门审批意见</div>
            <div class="print-flex-item2 print-border-left"></div>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import pagination from "@/components/pagination";
import {
  getOrderInList,
  getOrderDetail,
  takeProduct,
  getPrintOrderData
} from "@/actions/index";
export default {
  name: "MyOrder",
  components: {
    pagination
  },
  data() {
    return {
      data: [],
      total: 0,
      printModal: false,
      showVerifyModal5: false,
      modalLoading5: false,
      printType: "out",
      printData: {
        list: [
          {
            xh: "序号",
            name: "名称",
            departName: " 单位",
            ghs: "219 单价",
            sl: "数量",
            jjyy: "总价"
          }
        ],
        date: "时间",
        departName: "单位"
      },
      shForm: {
        id: "",
        status,
        gdzcList: []
      },
      rules5: {
        location: [
          {
            required: true,
            message: "请选择存储位置",
            trigger: "blur"
          }
        ],
        fzr: [
          {
            required: true,
            message: "请选择负责人",
            trigger: "blur"
          }
        ]
      },
      verifyForm5: {
        id: "",
        location: "",
        fzr: ""
      },
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
          title: "单位",
          render: (h, params) => {
            return h("div", params.row.product.unit || "--");
          }
        },
        {
          title: "经费类型",
          key: "typeDesc",
          align: "center"
        },
        {
          type: "action",
          title: "操作",
          align: "center",
          render: (h, params) => {
            let infobtn =
              params.row.product.gdzc == 1 && this.shForm.status == 7
                ? h(
                    "Button",
                    {
                      props: {
                        type: "info"
                      },
                      style: { margin: "0 5px" },
                      on: {
                        click: () => {
                          this.verifyForm5.id = params.row.product.id;
                          this.showVerifyModal5 = true;
                        }
                      }
                    },
                    "录入"
                  )
                : "";
            return h("div", [infobtn]);
          }
        }
      ],
      columns: [
        {
          title: "订单号",
          key: "orderNo",
          width: 115,
          align: "center"
        },
        {
          title: "紧急程度",
          key: "levelDesc"
        },
        {
          title: "采购类型",
          key: "typeDesc"
        },
        {
          title: "订单类型",
          key: "normalDesc"
        },
        {
          title: "状态",

          key: "statusDesc"
        },
        {
          title: "提交时间",
          key: "createTime",
          align: "center"
        },
        {
          title: "操作",
          width: 200,
          render: (h, params) => {
            let dy =
              params.row.level == "2"
                ? h(
                    "Button",
                    {
                      props: {
                        type: "info"
                      },
                      style: {
                        margin: "0 5px"
                      },
                      on: {
                        click: () => {
                          getPrintOrderData(params.row.id).then(res => {
                            this.printData = res.data;
                            this.printModal = true;
                          });
                        }
                      }
                    },
                    "打印审批单"
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
                      this.shForm.id = params.row.id;
                      this.shForm.status = params.row.status;
                      this.showDetailModal();
                    }
                  }
                },
                "详情"
              ),
              dy
            ]);
          }
        }
      ],
      filter: {
        limit: 10,
        offset: 0,
        status: "",
        level: "",
        type: ""
      },
      selectOrder: [],
      showDetailModalFlag: false
    };
  },
  methods: {
    print() {
      this.$htmlToPaper("printMe");
    },

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
    handleVerifyFirst5() {
      let formData = {};
      formData.id = this.verifyForm5.id;
      formData.location = this.verifyForm5.location;
      formData.fzr = this.verifyForm5.fzr;
      this.shForm.gdzcList.push(JSON.stringify(formData));
      this.handleCacelModal5();
    },

    handleCacelModal5() {
      this.verifyForm5.id = "";
      this.verifyForm5.location = "";
      this.verifyForm5.fzr = "";
      this.showVerifyModal5 = false;
    },
    showDetailModal() {
      this.spinShow = true;
      getOrderDetail(this.shForm.id).then(
        res => {
          this.spinShow = false;
          this.selectOrder = res.data;
          this.showDetailModalFlag = true;
        },
        () => {
          this.spinShow = false;
        }
      );
    },
    shOrder() {
      takeProduct(this.shForm).then(
        res => {
          this.showDetailModalFlag = false;
          this.filter.offset = 0;
          this.loadData();
        },
        () => {}
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
