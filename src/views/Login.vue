<template>
  <div class="home">

    <el-main class="el-main">
      <el-card class="box-card">
        <div class="login-box">
          <h3 class="login-title">登录</h3>
          <el-form hide-required-asterisk :model="ruleForm" :rules="rules" ref="ruleForm" label-width="50px"
                   class="demo-ruleForm">
            <el-form-item label="账号" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-button class="login-button" type="primary" @click="submitForm('ruleForm')">登录</el-button>
          </el-form>
        </div>
      </el-card>
    </el-main>
  </div>
</template>

<script>
export default {
  name: 'login',
  components: {},
  data () {
    return {
      ruleForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, message: '最低3个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, message: '最低3个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.checkLogin()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    subSucc (msg) {
      this.$message.success(msg)
    },
    subFail (msg) {
      this.$message.error(msg)
    },
    subWarn (msg) {
      this.$message.warning(msg)
    },
    checkLogin () {
      let self = this
      this.$axios.post('/api/v1/admin/login', {
        name: self.ruleForm.name,
        password: self.ruleForm.password
      })
        .then(function (response) {
          console.log(response.data)
          let status = response.data.Status
          console.log(status)
          if (status === 0) {
            self.subSucc('登陆成功,即将跳转至详情页')
            self.$store.commit('addRoles', {
              // 此处赋予了此用户'/about', '/home'的访问权限，而限制了‘/see’的访问权限
              roles: response.data.Data.Level
            })
            console.log(response.data.Data)
            sessionStorage.setItem('dwr_roles', response.data.Data.Level)
            sessionStorage.setItem('dwr_names', response.data.Data.Name)
            self.$router.push({ path: '/home', query: {} })
          } else {
            self.subFail(response.data.Msg)
          }
        })
        .catch(function (error) {
          console.log(error)
          self.subWarn('登陆失败,请检查您的网络连接')
        })
    }
  }
}
</script>
<style>
  .login-button {
    width: 100%;
  }

  .login-box {
    border: 0px solid black;
  }

  .login-title {
    margin-top: 0px;
  }

  .box-card {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    margin: 170px auto;
    width: 480px;
  }
</style>
