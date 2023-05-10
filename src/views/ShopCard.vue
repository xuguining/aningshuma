<!-- 已修改 -->
<template>
  <div class="shop_card">
    <!-- 购物车顶部的返回和标题 -->
    <div class="nav">
      <div class="nav_left" @click="goback">
        <svg
          t="1652970550280"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2997"
          width="24"
          height="24"
        >
          <path
            d="M939.880137 487.72513l-782.215258 0 358.804922-318.92975c12.389168-11.011798 13.505595-29.980825 2.492774-42.369993-11.011798-12.386098-29.977755-13.505595-42.367947-2.492774L64.602344 490.13911c-6.407943 5.693676-10.073426 13.858636-10.073426 22.430872s3.665483 16.737196 10.073426 22.430872l411.993309 366.204449c5.717212 5.083785 12.83533 7.580652 19.925818 7.580652 8.274454 0 16.514115-3.403516 22.442128-10.07445 11.011798-12.387122 9.896394-31.357172-2.492774-42.367947L169.687704 548.100196 939.880137 548.100196c16.57449 0 30.011524-13.613042 30.011524-30.187533S956.454628 487.72513 939.880137 487.72513z"
            p-id="2998"
            fill="#f34141"
          ></path>
        </svg>
      </div>
      <div class="text">购物车</div>
    </div>
    <!-- 有商品的头部 -->
    <div class="header" v-show="isShowcard">
      <div class="header_left">共{{ lengths }}件商品</div>
      <div class="header_right">
        <div class="text" v-if="!submit">优惠价</div>

        <div class="pianji">
          <span v-if="!submit" @click="editReturns">编辑</span
          ><span v-if="submit" @click="returns" class="text">完成</span>
        </div>
      </div>
    </div>

    <!-- 有商品的购物内容 -->
    <div class="my_shop" v-show="isShowcard">
      <div class="shop_content" v-for="(item, index) in list" :key="index">
        <!-- 多选框 -->
        <input type="checkbox" v-model="item.ischeck" @change="radiocheck" />
        <!-- 大图 -->
        <div class="img_box"><img :src="item.img" /></div>
        <!-- 右边数据 -->
        <div class="shop_text">
          <div class="shop_name">
            {{ item.myname }} <span> {{ item.colors }}</span>
          </div>
          <div class="bottom_text">
            <div class="price">
              ¥<span>{{ item.price }}</span>
            </div>
            <div class="bujin">
              <van-stepper
                v-model="item.munber"
                theme="round"
                button-size="22"
                disable-input
              />
            </div>
            <!-- <div class="color">{{ item.colors }}</div> -->
          </div>
        </div>
      </div>
    </div>
    <!-- 购物车结束 -->

    <!-- 暂无商品开始！！！！ -->
    <div class="Notyet" v-show="!isShowcard">
      <div class="Notyet_box">
        <div class="img_box">
          <img
            src="https://dsfs.oppo.com/store/cn/m/img/cart.fb3bfa5c.png"
            class="cart-empty-icon"
          />
        </div>
        <div v-if="showmsg" class="text">购物车还没有商品</div>
        <div v-if="!showmsg" class="text">登录即可查看购物车</div>
        <div v-if="showmsg" class="bottom_text" @click="goHome">去逛一逛</div>
        <div
          v-if="!showmsg"
          class="bottom_text"
          @click="goLogin"
          style="
            background-image: linear-gradient(200deg, #72afd3, #e896fb);
            border: 1px solid #e896fb;
          "
        >
          立即登录
        </div>
      </div>
    </div>

    <div v-show="isShowcard">
      <div v-show="!submit">
        <van-submit-bar
          :price="toallPrice"
          button-text="结算"
          @submit="onSubmit"
        >
          <van-checkbox v-model="checked" @click="AllSelect">全选</van-checkbox>
        </van-submit-bar>
      </div>
      <div v-show="submit" @click="deletes">
        <van-submit-bar
          button-color="linear-gradient(200deg,#72afd3,#e896fb)"
          button-text="删除"
        >
        </van-submit-bar>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Stepper } from "vant";
import { SubmitBar } from "vant";
import { Checkbox, CheckboxGroup } from "vant";
import { mapState } from "vuex";
// const userNs = createNamespacedHelpers("user");
import { Toast } from "vant";

