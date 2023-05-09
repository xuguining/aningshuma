<!-- 已修改 -->
<template>
  <div class="my">
    <!-- 头部 -->
    <div class="my_top">
      <!-- 头像行 -->
      <div class="user">
        <div v-show="!token" class="user_icon">
          <img
            src="https://uc-avatar-cn.heytapimage.com/titans-usercenter-avatar-bucket-cn/avatar/1.png?imgModifyTime=null&amp;x-oss-process=image/format,webp"
            class="oc-image__img"
            style="object-fit: cover"
          />
        </div>
        <div v-show="token" class="user_icon">
          <img
            src="https://uc-avatar-cn.heytapimage.com/titans-usercenter-avatar-bucket-cn/avatar/8.png?imgModifyTime=null&x-oss-process=image/format,webp"
            class="oc-image__img"
            style="object-fit: cover"
          />
        </div>
        <div v-show="token" class="inform">用户：{{username[username.length-1]}}</div>
        <div v-show="!token" class="inform">登录账号体验更多功能</div>
        <div v-show="!token" class="bottom_text" @click="goLogin">登录</div>
      </div>
      <!-- 优惠券 -->
      <div class="coupon">
        <div class="text">
          <div class="numbers">0</div>
          <div class="my_youhui">优惠券</div>
        </div>
        <div class="text">
          <div class="numbers">0</div>
          <div class="my_youhui">积分</div>
        </div>
      </div>
    </div>
    <!-- 我的订单 -->
    <div class="order">
      <div class="my_order">我的订单</div>
      <div class="all_order" @click="goorder">
        全部订单<span><van-icon name="arrow" /></span>
      </div>
    </div>
    <!-- 5图列表 -->
    <div class="my_list">
      <div class="list_item">
        <div class="item_icon">
          <svg
            t="1653101497353"
            class="icon"
            viewBox="0 0 1025 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3372"
            width="30"
            height="30"
          >
            <path
              d="M832.349727 404.983607v213.133489H576.549571c-58.754098 0-106.616706-47.862607-106.616706-106.616706S517.795472 404.983607 576.549571 404.983607h255.800156m42.666666-42.566745H576.549571c-82.435597 0-149.18345 66.847775-149.183451 149.18345 0 82.435597 66.847775 149.18345 149.183451 149.183451h298.466822V362.416862z"
              p-id="3373"
              fill="#747774"
            ></path>
            <path
              d="M832.349727 788.683841c0 23.481655-19.08509 42.666667-42.666667 42.666666H235.516003c-23.481655 0-42.666667-19.08509-42.666667-42.666666V234.516784c0-23.481655 19.08509-42.666667 42.666667-42.666667h554.266979c23.481655 0 42.666667 19.08509 42.666667 42.666667v127.900078h42.666666v-127.900078c0-47.063232-38.17018-85.233411-85.233411-85.233412H235.516003c-47.063232 0-85.233411 38.17018-85.233411 85.233412v554.266979c0 47.063232 38.17018 85.233411 85.233411 85.233411h554.266979c47.063232 0 85.233411-38.17018 85.233411-85.233411v-127.900078H832.349727v127.800156z"
              p-id="3374"
              fill="#747774"
            ></path>
            <path
              d="M576.549571 511.600312m-21.283373 0a21.283372 21.283372 0 1 0 42.566745 0 21.283372 21.283372 0 1 0-42.566745 0Z"
              p-id="3375"
              fill="#747774"
            ></path>
          </svg>
          <!-- <i class="iconfont icon icon-obligation"></i> -->
        </div>
        <div class="item_text">待付款</div>
      </div>

      <div class="list_item">
        <div class="item_icon">
          <svg style="position:relative;top:-7px; left:-6px;"
            t="1653101977677"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4573"
            width="45"
            height="45"
          >
            <path
              d="M776 262H248c-22.1 0-40 17.9-40 40v90c0 22.1 17.9 40 40 40h10v291c0 22.1 17.9 40 40 40h213c8.3 0 15-6.7 15-15s-6.7-15-15-15H308c-11 0-20-9-20-20V432h90v-30H258c-3.6 0-7.1-1-10-2.7-6-3.4-10-9.9-10-17.3v-70c0-11 8.9-20 20-20h508c11.1 0 20 9 20 20v70c0 7.4-4 13.9-10 17.3-2.9 1.7-6.3 2.7-10 2.7H488v30h248v76c0 8.3 6.7 15 15 15s15-6.7 15-15v-76h10c22.1 0 40-17.9 40-40v-90c0-22.1-17.9-40-40-40z"
              fill="#747774"
              p-id="4574"
            ></path>
            <path
              d="M358 262v260.7c0 8.1 9.1 12.8 15.8 8.2l53.5-44.8c3.5-2.4 8.1-2.4 11.5 0l53.5 44.8c6.6 4.7 15.8-0.1 15.8-8.2V262H358z m120 210.3c0 2.4-2.7 3.9-4.7 2.4l-23-17.3-11.5-8.1c-3.5-2.4-8.1-2.4-11.5 0l-11.5 8.1-23 17.3c-2 1.4-4.7 0-4.7-2.4V292h90l-0.1 180.3zM723.5 715.2L683 674.8V631c0-8.3-6.7-15-15-15s-15 6.7-15 15v50c0 4.3 1.8 8.1 4.7 10.9 0.1 0.1 0.2 0.2 0.2 0.3l44.4 44.4c5.9 5.9 15.4 5.9 21.2 0 5.8-6 5.8-15.5 0-21.4z"
              fill="#74777e"
              p-id="4575"
            ></path>
            <path
              d="M681 583c52.4 0 95 42.6 95 95s-42.6 95-95 95-95-42.6-95-95 42.6-95 95-95m0-30c-69 0-125 56-125 125s56 125 125 125 125-56 125-125-56-125-125-125z"
              fill="#74777e"
              p-id="4576"
            ></path>
          </svg>
        </div>
        <div class="item_text">待发货</div>
      </div>

      <div class="list_item">
        <div class="item_icon">
          <svg
          style="position:relative;top:-7px; left:-6px;"
            t="1653102174895"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5617"
            width="45"
            height="45"
          >
            <path
              d="M776 261.4H248c-22.1 0-40 17.9-40 40v90c0 22.1 17.9 40 40 40h10v291c0 22.1 17.9 40 40 40h213c8.3 0 15-6.7 15-15s-6.7-15-15-15H308c-11 0-20-9-20-20v-281h90v-30H258c-3.6 0-7.1-1-10-2.7-6-3.4-10-9.9-10-17.3v-70c0-11 8.9-20 20-20h508c11.1 0 20 9 20 20v70c0 7.4-4 13.9-10 17.3-2.9 1.7-6.3 2.7-10 2.7H488v30h248v76c0 8.3 6.7 15 15 15s15-6.7 15-15v-76h10c22.1 0 40-17.9 40-40v-90c0-22.1-17.9-40-40-40z"
              fill="#747774"
              p-id="5618"
            ></path>
            <path
              d="M358 261.4v260.7c0 8.1 9.1 12.8 15.8 8.2l53.5-44.8c3.5-2.4 8.1-2.4 11.5 0l53.5 44.8c6.6 4.7 15.8-0.1 15.8-8.2V261.4H358z m120 210.3c0 2.4-2.7 3.9-4.7 2.4l-23-17.3-11.5-8.1c-3.5-2.4-8.1-2.4-11.5 0l-11.5 8.1-23 17.3c-2 1.4-4.7 0-4.7-2.4V291.4h90l-0.1 180.3zM796.9 648c-0.1-0.1-0.3-0.2-0.4-0.3-0.1-0.1-0.2-0.2-0.3-0.4l-89-89c-5.9-5.9-15.4-5.9-21.2 0-5.9 5.9-5.9 15.4 0 21.2l63.8 63.8H545.3c-8.3 0-15 6.7-15 15s6.7 15 15 15h205.1L686.7 737c-5.9 5.9-5.9 15.4 0 21.2 5.9 5.9 15.4 5.9 21.2 0l89-89c5.9-5.9 5.9-15.4 0-21.2z"
              fill="#666666"
              p-id="5619"
            ></path>
          </svg>
        </div>
        <div class="item_text">已发货</div>
      </div>

      <div class="list_item">
        <div class="item_icon">
          <svg
            t="1653102323711"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="6546"
            width="30"
            height="30"
          >
            <path
              d="M860.377432 133.214001 163.652244 133.214001c-41.643446 0-75.546603 33.903158-75.546603 75.546603l0 510.917342c0 41.643446 33.903158 75.546603 75.546603 75.546603l252.743328 0 95.618754 95.559403 95.589079-95.559403 252.774027 0c41.643446 0 75.516928-33.903158 75.516928-75.546603L935.89436 208.761628C935.89436 167.117159 902.020878 133.214001 860.377432 133.214001zM877.749078 231.983515l0 464.473567c0 22.381753-18.21178 40.593534-40.593534 40.593534L579.520813 737.050616l-67.506487 67.565838-67.536162-67.565838L186.874131 737.050616c-22.412452 0-40.624233-18.21178-40.624233-40.593534L146.249899 231.983515c0-22.412452 18.21178-40.624233 40.624233-40.624233l650.28039 0C859.537298 191.360306 877.749078 209.571063 877.749078 231.983515z"
              p-id="6547"
              fill="#747774"
            ></path>
            <path
              d="M302.83519 403.749554 741.266637 403.749554c14.851243 0 26.972305-12.481266 26.972305-27.812439 0-15.361873-12.121062-27.872814-26.972305-27.872814L302.83519 348.0643c-14.851243 0-26.942629 12.510942-26.942629 27.872814C275.892561 391.268288 287.983947 403.749554 302.83519 403.749554z"
              p-id="6548"
              fill="#747774"
            ></path>
            <path
              d="M741.266637 496.578776 302.83519 496.578776c-14.851243 0-26.942629 12.510942-26.942629 27.842115 0 15.331173 12.091386 27.842115 26.942629 27.842115L741.266637 552.263006c14.851243 0 26.972305-12.510942 26.972305-27.842115C768.238942 509.089717 756.11788 496.578776 741.266637 496.578776z"
              p-id="6549"
              fill="#747774"
            ></path>
          </svg>
        </div>
        <div class="item_text">待评价</div>
      </div>

      <div class="list_item">
        <div class="item_icon">
          <svg
          style="position:relative;top:4px; left:3px;"
            t="1653102419835"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="7486"
            width="26"
            height="26"
          >
            <path
              d="M499.5072 0c274.5856 0 499.2 224.6144 499.2 499.2s-224.6144 499.2-499.2 499.2c-264.2944 0-481.4848-206.4384-498.176-468.7872l-0.7168-14.1312L0 488.6016h69.888l0.2048 12.544c2.2016 115.2512 45.9776 220.0064 126.8224 300.8512a421.888 421.888 0 0 0 302.592 126.5664 422.0928 422.0928 0 0 0 302.7968-126.7712 421.888 421.888 0 0 0 126.5664-302.592 415.8464 415.8464 0 0 0-117.9136-291.84l-11.1104-10.9568a421.888 421.888 0 0 0-302.592-126.5664 425.984 425.984 0 0 0-257.28 84.992l-13.6192 10.752-7.3216 6.1952 69.5296 11.776-10.5472 67.1232-184.576-28.16 32.8704-200.0384 67.3792 10.6496-13.824 81.5104 11.008-8.8064A502.4768 502.4768 0 0 1 463.872 1.2288l18.7392-0.9728 16.896-0.256z m2.2016 413.0816l130.6624-124.1088 49.152 49.152-95.0784 88.576h71.7824v69.8368l-123.904-0.0512v54.016h123.904v69.8368l-123.904-0.0512 0.0512 159.232H464.5888v-159.232l-121.6 0.0512v-69.8368h121.6V496.4864H342.9888V426.752h71.5264L321.9968 338.0224l48.9984-49.0496L501.76 413.0816z"
              p-id="7487"
              fill="#747774"
            ></path>
          </svg>
        </div>
        <div class="item_text">售后</div>
      </div>
    </div>
    <!-- 轮播图 -->
    <div class="switch">
      <van-swipe  :autoplay="2000" vertical style="height:100%;"  >
        <van-swipe-item v-for="(item, index) in switchlist" :key="index">
          <img :src="item.url" class="van-swipe-item-list" />
        </van-swipe-item>
          <template #indicator>
             <div class="custom-indicator"></div>
          </template>
      </van-swipe>
    </div>
    <!-- 工具栏 -->
    <div class="my_tool">
      <div class="tool_list">
        <div
          class="item"
          v-for="(item, index) in list"
          :key="index"
          @click="goadress(item)"
        >
          <div class="img_box"><img :src="item.url"/></div>
          <div class="text">{{ item.title }}</div>
        </div>
        <div class="item">
         </div>
      </div>
    </div>
    <!-- 版权 -->
    <MyFooter class="footer"></MyFooter>
  </div>
