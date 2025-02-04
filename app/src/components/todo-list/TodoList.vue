<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { assignees, TodoStatus, type Todo } from './types';
import {
  STORAGE_KEY,
  LABELS_TODO,
  LABELS_STATUS,
  LABELS_DEADLINE,
  LABELS_ASSIGNEE,
  LABELS_INFIITESCROLL,
} from '../../constants';
import TodoModal from './TodoModal.vue';

const todos = ref<Todo[]>([]);
const isModalOpen = ref(false);
const editingTodo = ref<Todo | null>(null);

const currentPage = ref(1);
const itemsPerPage = 10;
const isInfiniteScroll = ref(false);
const visibleCount = ref(10);
const selectedAssignee = ref('ALL');
const selectedStatus = ref('ALL');

const filteredTodos = computed(() => {
  let filtered = todos.value;

  if (selectedAssignee.value !== 'ALL') {
    filtered = filtered.filter(
      (todo) => todo.assignee === selectedAssignee.value
    );
  }

  if (selectedStatus.value !== 'ALL') {
    const statusValue =
      selectedStatus.value === 'COMPLETE'
        ? TodoStatus.COMPLETE
        : TodoStatus.INCOMPLETE;
    filtered = filtered.filter((todo) => todo.status === statusValue);
  }

  return filtered;
});

const paginatedTodos = computed(() => {
  const list = filteredTodos.value;
  if (isInfiniteScroll.value) return list.slice(0, visibleCount.value);
  const start = (currentPage.value - 1) * itemsPerPage;
  return list.slice(start, start + itemsPerPage);
});

const totalPages = computed(() =>
  Math.ceil(filteredTodos.value.length / itemsPerPage)
);

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const handleScroll = () => {
  if (!isInfiniteScroll.value) return;
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 50) {
    visibleCount.value += 10;
  }
};

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

const updateTodo = (
  data: { text: string; assignee: string; deadline: string; status: number },
  id: string
) => {
  const index = todos.value.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos.value[index] = { ...todos.value[index], ...data };
    saveTodos();
  }
  isModalOpen.value = false;
  editingTodo.value = null;
};

const removeTodo = (id: string) => {
  todos.value = todos.value.filter((todo) => todo.id !== id);
  saveTodos();
};

const editTodo = (todo: Todo) => {
  editingTodo.value = { ...todo };
  isModalOpen.value = true;
};

onMounted(() => {
  loadTodos();
  window.addEventListener('scroll', handleScroll);
});
</script>

<template>
  <div>
    <div class="top-controls">
      <button
        class="todolist-add"
        @click="
          editingTodo = null;
          isModalOpen = true;
        "
      >
        {{ LABELS_TODO.ADD }}
      </button>
      <button
        class="todolist-toggle"
        @click="
          isInfiniteScroll = !isInfiniteScroll;
          visibleCount = 10;
        "
      >
        {{
          isInfiniteScroll
            ? LABELS_INFIITESCROLL.INFIITE
            : LABELS_INFIITESCROLL.NOTINFIITE
        }}
      </button>
    </div>
    <div>
      <span>담당자</span>
      <select v-model="selectedAssignee" class="filter-select">
        <option value="ALL">전체</option>
        <option v-for="assignee in assignees" :key="assignee" :value="assignee">
          {{ assignee }}
        </option>
      </select>
    </div>
    <div>
      <span>상태</span>
      <select v-model="selectedStatus" class="filter-select">
        <option value="ALL">전체</option>
        <option value="COMPLETE">{{ LABELS_STATUS.COMPLETE }}</option>
        <option value="INCOMPLETE">{{ LABELS_STATUS.INCOMPLETE }}</option>
      </select>
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
        <tr v-for="(todo, index) in paginatedTodos" :key="todo.id">
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
            <div class="todolist-actions">
              <button class="todolist-edit" @click="editTodo(todo)">
                {{ LABELS_TODO.EDIT }}
              </button>
              <button class="todolist-delete" @click="removeTodo(todo.id)">
                {{ LABELS_TODO.DELETE }}
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="!isInfiniteScroll" class="todolist-pagination">
      <button @click="prevPage" :disabled="currentPage === 1">이전</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        다음
      </button>
    </div>

    <TodoModal
      v-if="isModalOpen"
      :editedTodo="editingTodo"
      @save="(data, id) => (id ? updateTodo(data, id) : addTodo(data))"
      @close="
        isModalOpen = false;
        editingTodo = null;
      "
    />
  </div>
</template>
