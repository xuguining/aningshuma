<!-- 已修改 -->
<template>
  <div class="pinglun">
    <!-- 评论头部 -->
    <div class="pinglun_box">
      <div class="img_bozx"><img :src="list.userInfo.avatarUrl" /></div>
      <div class="text_box">
        <div class="name">{{ list.userInfo.userName }}</div>
        <div class="time">
          {{ list.commentTimeDec }} | {{ list.orderItemInfo.skuName }}
        </div>
      </div>
    </div>
    <!-- 评论内容 -->
    <div class="content">
      <div class="content_text" :class="opentextif">{{ list.content }}</div>
      <div class="cont_showtext" @click="opentextifs" v-if="isshowtext">
        展开
      </div>
      <!-- <div class="con_showtext">展开</div> -->
      <div class="img_box" v-for="(item, index) in list.imageList" :key="index">
        <img :src="item" />
      </div>
    </div>
    <!-- 官方回复 -->
    <div class="huifu">
      <div class="huifu_text">
        <div :class="openIf">
          <span>官方回复：</span>{{ list.replyComment.content }}
        </div>
        <div class="showtext" @click="openIfs" v-if="isshow">展开</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {},
  data() {
    return {
      openIf: "content-mytext",
      opentextif: "content_opentext",
      show: false,
      showt: false,
      isshow: true,
      isshowtext: true,
    };
  },

  methods: {
    openIfs() {
      this.show = !this.show;
      if (this.show) {
        this.openIf = "open";
        this.isshow = false;
      } else {
        this.openIf = "content-mytext";
      }
    },
    opentextifs() {
      this.showt = !this.showt;
      if (this.showt) {
        this.opentextif = "opentext";
        this.isshowtext = false;
      } else {
        this.opentextif = "content_opentext";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.pinglun {
  position: relative;
  margin-top: 30px;
  box-sizing: border-box;
  // padding: 0 2%;
  .pinglun_box {
    display: flex;
    .img_bozx {
      // width:30px;
      // height: 30px;
      // background-color: skyblue;
      border-radius: 50%;
      img {
        width: 35px;
        height: 35px;
        display: block;
        height: auto;
        border-radius: 50%;
      }
    }
    .text_box {
      margin-left: 15px;
      .name {
        color: black;
      }
      .time {
        width: 5.3333rem;
        font-size: 0.02rem;
        white-space: nowrap; // 强制一行显示
        overflow: hidden; // 超出隐藏
        text-overflow: ellipsis; // 省略号
      }
    }
  }
  .content {
    margin-top: 0.4rem;
    color: rgba(0, 0, 0, 0.85);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    .content_opentext {
      //max-height: 1.26rem;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden; //溢出内容隐藏
      text-overflow: ellipsis; //文本溢出部分用省略号表示
      display: -webkit-box; //特别显示模式
      -webkit-line-clamp: 2; //行数
      line-clamp: 2;
      -webkit-box-orient: vertical;
      line-height: 0.42rem;
      overflow-wrap: break-word;
      color: rgb(71, 71, 71);
      position: relative;
    }
    .opentext {
      max-height: 3rem;
      span {
        font-size: 0.38rem;
        line-height: 0.42rem;
        color: #ffa100;
      }
    }
    .img_box {
      display: flex;
      width: 2.5rem;
      height: 2.5rem;
      margin-right: 0.12rem;
      border-radius: 0.16rem;
      margin-top: 0.6rem;

      img {
        width: 100%;
        height: 100%;
        border-radius: 9px;
      }
    }
  }
  .cont_showtext {
    position: absolute;
    left: 0;
    top: 80px;
    z-index: 999;
    padding-top: 0.15rem;
    color: #0a7ffb;
    font-size: 0.24rem;
  }
  .huifu {
    margin-top: 20px;
    padding: 0.24rem 0.3rem;
    background-color: #f6f6f6;
    border-radius: 0.16rem;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    .huifu_text {
      position: relative;
      font-size: 0.38rem;
      line-height: 0.42rem;
      overflow-wrap: break-word;
      opacity: 0.85;
      .content-mytext {
       // max-height: 1.26rem;
        white-space: nowrap; // 强制一行显示
        overflow: hidden; // 超出隐藏
        text-overflow: ellipsis; // 省略号
       // -webkit-box-orient: vertical;
        span {
          font-size: 0.38rem;
          line-height: 0.42rem;
          color: #ffa100;
        }
      }
      .open {
        max-height: 1.56rem;
        span {
          font-size: 0.38rem;
          line-height: 0.42rem;
          color: #ffa100;
        }
      }
    }
    .showtext {
      padding-top: 0.1rem;
      color: #0a7ffb;
      font-size: 0.24rem;
    }
  }
}
</style>