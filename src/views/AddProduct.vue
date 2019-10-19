<template>
  <el-col :span="19">
    <h2>添加产品信息</h2>
    <div class="factory-info">
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="产品名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="产品类型">
          <el-select v-model="form.type" placeholder="请选择" class="select">
            <el-option
              v-for="item in options"
              :key="item.Name"
              :label="item.Name"
              :value="item.Name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品图片(展示图)">
          <el-upload
            class="avatar-uploader"
            action="/api/v1/product/upload"
            :show-file-list="false"
            :data='roughType'
            :on-success="FroughSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="roughUrl" :src="roughUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="数据图片(具体参数)">
          <el-upload
            class="avatar-uploader"
            action="/api/v1/product/upload"
            :show-file-list="false"
            :data='mapType'
            :on-success="FmaprSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="mapUrl" :src="mapUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="产品描述">
          <el-input type="textarea" v-model="form.description" :rows="3"></el-input>
        </el-form-item>
        <el-form-item label="特点">
          <el-input type="textarea" v-model="form.virtue" :rows="3"></el-input>
        </el-form-item>
        <el-form-item label="物理性能">
          <el-input type="textarea" v-model="form.property" :rows="3"></el-input>
        </el-form-item>
        <el-form-item label="产品的使用">
          <el-input type="textarea" v-model="form.usage" :rows="3"></el-input>
        </el-form-item>
        <el-form-item label="备注(大段产品介绍)">
          <el-input type="textarea" v-model="form.remarks" :rows="5"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加</el-button>
          <el-button @click="back">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-col>
</template>

<script>
export default {
  name: 'AddFactory',
  data () {
    return {
      options: [],
      mapType: {
        fileType: 'data_image'
      },
      roughType: {
        fileType: 'image'
      },
      mapUrl: '',
      roughUrl: '',
      form: {
        name: '',
        type: '防水透汽膜隔汽膜',
        image: '',
        data_image: '',
        description: '',
        virtue: '',
        property: '',
        usage: '',
        remarks: ''
      }
    }
  },
  created: function () {
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
  },
  methods: {
    // 产品图片上传成功
    FroughSuccess (res, file) {
      console.log(res.Data)
      this.form.image = res.Data
      this.roughUrl = URL.createObjectURL(file.raw)
    },
    // 数据图片上传成功
    FmaprSuccess (res, file) {
      console.log(res.Data)
      this.form.data_image = res.Data
      this.mapUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 10 // 10 Mib
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 10MB!')
      }
      return isJPG && isLt2M
    },
    onSubmit () {
      let self = this
      this.$axios.post('/api/v1/product/add', {
        name: self.form.name,
        type: self.form.type,
        image: self.form.image,
        data_image: self.form.data_image,
        description: self.form.description,
        virtue: self.form.virtue,
        property: self.form.property,
        usage: self.form.usage,
        remarks: self.form.remarks
      })
        .then(function (response) {
          if (response.data.Status === 0) {
            self.$message.success('添加成功')
            self.$router.push({ path: '/product', query: {} })
          } else {
            console.log(response.data)
            self.$message.error('添加失败')
          }
        })
        .catch(function (err) {
          console.log(err)
          self.$message.warning('添加失败,请检查您的网络连接')
        })
    },
    back () {
      this.$router.push({ path: '/product', query: {} })
    }
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
    margin-left: 50px;
    margin-top: 10px;
    border: 0px solid black;
    width: 80%;
  }

  .select {
    float: left;
  }
</style>
