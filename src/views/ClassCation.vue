<template>
  <div class="class_caption" >
    <MyHead></MyHead>
    <div class="caption_content">
      <!-- 分类左边 -->
      <van-sidebar v-model="activeKey">
        <div
          class="left"
          v-for="(item, index) in leftdata"
          :key="index"
          @click="toggle(item)"
        >
          <van-sidebar-item :title="item.name" />
        </div>
      </van-sidebar>
      <!-- 分类右边 -->
      <div class="context_right" ref="gotop">
        <div class="nav_img">
          <img :src="topimg" />
        </div>
        <div class="title">{{titles}}</div>
        <div class="footer" v-for="(item, index) in footerdata" :key="index">
          <div class="footer_content" @click="gohppone(item)">
            <div class="img_box"><img :src="item.mainImg"/></div>
            <div class="footer_text">
              <div class="name">{{ item.spuName }}</div>
              <div class="center_text">{{ item.spuShortDesc }}</div>
              <div class="price">
                ¥{{ item.priceInfo.prefix }}{{ item.priceInfo.price }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Sidebar, SidebarItem } from "vant";
import MyHead from "@/components/MyHead.vue"

Vue.use(Sidebar);
Vue.use(SidebarItem);
export default {

  components: {MyHead,},
  data() {
    return {
      leftdata: [],//左边数据
      activeKey: 0,//默认选中0
      // rightdata: [],
      mycode: "000024",//初始是左边第一个id 每次点击被当前id覆盖
       footerdata: [],//右边底部数据
      // urlimg: "",
      topimg: "",//右边大图
      titles:'',//右边标题
      changedata:true,//由于部分后端接口无法利用 弄个状态控制一下左边点击每次有变化
    };
  },

  methods: {
    toggle(item) {
      // 部分后端接口会强制重定向 为了能在网址上线 就配对这5个行的 别的都躲开 
      if(item.categoryCode=='000024'||item.categoryCode=='000323'||item.categoryCode=='000035'||item.categoryCode=='000034'||item.categoryCode=='0003861'){
        this.mycode = item.categoryCode;
      }else{
        // 让后面那些接口有问题的点击时有变化
        if(this.changedata){
          this.mycode ='000024';
          this.changedata=!this.changedata
        }
        else{
          this.mycode ='000035';
          this.changedata=!this.changedata
        }
      }

      // 如果我用cli的代理服务器解决跨域 我就用下面这个语句 不用if判断
      // this.mycode=item.categoryCode;


      // console.log("this.mycode", this.mycode);
      this.mytoggle();
      // 让后边回到顶部
      this.$refs.gotop.scrollTop = 0
      // console.log('czy1',this.$refs.gotop);
    },
    // 跳转至详情页面
     gohppone(item){
      // console.log(item);
      this.footerdata.forEach(elmemnt =>{
        if(elmemnt.skuId === item.skuId){
          // 临时改一下
          let id = 22484
          this.$router.push({name:"ProductDetail",query:{id}})
        }
      })
    },
    // // 获取右边内容数据 代理服务器版
    // mytoggle() {
    //         console.log("this.mycode", this.mycode);
    //   this.$axios
    //     .get(`cn/oapi/goods-business/category/first/detail?`, {
    //       params: {
    //         code: this.mycode,
    //         scene: "mall",
    //         preview: false,
    //       },
    //     })
    //     .then((res) => {
    //     //   this.rightdata = res.data;
    //     // console.log("444444444",res);
    //       this.footerdata = res.data[0].category.goods;
    //       // console.log("333333",this.footerdata);
    //       //   this.urlimg = rightdata
    //       // console.log("rgiht", this.rightdata);
    //       //  console.log("footerdata",this.footerdata);
    //       // console.log(res);
    //       this.topimg = res.data[0].category.ads[0].logoUrl;
    //       this.titles = res.data[0].category.name
    //     });
    // },


    // 获取右边内容数据json版
    mytoggle() {
            // console.log("this.mycode", this.mycode);
      this.$axios
        .get(`detail${this.mycode}.json`)
        .then((res) => {
        //   this.rightdata = res.data;
        // console.log("444444444",res);
          this.footerdata = res.data[0].category.goods;
          // console.log("333333",this.footerdata);
          //   this.urlimg = rightdata
          // console.log("rgiht", this.rightdata);
          //  console.log("footerdata",this.footerdata);
          // console.log(res);
          this.topimg = res.data[0].category.ads[0].logoUrl;
          this.titles = res.data[0].category.name
        });
    },
  },
  created() {
    // 请求一下右边数据
    this.mytoggle();
    // 接口请求
    // this.$axios
    //   .get("cn/oapi/goods-business/category/first?scene=mall&preview=false")
    //   .then((res) => {
    //     console.log("11111111111111",res.data);
    //     this.leftdata = res.data;
    //     // this.footerdata = res.data[0].categoryCode;

    //     // console.log("222222222222222footerdata",this.footerdata);
    //     console.log("rgiht", this.rightdata);
    //   });

  // json请求 左边数据
    this.$axios
      .get("classLeft.json")
      .then((res) => {
        this.leftdata = res.data;
        // console.log("11111111111111",this.leftdata);
      });
   
  },
};
</script>

<style lang="less" scoped>
// pc端隐藏垂直滚动条
// body::-webkit-scrollbar {
//     display: none;
// }
// 左边内容和右边内容滚动条消失
.context_right::-webkit-scrollbar, 
.van-sidebar::-webkit-scrollbar{
    display: none;
}
.van-sidebar-item--select {
    color: #bf2a2f;
    font-weight: 600;
}
.class_caption {
  .caption_content {
    display: flex;
    // 给要分别滚动的大盒子加4个方向绝对定位 然后再分别各自溢出auto
    position:absolute;
    top:50px;
    left:0;
    right:0;
    bottom:50px;
    .context_right {
      box-sizing: border-box;
      padding: 0.3rem 0.6rem;
      overflow-y: auto;
      //   display: flex;
      .nav_img {
        width: 6.5rem;
        img {
          width: 100%;
        }
      }
      .title {
        font-size: 0.4rem;
        margin-top: 0.3rem;
      }
    }
    .footer {
      width: 6rem;
      background-color: rgb(248, 248, 248);
      margin-top: 0.3rem;
      padding: 0.3rem 0.3rem;
      border-radius: 15px;
      .footer_content {
        display: flex;
        align-items: center;
      }
      .img_box {
        width: 1.5rem;
        //   background-color: skyblue;
        height: 1.5rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .footer_text {
        .center_text {
          color: #999;
          margin-top: 0.1rem;
        }
        .price {
          margin-top: 0.1rem;
        }
      }
    }
  }
}
</style>