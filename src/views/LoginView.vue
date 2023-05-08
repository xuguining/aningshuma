<template>
  <div class="login">
    <!-- 登录模块header部分开始 -->
    <div class="login-header">
      <!-- 帮助中心 -->
      <div class="login-header_help">{{ $t("helpCenter") }}</div>
      <!-- 简体中文 -->
      <div class="login-header_lang">
        <div class="lang_text" @click.stop="showLangList = !showLangList">
          {{ langText }}
        </div>
        <div class="lang-list" v-show="showLangList">
          <div class="lang-list_item" @click="changeLang('cs')">简体中文</div>
          <div class="lang-list_item" @click="changeLang('tc')">繁體中文</div>
          <div class="lang-list_item" @click="changeLang('en')">English</div>
        </div>
      </div>
    </div>

    <!-- 登录模块主体开始 -->
    <div class="login-body">
      <!-- 大标题 -->
      <div class="login-body-header">
        <div class="login-body-logo">
          <!-- <img
            class="auto-img"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANAAAAAiCAMAAAAZIKdUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAOVBMVEVHcEwzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzM0rESPAAAAEnRSTlMAzw6B9m894GDA6RqRTKIptQUyJXn2AAADP0lEQVRYw+2Z65KjIBCFw/0ioPj+D7sGGkW5mB2Zqq2t8GeqxmPoj+ZAd/J6fT5m5pCm60qFMnJqaKRT4kYzSRM1Gjk2/1zzbExErKehpN8fLmgb/IUZOmsQw7vGvTX2heVFI0jB7aW61Twc2NC1GFqmx4HVkoqGsoQdYpRMVzQGnyaTH2geDl6ZImRpyoBoXYPmDKjxOYJnW0HVNZqP45FpmRSRlnPLTNo2ej6AEqQJms0D6S1+ACXIXQOrQPdkz3rXsKAhSbPKUTwWZpA4t1ScRk8nIJGZZrOUzoh2IJ0bAkt418LnwitnDTppno45hs785ZRYIqbPgIy/Wi9i4gzIXczgSUQIBD6GvlzOAM+iZsxxFwKnldWJ0bIDiJWaGIk5gExrByxn+VVDd83jBLViBVThE5CpaQI1xQmoGlLE2Jbfi3vN4xEiQh1WDkC6erBiCn6OQNX7JHKQ7TTtRI2aa/aXAzUTBEESAGpM5oJxQNvYM8FG6vjbTBEaAEQhC81AHADJzpmPDvjqPRcyDPA9DR0A1N4psGoLAPHOoS9SpdDzKZiysRsm0IwBmj8Ash2glCHWAaJ9oHkUUC9YB94RnUAIQKuOzyRk0cAW7mV6zDVUn8Rr2EaiY2YEvlDpjO8cHAFMdzQjLiLZvqNZ8pdYmyay6ZFq12NzejS177yZjirncEiDwq053F4piMrRMYl02qpm9YLRnhjX0sSaSA/pIWIeSqLYU4TZofRBBdGM9txB6SOKaKcsd3GNyk4Bq7Vj0x+5KGvn4hQkq99E0c5BTUmPmmivtgk+d6c6r4lYTfM6a55vOpQaYQ7zTNbRvNY8+iFt7K4x0Nos/twPUWchlZinxh7hU8Xb1zwnWo7eEi0KHX0neRUN3lujco3zRYO3gSO1oOO1BZ+P+RvNAB/Rbucca7lqf73v1ADkRE1DT97gH2gGfOlTfksiDsPE0geTAkkfZoilj2ei/P6jaOfuNSP2nXRZvMLwazWx/cPbPAXCWX+pzN/p4ibTaCdrO+kTzZA8WckIYZLjSnkEhBMHzVRpNWQyetTYzrp/ovm10au2a0D//PgCfYG+QF+g/xtouzDI3U848q2Zfz2UPz2AcJFc2usZAAAAAElFTkSuQmCC"
            alt=""
          /> -->
          <img src="@/assets/log.png" class="auto-img" />
        </div>
        <!-- <div style="width:100%;height:0.41667rem;"></div> -->
        <div class="login-body-header">{{ $t("slogan") }}</div>
      </div>
      <div class="login-body-box">
        <div class="body-box-wrapper">
          <!-- 俩选项栏 -->
          <div class="box-wrapper-tabs">
            <!--  短信登录  -->
            <div
              @click="changeMsg"
              :class="['wrapper-tabs-item', { active: activeTab === 'msg' }]"
            >
              <span>{{ $t("login.msg") }}</span>
            </div>
            <!--  密码登录  -->
            <div
              @click="changePass"
              :class="['wrapper-tabs-item', { active: activeTab === 'pass' }]"
            >
              <span>{{ $t("login.pass") }}</span>
            </div>
          </div>
          <!-- 登录框内容 -->
          <div class="box-wrapper-content">
            <!-- 密码登录 -->
            <div v-if="activeTab === 'pass'">
              <!-- 密码登陆的两输入框 -->
              <div class="login-form">
                <div class="login-form-item">
                  <span class="showNumber" v-if="showNumber"
                    >+86 <span class="sanjiao"></span
                  ></span>
                  <input
                    type="text"
                    :placeholder="$t('login.p_phone')"
                    @input="handlePhoneChange"
                  />
                  <div style="position: relative">
                    <input
                      :type="showPass ? 'text' : 'password'"
                      :placeholder="$t('login.pass')"
                      @input="handlePhonepass"
                    />
                    <div
                      class="input_after__3ohooa"
                      @click="showPass = !showPass"
                    >
                      <span
                        :class="[
                          'input_icon__ewiea9',
                          { 'input_off__3o-wkn': showPass },
                        ]"
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 密码登陆的提示 -->
              <div class="text-error" v-if="showError">
                帐号或密码错误,<br />建议点击下方直接注册！<br />或使用账号：czy
                密码：12345
              </div>
              <div class="lackUsrname" v-if="showlack">
                请在上方输入想要注册的账号密码！
              </div>
              <div class="correctUsername" v-if="iscorrect">
                注册账号格式至少输入6位！
              </div>
              <div class="correctUsername" style="color: green" v-if="isright">
                账号注册成功！请再次点击登录~
              </div>
              <!-- 写两个登陆 一个激活一个未激活 -->
              <div class="login-text" v-if="!showLoginBtn">
                {{ $t("login.loginText") }}
              </div>
              <div class="login-text-deep" v-else @click="handleSubmit">
                {{ $t("login.loginText") }}
              </div>
              <div class="box-footer" @click="register">
                {{ $t("login.zhuce") }}
              </div>
              <div class="box-hiden">{{ $t("login.policy") }}</div>
              <div class="box-bottom">
                {{ $t("login.backup") }}{{ $t("login.contact") }}
              </div>
            </div>
            <!-- 验证码登录 -->
            <div v-if="activeTab == 'msg'">
              <div class="login-form">
                <div class="login-form-item">
                  <span class="showNumber" v-if="showNumber"
                    >+86 <span class="sanjiao"></span
                  ></span>
                  <input
                    type="text"
                    :placeholder="$t('login.p_phone')"
                    @input="handlePhoneChange"
                  />
                  <!-- 只给55%留点空间给他 免的被验证码的左外边距挤下去 -->
                  <input
                    style="width: 55%"
                    type="text"
                    v-model="password"
                    :placeholder="$t('login.p_pass')"
                    @input="handlePhonepass"
                  />
                  <!-- 写俩不一样颜色的按钮 -->
                  <span
                    class="VerificationCode-deep"
                    v-if="showCode"
                    @click="Codeping"
                    >获取验证码</span
                  >
                  <span class="VerificationCode" v-else>获取验证码</span>
                </div>
              </div>
              <!-- 验证码的提示信息 -->
              <div class="text-error" v-if="showError">
                帐号或验证码错误,请重新输入！
              </div>
              <!-- <div class="lackUsrname" v-if="showlack">请输入账号或验证码</div> -->
              <!-- <div class="correctUsername" v-if="iscorrect">账号格式不正确：至少输入6位账号</div> -->
              <div class="correctUsername" v-if="isCode" style="color: green">
                验证码发送成功！请点击登陆~
              </div>
              <div class="login-text" v-if="!showLoginBtn">
                {{ $t("login.loginText") }}
              </div>
              <div class="login-text-deep" v-else @click="mywdlogin">
                {{ $t("login.loginText") }}
              </div>

              <div class="box-hiden">{{ $t("login.policy") }}</div>
              <div class="box-bottom">
                {{ $t("login.backup") }}{{ $t("login.contact") }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createLogger, createNamespacedHelpers } from "vuex"; //一个日志 一个简化辅助函数
