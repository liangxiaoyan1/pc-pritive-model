<template>
    <div class="home">
        <div class="login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <img src="../assets/img/logo1.2bee7fa7.png" alt="">
                <h2>国海投顾系统</h2>
                <el-form-item prop="username" class="input">
                    <el-input v-model="ruleForm.username" placeholder="请输入账号" clearable></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" clearable></el-input>
                </el-form-item>
                <el-form-item prop="code" class="code">
                    <el-input class="code2" v-model="ruleForm.code" placeholder="请输入图形验证码" clearable></el-input>
                </el-form-item>
                <el-form-item class="confirmCode">
                    <img :src="codeImg" class="codeImg" @click="oNcodeImg()" />
                </el-form-item>
                <el-button class="loginBtn" type="primary" @click="login(ruleForm)">登录</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie' //引用
export default {
    name: "login",
    components: {

    },
    data () {
        return {
            codeImg:'',
            ruleForm: {
                username: '',
                password: '',
                code: '',
                uuid: '',
                rememberMe: false,
            },
            rules: {
                username: [
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
    mounted () {
        this.oNcodeImg();
    },
    methods: {
       
        // 获取后台的img
     oNcodeImg () {
            this.axios.request({
                method: 'get',
                url: 'tg-gateway/tg-admin/captchaImage',
            }).then((res) => {
              
                this.codeImg = "data:image/gif;base64," + res.data.data.img;
                this.ruleForm.uuid = res.data.data.uuid
            });
        },

        // rundom () {
        //     //随机生成函数
        //     this.request
        //         .get('http://tglmcs.ghzq.com.cn:9501/tg-gateway/tg-admin/captchaImage').then((res => {
        //             this.uuid=res.data.uuid
        //         }))
        // }
        login (ruleForm) {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.axios({
                        method: 'post',
                        url: '/tg-gateway/tg-admin/login',
                        data: {
                            username:this.ruleForm.username,
                            password: this.ruleForm.password,
                            code: this.ruleForm.code,
                            uuid: this.ruleForm.uuid,
                            rememberMe:this.ruleForm.rememberMe
                        },
                    }).then((res) =>
                    {
                        if (res.data.code ==0) {
                            this.$message.success(res.data.msg)
                            localStorage.setItem('Authorization', res.data.data.Authorization);
                            this.$router.push('/loginLog')
                            // 将用户token保存到vuex中
                            // 存入cookie：
                            Cookies.set('token', res.data.data.Authorization)
                            Cookies.set('name', this.ruleForm.username)
                          
                        } else {
                            this.$message.error(res.data.msg)
                          
                        }
                    })
                    
                }
            })
        }
    },
   
};





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
            background:#f5f7fa;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            text-align: center;
            padding-top: 5px;
        .codeImg{
            width: 70px;
            height: 30px;
        }
        }

    }

}
</style>
