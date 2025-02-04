<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const emits = defineEmits(['save', 'close']);

const text = ref('');
const selectedAssignee = ref('');
const deadline = ref('');

const assignees = ['김철수', '이영희', '박민수', '홍길동', '자기 자신'];

const saveTodo = () => {
  if (!text.value.trim()) return;

  emits('save', {
    text: text.value,
    assignee: selectedAssignee.value || '미정',
    deadline: deadline.value || '미설정',
  });

  text.value = '';
  selectedAssignee.value = '';
  deadline.value = '';
};
</script>

<template>
  <div class="modal-overlay">
    <div class="modal">
      <h3>할 일 추가</h3>
      <label>할 일</label>
      <input v-model="text" placeholder="할 일을 입력하세요" />

      <label>담당자</label>
      <select v-model="selectedAssignee">
        <option value="">선택하세요</option>
        <option v-for="(assignee, index) in assignees" :key="index">
          {{ assignee }}
        </option>
      </select>

      <label>마감 기한</label>
      <input type="date" v-model="deadline" />

      <div class="button-group">
        <button @click="saveTodo">저장</button>
        <button @click="$emit('close')">취소</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}

.button-group {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
</style>
