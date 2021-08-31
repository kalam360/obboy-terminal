<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="Drag and drop"> Often used in card, matters, appointments, processes, plans, etc., </n-card>
    </div>

    <n-alert title="Fancy drag the demo" type="info" class="mt-4">
      Each card, can drag the up and down the order, the other different CARDS, can also drag and drop in the past, drag and drop to come over, is a cinch, fast try O(∩_∩)O ha ha~
    </n-alert>

    <n-grid
      cols="1 s:2 m:3 l:4 xl:4 2xl:4"
      class="mt-4 proCard"
      responsive="screen"
      :x-gap="12"
      :y-gap="8"
    >
      <n-grid-item>
        <NCard
          title="Demand pool"
          :segmented="{ content: 'hard', footer: 'hard' }"
          size="small"
          :bordered="false"
        >
          <template #header-extra>
            <n-tag type="info">month</n-tag>
          </template>

          <Draggable
            class="draggable-ul"
            animation="300"
            :list="demandList"
            group="people"
            itemKey="name"
          >
            <template #item="{ element }">
              <div class="cursor-move draggable-li">
                <n-tag type="info">demand</n-tag><span class="ml-2">{{ element.name }}</span>
              </div>
            </template>
          </Draggable>
        </NCard>
      </n-grid-item>

      <n-grid-item>
        <NCard
          title="The development of"
          :segmented="{ content: 'hard', footer: 'hard' }"
          size="small"
          :bordered="false"
        >
          <template #header-extra>
            <n-tag type="info">month</n-tag>
          </template>

          <Draggable
            class="draggable-ul"
            animation="300"
            :list="exploitList"
            group="people"
            itemKey="name"
          >
            <template #item="{ element }">
              <div class="cursor-move draggable-li">
                <n-tag type="warning">The development of</n-tag><span class="ml-2">{{ element.name }}</span>
              </div>
            </template>
          </Draggable>
        </NCard>
      </n-grid-item>

      <n-grid-item>
        <NCard
          title="Has been completed"
          :segmented="{ content: 'hard', footer: 'hard' }"
          size="small"
          :bordered="false"
        >
          <template #header-extra>
            <n-tag type="info">month</n-tag>
          </template>
          <Draggable
            class="draggable-ul"
            animation="300"
            :list="completeList"
            group="people"
            itemKey="name"
          >
            <template #item="{ element }">
              <div class="cursor-move draggable-li">
                <n-tag type="error">Has been completed</n-tag><span class="ml-2">{{ element.name }}</span>
              </div>
            </template>
          </Draggable>
        </NCard>
      </n-grid-item>

      <n-grid-item>
        <NCard
          title="Acceptance and"
          :segmented="{ content: 'hard', footer: 'hard' }"
          size="small"
          :bordered="false"
        >
          <template #header-extra>
            <n-tag type="info">month</n-tag>
          </template>
          <Draggable
            class="draggable-ul"
            animation="300"
            :list="approvedList"
            group="people"
            itemKey="name"
          >
            <template #item="{ element }">
              <div class="cursor-move draggable-li">
                <n-tag type="success">Acceptance and</n-tag><span class="ml-2">{{ element.name }}</span>
              </div>
            </template>
          </Draggable>
        </NCard>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import Draggable from 'vuedraggable';

  const demandList = reactive([
    { name: 'Booking form page, can fill in relevant information', id: 1 },
    { name: 'Promotion page, contains the promotional advertising display', id: 2 },
    { name: 'Commodity list, remind function needs a the arrival of the goods', id: 3 },
    { name: 'Goods need an evaluation function', id: 4 },
    { name: 'Product image needs to provide a magnifying glass', id: 5 },
    { name: 'Orders need to delete to the recycle bin', id: 6 },
    { name: 'Users upload picture, need support for tailoring', id: 7 },
    { name: 'Setup the Vue3.2 is said to be released, what time support？', id: 8 },
  ]);

  const exploitList = reactive([{ name: 'Product image needs to provide a magnifying glass', id: 5 }]);

  const completeList = reactive([{ name: 'Product image needs to provide a magnifying glass', id: 5 }]);

  const approvedList = reactive([{ name: 'Product image needs to provide a magnifying glass', id: 5 }]);
</script>

<style lang="less" scoped>
  .draggable-ul {
    width: 100%;
    overflow: hidden;
    margin-top: -16px;

    .draggable-li {
      width: 100%;
      padding: 16px 10px;
      color: #333;
      border-bottom: 1px solid #efeff5;
    }
  }
</style>
