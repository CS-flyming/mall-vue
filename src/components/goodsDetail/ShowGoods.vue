<template>
  <div>
    <div class="item-detail-show">
      <div class="item-detail-left">
        <div class="item-detail-big-img">
          <img :src="pData.files&&pData.files.length&&pData.files[imgIndex].url" alt="">
        </div>
        <div class="item-detail-img-row">
          <div class="item-detail-img-small" v-for="(item, index) in pData.files" :key="index" @mouseover="showBigImg(index)" @click="showBigImg(index)">
            <img v-lazy="item.url+'?type=small'" alt="">
          </div>
        </div>
      </div>
      <div class="item-detail-right">
        <div class="item-detail-title">
          <p>
            {{pData.name}}</p>
        </div>
        <div class="item-detail-tag">
          <p>
            <span >类型：{{pData.typeDesc}}</span>
          </p>
           <p>
            <span >供货商：{{pData.companyName}}</span>
          </p>
        </div>
        <div class="item-detail-price-row">
          <div class="item-price-left">
            <div class="item-price-row">
              <p>
                <span class="item-price-title">价格</span>
                <span class="item-price">￥{{pData.value&&pData.value.toFixed(2)}}</span>
              </p>
            </div>
            <!-- <div class="item-price-row">
              <p>
                <span class="item-price-title">优 惠 价</span>
                <span class="item-price-full-cut" v-for="(item,index) in goodsInfo.discount" :key="index">{{item}}</span>
              </p>
            </div>
            <div class="item-price-row">
              <p>
                <span class="item-price-title">促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</span>
                <span class="item-price-full-cut" v-for="(item,index) in goodsInfo.promotion" :key="index">{{item}}</span>
              </p>
            </div> -->
          </div>
          <!-- <div class="item-price-right">
            <div class="item-remarks-sum">
              <p>累计评价</p>
              <p>
                <span class="item-remarks-num">{{goodsInfo.remarksNum}} 条</span>
              </p>
            </div>
          </div> -->
        </div>
        <!-- 选择颜色 -->
        <div class="item-select">
          <div class="item-select-title">
            <p>选择经费类型</p>
          </div>
          <div class="item-select-column">
            <div class="item-select-row" >
              <div class="item-select-box" v-for="(item, index) in levelitems" :key="index" @click="select(item.value)" :class="{'item-select-box-active': item.value == buyInfo.type}">
                <!-- <div class="item-select-img">
                  <img :src="item.img" alt="">
                </div> -->
                <div class="item-select-intro">
                  <p>{{item.label}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 白条分期 -->
        <br>
        <div class="add-buy-car-box">
          <div class="add-buy-car">
            <InputNumber :min="1" v-model="buyInfo.num" size="large"></InputNumber>
            <Button type="error" size="large" @click="addShoppingCartBtn()">加入购物车</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addToCart } from "@/actions/index";
export default {
  name: "ShowGoods",
  props: {
    pData: {
      type: Object,
      default: function() {
        return {
          id: "",
          name: "",
          value: 0,
          type: "",
          typeDesc: "",
          types: [],
          typeDescs: "",
          json: "",
          standard: "",
          status: "",
          model: "",
          buyType: "",
          createTime: "",
          allCount: null,
          num: null,
          wjIds: null,
          wjId: null,
          file: null,
          files: [],
          code: ""
        };
      }
    }
  },
  data() {
    return {
      imgIndex: 0,
      buyInfo: {
        productId: "",
        type: "6",
        num: 1,
        value: 0
      },
      levelitems: [
        {
          value: "5",
          label: "装备经费"
        },
        {
          value: "6",
          label: "后勤经费"
        }
      ]
    };
  },

  methods: {
    select(value) {
      this.buyInfo.type = value;
    },
    showBigImg(index) {
      this.imgIndex = index;
    },
    addShoppingCartBtn() {
      this.buyInfo.productId = this.pData.id;
      addToCart(this.buyInfo).then(res => {
        let _this = this;
        this.$Modal.confirm({
          title: "提示",
          content: "添加购物车成功",
          onOk() {
            _this.$router.push({
              name: "MyShoppingCart"
            });
          },
          okText: "前往购物车"
        });
      });
      // const index1 = parseInt(this.selectBoxIndex / 3);
      // const index2 = this.selectBoxIndex % 3;
      // const date = new Date();
      // const goodsId = date.getTime();
      // const data = {
      //   goods_id: goodsId,
      //   title: this.goodsInfo.title,
      //   count: this.count,
      //   package: this.goodsInfo.setMeal[index1][index2]
      // };
      // this.addShoppingCart(data);
      // this.$router.push("/shoppingCart");
    }
  }
};
</script>

