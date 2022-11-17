<template>
    <div class="about" style="background: rgb(255, 255, 255);">
        <el-card class="box-card">
           <h1>筛选查询</h1>
        </el-card>
        <el-card class="box-card">
        <span>hello</span>
        </el-card>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="current"
                :page-sizes="[2, 5, 10, 20]" :page-size="size" layout="total, sizes, prev, pager, next, jumper"
                :total="tableData.length" background>
            </el-pagination>
        </div>
    </div>
</template>
<style>
.about {
    padding: 25px 15px 105px 15px;

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
            table: '',
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
 