</template>

<script>
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";
import { Icon,Toast } from "vant";
import MyFooter from "@/components/MyFooter.vue";
import {mapState } from "vuex";
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Icon);
export default {
  components: {
    MyFooter,
  },
  data() {

    return {
      list: [],//工具数据
      switchlist: [],//轮播图数据
    };
  },

  computed: {
        // 来看看登录没
        ...mapState("user",["token"]),
        // 看看用户名 看最后一个
        ...mapState("user",["username"]),
  },

  methods: {
    goLogin() {
      this.$router.push({ name: "Login" });
    },
    goorder(){
        // this.$router.push({name:'SubmitOrder'})
        if (this.token) {
        this.$router.push({ name: "SubmitOrder" });
      } else {
        Toast("请登录账号");
      }
    },
    goadress(item) {
      if (item.id === "33219") {
        if (this.token) {
          this.$router.push({ name: "MyAddress" });
        } else {
          Toast("请登录账号");
        }
      }
    },
  },

  created() {
    this.$axios.get("tooldata.json").then((res) => {
      this.list = res.data[0].productDetailss;
      // console.log("工具", this.list);
    });
    this.$axios.get("switchdata.json").then((res) => {
    this.switchlist = res.data;
    // console.log(" 1111this.switchlist", this.switchlist);
  });
}
};
</script>

