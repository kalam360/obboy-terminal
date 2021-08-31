<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="about">
        {{ name }} Is a based on vue3 vite2, TypeScript
        Background in solution, it can help you quickly build enterprise project in the background, and believe that whether to use the new technology or other ways, can help to you, the last update.
      </n-card>
    </div>
    <n-card
      :bordered="false"
      title="Project information"
      class="mt-4 proCard"
      size="small"
      :segmented="{ content: 'hard' }"
    >
      <n-descriptions bordered label-placement="left" class="py-2">
        <n-descriptions-item label="version">
          <n-tag type="info"> {{ version }} </n-tag>
        </n-descriptions-item>
        <n-descriptions-item label="The last compilation time">
          <n-tag type="info"> {{ lastBuildTime }} </n-tag>
        </n-descriptions-item>
        <n-descriptions-item label="The document address">
          <div class="flex items-center">
            <a href="https://naive-ui-admin-docs.vercel.app" class="py-2" target="_blank"
              >Check the document address</a
            >
          </div>
        </n-descriptions-item>
        <n-descriptions-item label="预览地址">
          <div class="flex items-center">
            <a href="https://naive-ui-admin.vercel.app" class="py-2" target="_blank"
              >Check the preview address</a
            >
          </div>
        </n-descriptions-item>
        <n-descriptions-item label="Github">
          <div class="flex items-center">
            <a href="https://github.com/jekip/naive-ui-admin" class="py-2" target="_blank"
              >To viewGithubaddress</a
            >
          </div>
        </n-descriptions-item>
        <n-descriptions-item label="QQ交流群">
          <div class="flex items-center">
            <a href="https://jq.qq.com/?_wv=1027&k=xib9dU4C" class="py-2" target="_blank"
              >Click the link to join the group chat【Naive Admin】</a
            >
          </div>
        </n-descriptions-item>
      </n-descriptions>
    </n-card>

    <n-card
      :bordered="false"
      title="Development environment depend on"
      class="mt-4 proCard"
      size="small"
      :segmented="{ content: 'hard' }"
    >
      <n-descriptions bordered label-placement="left" class="py-2">
        <n-descriptions-item v-for="item in devSchema" :key="item.field" :label="item.field">
          {{ item.label }}
        </n-descriptions-item>
      </n-descriptions>
    </n-card>

    <n-card
      :bordered="false"
      title="Production environment depend on"
      class="mt-4 proCard"
      size="small"
      :segmented="{ content: 'hard' }"
    >
      <n-descriptions bordered label-placement="left" class="py-2">
        <n-descriptions-item v-for="item in schema" :key="item.field" :label="item.field">
          {{ item.label }}
        </n-descriptions-item>
      </n-descriptions>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  export interface schemaItem {
    field: string;
    label: string;
  }

  const { pkg, lastBuildTime } = __APP_INFO__;
  const { dependencies, devDependencies, name, version } = pkg;

  const schema: schemaItem[] = [];
  const devSchema: schemaItem[] = [];

  Object.keys(dependencies).forEach((key) => {
    schema.push({ field: key, label: dependencies[key] });
  });

  Object.keys(devDependencies).forEach((key) => {
    devSchema.push({ field: key, label: devDependencies[key] });
  });
</script>

<style lang="less" scoped></style>
