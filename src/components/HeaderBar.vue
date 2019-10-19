<template>
  <el-header class="headerBar">
    <el-row :gutter="24" type="flex" justify="space-between">
      <!--左logo-->
      <el-col :span="6" class="col-class">
        <img src="@/assets/logo.png" style='vertical-align:middle;'>
      </el-col>
      <el-col :span="4" class="col-class">
        <div class="login-title" v-if="name === ''">您好,您还未登录,请登录</div>
        <div class="login-title" v-else>

          <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                 <!--  TODO 头像-->
                <!--                 <img src="@/assets/logo.png" class="login-head" style='vertical-align:middle;' width="50px">-->
                {{ name }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">个人中心</el-dropdown-item>
              <el-dropdown-item command="b">修改密码</el-dropdown-item>
              <el-dropdown-item command="c">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
    <!--  密码修改表单-->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <h3>密码在3-16位之间</h3>
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePassword">确 定</el-button>
      </div>
    </el-dialog>
  </el-header>
</template>

<script>
export default {
  name: 'HeaderBar',
  data () {
    return {
      name: this.$store.state.names,
      dialogFormVisible: false,
      form: {
        name: '',
        password: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleCommand (command) {
      switch (command) {
        case 'a':
          console.log('个人中心')
          break
        case 'b':
          console.log('修改密码')
          this.dialogFormVisible = true
          break
        case 'c':
          console.log('退出登录')
          this.logOut()
          break
      }
    },
    logOut () {
      sessionStorage.clear()
      this.$store.commit('addRoles', {
        roles: ''
      })
      this.$store.commit('addNames', '')
      this.$message.success('退出登录成功')
      this.$router.push({ path: '/login', query: {} })
    },
    changePassword () {
      let self = this
      self.$axios.patch('/api/v1/admin/changePassword', {
        name: self.name,
        password: self.form.password
      })
        .then(function (response) {
          console.log(response.data.Status)
          if (response.data.Status === 0) {
            self.dialogFormVisible = false
            self.$message.success(response.data.Msg)
          } else {
            self.$message.error(response.data.Msg)
          }
          console.log(response)
        })
        .catch(function (err) {
          console.log(err)
          self.$message.warning('添加失败,请检查您的网络连接')
        })
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.names
    }
  },
  watch: {
    isLogin: function (val) {
      console.log(val)
      this.name = val
    }
  }
}
</script>

<style scoped>
  .headerBar {
    border-bottom: 1px solid #e6e6e6;
  }

  .col-class {
    border: 0px solid black;

  }

  .login-title {
    text-align: center;
    font-size: 14px;
    line-height: 60px;
    display: inline;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .login-head {
    border: 1px solid #C0C0C0;
    display: inline;
    border-radius: 50px;
  }
</style>
