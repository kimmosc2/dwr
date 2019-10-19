<template>
  <div>
    <el-col :span="4">
      <el-menu
        default-active="2"
        router
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-menu-item index="/product">
          <i class="el-icon-menu"></i>
          <span slot="title">产品管理</span>
        </el-menu-item>
        <el-menu-item index="/news">
          <i class="el-icon-menu"></i>
          <span slot="title">新闻管理</span>
        </el-menu-item>
        <el-menu-item index="/types">
          <i class="el-icon-menu"></i>
          <span slot="title">应用范围管理</span>
        </el-menu-item>
        <el-menu-item index="/home">
          <i class="el-icon-setting"></i>
          <span slot="title">后台信息</span>
        </el-menu-item>
        <!--        <el-menu-item index="3" disabled>-->
        <!--          <i class="el-icon-document"></i>-->
        <!--          <span slot="title">导航三</span>-->
        <!--        </el-menu-item>-->
      </el-menu>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'leftBar',
  methods: {
    handleOpen (key, keyPath) {
      console.log('aaaa')
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log('aaaa')
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped lang="less">
  .el-menu-vertical-demo {
    border-right: 1px solid #dcdfe6;
    height: 700px;
  }
</style>
