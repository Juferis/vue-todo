<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import {
  LABELS_TODO,
  LABELS_MODAL,
  LABELS_ASSIGNEE,
  LABELS_DEADLINE,
} from '../../contants';
import type { TodoInput } from './types';

const emits = defineEmits(['save', 'close']);

const text = ref('');
const selectedAssignee = ref('');
const deadline = ref('');

const saveTodo = () => {
  if (!text.value.trim()) return;

  const newTodo: TodoInput = {
    text: text.value,
    assignee: selectedAssignee.value || LABELS_ASSIGNEE.UNSET,
    deadline: deadline.value || LABELS_DEADLINE.UNSET,
  };

  emits('save', newTodo);

  text.value = '';
  selectedAssignee.value = '';
  deadline.value = '';
};
</script>

<template>
  <div class="modal-overlay">
    <div class="modal">
      <h3>{{ LABELS_MODAL.TITLE }}</h3>
      <label>{{ LABELS_TODO.TITLE }}</label>
      <input v-model="text" :placeholder="LABELS_TODO.INPUT_PLACEHOLDER" />

      <label>담당자</label>
      <select v-model="selectedAssignee">
        <option value="">{{ LABELS_ASSIGNEE.UNSET }}</option>
        <option
          v-for="(assignee, index) in LABELS_ASSIGNEE.OPTIONS"
          :key="index"
        >
          {{ assignee }}
        </option>
      </select>

      <label>마감 기한</label>
      <input type="date" v-model="deadline" />

      <div class="button-group">
        <button @click="saveTodo">{{ LABELS_MODAL.SAVE }}</button>
        <button @click="$emit('close')">{{ LABELS_MODAL.CANCEL }}</button>
      </div>
    </div>
  </div>
</template>
