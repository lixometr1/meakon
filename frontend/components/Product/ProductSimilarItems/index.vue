<template>
  <div class="col-sm-12 col-md-12 col-lg-8" v-if="items.length > 0">
    <!-- Swiper -->
    <client-only>
      <swiper :options="sliderOptions">
        <swiper-slide v-for="(item, idx) in items" :key="idx">
          <ProductSimilarItem :item="item" />
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </client-only>
    <!-- //swiper -->
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      items: [],
    };
  },
  async fetch() {
    await this.fetchItems();
  },
  computed: {
    sliderOptions() {
      return {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
          delay: 5000,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        spaceBetween: 5,
        // init: false,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
         320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1400: {
            slidesPerView: 3,
            spaceBetween: 29,
		  },
		  1500: {
            slidesPerView: 4,
            spaceBetween: 29,
          },
        },
      };
    },
  },
  methods: {
    async fetchItems() {
      try {
        const result = await this.$api.$get("similarProductItems", {
          slug: this.product.slug,
        });
        this.items = result.items;
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss" >
</style>