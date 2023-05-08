<template>
  <div class="productdetail">
    <!-- 顶部返回和导航栏 -->
    <div class="productdetail_box">
      <div class="left" @click="goBack">
        <svg
          t="1652491567824"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1916"
          width="24"
          height="24"
        >
          <path
            d="M862.485 481.154H234.126l203.3-203.3c12.497-12.497 12.497-32.758 0-45.255s-32.758-12.497-45.255 0L135.397 489.373c-12.497 12.497-12.497 32.758 0 45.254l256.774 256.775c6.249 6.248 14.438 9.372 22.627 9.372s16.379-3.124 22.627-9.372c12.497-12.497 12.497-32.759 0-45.255l-203.3-203.301h628.36c17.036 0 30.846-13.81 30.846-30.846s-13.81-30.846-30.846-30.846z"
            fill="#ff4b39"
            p-id="1917"
          ></path>
        </svg>
      </div>

      <div
        :class="['productdetail_imfo', { active: activeTab === 'info' }]"
        @click="goinfo"
      >
        商品详情
      </div>

      <div
        :class="['productdetail_imfo', { active: activeTab === 'user' }]"
        @click="gouser"
      >
        用户评价
      </div>

      <div
        :class="['productdetail_imfo', { active: activeTab === 'can' }]"
        @click="gocan"
      >
        参数及包装
      </div>
    </div>
    <!-- 详情的内容 -->
    <div class="item" v-if="activeTab === 'info'">
      <div class="procutinfo">
        <!-- 轮播图 -->
        <div class="switch">
          <van-swipe @change="onChange" :autoplay="isauto ? '-1' : '3000'">
            <van-swipe-item v-if="showVideo">
              <img
                :src="imglist[3].url"
                class="my-img-auto"
                style="top:0;bottom:0;left:0;right:0;width:100%;height:100%;"
                v-if="!isauto"
              />
              <img
                src="https://s10.mogucdn.com/mlcdn/c45406/190516_61cf06ffkl181d5g4725kh9ccibki_165x165.png"
                class="my-img-auto"
                v-if="!isauto"
              />
              <video width="100%" height="375px" ref="video"  @click="playing" :src="showVideo">
                <source
                  type="video/mp4"
                />
              </video>
            </van-swipe-item>
            <van-swipe-item v-for="(item, index) in imglist" :key="index">
              <img :src="item.thumbnail_url"  class="img-auto"
            /></van-swipe-item>

            <template #indicator>
              <div class="custom-indicator">
                {{ current + 1 }}/{{ imglist.length + isVideoNum }}
              </div>
            </template>
          </van-swipe>
        </div>
        <!-- 价格 -->
        <div class="procutinfo_price">
          <span>¥</span>
          <span class="span_price">{{ moneyPrice }}</span>
        </div>
        <!-- 产品详情 -->
        <div class="configure">
          <div class="configure_box">
            <h3>{{ list.name }}</h3>
            <p v-html="list.defaultSlogan"></p>
          </div>
        </div>
        <!-- <div class="edition">
          <div class="edition_box">
            <div class="edition_item">版本</div>
            <div class="list_box" v-for="(item, index) in gG" :key="index">
              <span
                class="edition_list"
                :class="{ active: activeindex === index }"
                @click="changtab(index)"
                >{{ item.item }}</span
              >
            </div>
          </div>
        </div> -->
        <!-- <div class="edition_color">
          <div class="edition_color_item">颜色</div>
          <div class="edition_color_list_box">
            <span
              class="edition_color_list"
              v-for="(item, i) in mycolor"
              :key="i"
              @click="toggle(i)"
              :class="{ active: Activeindex === i }"
              >{{ item.item }}</span
            >
            <span class="last_color"></span>
          </div>
        </div> -->
        <!-- <div></div> -->
        <!-- <div class="myNumber">
          <div class="myNumber_item">
            <span>数量</span><button @click="reduceCount">-</button
            ><span>{{ count }}</span
            ><button @click="addCount">+</button>
          </div>
        </div> -->

        <div class="total_img">
          <div v-for="(item, index) in totalImg" :key="index">
            <img :src="item.url"/>
          </div>
        </div>
      </div>
    </div>
    <!-- 用户评价的顶部内容 -->
    <div class="item_two" v-if="activeTab === 'user'">
      <div v-for="(item, index) in haoping" :key="index" class="user_item">
        <ProductUser :pro_item="item"></ProductUser>
      </div>
    </div>
    <!-- 评论体内容 -->
    <div class="ping_box" v-if="activeTab === 'user'">
      <div class="ping_box_list">
        <van-checkbox
          v-model="checked"
          checked-color="#ee0a24"
          >只看当前商品</van-checkbox
        >
        <div v-for="(item, index) in Allping" :key="index">
          <div v-if="checked">
            <PingLun v-if="activeTab === 'user'" :list="item"></PingLun>
            <!-- <div v-else><DanPing :mylist="DanPing"></DanPing></div> -->
          </div>
        </div>
        <div></div>
      </div>
    </div>
    <div v-if="activeTab === 'user'||activeTab==='can'">
      <div class="can_box" v-for="(item, index) in canshu" :key="index">
        <img :src="item.url" />
      </div>
    </div>
    <!-- 展示弹出层 -->
    <!-- <van-popup v-model="pop" class="vant-pop">
      <div class="peizhi_box">
        <div class="peiz">配置</div>
        <div class="xuanzhe">188+255</div>
      </div>
    </van-popup> -->

    <!-- 底部固定的导航栏 -->
    <div class="footer">
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon icon="cart-o" text="购物车" @click="goShopCar" :badge="dataLength" v-show="!showIcon"/>
        <van-goods-action-icon icon="cart-o" text="购物车" @click="goShopCar" v-show="showIcon"/>
        <van-goods-action-icon icon="shop-o" text="店铺" />
        <van-goods-action-button type="warning" text="加入购物车" @click="showPopup"/>
        <van-goods-action-button type="danger" text="立即购买" @click="goBuy"/>
      </van-goods-action>
    </div>
    <van-popup
      v-model="pop"
      position="bottom"
      :style="{ height: '30%' }"
      class="vant-pop"
    >
      <div class="peizhi_box" v-if="gG.length != 0">
        <div class="peiz">配置</div>
        <div
          class="xuanzhe"
          :class="{ active: Activeindex === index }"
          v-for="(item, index) in gG"
          :key="index"
          @click="changtab(index)"
        >
          {{ item.item }}
        </div>
      </div>
      <div class="peizhi_box">
        <div class="peiz">颜色</div>
        <div
          class="xuanzhe"
          v-for="(item, index) in mycolor"
          :key="index"
          :class="{ active: myi === index }"
          @click="toggle(index)"
        >
          {{ item.item }}
        </div>
      </div>
      <div class="count_box">
        <span>数量</span>
        <van-stepper
          v-model="value"
          theme="round"
          button-size="22"
          disable-input
          class="stepp"
        />
      </div>
      <div class="confirm_box">
        <div class="confirm" @click="getObje" >确认加入</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