const loginNs = createNamespacedHelpers("login");
const userNs = createNamespacedHelpers("user");
// console.log(loginNs);
// console.log(this.showPass);
export default {
  data() {
    return {
      showLangList: false, //语言列表切换出现
      activeTab: "pass", //一上来默认是密码登录
      username: "", //输入框里面的账号内容
      password: "", //输入框里面的密码内容
      showError: false, //提示账号密码错误
      showPass: false, //密码是否隐藏
      showlack: false, //提示账号或密码为空
      iscorrect: false, //提示账号最少6位
      isright: false, //提示注册成功
      mywd: "", //随机产生的6位验证码
      isCode: false, //提示成功获取验证码
      // showNumber:true
    };
  },
  computed: {
    // 拿数据
    ...loginNs.mapState(["lang"]),
    ...userNs.mapState(["Mywd"]),

    // 简体中文部分里面的内容
    langText() {
      // console.log(this.$i18n.locale)
      if (this.$i18n.locale == "cs") {
        return "简体中文";
      } else if (this.$i18n.locale == "tc") {
        return "繁体中文";
      } else {
        return "English";
      }
    },
    // 账号密码为空时 无法点击登录
    showLoginBtn() {
      if (!!this.username && !!this.password) {
        return true;
      } else {
        return false;
      }
    },
    // 是否显示86
    showNumber() {
      if (this.username.length > 5) {
        return true;
      } else {
        return false;
      }
    },
    // 是否显示获取验证码功能
    showCode() {
      if (this.username.length >= 6) {
        return true;
      } else {
        return false;
      }
    },
  },

  methods: {
    // changepass(){
    //   this.showPass=!this.showPass
    //   console.log(this.showPass);
    // },

    // 验证码登录
    mywdlogin() {
      // console.log("我的验证码",this.username);
      // if(this.password == this.Mywd){
      //     this.$router.push({name:"MyView"})
      // }else{
      //     this.iscorrect = false
      //     this.islack = false
      //     this.isErrorCode = true
      // }
      this.$axios
        .post("/user/getcode", {
          username: this.username,
          code: this.password,
        })
        .then((res) => {
          // console.log(res);
          if (res.code == 1) {
            this.iscorrect = false;
            this.showlack = false;
            this.showError = false;
            this.isright = false;
            this.isCode = false;
            this.$store.commit("user/SAVE_TOKEN", {
              token: res.data.token,
            });
            // console.log("111",this.token);
            // console.log("登录成功");
            this.$router.push({ name: "ShopCard" });
          } else {
            this.isright = false;
            this.iscorrect = false;
            this.showlack = false;
            this.isCode = false;
            this.showError = true;
          }
        });
    },
    // 显示拼图验证码 点击获取验证码
    Codeping() {
      // 接一下this 这样后面不写成箭头函数都能正常使用
      let that = this;
      try {
        var captcha1 = new TencentCaptcha("2046497855 ", callback);
        captcha1.show(); // 显示验证码
      } catch (error) {
        // loadErrorCallback();
        callback();
      }

      function callback(res) {
        let str = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
        let number = "";
        for (let i = 0; i <= str.length; i++) {
          let id = Math.ceil(Math.random() * 9);
          number += str[id];
        }
        let mycode = number.slice(0, 6);
        that.mywd = mycode;
        // console.log("随机数：",mycode);
        // 将随机数传到vuex
        that.$store.dispatch("user/save_mywd_sync", {
          username: that.username,
          mywd: that.mywd,
        });
        // 将随机数传到VUEX
        // console.log("czy11",mycode);
        that.password = that.Mywd[that.Mywd.length - 1];
        // console.log("随机数：",that.mywd);
        // console.log("验证成功");
        // console.log(" that.password:",that.password);
        that.showError = false;
        that.iscorrect = false;
        that.isright = false;
        that.isCode = true;

        // if (res.ticket) {
        //   // 上传票据 可根据errorCode和errorMessage做特殊处理或统计
        // }
      }
      // callback()

      // 验证码js加载错误处理
      // function loadErrorCallback() {
      //   var CaptchaAppId = "";
      //   /* 生成票据或自行做其它处理 */
      //   var ticket =
      //     "terror_1001_" +
      //     CaptchaAppId +
      //     Math.floor(new Date().getTime() / 1000);
      //   callback({
      //     ret: 0,
      //     randstr: "@" + Math.random().toString(36).substr(2),
      //     ticket: ticket,
      //     errorCode: 1001,
      //     errorMessage: "jsload_error",
      //   });
      // }
    },
    // 跳转至地区选择
    // goindex() {
    //   this.$router.push({ name: "MyCity" });
    // },
    // 国际化库
    changeLang(lang) {
      //   设置语言
      this.$i18n.locale = lang;
      // 隐藏
      this.showLangList = false;
      // 修改存在login模块中
      //后面测试发现貌似可以不用放vuex 改了this.$i18n.locale就好
      this.$store.dispatch("login/changeLang", {
        lang,
      });
    },
    // 注册账号
    register() {
      // 账号密码为空
      if (!this.username || !this.password) {
        this.showError = false;
        this.iscorrect = false;
        this.isright = false;
        this.showlack = true;
      } else if (this.username.length < 6) {
        this.showError = false;
        this.showlack = false;
        this.isright = false;
        this.iscorrect = true;
      } else {
        this.$store.dispatch("user/save_user_sync", {
          username: this.username,
          password: this.password,
        });
        this.showError = false;
        this.iscorrect = false;
        this.showlack = false;
        this.isright = true;
      }
    },
    // 当输入手机账号时
    handlePhoneChange(e) {
      this.username = e.target.value;
      // console.log( this.username);
    },
    handlePhonepass(e) {
      this.password = e.target.value;
      // console.log(this.password);
    },
    // 登录提交功能
    handleSubmit() {
      this.$axios
        .post("/user/login", {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          // console.log(res);
          if (res.code == 1) {
            this.iscorrect = false;
            this.showlack = false;
            this.showError = false;
            this.isright = false;
            this.$store.commit("user/SAVE_TOKEN", {
              token: res.data.token,
            });
            // console.log("111",this.token);
            // console.log("登录成功");
            this.$router.push({ name: "ShopCard" });
          } else {
            this.isright = false;
            this.iscorrect = false;
            this.showlack = false;
            this.showError = true;
          }
        });
    },
    // 切换成验证码
    changeMsg() {
      this.isright = false;
      this.iscorrect = false;
      this.showlack = false;
      this.showError = false;
      this.activeTab = "msg";
    },
    // 切换成密码
    changePass() {
      this.iscorrect = false;
      this.isCode = false;
      this.showlack = false;
      this.showError = false;
      this.activeTab = "pass";
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  .login-header {
    height: 1.38889rem;
    padding: 0 0.66667rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .login-header_help {
      color: #7f7f7f;
      font-size: 0.38889rem;
      margin-left: 0.75rem;
      cursor: pointer;
      transition: opacity 0.34s cubic-bezier(0, 0, 0.2, 1) 0s;
    }
    .login-header_lang {
      position: relative;
      margin-left: 0.75rem;
      .lang_text {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        color: #7f7f7f;
        font-size: 0.38889rem;
        cursor: pointer;
        transition: opacity 0.34s cubic-bezier(0, 0, 0.2, 1) 0s;
        &::after {
          content: "";
          height: 0;
          width: 0;
          border: 0.13889rem solid transparent;
          border-top-color: #7f7f7f;
          margin-left: 0.27778rem;
          margin-bottom: -0.05556rem;
          display: inline-block;
        }
      }
      .lang-list {
        position: absolute;
        background: #fff;
        border-radius: 0.13889rem;
        box-shadow: 0 0 0.13889rem #d3d3d3;
        right: 0;
        top: 0.88889rem;
        width: 3.05556rem;
        z-index: 10;
        .lang-list_item {
          height: 1.11111rem;
          padding: 0.13889rem 0.55556rem;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-align: center;
          align-items: center;
          -ms-flex-pack: center;
          justify-content: center;
          -ms-flex-direction: row;
          flex-direction: row;
          white-space: nowrap;
          color: #7f7f7f;
          font-size: 0.38889rem;
          cursor: pointer;
          transition: opacity 0.34s cubic-bezier(0, 0, 0.2, 1) 0s;
        }
      }
    }
  }
  .login-body {
    flex: 1;
    .login-body-header {
      padding-bottom: 1.36111rem;
      margin-bottom: -82px;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-align: center;
      align-items: center;
      -ms-flex-pack: center;
      justify-content: center;
      -ms-flex-direction: column;
      flex-direction: column;
      padding-top: 0.55556rem;
      padding-bottom: 0.83333rem;
      margin-bottom: 0;
      background: url(@/assets/bgc.png) no-repeat 0 -5.777778rem;
      .login-body-logo {
        width: 6.25rem;
        height: 0.69444rem;
        margin-bottom: 1rem;
        .auto-img {
          width: 100%;
          height: auto;
          display: block;
        }
        // background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANAAAAAiCAMAAAAZIKdUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAOVBMVEVHcEwzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzM0rESPAAAAEnRSTlMAzw6B9m894GDA6RqRTKIptQUyJXn2AAADP0lEQVRYw+2Z65KjIBCFw/0ioPj+D7sGGkW5mB2Zqq2t8GeqxmPoj+ZAd/J6fT5m5pCm60qFMnJqaKRT4kYzSRM1Gjk2/1zzbExErKehpN8fLmgb/IUZOmsQw7vGvTX2heVFI0jB7aW61Twc2NC1GFqmx4HVkoqGsoQdYpRMVzQGnyaTH2geDl6ZImRpyoBoXYPmDKjxOYJnW0HVNZqP45FpmRSRlnPLTNo2ej6AEqQJms0D6S1+ACXIXQOrQPdkz3rXsKAhSbPKUTwWZpA4t1ScRk8nIJGZZrOUzoh2IJ0bAkt418LnwitnDTppno45hs785ZRYIqbPgIy/Wi9i4gzIXczgSUQIBD6GvlzOAM+iZsxxFwKnldWJ0bIDiJWaGIk5gExrByxn+VVDd83jBLViBVThE5CpaQI1xQmoGlLE2Jbfi3vN4xEiQh1WDkC6erBiCn6OQNX7JHKQ7TTtRI2aa/aXAzUTBEESAGpM5oJxQNvYM8FG6vjbTBEaAEQhC81AHADJzpmPDvjqPRcyDPA9DR0A1N4psGoLAPHOoS9SpdDzKZiysRsm0IwBmj8Ash2glCHWAaJ9oHkUUC9YB94RnUAIQKuOzyRk0cAW7mV6zDVUn8Rr2EaiY2YEvlDpjO8cHAFMdzQjLiLZvqNZ8pdYmyay6ZFq12NzejS177yZjirncEiDwq053F4piMrRMYl02qpm9YLRnhjX0sSaSA/pIWIeSqLYU4TZofRBBdGM9txB6SOKaKcsd3GNyk4Bq7Vj0x+5KGvn4hQkq99E0c5BTUmPmmivtgk+d6c6r4lYTfM6a55vOpQaYQ7zTNbRvNY8+iFt7K4x0Nos/twPUWchlZinxh7hU8Xb1zwnWo7eEi0KHX0neRUN3lujco3zRYO3gSO1oOO1BZ+P+RvNAB/Rbucca7lqf73v1ADkRE1DT97gH2gGfOlTfksiDsPE0geTAkkfZoilj2ei/P6jaOfuNSP2nXRZvMLwazWx/cPbPAXCWX+pzN/p4ibTaCdrO+kTzZA8WckIYZLjSnkEhBMHzVRpNWQyetTYzrp/ovm10au2a0D//PgCfYG+QF+g/xtouzDI3U848q2Zfz2UPz2AcJFc2usZAAAAAElFTkSuQmCC);
        // background-repeat: no-repeat;
        // background-position: 50%;
        // background-size: 100% 100%;
      }
      .login-body-header {
        font-size: 0.33333rem;
        font-weight: 500;
        padding: 0 0.66667rem;
        text-align: center;
      }
    }
    .login-body-box {
      margin: 0 auto;
      .body-box-wrapper {
        position: relative;
        padding: 0.55556rem 0.66667rem 0.66667rem;
        .box-wrapper-tabs {
          margin-bottom: 0.88889rem;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-align: center;
          align-items: center;
          -ms-flex-pack: center;
          justify-content: center;
          -ms-flex-direction: row;
          flex-direction: row;
          margin-bottom: 20px;
          overflow: hidden;
          font-size: 0.44444rem;
          .active {
            color: #000 !important;
          }
          .wrapper-tabs-item {
            position: relative;
            height: 0.77778rem;
            padding: 0 0.27778rem;
            flex: 1 1;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            -ms-flex-pack: center;
            justify-content: center;
            height: 34px;
            cursor: pointer;
            white-space: nowrap;
            box-sizing: border-box;
            padding: 0 10px;
            color: rgba(0, 0, 0, 0.5);
            &:first-child::after {
              content: "";
              height: 0.33333rem;
              border-right: 1px solid rgba(0, 0, 0, 0.1);
              position: absolute;
              right: 0;
              top: 50%;
              -webkit-transform: translateY(-50%);
              transform: translateY(-50%);
            }
            span {
              line-height: 0.77778rem;
              font-size: 0.44444rem;
            }
          }
        }
        .box-wrapper-content {
          width: 100%;
          height: 359px;
          margin: 0 auto;
          padding: 20px 0px;
          box-sizing: border-box;
          // background-color: skyblue;
          .login-form {
            box-sizing: border-box;
            .login-form-item {
              position: relative;
              .showNumber {
                position: absolute;
                left: 5px;
                top: 15px;
                width: 50px;
                height: 16px;
                font-size: 0.38889rem;
                &::after {
                  content: "";
                  height: 0.33333rem;
                  border-right: 1px solid rgba(0, 0, 0, 0.1);
                  position: absolute;
                  right: 0;
                  top: 50%;
                  -webkit-transform: translateY(-50%);
                  transform: translateY(-50%);
                  // position: relative;
                }
                .sanjiao {
                  border: 5px solid transparent;
                  border-top: 5px solid rgb(204, 204, 204);
                  position: absolute;
                  left: 33px;
                  top: 5px;
                }
              }
              input {
                border-radius: 0.19444rem;
                text-align: center;
                width: 90%;
                padding: 0.27778rem 0.41667rem;
                font-size: 0.38889rem;
                line-height: 20px;
                outline: none;
                border: 1px solid transparent;
                margin-bottom: 10px;
                background-color: rgb(247, 247, 247);
                // position: relative;
              }
              .VerificationCode {
                display: inline-block;
                width: 30%;
                // background-color: #2ad181;
                height: 42px;
                border-radius: 9px;
                line-height: 42px;
                text-align: center;
                margin-left: 8px;
                font-size: 0.33333rem;
                background-color: #d9d9d9;
                color: white;
              }
              .VerificationCode-deep {
                display: inline-block;
                width: 30%;
                background-color: #2ad181;
                height: 42px;
                border-radius: 9px;
                line-height: 42px;
                text-align: center;
                margin-left: 8px;
                font-size: 0.33333rem;
                color: white;
              }
              .input_after__3ohooa {
                position: absolute;
                right: 0.0002rem;
                top: 0px;
                height: 1.22222rem;
                width: 0.94444rem;
                padding-right: 0.27778rem;
                margin-left: -0.13889rem;
                height: 45px;
                box-sizing: border-box;
                width: 35px;
                padding-right: 11px;
                margin-left: -4px;
                cursor: pointer;
                display: -ms-flexbox;
                display: flex;
                -ms-flex-align: center;
                align-items: center;
                -ms-flex-pack: center;
                justify-content: center;
                -ms-flex-direction: row;
                flex-direction: row;
                .input_icon__ewiea9 {
                  width: 0.66667rem;
                  height: 0.66667rem;
                  width: 24px;
                  height: 24px;
                  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIBAMAAACnw650AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAASUExURUdwTAAAAAAAAAAAAAAAAAAAAFZgiOcAAAAGdFJOUwAyKQYeEdIBb1wAAAEqSURBVEjH7VRLFsIwCKymPQCx3Rv1ANWavfWzb5/e/ywmfgIhqY/nuuxKBwaGQFHMNts/Zs8G9OZ6/wGpevjYbpjCHIHYRYCZQJX+T33rWmUfZgKl/I/b9+vhUWldI4Am3srF1DmyKNKjtgxkkhqsC2sjzwGg4cmdb8UTJWWqPk61TPnfddJUPeg2I51zRyHroLtBJZz/RDQKicqoJ0PaMcjtOtBRgyR6IImI0Ar5RvTvAe5dNKwmUKyxnxexRW10oGixJE981oTvXcmCVPHCuz8FSy0DJXQVpHRJ4XtMHQrnElgyV5SAiQmoIBFTxWMhgyFj4QPG0dMBs6dyyT4V0aOTPd/sIhRsEWQrlVnOKllO2ZqLDobs9IiOmOwcyg6r7ETLjv1ss03bE/TqNRDA6oocAAAAAElFTkSuQmCC);
                  background-repeat: no-repeat;
                  background-position: 50%;
                  background-size: 100% 100%;
                }
                .input_off__3o-wkn {
                  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIBAMAAACnw650AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAPUExURQAAAEdwTAAAAAAAAAAAAHFRDC8AAAAFdFJOUzIAEiIIr0FUWwAAAaVJREFUSMftlduxAiEMhuOyBQhSAKwWgIMFiNp/TQcSLoHFGV+dY54W9uNPCCSA/MDgB30dtH0AKbBTSJ+9F34LODCwTCB9hmw+JKEZpBxUE0lo4k4BsysTYpBGHb+9HpvvhRqk4yQsIQ8sF2rQPTI3FqDBuHpIDQwGeBsgw9TzOFroIMXE83iJAawdZNKmeyErXZGCunAUkvJUpKAtHIVkkmqQrt5lJ3zKQSB0ZEJPnmxHMLBvWsxP7UihA6nXrbnu1DT9AeLnQuXeAXqrYd9JaG2LgCDNwnYo1LJP/qDQZCTEjsgkVUghtTmKiK3CoAA3Z7tkXxhU3MXAD12yVYMUJgrwUoru1Jh/+gW0T8uEHi0FmpwAOV67C1kPIC+HXASBl55ozkU94PjvMBPSeR7ylRAloqdrVVM8QPG97i9oPemcEbzzal9WlkPPofqz/NB63HUUilGPrUeNQqnJ7FvPIORalUvoqv/SNb3rrvVQsgViD5++l30fNzDYsm/2mOw3DO9Plrff2+TZKFvbEBNbkHOo5OgV3j5AZvnglVL291D/X+gPWYmkCrHk8wIAAAAASUVORK5CYII=);
                }
              }
            }
          }
          .text-error {
            width: 100%;
            text-align: center;
            color: red;
          }
          .lackUsrname {
            width: 100%;
            text-align: center;
            color: red;
          }
          .correctUsername {
            width: 100%;
            text-align: center;
            color: red;
          }
          .login-text {
            width: 100%;
            background-color: rgb(192, 241, 217);
            height: 45px;
            border-radius: 9px;
            text-align: center;
            line-height: 45px;
            margin-top: 30px;
            color: white;
            font-size: 0.38889rem;
          }
          .login-text-deep {
            width: 100%;
            background-color: rgb(42, 209, 129);
            height: 45px;
            font-size: 0.38889rem;
            border-radius: 9px;
            text-align: center;
            line-height: 45px;
            margin-top: 30px;
            color: white;
          }
          .box-footer {
            color: #2ad181;
            font-size: 0.38889rem;
            width: 100%;
            text-align: center;
            margin-top: 20px;
          }
          .box-hiden {
            font-size: 0.38889rem;
            color: #5a6e97;
            width: 100%;
            text-align: center;
            // margin-top: ;
            padding-top: 4rem;
          }
          // .box-bottom-text {
          //   // width: 100%;
          //   // text-align: center;
          // }
          .box-bottom {
            width: 90%;
            padding: 20px;
            text-align: center;
            color: #9b9b9b;
            font-size: 0.33333rem;
          }
        }
      }
    }
  }
}
</style>