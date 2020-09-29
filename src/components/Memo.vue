<template>
  <li class="memo-item">
    <strong>{{ memo.title }}</strong>
    <p @dblclick="handleDbClick">
      <template v-if="!isEditing">{{ memo.content }}</template>
      <input v-else
             type="text"
             ref="content"
             @keydown.esc="handleEsc"
             @keydown.enter="updateMemo"
             :value="memo.content"/>
    </p>

    <button type="button" @click="deleteMemo"><i class="fas fa-times"></i></button> <!--@ 는 v-on@임 -->
  </li>
</template>

<script>
export default {
  name: "Memo",

  props: {
    memo: {type: Object},
    editingId: {type: Number}
  },

  methods: {
    deleteMemo() { //Vue Method는 Arrow Function을 쓰면 안됨. this가 VueInstance를 가르켜야 하기 때문에.
      this.$emit('deleteMemo', this.memo.id);
    },
    updateMemo(e) {
      const id = this.memo.id;
      const content = e.target.value.trim();
      if (content.length <= 0) {
        alert('내용을 입력하세요');
        return false;
      }
      this.$emit('updateMemo', {id, content});
      this.$emit('resetEditingId');
      this.$refs.content.blur();
    },
    handleDbClick() {
      this.$emit('setEditingId', this.memo.id);
      this.$nextTick(() => { //nextTick은 다음 리랜더링이 발생한 시점에서 실행시킬 수 있도록 해준다. Promise를 리턴함
        this.$refs.content.focus(); //isEditing이 True로 변경된 후 Input이 보이도록 렌더링 되야 DOM 접근이 가능함
      });
    },
    handleEsc() {
      this.$emit('resetEditingId');
    }
  },

  computed: {
    isEditing() {
      return this.memo.id === this.editingId;
    }
  }
}
</script>

<style scoped>
.memo-item {
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;
  padding: 24px;
  box-shadow: 0 4px 10px -4px rgba(0, 0, 0, .2);
  background-color: #fff;
  list-style: none;
}

.memo-item button {
  background: none;
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 20px;
  color: #e5e5e5;
  border: 0;
}

.memo-item strong {
  display: block;
  margin-bottom: 12px;
  font-size: 18px;
  font-weight: normal;
  word-break: break-all;
}

.memo-item p {
  margin: 0;
  font-size: 14px;
  line-height: 22px;
  color: #666;
}

.memo-item p input[type="text"] {
  box-sizing: border-box;
  width: 100%;
  font-size: inherit;
  border: 1px solid #999;
}
</style>
