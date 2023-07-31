<template>
  <div>
    <p class="title text-center">{{ defaultText }}</p>
  </div>
</template>

<script>
export default {
  name: 'ExtensionName',
  computed: {
    defaultText () {
      return browser.i18n.getMessage('extName')
    }
  }
}
</script>

<style scoped>
.text-center {
  text-align: center;
}

.title {
  font-size: 20px;
  margin: 15px 0;
  white-space: nowrap;
}

</style>
