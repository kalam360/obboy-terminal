<template>
  <n-grid cols="1" responsive="screen" class="-mt-5">
    <n-grid-item>
      <n-list>
        <n-list-item>
          <template #suffix>
            <n-button type="primary" text>Revise</n-button>
          </template>
          <n-thing title="account password">
            <template #description
              ><span class="text-gray-400">Bind your phone and email, set your password, your account is safer</span></template
            >
          </n-thing>
        </n-list-item>
        <n-list-item>
          <template #suffix>
            <n-button type="primary" text>Revise</n-button>
          </template>
          <n-thing title="Bind mobile phone">
            <template #description
              ><span class="text-gray-400">Binded mobile phone number:+86189****4877</span></template
            >
          </n-thing>
        </n-list-item>
        <n-list-item>
          <template #suffix>
            <n-button type="primary" text>set up</n-button>
          </template>
          <n-thing title="Security Question">
            <template #description
              ><span class="text-gray-400"
                >No security issues, security issues can effectively protect account security</span
              ></template
            >
          </n-thing>
        </n-list-item>
        <n-list-item>
          <template #suffix>
            <n-button type="primary" text>Revise</n-button>
          </template>
          <n-thing title="Personality name">
            <template #description
              ><span class="text-gray-400">Bind domain name: https://www.naiveui.com</span></template
            >
          </n-thing>
        </n-list-item>
      </n-list>
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts" setup></script>
