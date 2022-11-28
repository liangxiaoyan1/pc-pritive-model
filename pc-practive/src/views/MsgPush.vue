<template>
    <div class="about" style="background: rgb(255, 255, 255);">
        <el-card class="box-card">
            <p class="conten-title">筛选搜索</p>
            <el-form :inline="true" :model="formInline" class="demo-form-inline search-form">
                <el-form-item label="产品名称/编号"  size="medium" prop="liveName">
                    <el-input v-model="formInline.liveName" placeholder="请输入产品名称/编号"></el-input>
                </el-form-item>
                <el-form-item label="批次号" size="medium" prop="anchorName">
                    <el-input v-model="formInline.anchorName" placeholder="请输入批次号"></el-input>
                </el-form-item>
                <el-form-item label="客户姓名/客户号"  size="medium" prop="anchorName">
                    <el-input v-model="formInline.anchorName" placeholder="请输入客户姓名/客户号"></el-input>
                </el-form-item>
                <el-form-item label="推送方式"  size="medium" prop="liveTypeName">
                    <el-select v-model="formInline.liveTypeName" placeholder="活动区域">
                        <el-option label="不限" value="shanghai"></el-option>
                        <el-option label="短信" value="beijing"></el-option>
                        <el-option label="微信" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="推送状态" size="medium" prop="">
                    <el-select v-model="formInline.region" placeholder="活动区域">
                        <el-option label="不限" value="shanghai"></el-option>
                        <el-option label="成功" value="beijing"></el-option>
                        <el-option label="失败" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="推送时间" prop="liveTimeSlot" >
                    <el-date-picker style="width:214px"  v-model="formInline.time"
                        type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
               
                <el-form-item>
                    <el-button @click="resetForm('formInline')" round>重置</el-button>
                    <el-button type="primary" @click="onSubmit" round>查询</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="box-card">

            <el-button type="primary" plai size="small" @click="handleAdd">批量补发</el-button>
            <br><br>
            <el-table
            v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
            class="table" :data="tableData" style="width: 100%;height: 100%;"
                :header-cell-style="{ backgroundColor: '#F5F5F5', textAlign: 'center', }"
                 default-expand-all="true"
                  @selection-change="handleSelectionChange"
                  tooltip-effect="dark">
            <el-table-column type="selection" width="55" align="center">
            </el-table-column>
                <el-table-column type="index" label="序号" align="center">
                </el-table-column>
                <el-table-column prop="liveName" label="餐品名称" width="200" align="center">
                </el-table-column>
                <el-table-column prop="anchorName" label="产品编号" width="100" align="center">
                </el-table-column>
                <el-table-column prop="liveTypeName" label="批次号" width="100" align="center">
                </el-table-column>
                <el-table-column prop="liveTimeSlot" label="直播时间" width="120" align="center">
                </el-table-column>
                <el-table-column prop="address" label="客户姓名" width="120" align="center">
                </el-table-column>
                <el-table-column prop="pvUvStr" label="客户号" width="150" align="center">
                </el-table-column>
                <el-table-column prop="createTime" label="推送方式" width="120" align="center">
                </el-table-column>
                <el-table-column  label="推送内容" width="100" align="center">
                </el-table-column>
                <el-table-column label="推送状态" width="100" align="center">
                </el-table-column>
                <el-table-column label="推送时间" width="100" align="center">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100" align="center">
                    <template slot-scope="">
                        <el-button type="primary" size="small">
                            补发
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 编辑信息弹窗 -->
            <el-dialog title="编辑" :visible.sync="dialogFormVisible" width="700px">
                <el-form :model="form" size="mini" label-width="100px" :rules="rules" ref="form" class="dialog-form">
                    <el-form-item label="直播名称：" prop="liveName">
                        <el-input type="text" placeholder="请输入" v-model="form.liveName" maxlength="15" show-word-limit>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="主播姓名：" prop="anchorName">
                        <el-input type="text" placeholder="请输入" v-model="form.anchorName" maxlength="8" show-word-limit>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="视频分类：" prop="liveTypeName">
                        <el-select v-model="formInline.liveTypeName" placeholder="请选择">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="直播分类：" prop="liveTypeName">
                        <el-select v-model="formInline.liveTypeName" placeholder="请选择">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="视频封面：" prop="liveTypeName">
                        <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/"
                            multiple>
                            <i class="el-icon-upload" style="color:#069ffe;"></i>
                            <div class="el-upload__text">建议上传尺寸为1300*700</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="直播时间：" prop="liveTimeSlot">
                        <el-date-picker prefix-icon="el-icon-time" v-model="formInline.liveTimeSlot" type="daterange"
                            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="直播地址" prop="liveName">
                        <el-input v-model="formInline.liveName" placeholder="请输入"></el-input>
                    </el-form-item>

                    <el-form-item label="是否推荐：">

                        <el-radio v-model="radio" label="1">是</el-radio>
                        <el-input v-model="formInline.liveName" placeholder="请输入权重1-100"></el-input>
                        <el-radio v-model="radio" label="2">否</el-radio>

                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input type="textarea" rows="5" placeholder="请输入" v-model="textarea" maxlength="100"
                            show-word-limit>
                        </el-input>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="onSubmit('userForm')">保存</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>

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
            multipleSelection: [],
            radio: '1',
            dialogFormVisible: false,
            tableData: '',//一共有多少条
            formInline: {
                useusernamer: '',
                time: ''
            },
            value: true,
            table: '',
            formInline: {
                user: '',
                region: ''
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
    methods: {
        handleSelectionChange (val) {
            this.multipleSelection = val;
        },
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = false,
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
 
