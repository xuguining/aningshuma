<!-- 已修改 -->
<template>
  <div class="address">
    <!-- 提交订单的头部 -->
    <div class="address_nav">
      <div class="left" @click="goback">
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
      <div class="title">提交订单页</div>
    </div>
    <!-- 地址选择开始 -->
    <div class="order_address" v-if="this.list">
      <div class="select" @click="show = true" v-if="mylist == ''">
        暂无地址信息
        <span><van-icon name="arrow" /></span>
      </div>
      <div class="user" v-else @click="show = true">
        <div class="user_imfo">
          <div class="name">{{ myname }}</div>
          <div class="phone">{{ myphone }}</div>
          <!-- <div class="my_icon">
            <van-tag round type="primary">默认</van-tag>
          </div> -->
        </div>
        <div class="my_address">{{ province }} {{ myaddress }}</div>
        <span><van-icon name="arrow" class="bottom_arrow" /></span>
      </div>
    </div>

    <!-- 地址选择弹出框开始 -->
    <div class="tanchu_box">
      <div class="tanchu_content">
        <van-popup v-model="show" position="bottom" class="popup">
          <div class="top" v-if="mylist == ''">
            暂无地址信息，请点击新增地址！
          </div>
          <div class="my_address">
            <van-address-list
              v-model="chosenAddressId"
              :list="mylist"
              default-tag-text="默认"
              @add="addAddress"
              @edit="onEdit"
              @select="onselect"
            />
          </div>
        </van-popup>
      </div>
    </div>

    <div class="body" v-if="this.list">
      <!-- 订单商品开始 -->
      <div class="main_body" v-for="(item, index) in list" :key="index">
        <div class="product_box">
          <div class="img_box"><img :src="item.img" alt="" /></div>
          <div class="text_box">
            <h2 class="name">{{ item.inname }}</h2>
            <div class="sevenDay">7天保价7天无理由退货</div>
            <div class="price">
              ¥{{ item.myprice }}
              <span class="shopcount">x{{ list[index].numbers }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 订单商品结束 -->
    </div>
    <!-- 提交开始 -->
    <div class="footer" v-if="this.list">
      <van-submit-bar
        :price="total"
        button-text="提交订单"
        @submit="onSubmit"
      />
    </div>
    <span v-if="!this.list" class="nosubmit">请提交订单</span>
  </div>
</template>

<script>
import Vue from "vue";
import { AddressEdit } from "vant";
import { SubmitBar } from "vant";
import { Icon } from "vant";
import { Tag } from "vant";
import { Popup } from "vant";
import { AddressList } from "vant";
import { Toast } from "vant";

Vue.use(Toast);

Vue.use(AddressList);
Vue.use(Popup);
Vue.use(Tag);
Vue.use(Icon);
Vue.use(SubmitBar);
import login from "@/store/modules/login";

Vue.use(AddressEdit);
export default {
  components: {},
  data() {
    return {
      list: Array(0), //orderdata 已经提交的数据
      showNew: true,
      show: false, //控制是否弹窗
      chosenAddressId: 1,
      mylist: [], //地址数据列表
      myname: "", //地址最后一项的名字
      myphone: "", //地址最后一项的电话
      myaddress: "", //地址最后一项的详细地址
      province: "", //地址最后一项的省
      addressdata: [], //地址数据
      city: "", //地址最后一项的市
      county: "", //地址最后一项的区
      timeId: "",
    };
  },
  computed: {
    //总价格的数据
    total() {
      let tol = 0;
      for (let i = 0; i < this.list.length; i++) {
        tol += this.list[i].numbers * this.list[i].myprice;
        if (this.list.length == 0) {
          tol += 0;
        }
      }

      return tol * 100;
    },
  },
  // watch: {},

  methods: {
    onselect(_, index) {
      // console.log(index)
      let adobj = JSON.parse(localStorage.getItem("address-data")) || [];
      this.chosenAddressId = index;
      this.myname = adobj[index].myname;
      this.myphone = adobj[index].tel;
      this.myaddress = adobj[index].address;
      this.province = adobj[index].province;
    },
    goback() {
      this.$router.go(-1);
    },
    // 跳转至我的地址页面
    addAddress() {
      // console.log("1111");
      this.$router.push({ name: "MyAddress" });
    },
    onSubmit() {
      if (!this.mylist.length) {
        Toast("请输入收货地址");
      } else {
        let numbers = this.total;
        this.$router.push({ name: "OrderCompletion", query: { numbers } });
      }
    },
    onEdit() {
      //  Toast('编辑地址:' + index);
      // console.log("czyyy");
      let edit = this.chosenAddressId;
      // console.log(edit);
      this.$router.push({ name: "MyAddress", query: { edit } });
    },
  },

  created() {
    this.list = JSON.parse(localStorage.getItem("order-data"));
    // console.log(this.list);
    this.addressdata = JSON.parse(localStorage.getItem("address-data")) || [];
    // console.log("czyyy",this.addressdata);
    // console.log(this.mylist=='')
    if (this.addressdata != null) {
      // console.log(this.addressdata)
      // console.log("6666");
      for (let i = 0; i < this.addressdata.length; i++) {
        let id = i + 1;
        let name = this.addressdata[i].myname;
        let tel = this.addressdata[i].tel;
        let address =
          this.addressdata[i].province + this.addressdata[i].address;
        let obj = { id, name, tel, address };
        this.mylist.push(obj);
        // console.log(this.mylist);
        // console.log("111",this.addressdata);
        // console.log("111",this.addressdata[i]);
        if (i == this.addressdata.length - 1) {
          this.chosenAddressId = id;
          this.myname = this.addressdata[i].myname;
          this.myphone = this.addressdata[i].tel;
          this.myaddress = this.addressdata[i].address;
          this.province = this.addressdata[i].province;

          // this.city = this.addressdata[i].city
          // this.county = this.addressdata[i].county
        }
      }
    } else {
      // console.log("没地址数据");
    }
  },
};
</script>

<style lang="less" scoped>
// .van-address-item__edit{
//     display: none;
// }
.address {
  padding: 0.4rem 0.2rem;
  .nosubmit {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    font-size: 40px;
    color: #000;
  }
  .address_nav {
    display: flex;
    align-content: center;
    // padding-top:5px;
    .left {
      margin-left: 0.35rem;
    }
    .title {
      //   padding: 0.1rem 0;
      max-width: 60%;
      margin: 0 auto;
      color: #000;
      font-weight: 500;
      font-size: 0.44rem;
      line-height: 0.69rem;
    }
  }
  .order_address {
    padding: 0 0.3rem;
    box-sizing: border-box;
    margin-top: 0.5rem;
    margin-left: 0.1rem;
    font-size: 15px;

    .user {
      position: relative;
      background-color: #f9f7f7;
      border-radius: 15px;
      padding: 0.1rem 0.4rem 0.2rem;

      .user_imfo {
        display: flex;
        margin-top: 0.2rem;
        align-items: center;
        .name {
          font-weight: 700;
          color: #000;
          font-size: 16px;
        }
        .phone {
          margin-left: 0.4rem;
        }
        .my_icon {
          margin-left: 0.2rem;
        }
      }
      .my_address {
        margin-top: 0.2rem;
        color: #999;
      }
    }
    .bottom_arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0.4rem;
      color: rgb(153, 149, 149);
      font-size: 0.43rem;
    }
  }
  .tanchu_box {
    .tanchu_content {
      .popup {
        padding: 0.15rem;
        background-color: rgb(249, 247, 247);
        .top {
          font-size: 0.35rem;
          font-weight: bold;
          padding-top: 10px;
          text-indent: 1em;
        }
      }
    }
  }
  .body {
    padding-bottom: 50px;
    .main_body {
      padding: 0 0.3rem;
      box-sizing: border-box;
      .product_box {
        display: flex;
        align-items: center;
        position: relative;
        box-sizing: border-box;
        color: #333;
        font-size: 0.3rem;
        line-height: 0.3rem;
        background-color: rgb(249, 247, 247);
        width: 9rem;
        margin-top: 0.5rem;
        box-sizing: border-box;
        padding: 0.1rem 0.2rem 0.2rem;
        border-radius: 15px;
        .img_box {
          width: 1.5rem;
          height: 1.6rem;
          background-color: white;
          border-radius: 0.15rem;
          margin-top: 0.15rem;
          img {
            width: 100%;
            height: 100%;
          }
          // background-color: skyblue;
        }
        .text_box {
          margin-left: 0.2rem;
          .name {
            color: #333;
            font-size: 0.35rem;
            line-height: 0.36rem;
          }
          .sevenDay {
            color: red;
            // margin-top: -0.1rem;
          }
          .price {
            margin-top: 0.15rem;
            font-size: 0.35rem;
            padding-bottom: 0.15rem;
            .shopcount {
              position: relative;
              left: 200px;
            }
          }
        }
      }
    }
  }
}
</style>