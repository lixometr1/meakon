<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <!-- <CCardHeader></CCardHeader> -->
      <CCardBody>
        <EditComponent
          c="EditImage"
          v="logo"
          label="Логотип"
          :changeValue.sync="values"
          :schema="schema"
        />
        <EditComponent
          c="EditImage"
          v="logo_mob"
          label="Логотип (моб)"
          :changeValue.sync="values"
          :schema="schema"
        />
        <EditComponent
          c="AInput"
          v="phone"
          label="Телефон"
          :changeValue.sync="values"
          :schema="schema"
        />
        <EditComponent
          c="AInput"
          v="phone_en"
          label="EN Телефон"
          :changeValue.sync="values"
          :schema="schema"
        />

        <EditComponent
          c="EditMultiplyer"
          v="menu"
          label="Меню"
          :items="menuItems"
          :changeValue.sync="values"
          :schema="schema"
        />
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import AInput from "@/components/AInput";
import EditImage from "@/components/EditImage";

import merge from "lodash.merge";
export default {
  data() {
    return {
      values: {},
      schema: {},
    };
  },

  components: {
    AInput,
    EditImage,
  },
  async created() {
    this.$loading.start();
    await this.fetchItem();
    this.$loading.stop();
  },
  computed: {
    menuItems() {
      return [
        {
          c: "AInput",
          v: "name",
          label: "Название",
        },
        {
          c: "AInput",
          v: "name_en",
          label: "EN Название",
        },
        {
          c: "AInput",
          v: "url",
          label: "Url",
        },
      ];
    },
  },
  methods: {
    async save() {
      return this.$api.put(
        "widgetByName",
        { name: "header" },
        { values: this.values }
      );
    },
    async fetchItem() {
      try {
        const { data } = await this.$api.get("widgetByNameAdmin", {
          name: "header",
        });
        const values = data.values;
        this.schema = data.schema || {};
        this.values = merge({}, this.values, values);
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>