<template>
    <div class="about" style="background: rgb(255, 255, 255);">
        <el-card class="box-card">
            <p class="conten-title">筛选查询</p>
            <el-form :inline="true" :model="formInline" class="demo-form-inline search-form">
                <el-form-item label="客户姓名/资金账号" style="width:40% ;" size="medium">
                    <el-input v-model="formInline.liveName" placeholder="请输入客户姓名/资金账号"></el-input>
                </el-form-item>
                <el-form-item label="客户手机号" style="width:40%" size="medium">
                    <el-input v-model="formInline.anchorName" placeholder="请输入客户手机号"></el-input>
                </el-form-item>
                <el-form-item label="营业部服务投顾" prop="liveTimeSlot" style="width:40%">
                    <el-input v-model="formInline.anchorName" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="总部服务投顾" prop="liveTimeSlot" style="width:40%">
                    <el-input v-model="formInline.anchorName" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="产品名称/编号" prop="liveTimeSlot" style="width:40%">
                    <el-input v-model="formInline.anchorName" placeholder="请输入产品名称/编号"></el-input>
                </el-form-item>
                <el-form-item label="分配状态" style="width:40%" size="medium">
                    <el-select v-model="formInline.assignStatus" placeholder="活动区域">
                        <el-option label="已分配" value="1"></el-option>
                        <el-option label="不限" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="服务状态" style="width:40%" size="medium">
                    <el-select v-model="formInline.serveStatus" placeholder="活动区域">
                        <el-option label="不限" ></el-option>
                        <el-option label="正常" value="1"></el-option>
                        <el-option label="过期" value="-1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核状态" style="width:40%" size="medium">
                    <el-select v-model="formInline.auditStatus" placeholder="活动区域">
                        <el-option label="不限" ></el-option>
                        <el-option label="审核驳回" value="-1"></el-option>
                        <el-option label="审核通过" value="1"></el-option>
                        <el-option label="待审核" value="0"></el-option>

                    </el-select>
                </el-form-item>
                <el-form-item label="签约时间" prop="time">
                    <el-date-picker style="width: 200px;"  prefix-icon="el-icon-time" v-model="formInline.time" type="daterange" range-separator="至"
                        start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button @click="resetForm('formInline')" round>重置</el-button>
                    <el-button type="primary" @click="submitForm('formInline')" round>查询</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="box-card">
            <p class="conten-title">咨询列表&nbsp;&nbsp;</p><span class="item">共查询到<span
                    class="sg">{{ total }}</span>数据</span>
            <el-table 
            v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
            class="table" :data="tableData" style="width: 100%;height: 100%;"
                :header-cell-style="{ backgroundColor: '#F5F5F5', textAlign: 'center', }" default-expand-all="true">
                <el-table-column type="index" label="序号" align="center">
                </el-table-column>
                <el-table-column prop="entrustDate" label="签约时间" width="200" align="center">
                </el-table-column>
                <el-table-column prop="clientName" label="客户姓名" width="100" align="center">
                </el-table-column>
                <el-table-column prop="clientId" label="资金账号" width="100" align="center">
                </el-table-column>
                <el-table-column prop="mobile" label="手机号" width="120" align="center">
                </el-table-column>
                <el-table-column prop="prodName" label="签约产品" width="180" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.prodName }}/{{ scope.row.prodCode }}
                    </template>
                </el-table-column>
                <el-table-column prop="adviserName" label="营业部服务投顾" width="150" align="center">
                </el-table-column>
                <el-table-column prop="adviserDeptName" label="所属营业部" width="100" align="center">
                </el-table-column>
                <el-table-column prop="hqAdviserName" label="总部服务投顾" width="100" align="center">
                </el-table-column>
                <el-table-column prop="hqAdviserDeptName" label="所属营业部" width="120" align="center">
                </el-table-column>
                <el-table-column prop="assignStatus" label="分配状态" width="100" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.assignStatus == 0 ? "未分配" : "分配" }}
                    </template>
                </el-table-column>
                <el-table-column prop="beginDate" label="生效日期" width="120" align="center">
                </el-table-column>
                <el-table-column prop="endDate" label="截止日期" width="120" align="center">
                </el-table-column>
                <el-table-column prop="serveStatus" label="服务状态" width="100" align="center">
                    <template slot-scope="scope">
                    {{ scope.row.serveStatus == 1 ? "正常" : "过期" }}
                    </template>
                </el-table-column>
                <el-table-column prop="auditStatus" label="审核状态" width="100" align="center">
                    <template slot-scope="scope">
                    {{ formatEmploymentaudit(scope.row.auditStatus)}}
                </template>
                </el-table-column>
                <el-table-column prop="auditTime" label="审核日期" width="160" align="center">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="handleEdit(scope.row)">
                            编辑
                        </el-button>
                        <el-button size="small" @click="drop" class="mr-5" type="text">分配
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="current"
                    :page-sizes="[10, 20, 30, 40,50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                    :total="total" background>
                </el-pagination>
            </div>
            <!-- 编辑信息弹窗 -->
            <el-dialog title="服务分配" :visible.sync="dialogFormVisible" width="700px">
                <el-form :model="form" size="mini" label-width="100px" :rules="rules" ref="form" class="dialog-form">
                <el-descriptions title="客户信息" colon="false" :column="2" >
                    <el-descriptions-item label="姓名">{{ form.clientName }}</el-descriptions-item>
                    <el-descriptions-item label="资金账号">{{ form.clientId }}</el-descriptions-item>
                    <el-descriptions-item label="手机号">{{form.mobile}}</el-descriptions-item>
                    <el-descriptions-item label="签约产品">{{form.prodName}}/{{form.prodCode}}</el-descriptions-item>
                <el-descriptions-item label="签约日期">{{ form.entrustDate }}</el-descriptions-item>
                <el-descriptions-item label="服务周期">{{ form.beginDate }}至{{ form.endDate }}</el-descriptions-item>
                </el-descriptions>
               
                    <el-form-item label="营业部服务投顾" prop="adviserName" >
                        <el-input type="text" placeholder="请输入姓名" v-model="form.adviserName" style="width:250px">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="总部服务投顾" prop="hqAdviserName">
                        <el-input type="text" placeholder="请输入姓名" v-model="form.hqAdviserName" style="width:250px">
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="resetForm('form')">取消</el-button>
                    <el-button type="primary" @click="onSubmit('userForm')">提交审核</el-button>
                    

                </div>
            </el-dialog>

        </el-card>

    </div>