Vue.use(Toast);
// Vue.use(mapState);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(SubmitBar);
Vue.use(Stepper);
export default {
  data() {
    return {
      list: [], //本地存储的数组数据
      // value: 1,
      checked: true, //是否全选
      // price: 222,
      submit: false, //是否处在编辑状态
      lengths: 0, //本地存储的数组数据的长度
      // showShop: true,
      // showmsg:true,
      // token:"",
      // showShopTwo:false
      // ischeck:false
    };
  },
  computed: {
    toallPrice() {
      let toall = 0;
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].ischeck) {
          toall += this.list[i].price * this.list[i].munber;
        }
      }
      // console.log("toall",toall);
      return toall * 100;
    },

    // 先看看有没有登录，再看看有没有商品
    isShowcard() {
      if (this.token) {
        let mylength = localStorage.getItem(
          "shopobj-data"
          // ,JSON.stringify(this.list)
        );
        let listLength = JSON.parse(mylength);
        if (listLength.length == 0) {
          // console.log("listLength.length", listLength.length);
          return false;
        } else {
          // console.log("listLength.length", listLength.length);
          return true;
        }
      } else {
        return false;
      }
    },
    // 看看有没有token
    showmsg() {
      return this.token ? true : false;
    },
    ...mapState("user", ["token"]),
  },
  //方法集合
  methods: {
    goHome() {
      this.$router.push({ name: "HomePage" });
    },
    goLogin() {
      this.$router.push({ name: "Login" });
    },
    goback() {
      this.$router.go(-1);
      // this.$router.push({ name: "HomePage" });
    },
    // 这是点编辑的转化
    editReturns() {
      for (let i = 0; i < this.list.length; i++) {
        this.list[i].ischeck = false;
      }
      this.submit = !this.submit;
    },
    // 完成的翻转
    returns() {
      for (let i = 0; i < this.list.length; i++) {
        this.list[i].ischeck = true;
      }
      this.submit = !this.submit;
      this.radiocheck();
    },
    // 删除购物车选项
    deletes() {
      this.list = this.list.filter((v) => v.ischeck == false);
      localStorage.setItem("shopobj-data", JSON.stringify(this.list));
      // 事件总线传个值 让底部导航栏徽标变一下
      this.$bus.$emit("afterDelete", this.list);

      // console.log("czy666",this.list);
    },
    //   提交订单
    onSubmit() {
      // console.log('czyy',this.list.length);
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].ischeck) {
          let inname = this.list[i].myname;
          let img = this.list[i].img;
          let myprice = this.list[i].price;
          let numbers = this.list[i].munber;
          let orderData = { inname, img, myprice, numbers };
          // 把数据都拿到包装成对象 往提交数组一存
          let mylocal = JSON.parse(localStorage.getItem("order-data")) || [];
          mylocal.push(orderData);
          // console.log("czyyyyy",mylocal);
          localStorage.setItem("order-data", JSON.stringify(mylocal));
        }
        // else{
        //   let inname = "";
        //   let img = "";
        //   let myprice = 0;
        //   let numbers = 0;
        //   let orderData = { inname, img, myprice,numbers };
        //   let mylocal = JSON.parse(localStorage.getItem("order-data")) || [];
        //   mylocal.push(orderData);
        //   localStorage.setItem("order-data", JSON.stringify(mylocal));
        // }
      }
      this.list = this.list.filter((v) => v.ischeck == false);
      localStorage.setItem("shopobj-data", JSON.stringify(this.list));
      // this.$router.push({ name: "SubmitOrder" });
      if (localStorage.getItem("order-data")) {
        this.$router.push({ name: "SubmitOrder" });
      } else {
        Toast("请勾选需要结算的商品");
      }
    },
    //   修改地址
    // onClickEditAddress() {},

    // 全选
    AllSelect() {
      for (let i = 0; i < this.list.length; i++) {
        this.list[i].ischeck = this.checked;
      }
    },
    // 单选
    radiocheck() {
      for (let i = 0; i < this.list.length; i++) {
        if (!this.list[i].ischeck) {
          this.checked = false;
          return;
        }
        // console.log('111');
        this.checked = true;
      }
    },
  },
  // 侦听一下list 一边马上覆盖一份
  watch: {
    list: {
      deep: true,
      handler(value) {
        localStorage.setItem("shopobj-data", JSON.stringify(value));
        this.lengths = value.length;
      },
    },
  },
  created() {
    let shopdata = JSON.parse(localStorage.getItem("shopobj-data"));
    this.list = shopdata;
    // this.value = this.list.munber;
    this.lengths = this.list.length;

    // console.log('czy666',this.list);
    // console.log("czy",this.token)
    //获取推荐数据

    // 进来时 验一下全选
    // this.radiocheck()
    // console.log(this.checked)

    this.AllSelect();
  },
};
</script>

