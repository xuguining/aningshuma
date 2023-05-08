<template>
<!-- 共同头部 -->
  <div class="input_nav">
    <div class="scoll_box">
      <!-- logo -->
      <div class="logo">
          <img src="@/assets/school.png">
      </div>
      <!-- 滚动搜索栏 -->
      <div class="scoll">
        <van-notice-bar
          class="noticebar"
          left-icon="search"
          :scrollable="false"
          color="rgb(59, 59, 59)"
          background="#f2f2f2"
          @click="gossearch"
        >
          <van-swipe
            vertical
            class="notice-swipe"
            :autoplay="2000"
            :show-indicators="false"
          >
          <!-- ajax请求title 并循环渲染出来 -->
            <van-swipe-item v-for="(item,index) in serachdata" :key="index" > {{item.title}}</van-swipe-item>
            
          </van-swipe>
        </van-notice-bar>
      </div>
      <!-- 头部后俩文字 -->
      <div v-if="token" class="text" @click="onCancel()"><span>欢迎</span></div>
      <div v-else class="text" @click="onCancel()"><span>登录</span></div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
// 试试辅助函数帮手
import { createNamespacedHelpers } from "vuex";
import { NoticeBar, Swipe,SwipeItem } from "vant";
Vue.use(SwipeItem)
Vue.use(NoticeBar)
Vue.use(Swipe)
const userNs = createNamespacedHelpers("user");
export default {
  data(){
      return{
            serachdata:[], //搜索框的数据
      }
   },
    computed: {
      // token数据
    ...userNs.mapState(["token"]),
    },
  methods:{
      gossearch(){
            this.$router.push({name:"SearchView"})
        },
        onCancel() {
            // console.log(111);
            if(this.token != ""){
              this.$router.push({name:'MyView'})
            }else{
                // this.isshow = true
                this.$router.push({ name: "Login" });
            }
            
            // console.log("token",this.token);
        },

  },
  created(){
  // // 动态oppo商城真实数据
  // this.$axios.get("cn/oapi/configs/web/icons/040109").then((res)=>{
  //   this.hotdata = res.data
  //   //  console.log("hotdata", this.hotdata);
  //     this.hotdata.forEach((item)=>{
  //       // if(index%3 != 0){
  //       //   this.serachdata.push(item)
  //       // }
  //       this.serachdata.push(item)
  //     })
  //   //  console.log("this.serachdata",this.serachdata);
  // })
  // // console.log(this.token)


  // json版的oppo商城数据
    this.$axios.get("headdata.json").then((res)=>{
    this.hotdata = res.data
    this.hotdata.forEach((item)=>{
      this.serachdata.push(item)
    })
  })
  }

}
</script>

<style lang="less" scoped>
  .input_nav {
    width: 100%;
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
        .noticebar{
          border-radius:30px;
           .notice-swipe {
            height: 40px;
            line-height: 40px;
          }
        }
      }
      .text {
        margin-left: auto;
        color: rgb(61, 61, 61);
        font-weight: 600;
        font-size: 15px;
        width: 14%;
        text-align:center;
        font-size:17px;
      }
    }
  }
 

</style>