<script setup lang="ts">
import { ref } from 'vue';
import type { Todo } from './types';

const todos = ref<Todo[]>([]);
</script>

<template>
  <div>
    <h2>Todo List</h2>
    <div>
      <input placeholder="할 일을 입력하세요" />
      <button>추가</button>
    </div>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.text }}
        <button>삭제</button>
      </li>
    </ul>
  </div>
</template>