<style scoped>
/******************商品图片及购买详情开始******************/
.item-detail-show {
  width: 80%;
  margin: 15px auto;
  display: flex;
  flex-direction: row;
  background-color: #fff;
}
.item-detail-left {
  width: 350px;
  margin-right: 30px;
}
.item-detail-big-img {
  width: 350px;
  height: 350px;
  box-shadow: 0px 0px 8px #ccc;
  cursor: pointer;
}
.item-detail-big-img img {
  width: 100%;
  height: 100%;
}
.item-detail-img-row {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.item-detail-img-small {
  width: 68px;
  height: 68px;
  box-shadow: 0px 0px 8px #ccc;
  cursor: pointer;
}
.item-detail-img-small img {
  width: 100%;
}
/*商品选购详情*/
.item-detail-right {
  display: flex;
  flex-direction: column;
}
.item-detail-title p {
  color: #666;
  font-size: 20px;
}
.item-detail-express {
  font-size: 14px;
  padding: 2px 3px;
  border-radius: 3px;
  background-color: #e4393c;
  color: #fff;
}
/*商品标签*/
.item-detail-tag {
  font-size: 12px;
  color: #e4393c;
}
/*价格详情等*/
.item-detail-price-row {
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #f3f3f3;
}
.item-price-left {
  display: flex;
  flex-direction: column;
}
.item-price-title {
  color: #999999;
  font-size: 14px;
  margin-right: 15px;
}
.item-price-row {
  margin: 5px 0px;
}
.item-price {
  color: #e4393c;
  font-size: 23px;
  cursor: pointer;
}
.item-price-full-cut {
  margin-right: 5px;
  padding: 3px;
  color: #e4393c;
  font-size: 12px;
  background-color: #ffdedf;
  border: 1px dotted #e4393c;
  cursor: pointer;
}
.item-remarks-sum {
  padding-left: 8px;
  border-left: 1px solid #ccc;
}
.item-remarks-sum p {
  color: #999999;
  font-size: 12px;
  line-height: 10px;
  text-align: center;
}
.item-remarks-num {
  line-height: 18px;
  color: #005eb7;
}
.item-select {
  display: flex;
  flex-direction: row;
  margin-top: 15px;
}
.item-select-title {
  color: #999999;
  font-size: 14px;
  margin-right: 15px;
}
.item-select-column {
  display: flex;
  flex-direction: column;
}
.item-select-row {
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
}
.item-select-box {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.item-select-img {
  width: 36px;
}
.item-select-box {
  padding: 5px;
  margin-right: 8px;
  background-color: #f7f7f7;
  border: 0.5px solid #ccc;
  cursor: pointer;
}
.item-select-box:hover {
  border: 0.5px solid #e3393c;
}
.item-select-box-active {
  border: 0.5px solid #e3393c;
}
.item-select-img img {
  width: 100%;
}
.item-select-intro p {
  margin: 0px;
  padding: 5px;
}
.item-select-class {
  padding: 5px;
  margin-right: 8px;
  background-color: #f7f7f7;
  border: 0.5px solid #ccc;
  cursor: pointer;
}
.item-select-class:hover {
  border: 0.5px solid #e3393c;
}
.add-buy-car-box {
  width: 100%;
  margin-top: 15px;
  border-top: 1px dotted #ccc;
}
.add-buy-car {
  margin-top: 15px;
}
/******************商品图片及购买详情结束******************/
</style>
