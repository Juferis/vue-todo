<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { TodoStatus, type Todo } from './types';
import {
  STORAGE_KEY,
  LABELS_TODO,
  LABELS_STATUS,
  LABELS_DEADLINE,
  LABELS_ASSIGNEE,
} from '../../contants';
import TodoModal from './TodoModal.vue';

const todos = ref<Todo[]>([]);
const isModalOpen = ref(false);

const loadTodos = () => {
  const savedTodos = localStorage.getItem(STORAGE_KEY);
  if (savedTodos) {
    todos.value = JSON.parse(savedTodos);
  }
};

const saveTodos = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value));
};

const addTodo = (data: {
  text: string;
  assignee: string;
  deadline: string;
}) => {
  const newTask: Todo = {
    id: crypto.randomUUID(),
    text: data.text,
    status: TodoStatus.INCOMPLETE,
    assignee: data.assignee,
    deadline: data.deadline,
    createdAt: new Date().toISOString(),
  };

  todos.value.push(newTask);
  saveTodos();
  isModalOpen.value = false;
};

const removeTodo = (id: string) => {
  todos.value = todos.value.filter((todo) => todo.id !== id);
  saveTodos();
};

onMounted(() => {
  loadTodos();
});
</script>

<template>
  <div>
    <h2>{{ LABELS_TODO.TITLE }}</h2>
    <button @click="isModalOpen = true">{{ LABELS_TODO.ADD }}</button>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>할 일</th>
          <th>상태</th>
          <th>기한</th>
          <th>담당자</th>
          <th>등록일</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(todo, index) in todos" :key="todo.id">
          <td>{{ index + 1 }}</td>
          <td>{{ todo.text }}</td>
          <td>
            {{
              todo.status === 1
                ? LABELS_STATUS.COMPLETE
                : LABELS_STATUS.INCOMPLETE
            }}
          </td>
          <td>{{ todo.deadline || LABELS_DEADLINE.UNSET }}</td>
          <td>{{ todo.assignee || LABELS_ASSIGNEE.UNSET }}</td>
          <td>{{ new Date(todo.createdAt).toLocaleString() }}</td>
          <td>
            <button>{{ LABELS_TODO.EDIT }}</button>
            <button @click="removeTodo(todo.id)">
              {{ LABELS_TODO.DELETE }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <TodoModal
      v-if="isModalOpen"
      @save="addTodo"
      @close="isModalOpen = false"
    />
  </div>
</template>
