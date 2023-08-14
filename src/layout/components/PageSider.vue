<template>
    <div class="pt-4">
        <div class="m-0">
            <img class="m-auto" src="@/assets/images/logo.png" alt="logo">
        </div>
        <n-menu :inverted="true" :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions"
            @update-value="selectMenu" :value="route.fullPath">
        </n-menu>
    </div>
</template>
<script lang="ts" setup>
import { renderIcon } from '@/utils';
import { Apps } from '@vicons/ionicons5';
import { MenuOption } from 'naive-ui';
import { h, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();

const menuOptions = ref<MenuOption[]>([
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: 'dashboard_console'
                    }
                },
                { default: () => '控制台' }
            ),
        key: '/dashboard/console',
        icon: renderIcon(Apps)
    },
]);

const selectMenu = () => {

}

</script>