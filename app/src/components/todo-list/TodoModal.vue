<script setup lang="ts">
import { ref, defineEmits, defineProps, watch } from 'vue';
import {
  LABELS_TODO,
  LABELS_MODAL,
  LABELS_STATUS,
  LABELS_ASSIGNEE,
} from '../../constants';
import type { Todo, TodoInput } from './types';

const emits = defineEmits(['save', 'close']);
const props = defineProps<{ editedTodo: Todo | null }>();

const isEditMode = ref(false);
const text = ref('');
const selectedAssignee = ref('');
const deadline = ref('');
const status = ref(0);

const setEditTodo = (todo: Todo | null) => {
  if (todo) {
    isEditMode.value = true;
    text.value = todo.text;
    selectedAssignee.value = todo.assignee;
    deadline.value = todo.deadline;
    status.value = todo.status;
  } else {
    clearTodoForm();
  }
};

const clearTodoForm = () => {
  isEditMode.value = false;
  text.value = '';
  selectedAssignee.value = '';
  deadline.value = '';
  status.value = 0;
};

watch(() => props.editedTodo, setEditTodo, { immediate: true });

const saveTodo = () => {
  if (!text.value.trim()) return;

  const todoData: TodoInput = {
    text: text.value,
    assignee: selectedAssignee.value || '미정',
    deadline: deadline.value || '미설정',
    status: status.value,
  };

  emits('save', todoData, isEditMode.value ? props.editedTodo?.id : null);
  emits('close');
};
</script>

<template>
  <div class="modal-overlay">
    <div class="modal">
      <h3>{{ isEditMode ? LABELS_TODO.EDIT : LABELS_MODAL.TITLE }}</h3>

      <label>할 일</label>
      <input v-model="text" :placeholder="LABELS_TODO.INPUT_PLACEHOLDER" />

      <label>담당자</label>
      <select v-model="selectedAssignee">
        <option value="">선택하세요</option>
        <option
          v-for="(assignee, index) in LABELS_ASSIGNEE.OPTIONS"
          :key="index"
        >
          {{ assignee }}
        </option>
      </select>

      <label>마감 기한</label>
      <input type="date" v-model="deadline" />

      <label>상태</label>
      <div class="radio-group">
        <label>
          <input type="radio" v-model="status" :value="1" />
          {{ LABELS_STATUS.COMPLETE }}
        </label>
        <label>
          <input type="radio" v-model="status" :value="0" />
          {{ LABELS_STATUS.INCOMPLETE }}
        </label>
      </div>

      <div class="button-group">
        <button @click="saveTodo">{{ LABELS_MODAL.SAVE }}</button>
        <button
          class="todolist-secondary"
          @click="
            $emit('close');
            clearTodoForm();
          "
        >
          {{ LABELS_MODAL.CANCEL }}
        </button>
      </div>
    </div>
  </div>
</template>
