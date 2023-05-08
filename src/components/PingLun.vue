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
      <div class="content_text">{{ list.content }}</div>
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
      show: false,
      isshow:true
    };
  },

  methods: {
    openIfs() {
      this.show = !this.show;
      if (this.show) {
        this.openIf = "open";
        this.isshow = false
      } else {
        this.openIf = "content-mytext";
      }
    },
  },
};
</script>

<style lang="less" scoped>
  .pinglun {
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

      }
    }
    .content {
      margin-top: 0.4rem;
      color: rgba(0, 0, 0, 0.85);
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;

      .content_text {
        //   font-size: 0.3rem;
        max-height: 1.26rem;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        line-height: 0.42rem;
        overflow-wrap: break-word;
        color: rgb(71, 71, 71);
        position: relative;
      }
      .con_showtext {
        // position: absolute;
        // left: 0;
        // top: 0;
        margin-left: -0.209rem;
      }
      .img_box {
        display: flex;
        width: 2.5rem;
        height: 2.5rem;
        margin-right: 0.12rem;
        border-radius: 0.16rem;
        margin-top: 0.12rem;

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
      top: 50px;
      z-index: 999;
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
        .content-mytext {
          display:-webkit-box;
          max-height: 1.46rem;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          span {
            font-size: 0.38rem;
            line-height: 0.42rem;
            color: #ffa100;
          }
        }
        .open {
          // max-height: 1.26rem;
          span {
            font-size: 0.38rem;
            line-height: 0.42rem;
            color: #ffa100;
          }
        }
      }
      .showtext {
        padding-top: 0.2rem;
        color: #0a7ffb;
        font-size: 0.24rem;
      }
    }
  }
</style>