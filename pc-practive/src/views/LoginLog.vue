<template>
  <div class="about" style="background: rgb(255, 255, 255);">
<el-form :inline="true" :model="formInline" class="demo-form-inline formLog" ref="formInline">
    <el-form-item style="  margin-right: 40px ;" label="登录账号：" prop="username">
        <el-input v-model="formInline.username" style="width: 300px;"  placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item label="访问时间：" prop="time">
        <el-date-picker style="width: 300px;" v-model="formInline.time" type="daterange" range-separator="至"
            start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="submitForm('formInline')"><i class="el-icon-search"></i> 提交</el-button>
        <el-button @click="resetForm('formInline')"><i class="el-icon-refresh"></i> 重置</el-button>
    </el-form-item>
</el-form>
      <el-table :data="tableData" :header-cell-style="{ background: '#F5F5F5', padding: '12px 0px'}">
        <el-table-column  type="index" label="序号">
        </el-table-column>
        <el-table-column prop="infoId" label="访问ID">
        </el-table-column>
        <el-table-column prop="loginName" label="登录账号">
        </el-table-column>
        <el-table-column prop="ipaddr" label="IP">
        </el-table-column>
        <el-table-column prop="loginLocation" label="登录地点">
        </el-table-column>
        <el-table-column prop="browser" label="浏览器类型">
        </el-table-column>
        <el-table-column prop="os" label="浏览器类型">
        </el-table-column>
        <el-table-column prop="status" label="登录状态">
        </el-table-column>
        <el-table-column prop="loginTime" label="访问时间">
        </el-table-column>
      </el-table>
    <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
            :page-sizes="[2, 5, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length" background>
        </el-pagination>
    </div>
</div>
</template>
<style scoped lang="scss">
.formLog{
    // width:100%;
    text-align: center;
    // padding:40px 70px;
 

}
.about{
    padding: 35px 35px 105px 35px;
    
}
.block{
    float: right;
    padding-top: 30px;
}
</style>

<script>
  export default {
    data() {
      const item = {
          id: 1,
          infoId: '123',
          loginName: 'admin',
          ipaddr: '198.160',
          loginLocation: 'xx xx',
          browser: '',
          os: '',
          status: '',
          loginTime: '',
          
      };
      return {
          tableData: Array(5).fill(item),
          formInline: {
              useusernamer: '',
              time: ''
          },
          pageNum: 1,
          pageSize: 5,
      }
      },
    methods: {
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
        },
       
            handleSizeChange (val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange (val) {
                console.log(`当前页: ${val}`);
            }
       
    }
  };
</script>
 
