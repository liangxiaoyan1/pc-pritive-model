<template>
    <div class="about" style="background: rgb(255, 255, 255);">
        <el-card class="box-card">
            <p class="conten-title">筛选查询</p>
            <el-form :inline="true" :model="formInline" class="demo-form-inline search-form">
                <el-form-item label="直播名称" style="width:40% ;" size="medium">
                    <el-input v-model="formInline.liveName" placeholder="请输入直播名称"></el-input>
                </el-form-item>
                <el-form-item label="主播姓名" style="width:40%" size="medium">
                    <el-input v-model="formInline.anchorName" placeholder="请输入主播姓名"></el-input>
                </el-form-item>
                <el-form-item label="直播时间" prop="liveTimeSlot" style="width:40%">
                    <el-date-picker style="width:214px" 
                    prefix-icon="el-icon-time" 
                    v-model="formInline.time"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    @change="timeChange(loginTime)"
                        type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="视频分类" style="width:40%" size="medium">
                    <el-select v-model="formInline.liveTypeName" placeholder="活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="直播状态" style="width:40%" size="medium" prop="liveStatus">
                    <el-select v-model="formInline.liveStatus" placeholder="活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="resetForm('formInline')" round>重置</el-button>
                    <el-button type="primary" @click="submitForm('formInline')" round>查询</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="box-card">
            <p class="conten-title">直播列表&nbsp;&nbsp;</p><span class="item">共查询到&nbsp;<b
                    class="sg">{{total}}</b>&nbsp;&nbsp;&nbsp;直播聚合页访问量(PV/UV)：<b>{{pv}}/{{uv}}</b></span>

            <el-button type="primary" plain round class="el-button-large" @click="handleAdd"><i
                    class="el-icon-plus"></i> 创建直播</el-button>

            <el-table class="table" :data="tableData" style="width: 100%;height: 100%;"
                :header-cell-style="{ backgroundColor: '#F5F5F5', textAlign: 'center', }" default-expand-all="true">
                <el-table-column type="index" label="序号">
                </el-table-column>
                <el-table-column prop="liveName" label="直播名称" width="200">
                </el-table-column>
                <el-table-column prop="anchorName" label="主播姓名" width="100">
                </el-table-column>
                <el-table-column prop="liveTypeName" label="视频分类" width="100">
                </el-table-column>
                <el-table-column prop="liveTimeSlot" label="直播时间" width="120">
                </el-table-column>
                <el-table-column prop="liveStatus" label="直播状态" width="120">
                    <template slot-scope="scope">
                        {{ formatEmployment(scope.row.liveStatus)}}
                    </template>
                </el-table-column>
                <el-table-column prop="pvUvStr" label="观看量(PV/UV)" width="100">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="120">
                </el-table-column>
                <el-table-column fixed="right" label="上架状态" width="100">
                    <template >
                        <el-switch active-text="下架" inactive-text="上架" class="tablescope" v-model="value"
                            active-color="#437df3" inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button type="primary"
                            size="small"  @click="handleEdit(scope.row)">
                            编辑
                        </el-button>
                        <el-button size="small" @click="drop" class="mr-5" type="danger">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="current" :page-sizes="[10, 20, 30, 40,50]" :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper" :total="total" background>
                </el-pagination>
            </div>
            <!-- 编辑信息弹窗 -->
            <el-dialog title="编辑" :visible.sync="dialogFormVisible" width="700px" >
                <el-form :model="form"
               size="mini"
               label-width="100px"
               :rules="rules"
               ref="form"
               class="dialog-form"
               >
               <el-form-item  label="直播名称：" prop="liveName">
                <el-input 
                type="text" 
                placeholder="请输入" 
                v-model="form.liveName"
                 maxlength="15" 
                show-word-limit></el-input>
               </el-form-item>
                <el-form-item label="主播姓名：" prop="anchorName">
                    <el-input type="text" placeholder="请输入" v-model="form.anchorName" maxlength="8" show-word-limit></el-input>
                </el-form-item>
                    <el-form-item label="视频分类："  prop="liveTypeName">
                        <el-select v-model="form.liveTypeName" placeholder="请选择">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="直播分类：" prop="liveStatus">
                        <el-select v-model="form.liveStatus" placeholder="请选择">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="视频封面：" prop="liveTypeName">
                    <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                        <i class="el-icon-upload" style="color:#069ffe;"></i>
                        <div class="el-upload__text">建议上传尺寸为1300*700</div>
                    </el-upload>
                    </el-form-item>
                    <el-form-item label="直播时间：" prop="liveTimeSlot">
                        <el-date-picker prefix-icon="el-icon-time" v-model="form.liveTimeSlot" type="daterange"
                            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="直播地址" prop="liveName">
                        <el-input v-model="form.liveName" placeholder="请输入"></el-input>
                    </el-form-item>

                    <el-form-item label="是否推荐：">

                    <el-radio v-model="radio" label="1">是</el-radio>
                    <el-input v-model="form.liveName" placeholder="请输入权重1-100"></el-input>
                    <el-radio v-model="radio" label="2">否</el-radio>

                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input type="textarea" rows="5" placeholder="请输入" v-model="form.textarea" maxlength="100" show-word-limit>
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
.dialog-form{
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
            total:'',
            radio: '1',
            dialogFormVisible: false,
            tableData: '',//一共有多少条
            formInline: {
                useusernamer: '',
                time: '',
                startTimeStr: null,
                endTimeStr:null,
            },
            uv: '',
            pv:'',
            value: true,
            currPage: 1,//第几页面
            pageSize: 10,//每一个页面有多少条数
            table: '',
            form: {
                liveName: ''
            },
            rules: {
                liveName: [
                    { required: true, message: '请输入主播姓名', trigger: 'blur' },
                ],
                anchorName: [
                    { required: true, message: '请输入视频分类', trigger: 'blur' },
                ],
                liveTypeName: [
                    { required: true, message: '请输入直播分类', trigger: 'blur' },
                ],

            },
        }
       
    },
    created () {
        this.submitForm()
        this.pvuv()
    },
    methods: {
        formatEmployment (type) {
            const map = {
                0: '预告',
                1: '直播中',
                2: '已结束',
                3: '回放'
            }
            return map[type]
        },
        pvuv () {
            this.axios({
                method: 'get',
                url: '/tg-gateway/tg-mvp-live/mvpLive/countPvUv',
               
            }).then((res) => {
                if (res.data.code == 0) {
                    console.log(res);
                    this.pv = res.data.data.pv,
                   this.uv=res.data.data.uv
                } else {
                    this.$message.error(res.data.msg)
                    console.log(ruleForm);
                }
            })

        },
        // 编辑
        handleEdit (row) {
            this.form = row
            this.dialogFormVisible = true
        },
        //将时间分开成两组
        timeChange (loginTime) {
            this.formInline.loginTimeBegin = loginTime[0],
                this.formInline.loginTimeEnd = loginTime[1],
                console.log(this.formInline.loginTimeBegin);
            console.log(this.formInline.loginTimeEnd);
        },
        submitForm (formName) {
            this.axios({
                method: 'post',
                url: '/tg-gateway/tg-mvp-live/mvpLive/list',
                data: {
                    currPage: this.currPage,
                    size: this.pageSize,
                    // startTimeStr: this.formInline.startTimeStr,
                    // endTimeStr:this.formInline.endTimeStr
                    
                },
            }).then((res) => {
                if (res.data.code == 0) {
                    console.log(res);
                    this.tableData = res.data.rows
                    this.total = res.data.total
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
            this.currPage = val
            console.log(`当前页: ${val}`);
            console.log(this.currPage);
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
        // 添加
        handleAdd () {
            this.dialogFormVisible = true
        },

    }
};
</script>
 