</template>
<style scoped lang="scss">
.dialog-form {
    // margin-right: 140px;
    padding-right: 100px;
}

.about {
    padding: 10px;
}

.block {
    float: right;
    padding-top: 30px;
}

.box-card {
    margin: 0px 0px 20px;
    padding: 10px 20px;

}

.search-form {
    text-align: start;
    padding: 0 20px;
}

.el-button-large {
    float: right;
}

.conten-title {
    margin-bottom: 20px;
    font-weight: 400;
    font-size: 20px;
    text-align: start;
    display: inline-block;
}

.item {
    color: #969799;
    font-size: 14px;

    .sg {
        color: red;

    }

    b {
        color: #000000;
    }
}

</style>
<script>
export default {
    data () {
       
        return {
            loading: true,
            total:'',
            radio: '1',
            dialogFormVisible: false,
            tableData: '',//数据
            value: true,
            current: 1,//第几页面
            pageSize: 10,//每一个页面有多少条数
            table: '',
            formInline: {
              
            },
            form: {
                liveName: ''
            },
            rules: {
                liveName: [
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                anchorName: [
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                liveTypeName: [
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                liveTimeSlot: [
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                liveName: [
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
            }
        }

    },
    created () {
        this.submitForm()
    },
    methods: {
        //审核状态
        formatEmploymentaudit (type) {
            const map = {
                0: '待审核',
                1: '审核通过',
                '-1': '审核驳回',
            }
            return map[type]
        },
       
        submitForm (formName) {
            this.axios({
                method: 'post',
                url: '/tg-gateway/tg-admin/orderAssign/listByAuth',
                data: {
                    current: this.current,
                    size: this.pageSize,
                    assignStatus: this.formInline.assignStatus,
                    auditStatus: this.formInline.auditStatus,
                    client: this.formInline.client,
                    clientMobile: this.formInline.clientMobile,
                    product: this.formInline.product,
                    serveStatus: this.formInline.serveStatus
                },
            }).then((res) => {
                if (res.data.code == 0) {
                    this.loading = false,
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
            this.current = val
            console.log(`当前页: ${val}`);
            this.submitForm()
        },
        drop () {
            this.$alert('是否确定删除该数据!', '提示~', {
                confirmButtonText: '确定',
                callback: action => {
                    this.$message({
                        type: 'info',
                        message: `action: ${action}`
                    });
                }
            });
        },
        // 编辑
        handleEdit (row) {
            this.form = row
            this.dialogFormVisible = true
        },

    }
};
</script>
 
