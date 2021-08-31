<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="Details on the form">
        The form in addition to submit data, sometimes also used to show read-only information.
      </n-card>
    </div>
    <n-card
      :bordered="false"
      title="The basic information"
      class="mt-4 proCard"
      size="small"
      :segmented="{ content: 'hard' }"
    >
      <n-descriptions label-placement="left" class="py-2">
        <n-descriptions-item>
          <template #label>The payee name</template>
          Ah jung
        </n-descriptions-item>
        <n-descriptions-item label="Payment account">NaiveUiAdmin@qq.com</n-descriptions-item>
        <n-descriptions-item label="Type of payment">Alipay</n-descriptions-item>
        <n-descriptions-item label="Payment account">NaiveUiAdmin@163.com</n-descriptions-item>
        <n-descriptions-item label="Transfer amount">￥1980.00</n-descriptions-item>
        <n-descriptions-item label="state">
          <n-tag type="success"> Have to account</n-tag>
        </n-descriptions-item>
      </n-descriptions>
    </n-card>
    <n-card
      :bordered="false"
      title="Other information"
      class="mt-4 proCard"
      size="small"
      :segmented="{ content: 'hard' }"
    >
      <n-descriptions label-placement="left" class="py-2">
        <n-descriptions-item>
          <template #label>city</template>
          shenzhen
        </n-descriptions-item>
        <n-descriptions-item label="gender">male</n-descriptions-item>
        <n-descriptions-item label="email">NaiveUiAdmin@qq.com</n-descriptions-item>
        <n-descriptions-item label="address">Nanshan district, shenzhen city, guangdong province,</n-descriptions-item>
        <n-descriptions-item label="birthday">1991-06-04</n-descriptions-item>
        <n-descriptions-item label="certification">
          <n-tag type="success"> certified</n-tag>
        </n-descriptions-item>
      </n-descriptions>
    </n-card>
    <n-card
      :bordered="false"
      title="Form information"
      class="mt-4 proCard"
      size="small"
      :segmented="{ content: 'hard' }"
    >
      <n-table :bordered="false" :single-line="false">
        <thead>
          <tr>
            <th>The name</th>
            <th>gender</th>
            <th>city</th>
            <th>birthday</th>
            <th width="150">operation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ah jung</td>
            <td>male</td>
            <td>shenzhen</td>
            <td>1993-11-09</td>
            <td>
              <n-space>
                <n-button size="small" type="error">delete</n-button>
                <n-button size="small" type="info">To view</n-button>
              </n-space>
            </td>
          </tr>
          <tr>
            <td>Simon blowing snow,</td>
            <td>male</td>
            <td>Guangzhou</td>
            <td>1991-09-11</td>
            <td>
              <n-space>
                <n-button size="small" type="error">delete</n-button>
                <n-button size="small" type="info">To view</n-button>
              </n-space>
            </td>
          </tr>
          <tr>
            <td>titans</td>
            <td>male</td>
            <td>Beijing</td>
            <td>1990-11-03</td>
            <td>
              <n-space>
                <n-button size="small" type="error">删除</n-button>
                <n-button size="small" type="info">查看</n-button>
              </n-space>
            </td>
          </tr>
          <tr>
            <td>猎魔人</td>
            <td>女</td>
            <td>上海</td>
            <td>1992-03-11</td>
            <td>
              <n-space>
                <n-button size="small" type="error">删除</n-button>
                <n-button size="small" type="info">查看</n-button>
              </n-space>
            </td>
          </tr>
        </tbody>
      </n-table>
    </n-card>
  </div>
</template>

<script setup></script>

<style lang="less" scoped></style>
