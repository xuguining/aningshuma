<template>
    <div class="order">
        <div class="order_nav">
            <div class="title">支付结果</div>
        </div>
        <div class="body">
            <div class="icon">
                <van-icon name="passed" color="#f63434"/>
                <div class="info">支付成功</div>
                <div class="price">￥{{price}}</div>
                <div  class="bottom_text" @click="goHome">返回首页</div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import { Icon } from "vant";
Vue.use(Icon);
export default {
    data() {
     return {
      price:0,//传入的价格
    };
  },
  methods:{
       goHome() {
      this.$router.push({ name: "HomePage" });
    },

  },
  created(){
    this.price = this.$route.query.numbers/100;
    // localStorage.setItem("order-data","[]");
    localStorage.removeItem("order-data");

  }

}
</script>

<style lang="less" scoped>
   .order{
    padding: 0.4rem 0.2rem;
      .order_nav{
         display: flex;
        align-content: center;   
        border-bottom:1px solid #ccc;
        height: 36px;
            .title {
            max-width: 60%;
            margin: 0 auto;
            color: #000;
            font-weight: 600;
            font-size: 0.55rem;
            line-height:0.69rem;
    }
      }
      .icon{
        margin-top:50px;
        text-align: center;
        .van-icon{
            font-size:2.5rem;
        }
        .info{
            color: #000;
            font-weight: 500;
            font-size: 0.48rem;
            line-height:0.69rem;
            margin-top:10px;
        }
        .price{
            color: #000;
            font-weight: 500;
            font-size: 0.45rem;
            line-height:0.69rem;
            // margin-top:10px;
        }
        .bottom_text {
            margin:0  auto;
            border-radius: 2em;
            border: 1px solid pink;
            color: #3d3d3d;
            font-weight:500;
            display: block;
            box-sizing: border-box;
            // min-width: 2.04rem;
            height: 0.8rem;
            width: 2.8rem;
            margin-top:10px;
            padding: 0 0.12rem;
            font-size: 0.42rem;
            line-height: 0.72rem;
            text-align: center;
            margin-top: 0.5rem;
            // margin-left: 0.5rem;
            background-image: linear-gradient(200deg,#f55d5d,pink);
    }
      }
   }
</style>