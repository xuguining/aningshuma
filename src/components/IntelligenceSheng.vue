<template>
<!-- 首页的其他所有内容 -->
  <div class="IntelligenceSheng" @click="gohppone(compoonentarr_item)">
    <!-- 标题 -->
    <div class="IntelligenceSheng_name">{{ compoonentarr_item.name }}</div>
    <!-- 大图 -->
    <img v-if="compoonentarr_item.url" :src="compoonentarr_item.url" />
    <!-- 身体部分 -->
    <div class="IntelligenceSheng_body" v-if="item_arr.length > 0">
      <div
        class="IntelligenceSheng_body_item"
        v-for="(val, index) in item_arr"
        :key="index"
      >
        <img :src="val.url" />
        <div class="IntelligenceSheng_body_name">{{ val.title }}</div>
        <div class="price"><span>劵后价¥</span>{{ val.price }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    compoonentarr_item: {
      type: Object,
      default: () => {
        return {};
      },
    },
    twolist:{
      type:Array,
      default:() =>{
        return []
      }
    }
  },
  
  data() {
    return {
      // list: [],
      // listhphone: "",
      // phonebody: [],
      // arr:[],
      item_arr: [],//数据数组 名和价格
    };
  },

  methods: {
    gohppone(compoonentarr_item){
      this.twolist.forEach(elmemnt =>{
        if(elmemnt.id === compoonentarr_item.id){
          // console.log("czy1");
          // 当遇到null统一接入
          let id = compoonentarr_item.link||"https://store.oppo.com/cn/app/product/index?skuId=22896&us=shouye&um=banner&uc=zhinengjiaju";
          let index = id.indexOf('skuId=')
          // console.log(id);
          id=id.substr(index + 6)
          let i = id.indexOf("&")
          if(i==4){
             id = id.slice(0,4)
          }else{
            id = id.slice(0,5)
          }
        
          this.$router.push({name:"ProductDetail",query:{id}})
        }
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // console.log("111111111compoonentarr_item ==>", this.compoonentarr_item);
    // console.log("czy2",this.compoonentarr_item);
    let count = Math.floor(this.compoonentarr_item.productDetailss.length / 3);
    count = count * 3;
    for (let i in this.compoonentarr_item.productDetailss) {
      if (i < count) {
        this.item_arr.push(this.compoonentarr_item.productDetailss[i]);
      }else{
        break;
      }
    }

        // console.log("111 ==>", this.item_arr);

    
  },
};
</script>

<style lang="less" scoped>
.IntelligenceSheng {
  margin-bottom: 20px;
  .IntelligenceSheng_name {
    color: #000;
    font-weight: 500;
    font-size: .3rem;
    line-height: .6rem;
  }
  img {
    width: 100%;
    border-radius: 9px;
    margin-top: 10px;
  }
  .IntelligenceSheng_body {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .IntelligenceSheng_body_item {
      width: 33%;
      margin-top: 0.5%;
      padding-bottom: 0.3rem;
      overflow: hidden;
      font-size: 0;
      background: #fff;
      .IntelligenceSheng_body_name {
        z-index: 999;
        color: #000;
        font-weight: 400;
        font-size: 0.26rem;
        line-height: 0.39rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        padding: 5px;
      }
      .price {
        color: #000;
        font-weight: 400;
        font-size: 0.26rem;
        line-height: 0.39rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        margin-top: 6px;
         padding: 5px;
        span {
          color: rgb(0, 0, 0);
          font-size: 0.2rem;
        }
      }
    }
  }
}
</style>