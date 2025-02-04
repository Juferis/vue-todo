# Vue Todo List

## Project Overview

> Vue.js + TypeScript + Vite를 활용하여 간단한 Todo List 애플리케이션

## Features
[X] 할 일 추가/수정, 삭제, 완료/미완료 상태 변경 기능

[X] 상태/담당자 필터링 기능

[X] 할 일 목록은 로컬 스토리지에 저장

[X] 페이지네이션 기능

[X] CSS를 활용하여 간단하게 스타일링


## 🚀 Getting Started

### 1️⃣ 필요한 패키지 설치

- `npm install`

### 2️⃣ 개발 서버 실행

- `npm run dev`
- 실행 후 브라우저에서 http://localhost:5173로 접속 가능

## 🔄 Event Workflow (이벤트 실행 및 워크플로우)

### ✅ 1. 할 일 추가

- 추가 버튼 클릭 시 TodoModal.vue가 열림
- 입력된 할 일, 담당자, 기한 정보를 addTodo 이벤트를 통해 TodoList.vue로 전달
- todos 리스트에 추가 후 로컬스토리지 저장

### ✅ 2. 할 일 수정

- 수정 버튼 클릭 시 해당 항목 데이터를 TodoModal.vue로 전달
- 수정된 데이터는 updateTodo 이벤트를 통해 반영
- 수정 후 로컬스토리지 업데이트

### ✅ 3. 할 일 삭제

- 삭제 버튼 클릭 시 removeTodo 실행
- 해당 ID의 데이터를 삭제 후 로컬스토리지 업데이트

### ✅ 4. 필터 기능

- 담당자 필터 적용 시 특정 담당자의 할 일만 표시됨
- 완료/미완료 필터 적용 시 선택한 상태의 할 일만 표시됨
- 담당자 및 상태 필터 조합 가능

### ✅ 5. 페이지네이션 & 인피니트 스크롤

- 기본적으로 10개씩 페이지네이션 적용
- 무한 스크롤 모드 활성화 시 화면 크기에 맞춰 동적 로드

## 🛠 Tech Stack

- Frontend: Vue.js 3 + TypeScript + Vite
- State Management: Vue Composition API (ref, computed)
- Storage: LocalStorage (localStorage.setItem)
- UI/UX: CSS 모듈 및 다크 모드 지원
