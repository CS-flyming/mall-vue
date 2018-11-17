<template>
  <div>
    <Card>
      <p slot="title" style="height: 32px;
    line-height: 32px;">标准采购</p>
      <Table border ref="selection" :columns="columns" :data="shoppingCart" size="large" no-data-text="您的购物车没有商品，请先添加商品到购物车再点击提交订单" @on-selection-change="handleBzTable"></Table>
      
      <div class="go-to">
        <div class="tb-footer">
          <Form ref="formInline" :model="bzForm" inline>
              <FormItem label="紧急程度：" :required="true">
                  <RadioGroup v-model="bzForm.level">
                      <Radio label="1">月度上报</Radio>
                      <Radio label="2">紧急购买</Radio>
                  </RadioGroup>
              </FormItem>
              <FormItem label="采购类型：" :required="true">
                  <RadioGroup v-model="bzForm.type">
                      <Radio label="1">集中采购</Radio>
                      <Radio label="2">自行采购</Radio>
                  </RadioGroup>
              </FormItem>
          </Form>
        </div>
        <Button @click="goTo" type="primary" :loading="loading" :disabled="disabled">提交标准订单</Button>
      </div>
    </Card>
    <Card>
      <p slot="title" style="height: 32px;
    line-height: 32px;">非标准采购</p>
      <div slot="extra" @click.prevent="showFbzModal=true">
            <Button icon="ios-plus" type="primary" >添加非标准采购</Button>
      </div>
      <Table border ref="selection2" :columns="columns2" :data="shoppingCart2" size="large" no-data-text="您的购物车没有商品，请先添加商品到购物车再点击提交订单" @on-selection-change="handleBzTable2"></Table>
      <div class="go-to">
        <div class="tb-footer">
          <Form ref="formInline" :model="bzForm" inline>
              <FormItem label="紧急程度：" :required="true">
                  <RadioGroup v-model="bzForm.level">
                      <Radio label="1">月度上报</Radio>
                      <Radio label="2">紧急购买</Radio>
                  </RadioGroup>
              </FormItem>
              <FormItem label="采购类型：" :required="true">
                  <RadioGroup v-model="bzForm.type">
                      <Radio label="1">集中采购</Radio>
                      <Radio label="2">自行采购</Radio>
                  </RadioGroup>
              </FormItem>
          </Form>
        </div>
        <Button @click="goTo2" type="primary" :loading="loading2" :disabled="disabled2">提交非标准订单</Button>
      </div>
    </Card>
    <Modal
        v-model="showFbzModal"
        title="添加非标准项目"
        @on-cancel="handleCacelModal"
        >
        <Form :model="fbzItem" ref="verifyForm" label-position="right" :label-width="120" :rules="rules">
            <FormItem label="商品名称" prop="name" >
                <Input v-model="fbzItem.name" placeholder="商品名称"  />
            </FormItem>
            <FormItem label="商品单价" prop="value" >
                <InputNumber v-model="fbzItem.value" style="width:100%;"  :min="0"/>
            </FormItem>
            <FormItem label="商品数量"  prop="num">
                <InputNumber v-model="fbzItem.num" style="width:100%;"  :min="1"/>
            </FormItem>
            <FormItem label="商品规格" prop="standard" >
                <Input v-model="fbzItem.standard" placeholder="商品规格"  />
            </FormItem>
            <FormItem label="商品型号" prop="model" >
                <Input v-model="fbzItem.model" placeholder="商品型号"  />
            </FormItem>
            <FormItem label="经费类型" prop="type">
                  <RadioGroup v-model="fbzItem.type">
                      <Radio label="5">装备经费</Radio>
                      <Radio label="6">后勤经费</Radio>
                  </RadioGroup>
              </FormItem>
        </Form>
        <div slot="footer">
              <Button type="primary" @click="addFbzItem" >添加</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import {
  getCartList,
  addNoNormalOrder,
  addNormalOrder,
  deleteCartById,
  editProNum
} from "@/actions/index";
export default {
  name: "MyShoppingCart",
  beforeRouteLeave(to, from, next) {
    this.$Modal.confirm({
      title: "提示",
      content: "离开此页面，非标准购物记录将不会保存",
      onOk() {
        next();
      },
      okText: "确定离开"
    });
  },
  data() {
    return {
      shoppingCart: [],
      shoppingCart2: [],
      modalLoading: false,
      showFbzModal: false,
      disabled: false,
      loading: false,
      disabled2: true,
      loading2: false,
      rules: {
        name: [
          {
            required: true,
            message: "请输入商品名称",
            trigger: "blur"
          }
        ],
        value: [
          {
            required: true,
            type: "number",
            message: "请输入商品单价",
            trigger: "blur"
          }
        ],
        num: [
          {
            required: true,
            type: "number",
            message: "请输入商品数量",
            trigger: "blur"
          }
        ],
        standard: [
          {
            required: true,
            message: "请输入商品规格",
            trigger: "blur"
          }
        ],
        model: [
          {
            required: true,
            message: "请输入商品型号",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "请选择经费类型",
            trigger: "change"
          }
        ]
      },
      fbzItem: {
        name: "",
        value: 0,
        num: 1,
        standard: "",
        model: "",
        type: "5"
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
         {
          title: "名称",
          key: "value",
          width: 240,
           align: "left",
          render: (h, params) => {
            let str = "";
            str = `${params.row.product.name}`;
            return h("div", str);
          }
        },
          {
          title: "数量",
           align: "center",
         
          // key: "num",
          //align: "center",
          render: (h, params) => {
            return h("InputNumber", {
              props: {
                
                min: 1,
                value: params.row.num
              },
              on: {
                "on-change": val => {
                  editProNum({
                    id: params.row.id,
                    num: val
                  }).then(res => {
                    this.loadShoppingCart();
                  });
                }
              }
            });
          }
        },
        {
          title: "单价",
          key: "value",
           align: "center",
          width: 80,
          render: (h, params) => {
            let str = "";
            str = `${params.row.product.value}`;
            return h("div", str);
          }
        },
        {
          title: "小计",
          key: "zj",
          align: "center",        
          width: 80,
            render: (h, params) => {
            let str = "";
            str = `${params.row.product.value}`*`${params.row.num}`;
            return h("div", str)
          }
        
        },    
        {
          title: "经费类型",
          key: "typeDesc",
          align: "center",
          width:100
        },
        {
          title: "操作",
          key: "action",
          width: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "Poptip",
                {
                  props: {
                    confirm: true,
                    title: "您确定要删除?",
                    transfer: true
                  },
                  on: {
                    "on-ok": () => {
                      deleteCartById(params.row.id).then(res => {
                        this.$Message.success("删除成功");
                        this.loadShoppingCart();
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
                    "删除"
                  )
                ]
              )
            ]);
          }
        }
      ],
      columns2: [
        {
          type: "selection",
          width: 58,
          align: "center"
        },
        {
          key: "name",
          title: "商品名称",
           align: "left"
        },
        {
          key: "standard",
          title: "规格"
        },
        {
          key: "model",
          title: "型号"
        },
        {
          key: "value",
          title: "价格"
        },
        {
          title: "数量",
          key: "num",
          align: "center"
        },
        {
          title: "经费类型",
          render: (h, params) => {
            return h("div", params.row.type == "5" ? "装备经费" : "后勤经费");
          }
        },
        {
          title: "操作",
          key: "action",
          width: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "Poptip",
                {
                  props: {
                    confirm: true,
                    title: "您确定要删除?",
                    transfer: true
                  },
                  on: {
                    "on-ok": () => {
                      this.shoppingCart2.splice(params.row.index, 1);
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
                    "删除"
                  )
                ]
              )
            ]);
          }
        }
      ],
      bzForm: {
        level: "1",
        type: "1",
        products: []
      },
      fbzForm: {
        level: "1",
        type: "1",
        products: []
      }
    };
  },
  methods: {
    handleCacelModal() {
      this.showFbzModal = false;
      this.resetFbzItemForm();
    },
    resetFbzItemForm() {
      this.fbzItem = {
        name: "",
        value: 0,
        num: 1,
        standard: "",
        model: "",
        type: "5"
      };
    },
    handleBzTable(selection) {
      let proArr = [];
      selection.map(v => {
        let obj = {};
        obj.productId = v.productId;
        obj.type = v.type;
        obj.num = v.num;
        proArr.push(JSON.stringify(obj));
      });
      this.bzForm.products = proArr;
      if (selection.length) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    handleBzTable2(selection) {
      let proArr = [];
      selection.map(v => {
        proArr.push(JSON.stringify(v));
      });
      this.fbzForm.products = proArr;
      if (selection.length) {
        this.disabled2 = false;
      } else {
        this.disabled2 = true;
      }
    },
    loadShoppingCart() {
      getCartList().then(res => {
        this.shoppingCart = res.data;
        this.$nextTick(() => {
          this.$refs.selection.selectAll(true);
        });
      });
    },
    goTo() {
      this.loading = true;
      addNormalOrder(this.bzForm).then(
        res => {
          this.loading = false;
          this.$Message.success("提交成功");
          this.loadShoppingCart();
        },
        () => {
          this.loading = false;
        }
      );
    },
    goTo2() {
      this.loading2 = true;
      addNoNormalOrder(this.fbzForm).then(
        res => {
          this.loading2 = false;
          this.$Message.success("提交成功");
          this.shoppingCart2 = [];
        },
        () => {
          this.loading2 = false;
        }
      );
    },
    addFbzItem(e) {
      this.$refs.verifyForm.validate(valid => {
        if (valid) {
          this.shoppingCart2.push(this.fbzItem);
          this.$nextTick(() => {
            this.$refs.selection2.selectAll(true);
          });
          this.handleCacelModal();
        }
      });
    }
  },
  created() {
    this.loadShoppingCart();
  }
};
</script>

<style scoped>
.go-to {
  margin: 15px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
}

.ivu-form-inline .ivu-form-item {
  width: 250px;
  margin-bottom: 0;
}
</style>
