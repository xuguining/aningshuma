<!-- 已改 -->
<template>
  <div class="home_page">
    <!-- 组件引头部 -->
    <MyHead></MyHead>
    <!-- 轮播图 -->
    <div class="switch">
      <van-swipe  :autoplay="2000" indicator-color="rgba(0,0,0,.3)">
        <van-swipe-item v-for="(item, index) in switchlist" :key="index">
          <img :src="item.url" class="van-swipe-item-list" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 横排五图片 -->
    <div class="cation">
      <!-- 统一点击后接入myarr的第6个商品 -->
      <ul>
        <li v-for="(item, index) in cation" :key="index" @click="gohppone(myarr[5])">
          <div class="li_img"><img :src="item.url"/></div>
          <div class="li_text">{{ item.title }}</div>
        </li>
      </ul>
    </div>
    <!-- 首页的其他所有内容 -->
    <div class="home_picture">
      <!-- 6张大图 -->
      <div
        class="home_picture_item"
        v-for="(item, index) in myarr"
        :key="index"
        @click="gohppone(item)"
      >
        <img :src="item.url" />
      </div>

      <!-- 4小图开始 -->
            <!-- 统一接入myarr的第5个商品 --> 
      <div class="home_check">
        <div class="home_check_item" v-for="(item, index) in enco" 
            :key="index"  @click="gohppone(myarr[4])">
          <img :src="item.url" />
        </div>
      </div>
      <!-- 今日必抢开始 -->
      <div class="home_today">
        <div class="home_today_item">
          <div class="item_box">
            <div class="list">今日必抢</div>
            <div class="list_time"><van-count-down :time="time" /></div>
            <span class="list_later">后结束</span>
          </div>

          <div class="after">
            更多 <span><van-icon name="arrow" /></span>
          </div>
        </div>
      </div>
      <!-- 今日必抢的左右滑动开始 -->
      <div class="left_right">
        <div class="scroll">
          <ul>
            <li :style="{ width: `${92 * myToday.length}px` }">
              <div
                class="total_box"
                v-for="(item, index) in myToday"
                :key="index"
              >
                <div class="total_img">
                  <img :src="item.url" />
                </div>

                <div class="total_text">{{ item.title }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
       <!-- 剩下全部列表 -->
      <div v-if="compoonentarr.length > 0">
        <div v-for="(item, index) in compoonentarr" :key="index">
          <IntelligenceSheng :compoonentarr_item="item" :twolist="compoonentarr"></IntelligenceSheng>
        </div>
      </div>
      <!-- 底部版权说明开始 -->
      <MyFooter></MyFooter>
      <!-- 底部结束 -->
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// import axios from '@/api/instance'
import { createNamespacedHelpers } from "vuex";
// 用用辅助函数助手
const userNs = createNamespacedHelpers("user")
import Vue from "vue";
import { Search } from "vant";
import { Swipe, SwipeItem } from "vant";
// import { NoticeBar } from "vant";
import { CountDown } from "vant";
import { Icon } from "vant";
import MyFooter from "@/components/MyFooter.vue";
import MyHead from "@/components/MyHead.vue";
// import MyHphot from "@/components/MyHphot.vue";
import IntelligenceSheng from "@/components/IntelligenceSheng.vue";
// import IntelligenceChuan from "@/components/IntelligenceChuan.vue";

// Vue.use(NoticeBar);
Vue.use(Icon);
Vue.use(CountDown);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Search);
export default {
  //import引入的组件需要注入到对象中才能使用
    data() {
      //这里存放数据
      return {
        // value: "",
        cation: [], //5图数据
        time: 23 * 60 * 60 * 1000,//倒计时数据
        myToday: [],//今日必抢内的滑动数据
        // list: [],
        // oppolist: [],
        switchlist: [], //轮播图数据
        myarr: [], //6张大图数据
        enco: [],//4小图
        // intelligenceImg: [],
        // intelligencebody: [],
        // intelligencebody2: [],
        compoonentarr: [],//剩下的全部遍历数据
        // hotdata:[],
        // serachdata:[],
        // isshow:false
      };
    },
  components: {
    // MyHphot,
    IntelligenceSheng,
    MyFooter,
    MyHead,
    // IntelligenceChuan,
  },
  //监听属性 类似于data概念
  computed: {
     ...userNs.mapState(["token"]),
  },
  //方法集合
  methods: {
    // 跳转商品详情
    gohppone(item){
      // console.log("11",item);  // 当前商品的数据
      // console.log("22",this.myarr);  // myarr 6张大图数据
      this.myarr.forEach(elmemnt =>{
        if(elmemnt.id === item.id){
          let id = item.link
          let index = id.indexOf('skuId=')
          // console.log(id);
          id=id.substr(index + 6)
          // console.log("抽取的id",id)
          let i = id.indexOf("&")
          // console.log(i);
          if(i==4){
             id = id.slice(0,4)
          }else{
            id = id.slice(0,5)
          }
        // console.log(id);
          this.$router.push({name:"ProductDetail",query:{id}})
          // console.log(id);
        }
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // console.log(`${this.token}你好`),

    // // 5图的oppo接口
    // this.$axios.get("/cn/oapi/configs/web/icons/040202,040203").then((res) => {
    //   this.cation = res.data;
    // });
    // 5图的jsonp接口
    this.$axios.get("fivedata.json").then((res) => {
      this.cation = res.data;
    });

    // // 请求今日必抢数据
    // this.$axios.get("cn/oapi/goods/web/products/seckill/01010myproduct5").then((res) => {
    //   this.myToday = res.data[0].productDetailss;
    // });

    // 请求今日必抢json数据
    this.$axios.get("mustbuy.json").then((res) => {
      // console.log('res',res);  // mustbuy.json 里的12个数据
      this.myToday = res.data[1].productDetailss;
      // console.log(res.data[1]);  // 今日必抢里的10个数据
    });
    // this.$axios.get("cn/oapi/goods/web/products/v15/040204").then((res) => {
    //   // console.log(res);
    //   this.list = res.data[1].productDetailss;
    //   // console.log("list", this.list);
    // });

    // // 轮播图真实oppo接口
    // this.$axios.get("cn/oapi/configs/web/banners/040101,040201").then((res) => {
    //   this.switchlist = res.data;
    //   // console.log(" 1111this.switchlist", this.switchlist);
    // });

    // 轮播图json接口
    this.$axios.get("switchdata.json").then((res) => {
      this.switchlist = res.data;
    });


    this.$axios.get("myproduct.json").then((res) => {
      // console.log("res",res);  // 首页的12个数据
      // this.intelligenceImg = res.data[3];
      // let intelligencebody = res.data[3].productDetailss;
      // intelligencebody.forEach((item, index) => {
      //   if (index < 6) {
      //     this.intelligencebody2.push(item);
      //   }
      // });
      // console.log("intelligencebody2", this.intelligencebody2);
      let arr = [];
      let arr2 = [];
      let oppolist = res.data[0].productDetailss;
      oppolist.forEach((item, index) => {
        if (index < 6) {
          arr.push(item);
        } else {
          arr2.push(item);
        }
      });
      this.myarr = arr;
      // console.log("myarr",this.myarr);
      this.enco = arr2;

      let arr3 = res.data;
      // console.log("arr3", arr3);
      arr3.forEach((item) => {
        if (item.name != "首屏格子V1.2" && item.name != "今日必抢") {
          this.compoonentarr.push(item);
        }
      });
      // console.log(" this.compoonentarr", this.compoonentarr);
      //  console.log("myarr", this.myarr);
      //   console.log("enco",this.enco);
    });
  },
};
</script>

<style lang="less" scoped>
// 处理今日必抢的横向滚动条
ul::-webkit-scrollbar{
            width: 0px;
          }
.van-count-down {
  color: red;
}

.home_page {
  width: 100vw;
  box-sizing: border-box;
  overflow: hidden;
  .input_nav {
    width: 100%;
    // height: 0.92rem;
    background-color: #fff;
    .scoll_box {
      height: 50px;
      display: flex;
      align-items: center;
      .logo{
        img{
          height: 50px;
          width: 50px;
        }
      }
      .scoll {
        width: 78%;
      }
      .text {
        margin-left: auto;
        color: #333;
        font-weight: 600;
        font-size: 15px;
        width: 14%;
        text-align:center;
        font-size:17px;
      }
    }
  }
  .switch {
    width: 100%;
    height: 4.17rem;
    .van-swipe-item-list {
      width: 100%;
      display: block;
      height: 4.17rem;
    }
    // background-color: skyblue;
  }
  .cation {
    width: 100%;
    height: 99px;
    margin-top: 10px;
    ul {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 13px;
      li {
        &:nth-child(1) {
          margin-left: 0.35rem;
        }
        margin-left: 15px;
        // width: 63px;
        width: 100%;
        height: 58px;
        .li_img {
          width: 45px;
          height: 45px;
          text-align: center;
          img {
            width: 100%;
            display: block;
          }
        }
        .li_text {
          // width: 91%;
          height: 12px;
          line-height: 12px;
          text-align: center;
          margin-top: 0.12rem;
          color: rgba(0, 0, 0, 0.6);
          font-weight: 400;
          font-size: 0.24rem;
          padding-right:0.4rem;
        }
      }
    }
  }
  .home_picture {
    // width: 375px;
    box-sizing: border-box;
    padding: 8px;
    background-color: #f7f8fa;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .home_check {
      width: 100%;
      display: flex;
      justify-content: space-evenly;

      .home_check_item {
        margin-top: 10px;
        width: 81px;
        margin-bottom: 20px;
        img {
          width: 100%;
        }
      }
    }
    .home_today {
      margin-bottom: 10px;
      width: 100%;
      box-sizing: border-box;
      padding: 10px;
      .home_today_item {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        .item_box {
          display: flex;
          .list {
            color: #000;
            font-weight: 500;
            font-size: 0.4rem;
          }
          .list_time {
            margin-left: 5px;
          }
          .list_later {
            color: #acadaf;
            margin-top: 4px;
            margin-left: 5px;
          }
        }

        .after {
           margin-top: 1px;
          color: #acadaf;
        }
      }
    }
    .left_right {
      background-color: white;
      box-sizing: border-box;
      height: 119px;
      width: calc(100vw - 40px);
      overflow: hidden;
      margin-bottom: 25px;
      border-radius:9px;
      .scroll {
        overflow: hidden;
        box-sizing: border-box;
        display: flex;
        ul {
          overflow-x: auto;
          height: 100%;
          // overflow-x: visible;

          li {
            // width: 2200px;
            .total_box {
              width: 92px;
              padding-bottom: 7px;
              float: left;
              &::after {
                content: "";
                clear: both;
                display: block;
              }
              .total_img {
                width: 100%;
                // height: auto;
                img {
                  width: 92px;
                  height: 92px;
                }
              }
              .total_text {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
        }
      }
    }
    .SonyEricsson {
      margin-bottom: 50px;
      // width: 335px;
      .SonyEricsson_text {
        color: #000;
        font-weight: 500;
        font-size: 0.3rem;
        line-height: 0.6rem;
        margin-bottom: 15px;
      }
      .nav_img {
        // width: 335px;
        // height: 104px;
        img {
          width: 100%;
          height: auto;
          display: block;
        }
      }
      .SonyEricsson_body {
        // width: 335px;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        // width: 375px;
        .SonyEricsson_body_list {
          width: 110px;
          .list_img {
            width: 100%;

            img {
              width: 100%;
              height: auto;
              display: block;
            }
          }
          .list_name {
            margin-top: 20px;
            color: #000;
            font-weight: 400;
            font-size: 0.26rem;
            line-height: 0.39rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            margin-left: 15px;
          }
          .price {
            color: rgb(0, 0, 0);
            font-size: 0.2rem;
            width: 151%;
            height: 0.3939rem;
            line-height: normal;
            margin-left: 15px;
            margin-top: px;
            span {
              font-size: 0.3939rem;
            }
          }
        }
      }
      // .intelligence {
      //   margin-top: 15px;
      //   // padding: 10px;
      //   width: 100%;
      //   box-sizing: border-box;
      //   .intelligence_name {
      //     font-size: 0.3rem;
      //     line-height: 0.6rem;
      //     font-weight: 500;
      //   }
      //   .intelligence_img_box {
      //     // width: 335px;
      //     // height: 104px;
      //     img {
      //       width: 100%;
      //       height: auto;
      //       display: block;
      //     }
      //   }
      //   .intelligence_item {
      //     display: flex;
      //     flex-wrap: wrap;
      //     justify-content: space-around;
      //     margin-top: 15px;
      //     .intelligence_item_list {
      //       background-color: white;
      //       margin-bottom: 10px;
      //       .intelligence_item_list_img {
      //         width: 110px;
      //         height: 116px;
      //         img {
      //           width: 100%;
      //         }
      //       }
      //     }
      //   }
      //   // margin-bottom: 30px;
      // }
    }
    .home_picture_item {
      width: 160px;
      height: 107px;
      background-color: #ffffff;
      margin-top: 10px;
      &:nth-child(1) {
        margin-top: 0px;
      }
      &:nth-child(2) {
        margin-top: 0px;
      }
      img {
        width: 100%;
        display: flex;
      }
    }
  }
}
</style>