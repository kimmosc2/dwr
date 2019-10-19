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
          label="名称"
          prop="Name"
          align="center">
        </el-table-column>
        <el-table-column
          label="产品类型"
          prop="Type"
          width="140">
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
        <el-link icon="el-icon-edit" class="add-class" @click="addFac">添加产品</el-link>
      </div>
    </div>
  </el-col>
</template>

<script>
export default {
  name: 'Product',
  data () {
    return {
      currentPage: 1, // 当前页(初始页)
      pageSize: 10, // 每页的数据
      tableData: []
    }
  },
  created: function () {
    let self = this
    this.$axios.get('/api/v1/product/list')
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
    addFac () {
      this.$router.push({ path: '/addProduct', params: {} })
    },
    handleEdit (index, row) {
      console.log(index, row.ID)
      this.$router.push({ path: '/updateProduct/' + row.ID, params: {} })
    },
    handleDelete (index, row) {
      console.log(index, row.ID)
      this.delete(row.ID)
    },
    testFunc (page) {
      this.currentPage = page
    },
    delete (id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
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
      this.$axios.delete('/api/v1/product/del/' + id, {})
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
