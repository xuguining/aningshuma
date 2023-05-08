<template>
  <div class="myfooter">
    <!-- 第一行 -->
    <div class="myfooter_nav">
      <div class="left_text">
        <svg
          t="1652374340587"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1962"
          width="24"
          height="24"
        >
          <path
            d="M704 64c117.824 0 213.333333 95.509333 213.333333 213.333333v490.666667c0 117.824-95.509333 213.333333-213.333333 213.333333H320C202.176 981.333333 106.666667 885.824 106.666667 768V277.333333C106.666667 159.509333 202.176 64 320 64h384z m0 74.666667H320a138.666667 138.666667 0 0 0-138.581333 133.696L181.333333 277.333333v490.666667a138.666667 138.666667 0 0 0 133.696 138.581333L320 906.666667h384a138.666667 138.666667 0 0 0 138.581333-133.696L842.666667 768V277.333333a138.666667 138.666667 0 0 0-133.696-138.581333L704 138.666667z"
            p-id="1963"
            fill="#dbdbdb"
          ></path>
          <path
            d="M618.666667 730.666667a37.333333 37.333333 0 0 1 3.072 74.538666L618.666667 805.333333H405.333333a37.333333 37.333333 0 0 1-3.072-74.538666L405.333333 730.666667h213.333334z"
            p-id="1964"
            fill="#dbdbdb"
          ></path></svg
        >下载APP
      </div>
      <div class="left_rgiht">
        <svg
          t="1652374406568"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3013"
          width="24"
          height="24"
        >
          <path
            d="M960.512 539.712l-144.768 144.832-48.256-48.256 60.224-60.288H512V512h325.76l-70.272-70.272 48.256-48.256 144.768 144.768-0.704 0.768 0.704 0.704zM704 192a64 64 0 0 0-64-64H192a64 64 0 0 0-64 64v640a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64v-64h64v64a128 128 0 0 1-128 128H192a128 128 0 0 1-128-128V192a128 128 0 0 1 128-128h448a128 128 0 0 1 128 128v128h-64V192z"
            p-id="3014"
            fill="#dbdbdb"
          ></path></svg
        >分享转发
      </div>
    </div>
    <!-- 第二行 -->
    <ul>
      <li>营业执照</li>
      <li>隐私政策</li>
      <li>用户协议</li>
    </ul>
    <!-- 第一行 -->
    <div class="last">
        © 小陈数码练习项目--联系方式：13710809956
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.myfooter {
  width: 100%;
  background-color: white;
  margin-bottom: 20px;
  .myfooter_nav {
    display: flex;
    align-items: flex-end;
    padding-left: 1.5rem;
    justify-content: space-around;

    .left_text {
      color: #333;
      font-weight: 500;
      font-size: 0.26rem;
      height: 0.82rem;
      line-height: 0.82rem;
      position: relative;
      .icon {
        position: absolute;
        left: -25px;
        top: 2px;
      }
    }
    .left_rgiht {
      color: #333;
      font-weight: 500;
      font-size: 0.26rem;
      height: 0.72rem;
      line-height: 0.52rem;
      left: -25px;
      top: 2px;
       position: relative;
         .icon {
        position: absolute;
        left: -25px;
        top: -4px;
      }
    }
  }
  ul {
    display: flex;
    justify-content: space-evenly;
    li {
      margin-top: 8px;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      flex-direction: column;
      -webkit-box-pack: center;
      justify-content: center;
      height: 1.41rem;
      color: #666;
      font-weight: 400;
      font-size: 0.2rem;
      text-align: center;
      background: #fff;
    }
  }
  .last{
       margin-top: -20px;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      flex-direction: column;
      -webkit-box-pack: center;
      justify-content: center;
      height: 1.41rem;
      color: #666;
      font-weight: 400;
      font-size: 0.2rem;
      text-align: center;
      background: #fff;
  }
}
</style>