// import ProcutInfo from "@/components/ProcutInfo.vue";
import ProductUser from "@/components/ProductUser.vue";
// import ProductCan from "@/components/ProductCan.vue";
import PingLun from "@/components/PingLun.vue";
// import DanPing from "@/components/DanPing.vue";
import Vue from "vue";
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from "vant";
import { Checkbox, CheckboxGroup } from "vant";
import { Popup } from "vant";
import { Stepper } from "vant";
// import { Cell, CellGroup } from 'vant';
import { Toast } from 'vant';
import { Swipe, SwipeItem } from "vant";
import {mapState } from "vuex";
// import { Toast } from 'vant';

// Vue.use(Toast);

Vue.use(Swipe);
Vue.use(SwipeItem);

Vue.use(Toast);
// Vue.use(Cell);
// Vue.use(CellGroup);
Vue.use(Stepper);
Vue.use(Popup);

Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    // ProcutInfo,
    ProductUser,
    // ProductCan,
    PingLun,
    // DanPing,
    
  },
  data() {

    return {
      id: "",//传进来的值
      list: [],//初始化的值
      activeTab: "info",//控制当前在导航栏哪个选项 默认是详情
      current: 0,//当前页数 0开头
      imglist: [],//产品的图片数据
      isauto: false,//是否正在播放
      // active: 0,
      gG: [],//配置数据
      mycolor: [],//颜色数据
      // activeindex: 0,
      // count: 1,
      totalImg: [],//产品介绍头部的介绍图片数据
      Activeindex: 0,//加入购物车里的 配置的当前勾选项0 1 2 
      haoping: [],//评论上面的那些关键词数据
      checked: true,//是否勾选当前按钮
      // currentPage: 1,
      Allping: [],//评论内容的数据
      // DanPing: [],
      canshu: [],//产品介绍后面参数图
      pop: false,//弹窗是否弹起
      value: "",//数量 步记器 刚开始给了空字符串 但不影响后面他是数字
      myi: 0,//加入购物车里面 颜色项配置选择 0 1 2
      ischeck:false,//本地存储的末尾项
      dataLength:0,//本地存储里面有多少个商品
      // showjq:true,
      showVideo:'',//视频数据
      moneyPrice:'',//产品价格
      // display_video:"",
      // showMyColor:false
    };
  },
  // watch:{
  //   dataLength:{
  //     deep:true,
  //     handler(value){
  //       console.log("czy9999999");
  //       this.dataLength=value;
  //     }
  //   }
  // },
  computed: {
    //通过计算属性来判断接口 有没有视频 来判断轮播图下标总数
    isVideoNum(){
      if(this.showVideo){
          return 1;
      }else{
        return 0;
      }
    },
        ...mapState("user",["token"]),
    // Showcolor() {
    //   // console.log("czy",this.list)
    //   this.mycolor.forEach((item) => {
    //     // console.log("item", item);
    //     if (item.item != "") {
    //       // console.log("item", item);
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   });
    // },
    // 底部导航栏的购物车下标
    showIcon(){
      if(this.dataLength == 0){
        return true
      }else{
        return false
      }
    },
    // videoSrc(){
    //   console.log("66666688699",this.list)
    //   return this.list.listVideoMaps.display_video;
    // }
  },

  methods: {
    goBuy(){
    if(this.token){
      this.getObje()
      this.$router.push({ name: "ShopCard" });
    }else{
       Toast('请先登录账号');
    }

    },
    // addCount() {
    //   this.count++;
    // },
    // reduceCount() {
    //   if (this.count <= 1) {
    //     this.count = 1;
    //   } else {
    //     this.count--;
    //   }
    // },
    goShopCar(){
          this.$router.push({ name: "ShopCard" });
    },
    
    // 购买 确认加入
    getObje() {
      let peizhi;
      let colors;
      this.gG.forEach((v, i) => {
        // console.log(v,i);
        if (this.Activeindex == i) {
          // console.log(this.Activeindex);
          // console.log(v.item);
          peizhi = v.item;
        }
      });
      this.mycolor.forEach((v, i) => {
        if (this.myi == i) {
          // console.log(v.item);
          colors = v.item;
        }
      });
      let price = this.list.originalPrice
      // console.log(price);
      let munber = this.value;
      // console.log(this.value);
      let img = this.list.url;
      let ids = this.id;
      // console.log("czyyyyy",this.list.name)
      let myname = this.list.name;
      let ischeck = this.ischeck
      // console.log(munber);
      // console.log(myname);
      // console.log(img);
      let obj = { munber, img, ids, myname, colors, peizhi,price,ischeck};
      // console.log(ids);
      // let local = JSON.parse(localStorage.getItem("shopobj-data")) || [];
      let local = JSON.parse(localStorage.getItem("shopobj-data"));
      // let flag = 0;
      // console.log("czy1",local.length);
      for (let i = 0; i < local.length; i++) {
        if (local[i].ids === ids) {
          if (local[i].colors === colors) {
            if (local[i].peizhi === peizhi) {
              local[i].munber += munber;
              localStorage.setItem("shopobj-data", JSON.stringify(local));
              // this.dataLength=JSON.parse(localStorage.getItem("shopobj-data")).length
              this.pop =!this.pop
              this.$toast("加入购物车成功")
              return;
            }
          }
        }
          
      }
      local.push(obj);
      localStorage.setItem("shopobj-data", JSON.stringify(local));
      this.pop =!this.pop
      this.dataLength=JSON.parse(localStorage.getItem("shopobj-data")).length
      this.$toast("加入购物车成功")
      // this.$router.push({name:'ShopCard'})
    },
    // 获取加入购物车时的数据结束

    goBack() {
      this.$router.go(-1);
    },
    // onClickIcon() {
    //   Toast("点击图标");
    // },
    // onClickButton() {
    //   Toast("点击按钮");
    // },
    goinfo() {
      this.activeTab = "info";
    },
    gouser() {
      this.activeTab = "user";
    },
    gocan() {
      this.activeTab = "can";
    },
    onChange(index) {
      this.current = index;
    },
    // 视频播放
    playing() {
      this.isauto = !this.isauto;
      if (this.isauto) {
        // console.log(this.$refs);
        this.$refs.video.play();
      } else {
        this.$refs.video.pause();
      }
    },
    // 弹出框
    showPopup() {
      if(this.token){
        this.pop = true;
      }else{
          Toast('请先登录账号');
      }
      
    },
    // 配置高亮
    changtab(index) {
      if (this.Activeindex === index) {
        return;
      } else {
        this.Activeindex = index;
      }
    },
    // 颜色高亮
    toggle(i) {
      if (this.myi === i) {
        return;
      } else {
        this.myi = i;
      }
    },
    // celect() {
    //   // console.log("aaa");
    //   //  if(this.)
    // },
  },

  created() {
    // console.log("mycolor", this.gG);
    this.id = this.$route.query.id;
    // console.log("id:", this.id);
    this.$axios
      .get(`${this.id}.json`)
      .then((res) => {
        // console.log("czy6969696699999999",res.data);
        this.list = res.data;
        // console.log("czyyyyyyyyyyyycc",this.list);
        this.showVideo =this.list.listVideoMaps.display_video;
        // console.log("czy8888888888888888",this.showVideo);
        this.moneyPrice=this.list.priceInfo.price;
        // console.log("696969696",this.list)
        // console.log("11111111",this.list);
        this.imglist = res.data.duoDuanDetailImages;
        // console.log(this.imglist)
        this.list.attributes.configs.forEach((v) => {
          if (v.name === "配置") {
            this.gG = v.values;
          } else if (v.name === "颜色") {
            this.mycolor = v.values;
          }
        });
        // this.gG = this.list.attributes.configs[0].values;
        // this.mycolor = this.list.attributes.configs[1].values;
        this.totalImg = this.list.duoDuanDescriptionImages;
        this.canshu = this.list.specImagesMaps;
        // console.log("111",this.canshu );
      });



    // this.$axios
    //   .get("cn/oapi/goods/web/info/skuId?skuId=" + this.id)
    //   .then((res) => {
    //     // console.log("czy6969696699999999",res.data);
    //     this.list = res.data;
    //     // console.log("czyyyyyyyyyyyycc",this.list);
    //     this.showVideo =this.list.listVideoMaps.display_video;
    //     // console.log("czy8888888888888888",this.showVideo);
    //     this.moneyPrice=this.list.priceInfo.price;
    //     // console.log("696969696",this.list)
    //     // console.log("11111111",this.list);
    //     this.imglist = res.data.duoDuanDetailImages;
    //     this.list.attributes.configs.forEach((v) => {
    //       if (v.name === "配置") {
    //         this.gG = v.values;
    //       } else if (v.name === "颜色") {
    //         this.mycolor = v.values;
    //       }
    //     });
    //     // this.gG = this.list.attributes.configs[0].values;
    //     // this.mycolor = this.list.attributes.configs[1].values;
    //     this.totalImg = this.list.duoDuanDescriptionImages;
    //     this.canshu = this.list.specImagesMaps;
    //     // console.log("111",this.canshu );
    //   });



    // 请求评论数据
    this.$axios
      .get("pingluntou.json")
      .then((res) => {
        // console.log("pinglun:",res.data.goodsCommentTags);
        this.haoping = res.data.goodsCommentTags;
        // console.log("this.haoping", this.haoping);
      });

    // 评论内容数据
    this.$axios
      .get("pinglun.json")
      .then((res) => {
        // console.log("评论内容:", res);
        this.Allping = res.data.datas;
      });
    // 单个评论区获取数据
    // this.$axios
    //   .get(
    //     "cn/oapi/comment/web/getCommentListByCondition?goodsSpuId=6200&type=0&desc=0&currentPage=1&pageSize=10&goodsSkuId=7046"
    //   )
    //   .then((res) => {
    //     // console.log("DanPing",res);
    //     this.DanPing = res.data;
    //   });

      let mylength = JSON.parse(localStorage.getItem("shopobj-data"))
      this.dataLength = mylength.length
  },

};
</script>

