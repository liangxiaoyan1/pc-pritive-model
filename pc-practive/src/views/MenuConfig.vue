<template>
    <div class="about" style="background: rgb(255, 255, 255);">
    <el-button type="primary"  @click="drawer = true" ><i class="el-icon-circle-plus-outline"></i>  新增</el-button>
        <el-table   :data="tableData" label="rtl" style="width: 100%;margin-bottom: 20px;" row-key="id"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
            <el-table-column prop="menuName" label="菜单名称" width="180" >
            </el-table-column>
            <el-table-column prop="url" label="路径"  width="180">
            </el-table-column>
            <el-table-column prop="orderNum" label="排序">
            </el-table-column>
            <el-table-column prop="" label="操作">
                <template slot-scope="">
                    <el-button  @click="drawer = true" label="rtl" type="primary" size="mini" class="mr-5">编辑
                    </el-button>
                    <el-button  @click="drawer = true" label="rtl" type="primary"  size="mini"  class="mr-5">详情
                    </el-button>
                    <el-button  size="mini" @click="drop" class="mr-5">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-drawer title="我是标题" :visible.sync="drawer" :direction="direction" size="50%">
            <el-card class="box-card" style="width:90%; margin: 20px;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="菜单类型：" prop="menu">
                    <el-radio-group v-model="ruleForm.menu">
                        <el-radio label="一级菜单"></el-radio>
                        <el-radio label="子菜单"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="菜品名称：" prop="menuName">
                    <el-input v-model="ruleForm.menuName"  placeholder="请输入菜品名称"></el-input>
                </el-form-item>
                <el-form-item label="菜品路径：" prop="url">
                    <el-input v-model="ruleForm.url" placeholder="请输入菜品路径"></el-input>
                </el-form-item>
                <el-form-item label="排序：" prop="orderNum">
                    <el-input v-model="ruleForm.orderNum" placeholder="请输入排序"></el-input>
                </el-form-item>     
            <el-form-item label="打开方式：" prop="type">
                <el-radio-group v-model="ruleForm.type">
                    <el-radio label="页签"></el-radio>
                    <el-radio label="新窗口"></el-radio>
                </el-radio-group>
            </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="cancelForm">关闭</el-button>
                </el-form-item>
            </el-form>
            </el-card>
        </el-drawer>
    </div>
</template>
<style scoped lang="scss">


.about {
    padding: 35px 35px 105px 35px;
   
}

.block {
    float: right;
    padding-top: 30px;
}
 .demo-table-expand {
     font-size: 0;
 }

 .demo-table-expand label {
     width: 90px;
     color: #99a9bf;
 }

 .demo-table-expand .el-form-item {
     margin-right: 0;
     margin-bottom: 0;
     width: 50%;
 }
</style>

<script>
export default {
    data () {
        
        return {
            drawer: false,
            direction: 'rtl',
            tableData:'',
            //     id: 1,
            //     menuName: '系统管理',
            //     url: '',
            //     orderNum: '0',
            //     children: [{
            //         id: 31,
            //         menuName: '系统管理',
            //         url: '',
            //         orderNum: '0',
            //     }, {
            //         id: 32,
            //         menuName: '系统管理',
            //         url: '',
            //         orderNum: '0',
            //     }]

            // }, {
            //     id: 2,
            //     menuName: '系统管理',
            //     url: '',
            //     orderNum: '0',
            //     children: [{
            //         id: 33,
            //         menuName: '系统管理',
            //         url: '',
            //         orderNum: '0',
            //     }, {
            //         id: 34,
            //         menuName: '系统管理',
            //         url: '',
            //         orderNum: '0',
            //     }]
            // }, {
            //     id: 3,
            //     menuName: '系统管理',
            //     url: '',
            //     orderNum: '0',
            //     children: [{
            //         id: 35,
            //         menuName: '系统管理',
            //         url: '',
            //         orderNum: '0',
                    
            //     }, {
            //         id: 36,
            //         menuName: '系统管理',
            //         url: '',
            //         orderNum: '0',
            //     }]
            // }, {
            //     id: 4,
            //     menuName: '系统管理',
            //     url: '',
            //     orderNum: '0',
            //     children: [{
            //         id: 37,
            //         menuName: '系统管理',
            //         url: '',
            //         orderNum: '0',
            //     }, {
            //         id: 38,
            //         menuName: '系统管理',
            //         url: '',
            //         orderNum: '0',
            //     }]
            // }],
            formInline: {
                useusernamer: '',
                time: ''
            },
            current: 1,//第几页面
            pageSize: 5,//每一个页面有多少条数
            table: '',
            ruleForm: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            rules: {
                menuName: [
                    { required: true, message: '请输入菜单名称', trigger: 'blur' },
                    
                ],
                orderNum: [
                    { required: true, message: '请输入排序', trigger: 'blur' },
                  
                ],
              
            }
        }
    },
    created () {
        this.submitForm()
    },
    methods: {
        submitForm (data) {
            this.axios({
                method: 'post',
                url: '/tg-gateway/tg-admin/system/menu/listAllByTree',
                data
            }).then((res) => {
                console.log(res);
                // if (res.data.code == 0) {
                //     console.log(res);
                //     // this.tableData = res.data.data
                // } else {
                //     this.$message.error(res.data.msg)
                   
                // }
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
        cancelForm () {
            this.drawer = false;
            
        }
            
        
    }
};
</script>
 