<style lang="less" scoped>
.my {
  padding: 0 0.422rem;
  box-sizing: border-box;
  background:url(@/assets/bgc.png) no-repeat 0px -107px;
  background-size:100% auto;
  .my_top {
    .user {
      display: flex;
      align-content: center;
      height: 1.5rem;
      line-height: 1.5rem;
      margin-top: 0.5rem;
      .user_icon {
        width: 1.5rem;
        height: 1.5rem;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .inform {
        color: #666;
        font-weight: 400;
        font-size: 0.4rem;
        margin-left: 0.2rem;
      }
      .bottom_text {
      border-radius: 2em;
      border: 1px solid greenyellow;
      color: #3d3d3d;
      font-weight:500;
      display: block;
      box-sizing: border-box;
      // min-width: 2.04rem;
      height: 0.8rem;
      width: 2rem;
      padding: 0 0.12rem;
      font-size: 0.42rem;
      line-height: 0.72rem;
      text-align: center;
      margin-top: 0.3rem;
      margin-left: 1.3rem;
      background-image: linear-gradient(200deg,#72afd3,#96fbc4);
    }
    }
    .coupon {
      display: flex;
      width: 4rem;
      //   background-color: skyblue;
      margin: 0.4rem auto;
      justify-content: space-between;
      .text {
        font-weight: 400;
        font-size: 0.26rem;
        .numbers {
          text-align: center;
        }
        .my_youhui {
          margin-top: 0.2rem;
        }
      }
    }
  }
  .order {
    width: 100%;
    display: flex;
    justify-content: space-between;
    line-height: 1rem;
    margin-bottom:10px;
    .my_order {
      color: #000;
      font-weight: 500;
      font-size: 0.4rem;
    }
    .all_order {
      font-size: 0.26rem;
      color: #666;
    }
  }
  .my_list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .list_item {
      .item_icon {
        // background-color: skyblue;
        width: 0.9rem;
        height: 0.9rem;
        text-align: center;
        box-sizing: border-box;
        padding: 0.1rem 0.2rem;
      }
      .item_text {
        width: 1.2rem;
        text-align: center;
        color: #666;
        font-weight: 400;
        font-size: 0.26rem;
      }
    }
  }    .switch{

     margin-top:25px;
      width: 100%;
      height:4.17rem;
      // overflow:hidden;

    //   .van-swipe-item-list {
    //   // display:block;
    //   width: 100%;
    //   height: 4.17rem;
    // }
      .van-swipe-item-list{
      // display:block; 
          width: 100%;
          height:100%;

      }
      // 让录播标点消失
       .custom-indicator {
          position: absolute;
          right: 5px;
          bottom: 5px;
          padding: 2px 5px;
          font-size: 12px;
          background: transparent;
      }
    }
  .my_tool {
    width: 100%;
    margin-top: 0.3rem;
    //margin-bottom: 0.05rem;
    .tool_list {
      width: 100%;
      box-sizing: border-box;
      // padding: 0 0.2rem;
      // padding-left: 0.4rem;
      // background-color: skyblue;
      display: flex;
      // justify-content: space-evenly;
      justify-content: space-between;
      flex-wrap: wrap;
      // .item:nth-child(1) {
      //   margin-left: 0;
      // }
      // .item:nth-child(5) {
      //   margin-left: 0;
      // }
      .item {
        padding:0 0.4rem;
        margin-top: 0.2rem;
        // margin-left: 0.6rem;
        width: 1.37rem;

        .img_box {
          width: 100%;
          text-align: center;
          img {
            width: 100%;
          }
        }
        .text {
          text-align: center;
        }
      }
    }
  }
  .footer {
    margin-top: 1rem;
  }
}
</style>