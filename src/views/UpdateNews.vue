<template>
  <el-col :span="19">
    <h2>修改产品信息</h2>
    <div class="factory-info">
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="编号">
          <el-input v-model="form.id" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="新闻标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="图片/视频">
          <el-upload
            class="avatar-uploader"
            action="/api/v1/news/upload"
            :show-file-list="false"
            :data='cardImage'
            :on-success="FroughSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="roughUrl" :src="roughUrl" class="avatar">
            <video v-if="videoUrl" :src="videoUrl" class="avatar"></video>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="新闻正文">
          <el-input type="textarea" v-model="form.content" :rows="10"></el-input>
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
  name: 'updateNews',
  data () {
    return {
      roughPath: '/api/resources/static/img/news/cardImage/',
      cardImage: {
        fileType: 'cardImage'
      },
      roughUrl: '',
      videoUrl: '',
      form: {
        id: '',
        title: '',
        content: '',
        card_image: ''
      }
    }
  },
  methods: {
    // 新闻图片上传成功
    FroughSuccess (res, file) {
      this.form.card_image = res.Data
      this.$message.success('上传成功')
      this.videoUrl = URL.createObjectURL(file.raw)
      this.roughUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      // const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 1000 // 1G
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      if (!isLt2M) {
        this.$message.error('上传大小不能超过 1G!')
      }
      // return isJPG && isLt2M
      return isLt2M
    },
    onSubmit () {
      let self = this
      let id = this.$route.params.id
      this.$axios.put('/api/v1/news/update/' + id, {
        title: self.form.title,
        content: self.form.content,
        card_image: self.form.card_image
      })
        .then(function (response) {
          console.log(response)
          if (response.data.Status === 0) {
            self.$message.success('修改成功')
            self.$router.push({ path: '/news', query: {} })
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
      this.$axios.get('/api/v1/news/info/' + id)
        .then(function (response) {
          self.bindData(response.data.Data)
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    bindData (news) {
      this.form.id = news.ID
      this.form.title = news.Title
      this.form.content = news.Content
      this.form.card_image = news.CardImage
      this.roughUrl = this.roughPath + news.CardImage
      this.videoUrl = this.roughPath + news.CardImage
    },
    back () {
      this.$router.push({ path: '/news', query: {} })
    }
  },
  created () {
    let id = this.$route.params.id
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
</style>
