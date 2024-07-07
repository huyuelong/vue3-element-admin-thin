<template>
  <div class="container">
    <div class="main">
      <!-- box start-->
      <div class="box">
        <el-card shadow="hover" :body-style="{ padding: '15px' }">
          <slot></slot>
        </el-card>
      </div>
      <!-- box end -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElCard } from "element-plus";
//
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.linkcolor a {
  color: rgb(28 160 212);
}

.container {
  width: 100%;
  min-height: calc(100% - 125px);
  overflow: hidden;
  background: url("/media/bg/02.jpg") center no-repeat;
  background-color: #d3d6de;
  background-size: cover;

  .main {
    position: relative;
    width: 500px;
    max-width: 100%;
    padding: 30px 30px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .box {
    position: relative;
    width: 400px;
    max-width: 100%;
    height: 100%;
    padding: 10px;
    margin: 0 auto;
    margin-bottom: 20px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 5px;
  }

  .title {
    margin: 12px auto 30px;
    font-size: 35px;
    font-weight: bold;
    color: #444;
    text-align: center;
  }

  .sub-title {
    padding: 10px;
    font-size: 14px;
    color: #666;
    text-align: center;
  }

  .footer {
    height: 100%;
    padding: 10px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 5px;
  }

  .foot-summary {
    height: 46px;
    padding: 12px 10px;
  }

  .foot-tips {
    margin: 30px 0 70px;
    overflow: hidden;
  }

  .mrpp-title {
    padding: 0;
    font-size: 15px;
    color: #666;
  }

  .card-title {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
