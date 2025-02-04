<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { TodoStatus, type Todo } from './types';
import TodoModal from './TodoModal.vue';

const STORAGE_KEY = 'todos';

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
    <h2>Todo List</h2>
    <button @click="isModalOpen = true">추가</button>

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
          <td>{{ todo.status === 1 ? '완료' : '미완료' }}</td>
          <td>{{ todo.deadline || '미설정' }}</td>
          <td>{{ todo.assignee || '미정' }}</td>
          <td>{{ new Date(todo.createdAt).toLocaleString() }}</td>
          <td>
            <button>수정</button>
            <button @click="removeTodo(todo.id)">삭제</button>
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
