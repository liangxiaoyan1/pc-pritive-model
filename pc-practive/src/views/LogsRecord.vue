<template>
    <div class="about" style="background: rgb(255, 255, 255);">
        <el-form :inline="true" :model="formInline" class="demo-form-inline formLog" ref="formInline">
            <el-form-item  label="操作人名称：" prop="username">
                <el-input style="width: 200px;" v-model="formInline.username" placeholder="请输入操作人名称"></el-input>
            </el-form-item>
            <el-form-item label="操作时间：" prop="time">
                <el-date-picker style="width: 200px;" v-model="formInline.time" type="daterange" range-separator="至"
                    start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="操作类型：">
                <el-select style="width: 200px;" v-model="formInline.region" placeholder="请输入操作类型">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('formInline')"><i class="el-icon-search"></i> 提交
                </el-button>
                <el-button @click="resetForm('formInline')"><i class="el-icon-refresh"></i> 重置</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" :header-cell-style="{ background: '#F5F5F5', padding: '12px 0px'}">
            <el-table-column type="index" label="序号">
            </el-table-column>
            <el-table-column prop="operContext" label="日志内容">
            </el-table-column>
            <el-table-column prop="operId" label="操作人ID">
            </el-table-column>
            <el-table-column prop="operName" label="操作人名称">
            </el-table-column>
            <el-table-column prop="operIp" label="IP">
            </el-table-column>
            <el-table-column prop="responseTime" label="耗时（毫秒）">
            </el-table-column>
            <el-table-column prop="operatorType" label="操作类别">
            </el-table-column>
            <el-table-column prop="os" label="操作类型">
            </el-table-column>
            <el-table-column prop="operTime" label="操作时间">
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="current"
                :page-sizes="[2, 5, 10, 20]" :page-size="size" layout="total, sizes, prev, pager, next, jumper"
                :total="tableData.length" background>
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
        const item = {
            operContext: '分配人员',
            operId: '14105',
            operName: 'admin',
            operIp: '58.60.191.88',
            responseTime: 21,
            os: '',
            operatorType: '后台用户',
            operTime: '2022-11-16 14:16:18',

        };
        return {
            tableData: Array(5).fill(item),//一共有多少条
            formInline: {
                useusernamer: '',
                time: ''
            },
            current: 1,//第几页面
            pageSize: 5,//每一个页面有多少条数
            table:'',
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
 
