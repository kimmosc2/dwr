<template>
  <el-col :span="19">
    <h2>新建新闻</h2>
    <div class="factory-info">
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="新闻标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="图片/视频">
          <el-upload
            class="avatar-uploader"
            :on-progress="uploadVideoProcess"
            action="/api/v1/news/upload"
            :show-file-list="false"
            :data='cardImage'
            :on-success="FroughSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="roughUrl" :src="roughUrl" class="avatar" style="float: left">
            <video v-if="videoUrl" :src="videoUrl" class="avatar" style="float: left"></video>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <el-progress v-if="videoFlag"
                         type="circle"
                         v-bind:percentage="videoUploadPercent"
                         style="margin-top:7px;"></el-progress>
          </el-upload>
        </el-form-item>

        <el-form-item label="新闻正文">
          <el-input type="textarea" v-model="form.content" :rows="25">右下角可调整大小</el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">新建</el-button>
          <el-button @click="back">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-col>
</template>

<script>
export default {
  name: 'AddNews',
  data () {
    return {
      videoFlag: false,
      // 是否显示进度条
      videoUploadPercent: '',
      // 进度条的进度，
      isShowUploadVideo: false,
      // 显示上传按钮
      videoForm: {
        showVideoPath: ''
      },
      cardImage: {
        fileType: 'cardImage'
      },
      roughUrl: '',
      videoUrl: '',
      form: {
        title: '',
        card_image: '',
        content: ''
      }
    }
  },
  methods: {
    uploadVideoProcess (event, file, fileList) {
      this.videoFlag = true
      this.videoUploadPercent = file.percentage.toFixed(0) * 1
    },
    // 新闻图片上传成功
    FroughSuccess (res, file) {
      console.log(res.Data)
      this.form.card_image = res.Data
      this.$message.success('上传成功')
      this.videoFlag = false
      this.videoUrl = URL.createObjectURL(file.raw)
      this.roughUrl = URL.createObjectURL(file.raw)
    },
    isVideo (filename) {
      var index = filename.lastIndexOf('.')
      var suffix = filename.substr(index + 1)
      if (suffix === 'jpg' || suffix === 'png' || suffix === 'jpeg') {
        console.log('是图片')
        return false
      } else {
        console.log('是视频')
        return true
      }
    },
    beforeAvatarUpload (file) {
      // const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 1000 // 1000 Mib
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      if (!isLt2M) {
        this.$message.error('上传大小不能超过 1GB!')
      }
      // return isJPG && isLt2M
      return isLt2M
    },
    onSubmit () {
      let self = this
      this.$axios.post('/api/v1/news/add', {
        title: self.form.title,
        card_image: self.form.card_image,
        content: self.form.content
      })
        .then(function (response) {
          if (response.data.Status === 0) {
            self.$message.success('添加成功')
            self.$router.push({ path: '/news', query: {} })
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
      this.$router.push({ path: '/news', query: {} })
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
