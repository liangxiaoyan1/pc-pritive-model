<template>
    <div class="about" style="background: rgb(255, 255, 255);">
        <el-form :inline="true" :model="formInline" class="demo-form-inline formLog" ref="formInline">
            <el-form-item  label="操作人名称：" prop="operName">
                <el-input style="width: 180px;" v-model="formInline.operName" placeholder="请输入操作人名称"></el-input>
            </el-form-item>
            <el-form-item label="操作时间：" prop="time">
                <el-date-picker style="width: 250px;" v-model="loginTime" 
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="timeChange(loginTime)"
                type="daterange" range-separator="至"
                    start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="操作类型：">
                <el-select style="width: 200px;" v-model="formInline.businessType" placeholder="请输入操作类型">
                    <el-option label="新增" value="1"></el-option>
                    <el-option label="修改" value="2"></el-option>
                    <el-option label="删除" value="3"></el-option>
                    <el-option label="其他" value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('formInline')"><i class="el-icon-search"></i> 查询
                </el-button>
                <el-button @click="resetForm('formInline')"><i class="el-icon-refresh"></i> 重置</el-button>
            </el-form-item>
        </el-form>
        <el-table 
        v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="tableData" :header-cell-style="{ background: '#F5F5F5', padding: '12px 0px', textAlign: 'center' }">
            <el-table-column type="index" label="序号" align="center">
            </el-table-column>
            <el-table-column prop="operContext" label="日志内容" align="center">
            </el-table-column>
            <el-table-column prop="operId" label="操作人ID" align="center">
            </el-table-column>
            <el-table-column prop="operName" label="操作人名称" align="center">
            </el-table-column>
            <el-table-column prop="operIp" label="IP" align="center">
            </el-table-column>
            <el-table-column prop="responseTime" label="耗时（毫秒）" align="center">
            </el-table-column>
            <el-table-column prop="operatorType" label="操作类别" align="center">
                <template slot-scope="scope">
                    {{ scope.row.operatorType == 1 ? "后台用户" : "异常" }}
                </template>
            </el-table-column>
            <el-table-column prop="businessType" label="操作类型" align="center">
                <template slot-scope="scope">
                    {{ formatEmployment(scope.row.businessType)}}
                </template>
            </el-table-column>
            <el-table-column prop="operTime" label="操作时间" align="center">
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
                :page-sizes="[10, 20, 30, 40,50]"  :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="total" background>
            </el-pagination>
        </div>
    </div>
</template>
<style scoped lang="scss">
.formLog {
    // width:100%;
    text-align: center;
    // padding:40px 70px;


}

.about {
    padding: 35px 35px 105px 35px;
}

.block {
    float: right;
    padding-top: 30px;
}
</style>

<script>
export default {
    data () {
        return {
            loading: true,
            loginTime:'',
            tableData:'',//一共有多少条
            formInline: {
                time:'',
                createTimeBegin: null,
                createTimeEnd: null,
                operName: null,
                businessType:null
            },
            pageNum: 1,//第几页面
            pageSize: 10,//每一个页面有多少条数
            table: '',
            total:'',
        }
    },
    created () {
        this.submitForm()
    },
    methods: {
        formatEmployment (type) {
            const map = {
                1:'新增',
                2: '修改',
                3: '删除',
                4:'其他'
            }
            return map[type]
        },
        //将时间分开成两组
        timeChange (loginTime) {
            this.formInline.createTimeBegin = loginTime[0],
            this.formInline.createTimeEnd = loginTime[1],
            console.log(this.formInline.createTimeBegin);
            console.log(this.formInline.createTimeEnd);
        },
        submitForm (formName) {
            this.axios({
                method: 'post',
                url: '/tg-gateway/tg-admin/monitor/operlog/list',
                data: {
                    current: this.pageNum,
                    size: this.pageSize,
                    operName: this.formInline.operName,
                    loginTimeBegin: this.formInline.loginTimeBegin,
                    loginTimeEnd: this.formInline.loginTimeEnd,
                    businessType: this.formInline.businessType
                },
            }).then((res) => {
                if (res.data.code == 0) {
                    this.loading=false,
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
 
