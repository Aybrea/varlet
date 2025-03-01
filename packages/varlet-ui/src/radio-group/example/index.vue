<script setup>
import { computed, reactive, toRefs } from 'vue'
import { AppType, onThemeChange, watchLang } from '@varlet/cli/client'
import { z } from 'zod'
import { t, use } from './locale'

const values = reactive({
  value: false,
  value2: 0,
  value3: false,
  value4: false,
  value5: false,
  value6: 0,
  value7: false,
  value8: 0,
  value9: 0,
  value10: false,
  value11: undefined,
  optionValue: 0,
  fieldValue: 0,
})
const {
  value,
  value2,
  value3,
  value4,
  value5,
  value6,
  value7,
  value8,
  value9,
  value10,
  value11,
  optionValue,
  fieldValue,
} = toRefs(values)

const options = computed(() => [
  { label: t('eat'), value: 0 },
  { label: t('sleep'), value: 1 },
  { label: t('game'), value: 2, disabled: true },
])

const fieldOptions = computed(() => [
  { name: t('eat'), id: 0 },
  { name: t('sleep'), id: 1 },
  { name: t('game'), id: 2 },
])

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <var-radio v-model="value">{{ t('currentValue') }} {{ value }}</var-radio>

  <app-type>{{ t('setState') }}</app-type>
  <var-radio v-model="value2" :unchecked-value="0" :checked-value="1"> {{ t('currentValue') }} {{ value2 }} </var-radio>

  <app-type>{{ t('setStyle') }}</app-type>
  <var-radio v-model="value3" unchecked-color="var(--color-warning)" checked-color="var(--color-danger)">
    <template #unchecked-icon>
      <var-icon name="heart-half-full" size="24px" />
    </template>
    <template #checked-icon>
      <var-icon name="heart" size="24px" />
    </template>
    <template #default> {{ t('currentValue') }} {{ value3 }} </template>
  </var-radio>

  <app-type>{{ t('disabled') }}</app-type>
  <var-radio v-model="value4" disabled>{{ t('currentValue') }} {{ value4 }}</var-radio>

  <app-type>{{ t('readonly') }}</app-type>
  <var-radio v-model="value5" readonly>{{ t('currentValue') }} {{ value5 }}</var-radio>

  <app-type>{{ t('radioGroup') }}</app-type>
  <var-radio-group v-model="value6">
    <var-radio :checked-value="0">{{ t('eat') }}</var-radio>
    <var-radio :checked-value="1">{{ t('sleep') }}</var-radio>
  </var-radio-group>
  <div class="relation">{{ t('currentValue') }} {{ value6 }}</div>

  <app-type>{{ t('radioGroupOptions') }}</app-type>
  <var-radio-group v-model="optionValue" :options="options" />
  <div class="relation">{{ t('currentValue') }} {{ optionValue }}</div>

  <app-type>{{ t('customFields') }}</app-type>
  <var-radio-group v-model="fieldValue" :options="fieldOptions" label-key="name" value-key="id" />
  <div class="relation">{{ t('currentValue') }} {{ fieldValue }}</div>

  <app-type>{{ t('vertical') }}</app-type>
  <var-radio-group v-model="value9" direction="vertical">
    <var-radio :checked-value="0">{{ t('eat') }}</var-radio>
    <var-radio :checked-value="1">{{ t('sleep') }}</var-radio>
  </var-radio-group>
  <div class="relation">{{ t('currentValue') }} {{ value9 }}</div>

  <app-type>{{ t('radioValidate') }}</app-type>
  <var-radio v-model="value7" :rules="[(v) => v || t('radioValidateMessage')]">
    {{ t('currentValue') }} {{ value7 }}
  </var-radio>

  <app-type>{{ t('radioValidateWithZod') }}</app-type>
  <var-radio v-model="value10" :rules="z.boolean().refine((v) => v, t('radioValidateMessage'))">
    {{ t('currentValue') }} {{ value10 }}
  </var-radio>

  <app-type>{{ t('radioGroupValidate') }}</app-type>
  <var-radio-group v-model="value8" :rules="[(v) => v === 0 || t('radioGroupValidateMessage')]">
    <var-radio :checked-value="0">{{ t('eat') }}</var-radio>
    <var-radio :checked-value="1">{{ t('sleep') }}</var-radio>
  </var-radio-group>
  <div class="relation">{{ t('currentValue') }} {{ value8 }}</div>

  <app-type>{{ t('radioGroupValidateWithZod') }}</app-type>
  <var-radio-group v-model="value11" :rules="z.number().refine((v) => v === 0, t('radioGroupValidateMessage'))">
    <var-radio :checked-value="0">{{ t('eat') }}</var-radio>
    <var-radio :checked-value="1">{{ t('sleep') }}</var-radio>
  </var-radio-group>
  <div class="relation">{{ t('currentValue') }} {{ value11 }}</div>

  <div class="space"></div>
</template>

<style scoped lang="less">
.relation {
  margin-top: 10px;
}

.button {
  margin-right: 10px;
}

.space {
  height: 40px;
}
</style>
