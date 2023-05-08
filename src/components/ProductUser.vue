<template>
<!-- 用户顶部 -->
  <div class="procut">
    <div class="body">
      <div class="procut_name">{{ pro_item.tagName }}</div>
      <div class="procut_number">{{ pro_item.count }}</div>
    </div>
  </div>
</template>

<script>

export default {
  // 收一下
  props: {
    pro_item: {
      // 限制一下必须是对象
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.procut {
  display: flex;

  .body {
    margin: 0 0.1rem 0.16rem 0.1rem;
    padding: 0.145rem 0.3rem;
    line-height: 0.36rem;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 0.68rem;
    display: flex;
    justify-content: space-around;
    width: 2.4rem;
    height: 0.5rem;
    text-align: center;
    align-items: center;
    .procut_name {
      color: black;
    }
    .procut_number {
      color: black;
    }
  }
}
</style>