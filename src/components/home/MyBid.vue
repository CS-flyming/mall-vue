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
         <FormItem label="项目名称">
           <Input v-model="filter.name" style="width:100%;"/>
        </FormItem>
         </Col>
           <Col span="8">
         <FormItem label="经费类型">
          <Select v-model="filter.type" clearable>
            <Option value="5">装备经费</Option>
            <Option value="6">后勤经费</Option>
          </Select>
        </FormItem>
         </Col>
         <Col span="8">
        <FormItem label="招标方式">
          <Select v-model="filter.method" clearable>
            <Option value="1">询价</Option>
            <Option value="2">邀请招标</Option>
            <Option value="3">公开招标</Option>
            <Option value="4">单一来源</Option>
            <Option value="5">竞争性谈判</Option>
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
      <Button icon="ios-plus" type="primary">新增</Button>
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
    <Modal v-model="showModal" title="添加招投标" @on-cancel="handleCacelModal">
      <Form
        :model="fbzItem"
        ref="verifyForm"
        label-position="right"
        :label-width="120"
        :rules="rules"
      >
        <FormItem label="项目名称" prop="name">
          <Input v-model="fbzItem.name" placeholder="项目名称"/>
        </FormItem>
        <FormItem label="需求部门" prop="departId">
          <departCalSelector
            v-model="fbzItem._departId"
            :departId.sync="fbzItem.departId"
            clearable
          />
        </FormItem>
        <FormItem label="项目需求" prop="xmxq">
          <Input v-model="fbzItem.xmxq" style="width:100%;"/>
        </FormItem>
        <FormItem label="预算经费" prop="standard">
          <Input v-model="fbzItem.planMoney" placeholder="预算经费"/>
        </FormItem>
        <FormItem label="备注" prop="info">
          <Input v-model="fbzItem.info" placeholder="备注"/>
        </FormItem>
        <FormItem label="开始时间" prop="startTime">
          <DatePicker
            v-model="fbzItem.startTime"
            format="yyyy-MM-dd"
            type="date"
            placeholder="选择开始时间"
            style="width: 100%;"
          ></DatePicker>
        </FormItem>
        <FormItem label="结束时间" prop="endTime">
          <DatePicker
            v-model="fbzItem.endTime"
            format="yyyy-MM-dd"
            type="date"
            placeholder="选择结束时间"
            style="width: 100%;"
          ></DatePicker>
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
        <Button type="primary" @click="addNormal">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import pagination from "@/components/pagination";
import departCalSelector from "@/components/departCalSelector";
import {
  getBidMyList,
  addBid
} from "@/actions/index";
export default {
  name: "MyBid",
  components: {
    pagination,
    departCalSelector
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
        _departId: [],
        departId: "",
        startTime: "",
        endTime: ""
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
     
      columns: [
         {
          title: "项目名称",
          key: "name",
          align: "center"
        },
        {
          title: "项目需求",
          key: "xmxq",
           align: "center"
        },
        {
          title: "招标方式",
          key: "methodDesc",
          align: "center"
        },
        {
          title: "经费类型",
          key: "typeDesc",
          align: "center"
        },
        {
          title: "经费预算",
          key: "planMoney",
          align: "center"
        },
        {
          title: "需求部门",

          key: "departName",
          align: "center"
        },
        {
          title: "开始时间",
          key: "startTime",
          align: "center",
          width:120
        },
          {
          title: "结束时间",
          key: "endTime",
          align: "center"
        },
        {
          title: "状态",
          key: "statusDesc",
          align: "center"
        }
      ],
      filter: {
        limit: 10,
        offset: 0,
        name: "",
        method: "",
        type: ""
      },
      selectOrder: [],
      showDetailModalFlag: false
    };
  },
  methods: {
    handleCacelModal() {
      this.showModal = false;
        this.restFbzItem();
    },
    addNormal() {
      addBid(this.fbzItem).then(
        res => {
          this.loading = false;
          this.$Message.success("提交成功");
          this.showModal = false;
          this.restFbzItem();
           this.loadData();
        },
        () => {}
      );
    },
    restFbzItem() {
      this.fbzItem.xmxq = "";
      this.fbzItem.planMoney = "";
      this.fbzItem.type = "";
      this.fbzItem.method = "";
      this.fbzItem.info = "";
       this.fbzItem.startTime = "";
      this.fbzItem.endTime = "";
    
    },
    loadData() {
      this.loading = true;
      getBidMyList(this.filter).then(res => {
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
