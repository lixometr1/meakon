<template>
  <ul class="filter_tabs__material" :class="{ show: show, hide: !show }">
    <h3>{{ name }}</h3>
    <ul class="filter_tab__subcat">
      <!-- <li></li> -->
      <li v-for="(attrValue, idx) in attrValues" :key="idx">
        <label class="checkbox-other">
          <input
            type="checkbox"
            :checked="value.includes(attrValue.slug)"
            @change="onValueChange($event, attrValue.slug)"
          />
          <span>{{ attrValue.name }}</span>
        </label>
      </li>
    </ul>
    <div class="filter_tab__hide" @click="toggleShow">
      <div class="arrow arrow-top"></div>
    </div>
  </ul>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      show: true,
    };
  },
  computed: {
    theId() {
      return `attr-value-${this._uid}-`;
    },
    name() {
      return this.$langValue(this.item.name, "name");
    },
    attrValues() {
      return this.item.value.map((attrVal) => ({
        ...attrVal,
        name: this.$langValue(attrVal, "name"),
      }));
    },
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    emitData(value) {
      this.$emit("input", value);
    },
    onValueChange(e, attrValueSlug) {
      const active = e.target.checked;
      if (active) {
        if (this.value.includes(attrValueSlug)) return;
        const newValue = [...this.value, attrValueSlug];
        this.emitData(newValue);
      } else {
        console.log("here", this.value, attrValueSlug);
        if (!this.value.includes(attrValueSlug)) return;
        const newValue = this.value.filter((slug) => slug !== attrValueSlug);
        this.emitData(newValue);
      }
    },
  },
};
</script>

<style lang="scss" >
</style>