<template>
  <div class="memo-form">
    <form @submit.prevent="addMemo"> <!-- @submit ==> v-on@submit, v-on은 이벤트리스너 -->
      <fieldset>
        <div>
          <input class="memo-form__title-form"
                 v-model="title"
                 type="text"
                 placeholder="메모의 제목을 입력해주세요"/>
          <textarea class="memo-form__content-form"
                    v-model="content"
                    placeholder="메모의 내용을 입력해주세요"/>
          <button type="reset"><i class="fas fa-sync-alt"></i></button>
          <button type="submit">등록하기</button>
        </div>
      </fieldset>
    </form>

  </div>
</template>

<script>
export default {
  name: "MemoForm",
  data() {
    return {
      title: '',
      content: '',
    }
  },
  methods: {
    resetField() {
      this.title = '';
      this.content = '';
    },
    addMemo() {
      const {title, content} = this; //this는 VueComponent임. data에 선언한게 VueComponent Root Property에 다 들어가있음..
      const isEmpty = title.length <= 0 || content.length <= 0;
      if (isEmpty) {
        return false;
      }
      this.$emit('addMemo', {title, content}); //eventname과 payload를 던져주면 Parent가 이 이벤트를 잡을 수 있음
      this.resetField();
    }
  }
}
</script>

<style scoped>
.memo-form {
  margin-bottom: 24px;
  padding-bottom: 40px;
  border-bottom: 1px solid #eee;
}

.memo-form form fieldset div {
  position: relative;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px -4px rgba(0, 0, 0, .2);
  background-color: #ffffff;
}

.memo-form form fieldset div button[type="reset"] {
  position: absolute;
  right: 5px;
  bottom: 5px;
  font-size: 16px;
  background: none;
}

.memo-form form fieldset div button[type="submit"] {
  position: absolute;
  right: 0;
  bottom: -55px;
  width: 96px;
  padding: 12px 0;
  border-radius: 4px;
  background-color: #ff5a00;
  color: #fff;
  font-size: 16px;
}

.memo-form form fieldset .memo-form__title-form {
  width: 100%;
  margin-bottom: 12px;
  font-size: 18px;
  line-height: 26px;
}

.memo-form form fieldset .memo-form__content-form {
  width: 100%;
  height: 66px;
  font-size: 14px;
  line-height: 22px;
  vertical-align: top;
}

.memo-form input:focus {
  outline: none;
}
</style>
