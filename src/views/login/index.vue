<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import Site from "./Site.vue";
import { FormInstance } from "element-plus";
import { useUserStore } from "@/store/modules/user";
import { LoginData } from "@/api/auth";
import { TOKEN_KEY } from "@/enums/CacheEnum";

const userStore = useUserStore();

const form = ref<LoginData>({
  username: "test2024",
  password: "1234567",
});

const rules = computed(() => {
  return {
    username: [
      { required: true, message: "请输入用户名称", trigger: "blur" },
      { min: 5, message: "用户名称长度应该大于5", trigger: "blur" },
    ],
    password: [
      { required: true, message: "请输入密码", trigger: "blur" },
      { min: 6, message: "密码长度应该大于6", trigger: "blur" },
    ],
  };
});

const router = useRouter();
const formRef = ref<FormInstance>();
const isShow = ref(false);
const title = ref<string | Record<string, string>>("");

// 登录成功
const succeed = (data: any) => {
  ElMessage.success("登录成功");
  const token = data.access_token;
  if (token) {
    setToken(token);
    router.push("/"); // 登录成功后重定向到首页
  } else {
    failed("登录响应中缺少 access_token");
  }
};

// 设置token
const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, "Bearer " + token);
};

// 登录失败
const failed = (message: any) => {
  error(message);
};

// 提交登录表单
function submit() {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      userStore
        .login(form.value)
        .then((data) => {
          succeed(data);
        })
        .catch((error) => {
          failed(error);
        });
    }
  });
}

// 显示错误信息
const error = (msg: string | Record<string, string>) => {
  title.value =
    typeof msg === "string"
      ? msg
      : Object.keys(msg)
          .map((key) => `${key} : ${msg[key]}`)
          .join("\n");
  isShow.value = true;
};
</script>

<template>
  <Site>
    <h2 class="login-title">登录账号</h2>
    <el-form
      ref="formRef"
      class="login-body"
      :rules="rules"
      :model="form"
      label-width="75px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" suffix-icon="User" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" suffix-icon="Lock" />
      </el-form-item>

      <el-form-item class="login-button">
        <el-button style="width: 120px" type="primary" @click="submit">
          进入
        </el-button>
      </el-form-item>
    </el-form>
    <div class="login-link">
      <router-link to="/site/signup">
        <el-link type="primary" :underline="false">注册用户</el-link>
      </router-link>
      <br />
      <router-link to="/site/request-password-reset">
        <el-link type="primary" :underline="false">找回密码</el-link>
      </router-link>
      <br />
    </div>
    <div v-if="isShow" class="error-message">{{ title }}</div>
  </Site>
</template>

<style scoped lang="scss">
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-title {
  margin: 20px 0;
  font-weight: bold;
  color: #444;
  text-align: center;
}

.login-body {
  max-width: 100%;
  height: 100%;
  padding: 10px 40px 0 10px;
  margin-top: 36px;
}

.login-button {
  text-align: right;
}

.login-link {
  padding: 0 10px;
  margin-bottom: 20px;
}

.login-link a {
  font-size: 16px;
  color: rgb(28 160 212);
}

.error-message {
  margin-top: 10px;
  color: red;
  text-align: center;
}
</style>
