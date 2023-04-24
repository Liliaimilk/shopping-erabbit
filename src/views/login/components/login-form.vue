<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="isMsgLogin = false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="isMsgLogin = true" href="javascript:;" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <Form
      ref="formCom"
      class="form"
      :validation-schema="mySchema"
      autocomplete="off"
      v-slot="{ errors }"
    >
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              type="text"
              name="account"
              v-model="form.account"
              placeholder="请输入用户名或手机号"
              maxlength="20"
            />
          </div>
          <div class="error" v-if="errors.account">
            <i class="iconfont icon-warning" />
            {{ errors.account }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <Field
              type="password"
              name="password"
              v-model="form.password"
              placeholder="请输入密码"
            />
          </div>
          <div class="error" v-if="errors.password">
            <i class="iconfont icon-warning" />{{ errors.password }}
          </div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              type="text"
              name="mobile"
              v-model="form.mobile"
              placeholder="请输入手机号"
            />
          </div>
          <div class="error" v-if="errors.mobile">
            <i class="iconfont icon-warning" />{{ errors.mobile }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <Field
              type="password"
              name="code"
              v-model="form.code"
              placeholder="请输入验证码"
            />
            <span class="code" @click="send()" :class="{ disabled: timer }">{{
              timer ? `${timer}s` : "发送验证码"
            }}</span>
          </div>
          <div class="error" v-if="errors.code">
            <i class="iconfont icon-warning" />{{ errors.code }}
          </div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <!-- <XtxCheckbox v-model="form.isAgree" /> -->
          <Field as="XtxCheckbox" name="isAgree" v-model="form.isAgree" />
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
      </div>
      <a href="javascript:;" class="btn" @click="login">登录</a>
    </Form>
    <!-- <From></From> -->
    <div class="action">
      <!-- <img
        src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
        alt=""
      /> -->
      <span id="qqLoginBtn"></span>
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>
<script>
import QC from "qc";
import { Form, Field } from "vee-validate";
import { userMobileLoginMsg } from "@/api/user.js";
// import { userAccountLogin } from "@/api/user.js";
import { useStore } from "vuex";
import schema from "@/vender/validateMobile";
import { reactive, ref, watch, getCurrentInstance, onMounted } from "vue";
export default {
  name: "LoginForm",
  components: {
    Form,
    Field,
  },
  setup() {
    const store = useStore();
    const { proxy } = getCurrentInstance();
    const formCom = ref(null);
    // 是否短信登录
    const isMsgLogin = ref(false);
    // 计时器验证码
    const timer = ref(null);
    // 表单信息对象
    const form = reactive({
      isAgree: true,
      account: null,
      password: null,
      mobile: null,
      code: null,
    });
    // 校验规则对象
    const mySchema = {
      account: schema.account,
      password: schema.password,
      mobile: schema.mobile,
      code: schema.code,
      isAgree: schema.isAgree,
    };
    // 监听切换登录和清除原数据
    watch(isMsgLogin, () => {
      // 还原数据
      form.isAgree = true;
      form.account = null;
      form.password = null;
      form.mobile = null;
      form.code = null;
      // 补充校验效果清除，Form组件提供resetForm()
      formCom.value.resetForm();
    });
    onMounted(() => {
      // 组件渲染完毕，使用QC生成QQ登录按钮
      QC.Login({
        btnId: "qqLoginBtn",
      });
    });

    // 登录
    const login = async () => {
      formCom.value.validate();
      // console.log(valid, "138");
      // 调用vuex方法 获取登录信息并本地缓存
      // 用户验证
      store.commit("user/setIsMsgLogin", isMsgLogin.value);
      if (!isMsgLogin.value) {
        store.dispatch("user/login", {
          account: form.account,
          password: form.password,
        });
      } else {
        // 短信验证
        store.dispatch("user/login", {
          mobile: form.mobile,
          code: form.code,
        });
      }
    };

    // 验证码发送
    const send = () => {
      const valid = mySchema.mobile(form.mobile);
      // console.log(valid);
      // 判断
      if (valid === true) {
        userMobileLoginMsg(form.mobile).then(() => {
          proxy.$message({ type: "success", text: "发送成功" });
        });
        timer.value = 30;
        const codeVlidate = setInterval(() => {
          timer.value -= 1;
          if (!timer.value) {
            clearInterval(codeVlidate);
          }
        }, 1000);
      } else {
        formCom.value.setFieldError("mobile", valid);
      }
    };
    return { isMsgLogin, form, mySchema, login, formCom, send, timer };
  },
};
</script>
<style lang="less" scoped>
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>