<style lang="less" scoped>
/deep/.van-swipe-item {
  img {
    width: 100%;
    height: auto;
    display: 50px;
  }
}
/deep/.van-goods-action-button {
  width: 2.9rem;
}
/deep/.custom-indicator {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  width: 0.69rem;
  height: 0.42rem;
  color: #fff;
  font-size: 0.24rem;
  background: #000;
  border-radius: 0.1rem;
  opacity: 0.3;
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
    // font-size: 12px;
    // background: rgba(0, 0, 0, 0.1);
}
.productdetail {
  height: 0.79rem;
  font-size: 16px;
  color: #9a9a9a;
  line-height:20px;
  margin-top:50px;
  .productdetail_box {
    padding-top:15px;
    display: flex;
    justify-content: space-evenly;
    position:fixed;
    width: 100%;
    z-index:1;
    top:0;
    background-color: #fff;
    .productdetail_imfo {
      position: relative;
      &.active {
        color: #ff722c;
        border-bottom: 2px solid #ff722c;
      }
    }
  }
  .item {
    .procutinfo {
      overflow: hidden;
      width: 100%;
      margin-top: 5px;
      .switch {
        height: 7.5rem;
        position: relative;
        //   background-color: skyblue;
        .my-img-auto {
          width: 1rem;
          height: auto;
          position: absolute;
          left: 4.6rem;
          top: 4.8rem;
        }
      }
      .procutinfo_price {
        // color: red;
        box-sizing: border-box;
        padding: 0 20px;
        margin-top: 100px;
        min-height: 1.2rem;
        background: #fff;
        background-size: 100% 100%;
        padding: 0 0.36rem;
        padding-left: 0.32rem;
        display: -webkit-box;
        display: flex;
        align-items: center;
        span {
          color: rgb(243, 65, 65);
          font-size: 0.45rem;
        }
        .span_price {
          color: rgb(243, 65, 65);
          font-size: 0.68rem;
        }
      }
      .fenqi {
        margin: 0.2rem 0.24rem;
        padding: 0.27rem 0.31rem;
        overflow: hidden;
        background: rgb(250, 249, 249);
        border-radius: 0.21rem;
      }
      .configure {
        padding: 0 3px;
        box-sizing: border-box;
        background-color: rgb(243, 244, 244);
        .configure_box {
          background-color: white;
          margin: 0 0.24rem;
          overflow: hidden;
          background: #fff;
          // border-radius: 0.16rem;
          padding: 0 10px;
          box-sizing: border-box;
          box-sizing: border-box;
          h3 {
            max-height: 1.8rem;
            margin-top: 0.32rem;
            overflow: hidden;
            font-weight: 500;
            font-size: 0.53rem;
            line-height: 0.6rem;
            box-sizing: border-box;
            color: #000;
            padding: 0 10px;
          }
        }
      }
      .edition {
        padding: 0 12px;
        background: rgb(243, 243, 243);
        .edition_box {
          position: relative;
          box-sizing: border-box;
          padding: 0.32rem 0 0.32rem 0;
          overflow: hidden;
          background: #fff;
          padding: 0 10px;
          display: flex;
          .edition_item {
            margin-top: 4px;
          }
          // align-items: flex-start;
          .list_box {
            max-width: 5.6rem;
            margin: 0 0.16rem 0.2rem 0;
            padding: 0.15rem 0.2rem;
            overflow: hidden;
            color: #000;
            font-size: 0.32rem;
            white-space: nowrap;
            text-overflow: ellipsis;
            background: #f7f8fa;
            border-radius: 0.1rem;
            text-align: center;
            margin-left: 10px;

            .edition_list {
              text-align: center;
              color: #000;
              font-size: 0.32rem;
              &.active {
                color: red;
                border: 2px solid red;
              }
            }
          }
        }
      }
      .edition_color {
        padding: 0 12px;
        background: rgb(243, 243, 243);
        display: flex;
        width: 100%;
        // justify-content: space-evenly;
        .edition_color_item {
          background-color: white;
          box-sizing: border-box;
          padding: 0 10px;
        }
        .edition_color_list_box {
          background-color: white;
          .edition_color_list {
            overflow: hidden;
            color: #000;
            font-size: 0.32rem;
            white-space: nowrap;
            text-overflow: ellipsis;
            background: #f7f8fa;
            border-radius: 0.1rem;
            text-align: center;
            margin-left: 10px;
            background-color: white;
            &.active {
              color: red;
              border: 1px solid red;
            }
          }
          .last_color {
            width: 2.21rem;
            background-color: white;
            display: inline-block;
          }
        }
      }
      .myNumber {
        box-sizing: border-box;
        padding: 10px 12px;
        background-color: rgb(246, 247, 247);
        .myNumber_item {
          width: 100%;
          background-color: white;
          span {
            margin-left: 5px;
          }
          button {
            margin-left: 5px;
            width: 0.56rem;
            height: 0.56rem;
            line-height: 0.56rem;
            text-align: center;
            background: #f7f8fa;
            border-radius: 0.1rem;
            border: none;
          }
        }
      }
      .total_img {
        width: 100%;
        margin-bottom:50px;
        img {
          width: 100%;
        }
      }
    }
  }
  // .footer {
  // }
}
.user_item {
  display: flex;
}
.item_two {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  margin-top: 60px;
  padding: 0 8%;
  .user_item {
    &:nth-child(2n + 1) {
      margin-right: 10px;
    }
    /deep/.body{
      width: 2.7rem;
    }
  }
}
.last {
  width: 100%;
  height: 8px;
  background-color: rgb(246, 246, 246);
}
.ping_box {
  background-color: white;
  box-sizing: border-box;
  padding: 0 8%;
  .ping_box_list {
    margin-top: 15px;
  }
}
.can_box {
  max-width: 100vw;
  img {
    width: 100%;
  }
}
.vant-pop {
  .peizhi_box {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 20px;
    .peizhi_box {
      margin: 0 auto;
    }
    .xuanzhe {
      color: #333;
      background-color: #eff1f3;
      border: 0.02rem solid transparent;
      padding: 5px 5px;
      height: 0.5rem;
      border-radius: 9px;
      &.active {
        color: red;
        border: 0.02rem solid red;
        border-radius: 9px;
      }
    }
  }
  .count_box {
    display: flex;
    align-items: center;
    padding: 0 0.3rem;
    margin-top: 0.5rem;
    .stepp {
      margin-left: 0.2rem;
    }
  }
  .confirm_box {
    display: flex;
    justify-content: center;
    margin-top: 0.35rem;
    .confirm {
      font-size: 14px;
      color: black;
      font-weight: 500;
      background: linear-gradient(to right, #ffd01e, #ff8917);
      height: 1.2rem;
      line-height: 1.2rem;
      color: white;
      text-align: center;
      width: 6.3rem;
      border-radius: 16px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>