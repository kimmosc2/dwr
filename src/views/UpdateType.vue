<template>
  <el-col :span="19">
    <h2>修改应用范围信息</h2>
    <div class="factory-info">
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="编号">
          <el-input v-model="form.id" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.type" placeholder="请选择" class="select">
            <el-option
              v-for="item in options"
              :key="item.Name"
              :label="item.Name"
              :value="item.Name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            class="avatar-uploader"
            action="/api/v1/apply/upload"
            :show-file-list="false"
            :data='mapType'
            :on-success="FmaprSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="mapUrl" :src="mapUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="back">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-col>
</template>

<script>
export default {
  name: 'updateType',
  data () {
    return {
      options: [],
      mapPath: '/api/resources/static/img/apply/cardImage/',
      name: '',
      mapType: {
        fileType: 'cardImage'
      },
      roughType: {
        fileType: 'image'
      },
      mapUrl: '',
      roughUrl: '',
      form: {
        id: '',
        name: '',
        type: '',
        image: '',
        data_image: ''
      }
    }
  },
  methods: {
    // 数据图片上传成功
    FmaprSuccess (res, file) {
      this.form.data_image = res.Data
      this.mapUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 10 // 10 Mi
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 10MB!')
      }
      return isJPG && isLt2M
    },
    onSubmit () {
      let self = this
      this.$axios.put('/api/v1/apply/update/' + self.form.id, {
        id: self.form.id,
        title: self.form.type,
        card_image: self.form.data_image
      })
        .then(function (response) {
          console.log(response)
          if (response.data.Status === 0) {
            self.$message.success('修改成功')
            self.$router.push({ path: '/types', query: {} })
          } else {
            console.log(response.data)
            self.$message.error('修改失败')
          }
        })
        .catch(function (err) {
          console.log(err)
          self.$message.warning('修改失败,请检查您的网络连接')
        })
    },
    getInfoAjax (id) {
      let self = this
      this.$axios.get('/api/v1/apply/info/' + id)
        .then(function (response) {
          console.log(response.data.Data)
          self.bindData(response.data.Data)
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    bindData (product) {
      this.form.id = product.ID
      this.form.type = product.Title
      this.form.data_image = product.CardImage
      this.mapUrl = this.mapPath + product.CardImage
    },
    back () {
      this.$router.push({ path: '/types', query: {} })
    }
  },
  created () {
    let id = this.$route.params.id
    let self = this
    this.$axios.get('/api/v1/product/typeList')
      .then(function (response) {
        console.log(response.data)
        self.options = response.data.Data
        console.log(self.tableData)
      })
      .catch(function (err) {
        console.log(err)
      })
    this.getInfoAjax(id)
  }
}
</script>

<style scoped>
  .avatar-uploader {
    border: 3px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 180px;
  }

  .uploader-size {
    height: 200px;
    width: 300px;
  }

  .avatar-uploader:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .factory-info {
    float: left;
    margin-top: 30px;
    border: 0px solid black;
    width: 96%
  }
  .select {
    float: left;
  }
</style>
