<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <CCardHeader>Поиск</CCardHeader>
      <CCardBody>
        <h6>Название</h6>
        <CInput v-model="searchPhrase" />
      </CCardBody>
    </CCard>
    <BtnAdd @click="$router.push({name: 'CategoryNew'})">Добавить категорию</BtnAdd>
    <AppPagination :pages="info.totalPages" :activePage.sync="activePage" />

    <CCardBody>
      <CDataTable :items="items" :fields="fields" border outlined striped>
        <template #edit="{item}">
          <td>
            <div class="d-flex">
              <CButton
                color="warning"
                @click="$router.push({name: 'Category', params: {id: item._id}})"
              >
                <CIcon name="cil-pencil"></CIcon>
              </CButton>
              <CButton color="danger" class="ml-2" @click="removeItem(item._id)">
                <CIcon name="cil-trash"></CIcon>
              </CButton>
            </div>
          </td>
        </template>

        <template #image="{item}">
          <td>
            <CImg :src="item.image.url" width="150px" />
          </td>
        </template>
      </CDataTable>
    </CCardBody>
  </div>
</template>

<script>
import ItemsPage from "@/mixins/ItemsPage";

export default {
  mixins: [ItemsPage],
  data() {
    return {
      fetchRoute: "categoriesSearch",
      removeRoute: "categoryById",
      searchPhrase: '',
      fields: [
        {
          key: "name",
        },
        {
          key: "slug",
        },
       
        // {
        //   key: "image",
        // },
        {
          key: "edit",
          label: "Действия",
        },
      ],
    };
  },

  methods: {},
};
</script>

<style lang="scss" >
</style>