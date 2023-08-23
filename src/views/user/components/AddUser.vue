<template>
    <n-modal 
        v-model:show="props.showModal"
        @update:show="onNegativeClick"
        :mask-closable="true"    
    > 
        <n-card
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true"
            style="width: 600px"
            preset="dialog" 
            title="添加用户" 
        >
        
        <template #header-extra>
            <button @click=onNegativeClick>x</button>
        </template>
        <n-form ref="formRef" :model="model" :rules="rules">
    <n-form-item path="name" label="姓名"  >
      <n-input v-model:value="model.name" placeholder="请输入姓名" />
    </n-form-item>
    <n-form-item path="email" label="邮箱">
      <n-input
        v-model:value="model.email"
        placeholder="请输入邮箱"
      />
    </n-form-item>
    <n-form-item path="password" label="密码">
      <n-input
        v-model:value="model.password"
        type="password"
        placeholder="请输入密码"
        @keydown.enter.prevent
      />
    </n-form-item>
    <n-form-item
        :disabled="!model.password"
      ref="rPasswordFormItemRef"
      first
      path="reenteredPassword"
      label="重复密码"
    >
      <n-input
        v-model:value="model.reenteredPassword"
        :disabled="!model.password"
        type="password"
        placeholder="请输入相同密码"
        @keydown.enter.prevent
      />
    </n-form-item>
    <n-row :gutter="[0, 24]">
      <n-col :span="24">
        <div style="display: flex; justify-content: flex-end">
          <n-button
            round
            type="primary"
            @click="userSubmit"
          >
            添加
          </n-button>
        </div>
      </n-col>
    </n-row>
  </n-form>

  <pre>{{ JSON.stringify(model, null, 2) }}
</pre>
        </n-card>
    </n-modal>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  useMessage,
} from 'naive-ui'
import { addUser } from '@/api/user';

const message = useMessage()
const props = defineProps({
    showModal: Boolean
})

const emit = defineEmits(['aaa'])
const onNegativeClick = () => {
    emit('aaa', false)
    message.success('已关闭')
}
const formRef = ref();
const errors = ref();
const userSubmit = (e:any) => {
    e.preventDefault();
    if(errors){
        console.log(errors)
    }else{
        addUser(model.value).then((res:any)=>{
            console.log(res);
            emit('aaa', false);
            message.success('提交成功')
        })
    }
}
const model = ref<any>({
      name: null,
      email:null,
      password: null,
      reenteredPassword: null
    });
    const rules = {
      name: [
        {
          required: true,
          message: "请输入姓名",
          trigger: ['input', 'blur']
        }
      ],
      email: [
        {
          required: true,
          trigger: ['input', 'blur']
        }
      ],
      password: [
        {
          required: true,
          message: '请输入密码'
        }
      ],
      reenteredPassword: [
        {
          required: true,
          message: '请再次输入密码',
          trigger: ['input', 'blur']
        }
      ]
    }


</script>

<style scoped></style>