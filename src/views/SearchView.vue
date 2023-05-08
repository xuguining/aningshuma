<template>
  <div class="search">
    <!-- 搜索框栏 -->
    <div class="search_nav">
      <div class="search_nav_icon" @click="goback">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAADX0lEQVR4Xu2avU8UQRjGn3f4OO5AbSgsqWl39i84IJIYSTSgiVSamNBhR6eVVGKjhVqgiRRSWBgLKxsr7yvkTKCAhIJEEwzJxeQ+gX3NFUeWC7cMN3t7Z3i3no/n+d2z783MDkGeQAIkfIIJCKBzEiKABJBdEZEESYIkQXYEJEF2/KQGSYIkQXYEJEF2/KQGSYIkQXYEJEF2/CKrQRWtpz3gUbxQuEc7O1U72dH1jgRQVeuZY+aPIIopoi+xYvEObW7WorPZ/kwdB1Ry3TkwfwAw0JBJROvxdPpu+7Kj69lRQGXXnQfzKgP9J5aYq0w0N5zJfI7OZvszdQxQWeuHAF4z0OeTV/aIbo+k01/blxxtz44AqrjuAnveSyZSPjtFUupWPJX6Fq1Fu9lCB1TS+jGA5wBOxibgL5S6GU+lvtvJjb53qIDKjrPERMt+G8xcGABuDGazP6K3Zz9jaICKWj8l4EmTpIN+5qnBbDZnL7U7I4QCqOw4y0y0dMoC834fMBHLZn92x1o4s1oDKmn9AsBik5xffZ43EcvltsKR2b1R2gbEAFVc9xUzLzTJ3zs8Okpe29jY7p6t8GZuCxADqqT1WwIeNEnZpVotGc/nd8OT2N2RLgyovvAru+57MN/3SyfmbVYqmUin97prKdzZLwSIHWegrNQamGdPwQG2PObkcDb7O1x53R/NGBCPjw+WE4l1ADN+2QrIH9Zqk1fy+f3u2wlfgRGg3bGxoeujo58YmG6SkDtSaupqKnUQvrTeGNEIUIu/8t5wYKAikckY+TxrKKOOJa3/ABg10NKTTQTQOT9LFIDOWi33ZFrOEtVxQFKkDbIgf/MmkAIWikPMSbrMC8UGv/pWo6L1OwbmZavRIlWBm1WlkvFU6vJuVn1JkuMOg7KEitYrHlA/qPc/cmDmp9HqyNVjnhzJ5fImoHu1jdFWw0S8HNobUKp/9gHRs/pxrK95oZ9ZPvs0gFS0XvSAFflwGJAo+fRs8rppXT/QfyOXFwJg1a+/MPMqmq6/KKK5oct+/aXBreo4s8dEa3KBKiBJRa1nSK7gBRcmucRpULj/xyahraT/R/MmmgXQOZQEkAAyeZFat5EESYIkQXYEJEF2/KQGSYIkQXYEJEF2/KQGSYIkQXYEJEF2/P4BJJdPWPbGgiUAAAAASUVORK5CYII="
        />
      </div>
      <div class="my_input">
        <van-search
          v-model="value"
          :show-action="true"
          color="#f8f9fb"
          placeholder="Find X5 Pro"
          @search="onSearch"
        >
          <template #action>
            <div @click="onSearch">搜索</div>
          </template>
        </van-search>
      </div>
    </div>
    <!-- 热门推荐 -->
    <div class="search_body" v-if="isshow">
      <div class="search_body_title">热门推荐</div>
      <div class="search_hot">
        <span v-for="(item, index) in serachdata" :key="index" @click="hotGo(item.title)">{{
          item.title
        }}</span>
      </div>
    </div>
    <!-- 搜索得到的内容 -->
    <div class="body" v-show="!isshow" @scroll="evenscrool($event)">
      <div class="scroll_box">
        <div
          class="big_box"
          v-for="(item, index) in list"
          :key="index"
          @click="gohppone(item)"
        >
          <div class="img_box"><img :src="item.url" /></div>
          <div class="name">{{ item.title }}</div>
          <div class="price">
            <span>{{ item.priceInfo.prefix }}
              {{ item.priceInfo.currencyTag }}</span>{{ item.price }}
          </div>
          <!-- <div class="price">¥0</div> -->
        </div>
      </div>
         <!-- <div  class="bottom">我是底线~~~</div> -->
         <div  class="bottom">此处演示只含部分功能，其他功能需现场演示！</div>
    </div>     
  </div>
</template>

<script>
import Vue from "vue";
import { Search } from "vant";
// import { List } from "vant";

