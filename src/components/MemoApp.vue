<template>
  <div class="memo-app">
    <memo-form @addMemo="addMemo"/> <!-- @addMemo => v-on:addMemo, v-on은 이벤트 리스너임 -->

    <ul class="memo-list">
      <memo v-for="memo in memos"
            :key="memo.id"
            :memo="memo"
            :editing-id="editingId"
            @deleteMemo="deleteMemo"
            @updateMemo="updateMemo"
            @setEditingId="SET_EDITING_ID"
            @resetEditingId="RESET_EDITING_ID"
      /> <!-- :key => v-bind:key, key와 memo가 props로 내려간다 -->
    </ul>
  </div>
</template>

<script>
import Memo from "./Memo";
import MemoForm from "./MemoForm";
import axios from "axios";
import {mapActions, mapState, mapMutations} from 'vuex';

const memoAPICore = axios.create({
  baseURL: 'http://localhost:8000/api/memos'
})

export default {
  name: "MemoApp",

  components: {Memo, MemoForm},

  created() {
    this.fetchMemos()
  },

  methods: {
    ...mapActions("memoStore", ["deleteMemo", "addMemo", "fetchMemos", "updateMemo"]),
    ...mapMutations("memoStore", ["SET_EDITING_ID", "RESET_EDITING_ID"])
  },

  computed: {
    ...mapState("memoStore", ["memos", "editingId"])
  }
}
</script>

<style scoped>
.memo-list {
  padding: 20px 0;
  margin: 0;
}
</style>
