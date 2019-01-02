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
     <div slot="extra" @click.prevent="showModal=true">
            <Button icon="ios-plus" type="primary" >新增</Button>
      </div>
    <Table border :columns="columns" :data="data" size="large"></Table>
    <div class="page-size">
      <pagination
        :total="total"
        :limit.sync="filter.limit"
        :offset.sync="filter.offset"
        @on-load="loadData"
      ></pagination>
    </div>
  <Modal
        v-model="showModal"
        title="添加招投标"
        @on-cancel="handleCacelModal"
        >
        <Form :model="fbzItem" ref="verifyForm" label-position="right" :label-width="120" :rules="rules">
            <FormItem label="项目名称" prop="name" >
                <Input v-model="fbzItem.name" placeholder="项目名称"  />
            </FormItem>
            <FormItem label="需求部门" prop="value" >
                <InputNumber v-model="fbzItem.value" style="width:100%;"/>
            </FormItem>
            <FormItem label="项目需求"  prop="xmxq">
                <InputNumber v-model="fbzItem.xmxq" style="width:100%;"/>
            </FormItem>
            <FormItem label="预算经费" prop="standard" >
                <Input v-model="fbzItem.planMoney" placeholder="预算经费"  />
            </FormItem>
            <FormItem label="备注" prop="info" >
                <Input v-model="fbzItem.info" placeholder="备注"  />
            </FormItem>
            <FormItem label="经费类型" prop="type">
                  <RadioGroup v-model="fbzItem.type">
                      <Radio label="5">装备经费</Radio>
                      <Radio label="6">后勤经费</Radio>
                  </RadioGroup>
              </FormItem>
               <FormItem label="招标方式" prop="method">
                  <RadioGroup v-model="fbzItem.method">
                      <Radio label="1">询价</Radio>
                      <Radio label="2">邀请招标</Radio>
                       <Radio label="3">公开招标</Radio>
                      <Radio label="4">单一来源</Radio>
                       <Radio label="5">竞争性谈判</Radio>
                  </RadioGroup>
              </FormItem> 
        </Form>
       <div slot="footer">
              <Button type="primary" @click="addNormal" >确定</Button>
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
  name: "MyBid",
  components: {
    pagination
  },
  data() {
    return {
      data: [],
        fbzItem: {
        xmxq: "",
        planMoney: "",
        type: "",
        method: "",
        info: "",
        departId:""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur"
          }
        ],
         xmxq: [
          {
            required: true,
            message: "请输入项目需求",
            trigger: "blur"
          }
        ],
         type: [
          {
            required: true,
            message: "请选择经费类型",
            trigger: "blur"
          }
        ],
          planMoney: [
          {
            required: true,
            message: "请输入经费预算",
            trigger: "blur"
          }
        ],
         method: [
          {
            required: true,
            message: "请选择招标方式",
            trigger: "blur"
          }
        ]
       
      },
      total: 0,
      showModal: false,
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
     handleCacelModal() {
      this.showModal = false;
      this.bzForm={};
    },
     addNormal(){
       addBid(this.bzForm).then(
        res => {
          this.loading = false;
          this.$Message.success("提交成功");
          this.showModal=false;
        },
        () => {
             
        }
      );
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
