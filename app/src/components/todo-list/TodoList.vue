<script setup lang="ts">
import { ref } from 'vue';
import type { Todo } from './types';

const todos = ref<Todo[]>([
  {
    id: 1,
    text: '투두리스트 만들기1',
    status: 0,
    assignee: '테스트 담당자',
    deadline: '2024-02-10',
    createdAt: '2024-02-04',
  },
  {
    id: 2,
    text: '투두리스트 만들기2',
    status: 0,
    assignee: '테스트 담당자',
    deadline: '2024-02-10',
    createdAt: '2024-02-04',
  },
]);
</script>

<template>
  <div>
    <h2>Todo List</h2>
    <div>
      <input placeholder="할 일을 입력하세요" />
      <button>추가</button>
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
        <tr v-for="todo in todos" :key="todo.id">
          <td>{{ todo.id }}</td>
          <td>{{ todo.text }}</td>
          <td>{{ todo.status === 1 ? '완료' : '미완료' }}</td>
          <td>{{ todo.deadline }}</td>
          <td>{{ todo.assignee }}</td>
          <td>{{ todo.createdAt }}</td>
          <td><button>수정</button><button>삭제</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
