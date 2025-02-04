<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { TodoStatus, type Todo } from './types';

const STORAGE_KEY = 'todos';

const todos = ref<Todo[]>([]);
const newTodo = ref('');

const loadTodos = () => {
  const savedTodos = localStorage.getItem(STORAGE_KEY);
  if (savedTodos) {
    todos.value = JSON.parse(savedTodos);
  }
};

const saveTodos = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value));
};

const addTodo = () => {
  if (newTodo.value.trim() === '') return; // 빈 입력 방지

  const newTask: Todo = {
    id: crypto.randomUUID(),
    text: newTodo.value,
    status: TodoStatus.INCOMPLETE,
    assignee: '',
    deadline: '',
    createdAt: new Date().toISOString(), // 현재 시간 저장
  };

  todos.value.push(newTask);
  saveTodos();
  newTodo.value = '';
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
    <div>
      <input
        v-model="newTodo"
        @keyup.enter="addTodo"
        placeholder="할 일을 입력하세요"
      />
      <button @click="addTodo">추가</button>
    </div>

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
          <td>{{ todo.deadline }}</td>
          <td>{{ todo.assignee }}</td>
          <td>{{ todo.createdAt }}</td>
          <td>
            <button>수정</button
            ><button @click="removeTodo(todo.id)">삭제</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
