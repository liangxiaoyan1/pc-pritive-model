<template>
    <div class="home">
        <div class="login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <img src="../assets/img/logo1.2bee7fa7.png" alt="">
                <h2>国海投顾系统</h2>
                <el-form-item prop="id" class="input">
                    <el-input v-model="ruleForm.username" placeholder="请输入账号" clearable></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="请输入密码" v-model="ruleForm.password" clearable></el-input>
                </el-form-item>
                <el-form-item prop="code" class="code">
                    <el-input class="code2" v-model="ruleForm.code" placeholder="请输入图形验证码" clearable></el-input>
                </el-form-item>
                <el-form-item class="confirmCode">
                    <div></div>
                </el-form-item>
                <el-button class="loginBtn" type="primary" @click="$router.push('/loginLog')">登录</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src


export default {
    name: "login",
    components: {

    },
    data () {
        return {
            ruleForm: {
                username: '',
                password: '',
                code: '',
                uuid: '',
                rememberMe: false,
            },

            rules: {
                id: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                ],

            },

        }


    },
    methods: {
        // login (ruleForm) {
        //     this.$refs[ruleForm].validate((valid) => {
        //         if (valid) {
        //             this.request.post('/tg-gateway/tg-admin/login',
        //                 this.ruleForm
        //             ).then((res) => {
        //                 if (res.code === '0') {
        //                     this.$message.success('成功！')
        //                     this.$router.push('/')
        //                 } else {
        //                     this.$message.error('失败！')
        //                 }
        //             })
        //         }
        //     })
        // }
    }
}

</script>
<style scoped lang="scss">
* {
    margin: 0;
    padding: 0;
}

.home {
    background-image: url(../assets/img/bg.90f3332f.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    font-family: Verdana, Arial, Helvetica, sans-serif;
    font-weight: 700;
    padding-right: 10%;
    height: 100vh;

    .login {
        width: 300px;

        background-color: #fff;
        float: right;
        margin: 200px auto;
        border-radius: 20px;
        padding: 50px;

        img {
            width: 100px;
            height: 25px;

        }

        .input {
            margin-top: 15px;
        }

        .loginBtn {

            width: 100%;
        }

        .code {
            display: inline-block;
            width: 190px;
            border-top-right-radius: 0px !important;
            border-bottom-right-radius: 0px;

        }

        .confirmCode {
            box-sizing: border-box;
            display: inline-block;
            float: right;
            width: 110px;
            height: 40px;
            background: rgb(209, 209, 209);
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            border: solid 1px rgb(197, 196, 196);

        }

    }

}
</style>
