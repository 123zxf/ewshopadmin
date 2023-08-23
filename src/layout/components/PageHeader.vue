<template>
    <div class="w-full h-11 flex items-center justify-end px-8 py2 border-b border-gray-200 ">
        <n-dropdown :options="options" @select="select">
            <div class="flex items-center">
                <n-avatar round size="small" :src="user.url">
                </n-avatar>
                <span class="pl-2">
                    {{ user.name }}
                </span>
            </div>
        </n-dropdown>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { renderIcon } from "@/utils";
import { logout } from '@/api/auth';
import { LogOutOutline as LogoutIcon } from '@vicons/ionicons5';
// import { useUserStore } from "@/store/user";

// const userStore = useUserStore();
// userStore.getUserInfo;
const user = JSON.parse(localStorage.user) 



const options = ref([{
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(LogoutIcon)
}]);

const select = (key: string) => {
    switch (key) {
        case 'logout':
            logout().then(() => {
                localStorage.removeItem('token');
                window.location.reload();
            })
            break;
        default:
            break;
    }
}

</script>