// Vue.use(List);
Vue.use(Search);
export default {
  data() {
    return {
      value: "",//搜索框里的内容
      hotdata: [],//初始时从后端拿的热门推荐数据
      serachdata: [],//经过筛选后的热门推荐数据
      // mykey: "",
      list: [],//接口返回的搜索到的内容
      currentPage: 1,//请求后端数据时 带的页数
      isshow: true,//是否出现热门推荐
      keyword: '',//旧的搜索的内容 用来清空搜索出来的内容和初始化页数
      // chuBottom:false
    };
  },

  methods: {
    // 点击热门按钮直接搜索指定内容
    hotGo(id){
      this.value=id;
      this.onSearch()
    },
    goback(){
      this.$router.go(-1)
    },
    // 搜索
    onSearch() {

      // // console.log("来搜索拉");
      // if (this.keyword != this.value) {
      //   this.list = [];
      //   this.currentPage = 1;
      // }
      // if (this.currentPage > 10) {
      //   //  this.chuBottom = true
      //   //  console.log("肯定是底部了");
      //   return;
      // }
      // this.keyword = this.value;
      // this.$axios
      //   .get("cn/oapi/goods/web/info/search/keyword/040110?", {
      //     params: {
      //       keyword: this.keyword,
      //       currentPage: this.currentPage,
      //       pageSize: 10,
      //     },
      //   })
      //   .then((res) => {
      //     let arr = res.data[0].productDetailss;
      //     // 拼接
      //     arr.forEach((item) => {
      //       this.list.push(item);
      //     });
      //     // console.log("搜索数据", this.list);
      //   });
      this.isshow = false;



    },
    // 触底加载
    evenscrool(e) {
      // console.log(e);
      // console.log(1111);
      // console.log(e.srcElement.scrollTop);
      // console.log(e.srcElement.clientHeight);
      // console.log(e.srcElement.scrollHeight);
      if (
        e.srcElement.scrollTop + e.srcElement.clientHeight >= e.srcElement.scrollHeight
      ) {
        this.currentPage += 1;
        this.onSearch();
        // console.log("czyyyyyyyy ");
      }
    },
    // 跳转至详情页面
    gohppone(item) {
      // console.log(item);
      this.list.forEach((elmemnt) => {
        if (elmemnt.id === item.id) {
          let id = item.link;
          let index = id.indexOf("skuId=");
          // console.log(id);
          id = id.substr(index + 6);
          let i = id.indexOf("&");
          if (i == 4) {
            id = id.slice(0, 4);
          } else {
            id = id.slice(0, 5);
          }

          this.$router.push({ name: "ProductDetail", query: { id } });
        }
      });
    },
  },

  created() {
    this.$axios.get("hotData.json").then((res) => {
      this.hotdata = res.data;
      // console.log("hotdata", this.hotdata);
      this.hotdata.forEach((item, index) => {
        if (index!= 0) {
          this.serachdata.push(item);
        }
      });
      // console.log("this.serachdata", this.serachdata);
    });

    // 搜索数据
  },
};
</script>

<style lang="less" scoped>
/deep/.van-cell {
  color: #d9d9da;
}
/deep/.van-search__action {
  // color: 1.28rem;
  height: 100%;
  color: #333;
  // color:red;
  font-weight: 500;
  font-size: 0.44rem;
  text-align: center;
  background: transparent;
}
.search {
  width: 100vw;
  //   padding: 0 5px;
  .search_nav {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .search_nav_icon {
      width: 0.6rem;
      height: 0.6rem;
      img {
        width: 100%;
      }
    }
    .my_input {
      width: 80%;
      margin-left: -5px;
    }
  }
  .search_body {
    // width: 100%;
    padding: 0 20px;
    margin-top: 30px;
    .search_body_title {
      color: #999;
      font-weight: 400;
      font-size: 0.4rem;
    }
    .search_hot {
      margin-top: 19px;
      span {
        height: 0.92rem;
        background-color: #ff6e43;
        margin-right:0.28rem;
        margin-bottom: 0.16rem;
        padding: 0.04rem 0.2rem;
        font-weight: 400;
        font-size: 0.26rem;
        line-height: 0.92rem;
        border-radius: 0.1rem;
        display: inline-block;
        color: white;
        // margin-left: 2px;
      }
    }
  }
  .body {
    background-color: rgb(241, 242, 248);
    height: calc(100vh - 1.4rem);
    overflow-y: auto;
    padding: 0.08rem;
    box-sizing: border-box;
    .scroll_box {
      justify-content: space-between;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      .big_box {
        width: calc(50% - 3px);
        background-color: white;
        margin-top: 5px;
        .img_box {
          width: 100%;
          // background-color: white;
          img {
            width: 100%;
          }
        }
        .name {
          padding: 0 8px;
          box-sizing: border-box;
          color: #000;
          font-weight: 100;
          font-size: 0.428rem;
          line-height: 1.5;
        }
        .price {
          padding: 0 8px;
          margin-top: 2px;
          font-size: 0.4848rem;
          color: #f34141;
          span {
            color: #f34141;
            font-size: 0.2848rem;
          }
        }
      }
    }
  }
}
.bottom{
  // margin-bottom: 50px;
  // position: absolute;
  // left: 0;
  height: 1rem;
  color:rgb(180, 175, 175);
  width: 100%;
  text-align: center;
  line-height: 1rem;
  font-size: 0.45rem;

}
</style>