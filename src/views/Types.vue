<template>
  <!--  产品列表  -->
  <el-col :span="20">
    <div class="product-list">
      <el-table
        border
        resizable
        show-overflow-tooltip="true"
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        style="width: 100%">
        <el-table-column
          label="编号"
          prop="ID"
          width="50"
          align="center">
        </el-table-column>
        <el-table-column
          label="应用范围类型"
          prop="Title"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="240"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          background
          @current-change='testFunc'
          layout="prev, pager, next"
          :page-size=pageSize
          :total="tableData.length">
        </el-pagination>
        <el-link icon="el-icon-edit" class="add-class" @click="addFac">添加应用范围</el-link>
      </div>
    </div>
  </el-col>

</template>

<script>
export default {
  name: 'Types',
  data () {
    return {
      currentPage: 1, // 当前页(初始页)
      pageSize: 10, // 每页的数据
      tableData: [],
      dialogFormVisible: false,
      name: '',
      formLabelWidth: '120px'
    }
  },
  created: function () {
    let self = this
    this.$axios.get('/api/v1/apply/list')
      .then(function (response) {
        console.log(response.data)
        self.tableData = response.data.Data
        console.log(self.tableData)
      })
      .catch(function (err) {
        console.log(err)
      })
  },
  methods: {
    addTypes () {
      let self = this
      self.$axios.post('/api/v1/product/typeAdd/' + self.name, {})
        .then(function (response) {
          console.log(response.data.Status)
          if (response.data.Status === 0) {
            self.dialogFormVisible = false
            self.$message.success(response.data.Msg)
            self.$router.push({ path: '/product', query: {} })
          } else {
            self.$message.error(response.data.Msg)
          }
          console.log(response)
        })
        .catch(function (err) {
          console.log(err)
          self.$message.warning('添加失败,请检查您的网络连接')
        })
    },
    addFac () {
      this.dialogFormVisible = true
      this.$router.push({ path: '/addTypes', params: {} })
    },
    handleEdit (index, row) {
      console.log(index, row.ID)
      this.$router.push({ path: '/updateTypes/' + row.ID, params: {} })
    },
    handleDelete (index, row) {
      console.log(index, row.ID)
      this.delete(row.ID)
    },
    testFunc (page) {
      this.currentPage = page
    },
    delete (id) {
      this.$confirm('即将删除该应用范围, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(id)
        this.deleteAjax(id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        let newPage = '_empty' + '?time=' + new Date().getTime() / 500
        this.$router.push(newPage)
        this.$router.go(-1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    deleteAjax (id) {
      console.log(id)
      this.$axios.delete('/api/v1/apply/del/' + id, {})
        .then(function (response) {
          console.log(response.data)
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>

</style>
