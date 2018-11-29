<template>
  <mt-popup v-model="visible" position="bottom" class="my-mint-popup">
    <mt-picker
      :showToolbar="true"
      ref="picker"
      :slots="slots"
      :value-key="valueName"
      :visibleItemCount="visibleItemCount"
    >
      <div class="my-tool-bar">
        <mt-button size="small" @click="handleConfirm" type="default" class="ok">确定</mt-button>
      </div>
    </mt-picker>
  </mt-popup>
</template>
<script>
import { Button, Popup, Picker } from 'mint-ui';
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
    },
    valueName: {
      type: String,
      default: 'value'
    },
    visibleItemCount: {
      type: Number,
      default: 3
    },
    getItem: {
      type: Function,
      default: () => { return {} }
    }
  },
  computed: {
    slots() {
      return [
        {
          flex: 1,
          values: this.list,
          textAlign: 'center'
        }
      ]
    }
  },
  data() {
    return {
      visible: this.value
    };
  },
  mounted() {
    console.log(this.list)
  },
  methods: {
    handleConfirm() {
      this.visible = false;
      const data = this.$refs.picker.getValues()[0] || {};
      this.getItem(data)
    }
  },
  watch: {
    value: {
      deep: true,
      handler(val) {
        this.visible = val;
      }
    },
    visible: {
      deep: true,
      handler(val) {
        this.$emit("input", this.visible);
      }
    }
  }
}
</script>
<style scoped>
.my-mint-popup {
  width: 100%;
}
.my-tool-bar {
  height: 100%;
  text-align: right;
}
.ok {
  margin-right: 20px;
  border: 0;
  background: #697eff;
  color: #ffffff;
  border-radius: 2px;
  outline: none;
}
</style>
<style>
.my-mint-popup .picker-toolbar {
  height: 50px;
  line-height: 50px;
}
</style>
