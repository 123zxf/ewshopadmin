<template>
    <n-layout class="layout" has-sider position="absolute">
        <n-layout-sider content-style="background-color:#001529">
            <PageSider></PageSider>
        </n-layout-sider>
        <n-layout>
            <n-layout-header>
                <PageHeader></PageHeader>
            </n-layout-header>
            <n-layout-content content-style="padding: 0px;background-color:#f0f2f5">
                <div class="content">
                    <router-view></router-view>
                </div>
            </n-layout-content>
            <n-layout-footer>
                <div class="text-center footer">
                    <span>Copyright © 2023</span>
                </div>
            </n-layout-footer>
        </n-layout>
    </n-layout>
</template>

<script lang="ts" setup>
import PageHeader from '@/layout/components/PageHeader.vue';
import PageSider from '@/layout/components/PageSider.vue';
import {useMessage} from 'naive-ui';
window.$message = useMessage();
</script>

<style scoped>
.content {
    max-height: calc(100vh - 130px);
    height: calc(100vh - 68px);
}

.footer {
    height: 24px;
    border-top: 1px solid #e5e7eb;
}
</style>