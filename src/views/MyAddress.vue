<!-- 已修改 -->
<template>
    <!-- 头部 -->
  <div class="address">
    <div class="address_nav">
      <div class="left" @click="goback">
        <svg
          t="1652970550280"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2997"
          width="24"
          height="24"
        >
          <path
            d="M939.880137 487.72513l-782.215258 0 358.804922-318.92975c12.389168-11.011798 13.505595-29.980825 2.492774-42.369993-11.011798-12.386098-29.977755-13.505595-42.367947-2.492774L64.602344 490.13911c-6.407943 5.693676-10.073426 13.858636-10.073426 22.430872s3.665483 16.737196 10.073426 22.430872l411.993309 366.204449c5.717212 5.083785 12.83533 7.580652 19.925818 7.580652 8.274454 0 16.514115-3.403516 22.442128-10.07445 11.011798-12.387122 9.896394-31.357172-2.492774-42.367947L169.687704 548.100196 939.880137 548.100196c16.57449 0 30.011524-13.613042 30.011524-30.187533S956.454628 487.72513 939.880137 487.72513z"
            p-id="2998"
            fill="#f34141"
          ></path>
        </svg>
      </div>
      <div class="title">我的收货地址</div>
    </div>
    <!-- vant组件 -->
    <div class="body">
      <van-address-edit
        ref="adInfo"
        :area-list="areaList"
        :show-postal='showpostal'
        :show-delete="showdelete"
        show-set-default
        :area-columns-placeholder="['请选择省', '请选择市', '请选择区/县']"
        @save="saveAdrress"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { AddressList } from "vant";
import { Toast } from "vant";
import { AddressEdit } from "vant";
import { areaList } from '@vant/area-data';
Vue.use(AddressEdit);
Vue.use(AddressList);
export default {

  components: {},
  data() {

    return {
      showNew: true,
      areaList,
      showpostal:false,
      showdelete:false
    };
  },

  methods: {
    //   添加收货地址
    goback() {
      this.$router.go(-1);
    },
    // onAdd() {
    //   Toast("新增地址");
    // },
    // onEdit(item, index) {
    //   Toast("编辑地址:" + index);
    // },
    // 保存地址
    saveAdrress(content){
        // console.log(contenngth');
        // let id=+new Date();
        if(this.$route.query.edit){
          let myname = content.name
          let tel = content.tel
          let province = content.province
          let address = content.addressDetail;
          let obj = {myname,tel,province,address}
          let adobj = JSON.parse(localStorage.getItem("address-data")) || []
          adobj[this.$route.query.edit-1]=obj
          localStorage.setItem("address-data",JSON.stringify(adobj))
          this.$router.push({name:'SubmitOrder'}) 
        }else{
          let myname = content.name
          let tel = content.tel
          let province = content.province
          let address =content.addressDetail
          let obj = {myname,tel,province,address}
          let adobj = JSON.parse(localStorage.getItem("address-data")) || []
          adobj.push(obj)
          localStorage.setItem("address-data",JSON.stringify(adobj))
          // this.$router.push({name:'SubmitOrder'}) 
          this.$router.go(-1);
        }
    },
  },
  mounted(){
    // console.log(this.$route.query.edit==true)
    if(this.$route.query.edit){
      let addressobj=JSON.parse(localStorage.getItem("address-data"))
      let addressdata=addressobj[this.$route.query.edit-1]
      // console.log(addressdata)
      // console.log(this.$refs.adInfo)
      this.$refs.adInfo.data={...addressdata}
       this.$refs.adInfo.data.name=addressdata.myname
    }
  }
};
</script>

<style lang="less" scoped>
.address {
  padding: 0.4rem 0.3rem;
  .address_nav {
    display: flex;
    align-content: center;
    .left{
       margin-left:0.35rem;
    }
    .title {
      //   padding: 0.1rem 0;
      max-width: 60%;
      margin: 0 auto;
      color: #000;
      font-weight: 500;
      font-size: 0.44rem;
      line-height:0.69rem;
    }
  }
  .body {
    margin-top:10px;
  }
}
</style>