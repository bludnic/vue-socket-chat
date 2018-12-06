<template>
  <div class="v-chat__form">
    <v-textarea
      v-model="message"
      label="Type your message"
      hide-details
      single-line
      no-resize
      rows="1"
      @keydown.enter.exact.prevent
      @keyup.enter.exact="submitMessage"
    />
  </div>
</template>

<script>
export default {
  data: () => ({
    message: ''
  }),
  methods: {
    submitMessage () {
      this.$emit('message', this.message)
      this.message = ''
    }
  }
}
</script>

<style lang="stylus" scoped>
/**
 * Remove extra margins & paddings.
 */
.v-chat__form >>> .v-text-field
  padding-top: 0
  margin-top: 0
</style>
