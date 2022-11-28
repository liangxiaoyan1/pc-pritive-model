<template>
    <div class="about" style="background: rgb(255, 255, 255);">
        <el-card class="box-card">
            <p class="conten-title">筛选搜索</p>
            <hr>
            <el-form :inline="true" :model="formInline" class="demo-form-inline search-form">
                <el-form-item label="签约日期" prop="liveTimeSlot" style="width:40%">
                    <el-date-picker style="width:214px"  v-model="formInline.time" type="daterange"
                        range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="产品名称/编号" style="width:40% ;" size="medium">
                    <el-input v-model="formInline.product" placeholder="请输入产品名称/编号"></el-input>
                </el-form-item>
                <el-form-item label="客户姓名/资金账号" style="width:40%" size="medium">
                    <el-input v-model="formInline.client" placeholder="请输入客户姓名/资金账号"></el-input>
                </el-form-item>
                <el-form-item label="客户手机号" prop="liveTimeSlot" style="width:40%">
                <el-input v-model="formInline.clientMobile" placeholder="请输入客户手机号"></el-input>
                </el-form-item>
                <el-form-item label="收费模式" style="width:40%" size="medium" prop="chargeMode">
                    <el-select v-model="formInline.chargeMode" placeholder="活动区域">
                        <el-option label="不限" ></el-option>
                        <el-option label="现金订阅" value="1"></el-option>
                        <el-option label="赢亨利" value="3"></el-option>
                        <el-option label="服务佣金" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="订单类型" style="width:40%" size="medium" prop="orderType">
                    <el-select v-model="formInline.orderType" placeholder="活动区域">
                        <el-option label="不限"></el-option>
                        <el-option label="签约" value="1"></el-option>
                        <el-option label="解约" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="合同状态" style="width:40%" size="medium" prop="contractStatus">
                    <el-select v-model="formInline.contractStatus" placeholder="活动区域">
                        <el-option label="不限"></el-option>
                        <el-option label="正常" value="1"></el-option>
                        <el-option label="到期" value="2"></el-option>
                        <el-option label="已解约" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="resetForm('formInline')" round>重置</el-button>
                    <el-button type="primary" @click="submitForm('formInline')" round>查询</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="box-card">
           
            <el-table
            v-loading="loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            class="table" :data="tableData" style="width: 100%;height: 100%;"
            :row-style="{height: '0'}"
            :cell-style="{padding: '0'}"
            :header-cell-style="{ backgroundColor: '#F5F5F5', textAlign: 'center', }" default-expand-all="true">
                <el-table-column type="index" label="序号" align="center">
                </el-table-column>
                <el-table-column prop="entrustDate" label="签约日期" width="200" align="center">
                </el-table-column>
                <el-table-column prop="clientName" label="客户姓名" width="100" align="center">
                </el-table-column>
                <el-table-column prop="fundAccount" label="资金账号" width="100" align="center">
                </el-table-column>
                <el-table-column prop="mobile" label="手机号" width="120" align="center">
                </el-table-column>
                <el-table-column prop="prodName" label="签约产品" width="120" align="center">
                </el-table-column>
                <el-table-column prop="orderType" label="订单类型" width="150" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.orderType == 1 ? "签约" : "解约" }}
                    </template>
                </el-table-column>
                <el-table-column prop="chargeMode" label="收费模式" width="120" align="center">
                    <template slot-scope="scope">
                        {{ formatEmployment(scope.row.chargeMode)}}
                    </template>
                </el-table-column>
                <el-table-column  prop="createTime" label="签约时点风险等级" width="150" align="center">
                </el-table-column>
                <el-table-column   prop="occurBalance"  label="支付金额" width="100" align="center">
                </el-table-column>
                <el-table-column  prop="allotNo"  label="订单编号" width="100" align="center">
                </el-table-column>
                <el-table-column  prop="beginDate"  label="生效日期" width="100" align="center">
                </el-table-column>
                <el-table-column  prop="endDate"  label="截止日期" width="100" align="center">
                </el-table-column>
                <el-table-column  prop="createTime"  label="解约日期" width="100" align="center">
                </el-table-column>
                <el-table-column  prop="createTime"  label="合同状态" width="100" align="center">
                </el-table-column>
                <el-table-column  prop="createTime" label="合同明细" width="100" align="center">
                </el-table-column>
                <el-table-column  prop="createTime"  label="客户联系人" width="100" align="center">
                </el-table-column>
                <el-table-column  prop="createTime"  label="联系人编号" width="100" align="center">
                </el-table-column>
                <el-table-column  prop="createTime"  label="客户所属营业部" width="150" align="center">
                </el-table-column>
                
            </el-table>
            <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="current" :page-sizes="[2, 5, 10, 20]" :page-size="size"
                    layout="total, sizes, prev, pager, next, jumper" :total="total" background>
                </el-pagination>
            </div>

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

:deep .el-table__body-wrapper::-webkit-scrollbar {
    //    display: none;
    width: 8px !important;
    height: 8px !important;
}

:deep .el-table__body-wrapper::-webkit-scrollbar-thumb {
    background: #c2c2c2 !important;
    border-radius: 4px !important;
}

:deep .el-table__body-wrapper::-webkit-scrollbar-track {
    background: #ffffff !important;

}

:deep .el-table__fixed-right {
    height: 100% !important; //设置高优先，以覆盖内联样式
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

::v-deep .el-switch__core {
    width: 50px !important;
    height: 20px;
    border-radius: 10px;
    border: none;
}

::v-deep .el-switch__core::after {
    width: 15px;
    height: 15px;
    top: 2px;
}

::v-deep .el-switch.is-checked .el-switch__core::after {
    margin-left: -21px;
}

/*关闭时文字位置设置*/
::v-deep .el-switch__label--right {
    position: absolute;
    z-index: 1;
    right: 6px;
    margin-left: 0px;
    color: rgba(255, 255, 255, 0.9019607843137255);

    span {
        font-size: 12px;
    }
}

/* 激活时另一个文字消失 */
::v-deep .el-switch__label.is-active {
    display: none;
}

/*开启时文字位置设置*/
::v-deep .el-switch__label--left {
    position: absolute;
    z-index: 1;
    left: 5px;
    margin-right: 0px;
    color: rgba(255, 255, 255, 0.9019607843137255);

    span {
        font-size: 12px;
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
            tableData: '',//一共有多少条
            formInline: {
                useusernamer: '',
                time: ''
            },
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
        formatEmployment (type) {
            const map = {
                1: '固定收费',
                2: '服务佣金',
                3: '赢亨利',
            }
            return map[type]
        },
        submitForm (formName) {
            this.axios({
                method: 'post',
                url: '/tg-gateway/tg-admin/order/list',
                data: {
                    current: this.current,
                    size: this.pageSize,
                    contractStatus: this.formInline.contractStatus,
                    orderType: this.formInline.orderType,
                    chargeMode: this.formInline.chargeMode,
                    product: this.formInline.product,
                    client: this.formInline.client,
                    clientMobile: this.formInline.anchorName
                   
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
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange (val) {
            console.log(`当前页: ${val}`);
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
        // 添加
        handleAdd () {
            this.dialogFormVisible = true
        },

    }
};
</script>
 
