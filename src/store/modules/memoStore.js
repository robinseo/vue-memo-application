import axios from 'axios';

const memoAPICore = axios.create({
  baseURL: 'http://localhost:8000/api/memos'
});

export default {
  namespaced: true,
  state: {
    memos: [],
    editingId: 0
  },
  getters: {
    getMemoCount(state) {
      return state.memos.length;
    }
  },
  mutations: {
    FETCH_MEMOS(state, payload) {
      state.memos = payload;
    },
    ADD_MEMO(state, payload) {
      state.memos.push(payload);
    },
    DELETE_MEMO(state, id) {
      const targetIndex = state.memos.findIndex(v => v.id === id);
      state.memos.splice(targetIndex, 1);
    },
    UPDATE_MEMO(state, payload) {
      const {id, content} = payload;
      const targetIndex = state.memos.findIndex(v => v.id === id);
      const targetMemo = state.memos[targetIndex];
      state.memos.splice(targetIndex, 1, {...targetMemo, content});
    },

    SET_EDITING_ID(state, id) {
      state.editingId = id;
    },
    RESET_EDITING_ID(state) {
      state.editingId = 0;
    }
  },
  actions: {
    fetchMemos({commit}) {
      memoAPICore.get('/').then(res => commit('FETCH_MEMOS', res.data));
    },
    addMemo({commit}, payload) {
      memoAPICore.post('/', payload).then(res => commit('ADD_MEMO', res.data));
    },
    deleteMemo({commit}, id) {
      memoAPICore.delete(`/${id}`).then(() => commit('DELETE_MEMO', id));
    },
    updateMemo({commit}, {id, content}) {
      memoAPICore.put(`/${id}`, {content}).then(() => commit('UPDATE_MEMO', {id, content}));
    }
  }
}
