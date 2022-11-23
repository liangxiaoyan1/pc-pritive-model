<template>
  <div class="about" style="background: rgb(255, 255, 255);">
<el-form :inline="true" :model="formInline" class="demo-form-inline formLog" ref="formInline">
    <el-form-item style="  margin-right: 40px ;" label="登录账号：" prop="username">
        <el-input v-model="formInline.loginName" style="width: 300px;"  placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item label="访问时间：" prop="time">
        <el-date-picker style="width: 300px;"
         v-model="loginTime" type="daterange"
         value-format="yyyy-MM-dd HH:mm:ss"
         @change="timeChange(loginTime)"
         range-separator="至"
            start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="submitForm('formInline')"><i class="el-icon-search"></i> 提交</el-button>
        <el-button @click="resetForm('formInline')"><i class="el-icon-refresh"></i> 重置</el-button>
    </el-form-item>
</el-form>
      <el-table :data="tableData" :header-cell-style="{ background: '#F5F5F5', padding: '12px 0px', textAlign: 'center' }">
        <el-table-column  type="index" label="序号" align="center">
        </el-table-column>
        <el-table-column prop="infoId" label="访问ID" align="center">
        </el-table-column>
        <el-table-column prop="loginName" label="登录账号" align="center">
        </el-table-column>
        <el-table-column prop="ipaddr" label="IP" align="center">
        </el-table-column>
        <el-table-column prop="loginLocation" label="登录地点" align="center">
        </el-table-column>
        <el-table-column prop="browser" label="浏览器类型" align="center">
        </el-table-column>
        <el-table-column prop="os" label="浏览器类型" align="center">
        </el-table-column>
        <el-table-column prop="status" label="登录状态" align="center">
                <template slot-scope="scope">
                    {{ scope.row.status == 0 ? "正常" : "异常" }}
                </template>
        </el-table-column>
        <el-table-column prop="loginTime" label="访问时间" align="center">
        </el-table-column>
        <el-table-column prop="" label="备注" align="center">
         </el-table-column>
      </el-table>
    <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
            :page-sizes="[10, 20, 30, 40,50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="total" background>
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

          return {
              loginTime:'',
              total:'',
          tableData:'',
          formInline: {
              loginName:null,
              loginTimeBegin:null,
              loginTimeEnd:null
          },
          pageNum: 1,
          pageSize: 10,
      }
    },
    created (){
       this.submitForm()
    },
    methods: {
        //将时间分开成两组
        timeChange (loginTime) {
            this.formInline.loginTimeBegin = loginTime[0],
                this.formInline.loginTimeEnd = loginTime[1],
                console.log(this.formInline.loginTimeBegin);
            console.log(this.formInline.loginTimeEnd);
        },
        // 获取数据
        submitForm (formInline) {
            this.axios({
                method: 'post',
                url: '/tg-gateway/tg-admin/loginLog',
                data: {
                    current: this.pageNum,
                    size: this.pageSize,
                    loginName: this.formInline.loginName,
                    loginTimeBegin: this.formInline.loginTimeBegin,
                    loginTimeEnd: this.formInline.loginTimeEnd
                },
            }).then((res) => {
                if (res.data.code == 0) {
                    console.log(res);
                    this.tableData = res.data.data
                    this.total = res.data.pageResult.total
                } else {
                    this.$message.error(res.data.msg)
                    console.log(ruleForm);
                }
            })

            
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
        },
       
        handleSizeChange (val) {
            this.pageSize = val
                console.log(`每页 ${val} 条`);
                this.submitForm()
            },
        handleCurrentChange (val) {
            this.pageNum = val
                console.log(`当前页: ${val}`);
                this.submitForm()
            }
       
    }
  };
</script>
 
