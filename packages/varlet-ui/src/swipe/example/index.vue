<script setup>
import { AppType, onThemeChange, watchLang } from '@varlet/cli/client'
import { Snackbar } from '@varlet/ui'
import { t, use } from './locale'

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <var-swipe class="swipe">
    <var-swipe-item>
      <img class="swipe-item" :src="'cat.jpg'" alt="" />
    </var-swipe-item>
    <var-swipe-item>
      <img class="swipe-item" :src="'cat2.jpg'" alt="" />
    </var-swipe-item>
    <var-swipe-item>
      <img class="swipe-item" :src="'cat3.jpg'" alt="" />
    </var-swipe-item>
  </var-swipe>

  <app-type>{{ t('forbidLoop') }}</app-type>
  <var-swipe class="swipe" :loop="false">
    <var-swipe-item>
      <img class="swipe-item" :src="'cat.jpg'" alt="" />
    </var-swipe-item>
    <var-swipe-item>
      <img class="swipe-item" :src="'cat2.jpg'" alt="" />
    </var-swipe-item>
    <var-swipe-item>
      <img class="swipe-item" :src="'cat3.jpg'" alt="" />
    </var-swipe-item>
  </var-swipe>

  <app-type>{{ t('autoplay') }}</app-type>
  <var-swipe class="swipe" :autoplay="2000">
    <var-swipe-item>
      <img class="swipe-item" :src="'cat.jpg'" alt="" />
    </var-swipe-item>
    <var-swipe-item>
      <img class="swipe-item" :src="'cat2.jpg'" alt="" />
    </var-swipe-item>
    <var-swipe-item>
      <img class="swipe-item" :src="'cat3.jpg'" alt="" />
    </var-swipe-item>
  </var-swipe>

  <app-type>{{ t('vertical') }}</app-type>
  <var-swipe class="swipe" vertical>
    <var-swipe-item>
      <img class="swipe-item" :src="'cat.jpg'" alt="" />
    </var-swipe-item>
    <var-swipe-item>
      <img class="swipe-item" :src="'cat2.jpg'" alt="" />
    </var-swipe-item>
    <var-swipe-item>
      <img class="swipe-item" :src="'cat3.jpg'" alt="" />
    </var-swipe-item>
  </var-swipe>

  <app-type>{{ t('navigation') }}</app-type>
  <var-swipe class="swipe" navigation>
    <var-swipe-item>
      <img class="swipe-item" :src="'cat.jpg'" alt="" />
    </var-swipe-item>
    <var-swipe-item>
      <img class="swipe-item" :src="'cat2.jpg'" alt="" />
    </var-swipe-item>
    <var-swipe-item>
      <img class="swipe-item" :src="'cat3.jpg'" alt="" />
    </var-swipe-item>
  </var-swipe>

  <var-swipe class="swipe" style="margin-top: 12px" navigation="hover">
    <var-swipe-item>
      <img class="swipe-item" :src="'cat.jpg'" alt="" />
    </var-swipe-item>
    <var-swipe-item>
      <img class="swipe-item" :src="'cat2.jpg'" alt="" />
    </var-swipe-item>
    <var-swipe-item>
      <img class="swipe-item" :src="'cat3.jpg'" alt="" />
    </var-swipe-item>
  </var-swipe>

  <app-type>{{ t('handleChange') }}</app-type>
  <var-swipe class="swipe" @change="(index) => Snackbar(String(index))">
    <var-swipe-item>
      <img class="swipe-item" :src="'cat.jpg'" alt="" />
    </var-swipe-item>
    <var-swipe-item>
      <img class="swipe-item" :src="'cat2.jpg'" alt="" />
    </var-swipe-item>
    <var-swipe-item>
      <img class="swipe-item" :src="'cat3.jpg'" alt="" />
    </var-swipe-item>
  </var-swipe>

  <app-type>{{ t('customIndicator') }}</app-type>
  <var-swipe class="swipe-example">
    <var-swipe-item>
      <img class="swipe-item" :src="'cat.jpg'" />
    </var-swipe-item>
    <var-swipe-item>
      <img class="swipe-item" :src="'cat2.jpg'" />
    </var-swipe-item>
    <var-swipe-item>
      <img class="swipe-item" :src="'cat3.jpg'" />
    </var-swipe-item>
    <template #indicator="{ index, length, to }">
      <div class="swipe-indicators">
        <div
          v-for="(l, idx) in length"
          :key="l"
          class="swipe-indicator"
          :class="{ 'swipe-active-indicator': idx === index }"
          @click="to(idx)"
        ></div>
      </div>
    </template>
  </var-swipe>

  <div class="space"></div>
</template>

<style scoped lang="less">
.swipe {
  height: 160px;
}

.swipe-example {
  height: 160px;
}

.swipe-item {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.swipe-indicators {
  position: absolute;
  display: flex;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.swipe-indicator {
  width: 8px;
  height: 8px;
  background: #fff;
  opacity: 0.3;
  margin: 0 4px;
  transition: opacity 0.3s;
}

.swipe-active-indicator {
  opacity: 1;
}

.space {
  height: 20px;
}
</style>