<style lang="less" scoped>
.shop_card {
  padding: 0 0.3rem;
  .nav {
    margin-top: 15px;
    box-sizing: border-box;
    padding: 0 0.4rem;
    position: relative;
    height: 0.92rem;
    line-height: 0.92rem;
    text-align: center;
    background-color: #fff;
    display: flex;
    align-items: center;
    .text {
      max-width: 60%;
      margin: 0 auto;
      color: #000;
      font-weight: 500;
      font-size: 0.48rem;
    }
    .nav_left {
      margin-top: 0.3rem;
    }
  }
  .header {
    display: flex;
    padding: 0 0.65rem;
    margin-top: 0.5rem;
    border-top: 1px solid rgb(235, 232, 232);
    margin-bottom: 0.6rem;
    justify-content: space-between;
    .header_left {
      color: rgba(0, 0, 0, 0.55);
      margin-top: 0.4rem;
    }
    .header_right {
      display: flex;
      margin-top: 0.4rem;
      margin-left: 0.2rem;
      .text {
        font-size: 0.41rem;
        color: #fff;
        background: #ec3e50;
        border-radius: 0.14rem;
        padding: 0.04rem 0.08rem;
        margin-right: 0.4rem;
      }
      .pianji {
        color: #000;
        font-size: 0.46rem;
      }
    }
  }
  .Notyet {
    margin-top: 2rem;
    .Notyet_box {
      width: 4.1rem;
      height: 1.3rem;
      margin: 0 auto;
    }
    .text {
      color: #acadae;
      font-size: 0.45rem;
      line-height: 1;
      text-align: center;
      margin: 0.3rem 0;
    }
    .bottom_text {
      border-radius: 2em;
      border: 1px solid greenyellow;
      color: #3d3d3d;
      font-weight: 500;
      display: block;
      box-sizing: border-box;
      // min-width: 2.04rem;
      height: 0.8rem;
      width: 2.8rem;
      margin-top: 10px;
      padding: 0 0.12rem;
      font-size: 0.42rem;
      line-height: 0.72rem;
      text-align: center;
      margin-top: 0.5rem;
      margin-left: 0.5rem;
      background-image: linear-gradient(200deg, #72afd3, #96fbc4);
    }
  }
  .my_shop {
    //   margin-top: 0.8rem;
    border-radius: 9px;
    padding: 0.2rem 0.2rem;
    box-sizing: border-box;
    justify-content: space-evenly;
    background-color: rgb(249, 246, 246);
    box-sizing: border-box;

    .shop_content {
      display: flex;
      align-items: center;
      margin-top: 0.2rem;
      background-color: white;
      margin-bottom: 0.2rem;
      box-sizing: border-box;
      padding: 0.25rem 0.2rem;

      .img_box {
        margin-left: 0.3rem;
        width: 1.68rem;
        height: 1.68rem;
        margin-right: 0.16rem;
        background-color: white;
        display: flex;
        align-content: center;
        img {
          width: 100%;
        }
      }
      .shop_text {
        margin-left: 0.3rem;
        padding-top: 0.2rem;

        .shop_name {
          font-size: 17px;
          span {
            margin-left: 0.3rem;
          }
        }
        .bottom_text {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.5rem;
          .color {
            margin-left: 0.1rem;
            width: 1.3rem;
          }
          .bujin {
            margin-left: 0.4rem;
            width: 2.2rem;
          }

          span {
            font-size: 0.4848rem;
          }
        }
      }
    }
    .shop_content:last-child {
      margin-bottom: 2rem;
    }
  }
}
.product {
  margin-top: 1.2rem;
  .product_box {
    .product_text {
      overflow: hidden;
      color: #000;
      font-size: 0.5rem;
      text-align: center;
    }
  }
}
</style>