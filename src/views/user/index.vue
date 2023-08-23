<template>
    <div class="h-24 w-full bg-white p-3 mb-6">
        <div>
            <span class="text-slate-400 pr-1">首页</span> / <span class="pl-1">用户列表</span>
            <div class="pt-3 text-xl text-black font-medium">
                用户管理
            </div>
        </div>
    </div>
    <div class="content px-4">
        <div class="bg-white pt-4 pr-6">
            <n-form ref="formRef" inline :label-width="80" :model="formSearch" label-placement="left">
                <n-form-item label="姓名" path="name">
                    <n-input v-model:value="formSearch.name" placeholder="输入姓名" />
                </n-form-item>
                <n-form-item label="邮箱" path="email">
                    <n-input v-model:value="formSearch.email" placeholder="输入邮箱" />
                </n-form-item>
                <n-form-item class="ml-auto">
                    <n-button class="mr-4" attr-type="button" @click="remake">
                        重置
                    </n-button>
                    <n-button type="info" attr-type="button" @click="searchSubmit">
                        搜索
                    </n-button>
                </n-form-item>
            </n-form>
        </div>
        <div class="mt-4 bg-white">
            <div class="text-xl px-6 py-4 flex">
                <span>用户列表</span>
                <span class="ml-auto">
                    <NButton type="info" @click=" showModal = true ">+ 创建</NButton>
                </span>
            </div>
            <div>
                <n-data-table :columns="columns" :data="data" :bordered="false" />
                <div class="p-4 flex justify-end pr-10">
                    <n-pagination v-model:page="page" @update:page="updatePage" :page-count="totalPages" />
                </div>
            </div>
            <AddUser  :showModal="showModal"  @aaa="close"></AddUser>
        </div>
    </div>
</template>

<script setup lang="ts">
import { users } from '@/api/user';
import { ref, h } from 'vue';
import AddUser from '@/views/user/components/AddUser.vue'
import { NButton, NAvatar, NSwitch, useMessage } from 'naive-ui';
import { onMounted } from 'vue';
import { reactive } from 'vue';

const showModal = ref(false);


const close = (state:boolean)=>{
    console.log(state);
    
    showModal.value = state
    console.log(showModal.value);
    
}

const totalPages = ref(0);
const message = useMessage();
const formSearch = reactive<any>({
    name: '',
    email: '',
});
const User = (params = {}) => {
    users(params).then((users: any) => {
        data.value = users.data;
        totalPages.value = users.meta.pagination.total_pages;
        page.value = users.meta.pagination.current_page;
    })
}
const updatePage = (pageNum: number) => {
    page.value = pageNum;
    User({
        current: page.value,
        name: formSearch.name
    })
};
const searchSubmit = (e: any) => {
    e.preventDefault()
    const List = {
        name: formSearch.name,
        email: formSearch.email,
        current: 1
    }
    User(List)
};
const remake = () => {
    formSearch.name = '';
    formSearch.email = '';
    User({});

}
const columns = [
    {
        title: '头像',
        key: 'avatar_url',
        render(row: any) {
            return h(
                NAvatar,
                { round: true, src: row.avatar_url, size: "medium" },
            )
        }
    },
    {
        title: '姓名',
        key: 'name'
    },
    {
        title: '邮箱',
        key: 'email'
    },
    {
        title: '是否启用',
        key: 'is_locked',
        render(row: any) {
            return h(NSwitch, {
                size: 'small',
                color: '#1890ff',
                checkedColor: '#52c41a',
                uncheckedColor: '#d9d9d9',
                checkedValue: 0,
                uncheckedValue: 1,
                value: row.is_locked,
                onClick: () => up(row),
            },
                {
                    checked: () => '启用',
                    unchecked: () => '禁用',
                    icon: () => '🤔'
                }

            )

        }
    },
    {
        title: '创建时间',
        key: 'created_at',
    },
    {
        title: '更新时间',
        key: 'updated_at'
    },
    {
        title: '操作',
        key: 'actions',
        render() {
            return h(NButton, {
                size: 'small',
                color: '#1890ff',
                onclick: () => {
                    message.info('编辑完成')

                }
            },
                { default: () => '编辑' }
            )
        }
    }
]
const data = ref<any[]>([]);
const page = ref(2);
onMounted(() => {
    User();
})
const up = (row: any) => {
    for (let i = 0; i < data.value.length; i++) {
        if (row.id == data.value[i].id) {
            data.value[i].is_locked === 1 ? data.value[i].is_locked = 0 : data.value[i].is_locked = 1;
        }
    }
    // const ant2 =  data.value.find(ant=>{
    //     return row.id == ant.id
    // })
    // ant2.is_locked === 1?ant2.is_locked=0:ant2.is_locked=1;

}
</script>

<style scoped></style>