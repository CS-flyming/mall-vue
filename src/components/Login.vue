<template>
<!-- 登陆页面 -->
  <div>
    <Row class="container">
      <i-col span="13" offset="2" class="login-img-box">
        <img src="static/img/sale.jpg" alt="">
      </i-col>
      <i-col span="7" class="login-box">
        <div class="login-container">
          <div class="login-header">
            <p>欢迎登陆</p>
          </div>
          <div class="form-box">
            <Form ref="formInline" :model="formDate" :rules="ruleInline">
              <FormItem prop="userName">
                  <i-input type="text" v-model="formDate.userName" clearable size="large" placeholder="用户名">
                      <Icon type="person" slot="prepend"></Icon>
                  </i-input>
              </FormItem>
              <FormItem prop="password">
                  <i-input type="password" v-model="formDate.password" clearable size="large" placeholder="密码">
                      <Icon type="ios-locked-outline" slot="prepend"> </Icon>
                  </i-input>
              </FormItem>
              <FormItem>
                  <Button type="error" size="large" @click="handleSubmit('formInline')" long>登陆</Button>
              </FormItem>
          </Form>
          </div>
        </div>
      </i-col>
    </Row>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/footer/Footer";
import { login } from "@/actions/index";
import Cookies from "js-cookie";
export default {
  name: "Login",
  data() {
    return {
      formDate: {
        userName: "",
        password: ""
      },
      ruleInline: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            type: "string",
            min: 6,
            message: "密码不能少于6位",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      const father = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          login(father.formDate).then(res => {
            Cookies.set("user", JSON.stringify(res.data));
            Cookies.set("token", res.data.token);
            this.$Message.success("登陆成功");
            window.location.href = window.decodeURIComponent(
              window.atob(this.$route.query.url)
            );
          });
        } else {
          this.$Message.error("请填写正确的用户名或密码");
        }
      });
    }
  },
  components: {
    Footer
  }
};
</script>

<style scoped>
.container {
  margin-top: 30px;
  height: 485px;
  background-color: #fff;
}
.login-img-box {
  height: 485px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-img-box > img {
  width: 68%;
}
.login-box {
  height: 485px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-container {
  width: 80%;
  height: 280px;
  border: #ed3f14 solid 1px;
}
.login-header {
  height: 50px;
  font-size: 20px;
  text-align: center;
  line-height: 50px;
  letter-spacing: 5px;
  color: #fff;
  background-color: #ed3f14;
}
.form-box {
  width: 80%;
  margin: 30px auto;
}
</style>
