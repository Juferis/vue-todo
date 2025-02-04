<script setup lang="ts">
import { ref } from 'vue';
import './assets/style.css';
import TodoList from './components/todo-list/TodoList.vue';
import { LABELS_TODO } from './contants';

const isDarkMode = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.body.classList.toggle('dark-mode', isDarkMode.value);
  localStorage.setItem('darkMode', JSON.stringify(isDarkMode.value));
};
</script>

<template>
  <div class="container">
    <header>
      <h2>{{ LABELS_TODO.TITLE }}</h2>
      <button class="dark-mode-toggle" @click="toggleDarkMode">
        {{ isDarkMode ? '🌙' : '☀️' }}
      </button>
    </header>
    <TodoList />
  </div>
</template>
