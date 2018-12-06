<template>
  <div class="v-chat">
    <div class="v-chat__content">

      <slot name="header"></slot>

      <v-divider/>

      <slot>
        <div class="v-chat__body">
          <div class="text-xs-center py-2">
            <v-progress-circular
              v-show="loading"
              indeterminate
              color="primary"
              size="24"
              style="z-index: 100"
            />
          </div>

          <div ref="messages" class="v-chat__body-messages">

            <transition-group :name="enableTransitionGroup ? 'messages' : ''" tag="div" :css="false">
              <template v-for="message in messages">

                <v-chat-message
                  v-if="message.type === 'message'"
                  :key="message.id"

                  :id="message.id"
                  :message="message.message"
                  :timestamp="message.timestamp"

                  :user-id="user.id"
                  :user-name="user.name"
                  :user-pic="user.pic"

                  :sender-id="message.sender.id"
                  :sender-name="message.sender.name"
                  :sender-pic="message.sender.pic"
                />
                <v-chat-transaction
                  v-if="message.type === 'transaction'"
                  :key="message.id"

                  :id="message.id"
                  :message="message.message"
                  :timestamp="message.timestamp"

                  :user-id="user.id"
                  :user-name="user.name"
                  :user-pic="user.pic"

                  :sender-id="message.sender.id"
                  :sender-name="message.sender.name"
                  :sender-pic="message.sender.pic"

                  :amount="message.amount"
                  :currency="message.currency"
                />
              </template>
            </transition-group>
          </div>
        </div>
      </slot>

      <v-divider/>

      <slot name="form"></slot>
    </div>
  </div>
</template>

<script>
import VChatMessage from './VChatMessage'
import VChatTransaction from './VChatTransaction'

export default {
  mounted () {
    this.attachScrollListener()
  },
  beforeDestroy(){
    this.destroyScrollListener()
  },
  computed: {
    enableTransitionGroup: {
      get () {
        return this.transition
      },
      set (value) {
        this.$emit('update:transition', value)
      }
    }
  },
  data: () => ({
    currentScrollHeight: 0,
    currentScrollTop: 0
  }),
  methods: {
    attachScrollListener () {
      this.$refs.messages.addEventListener('scroll', this.onScroll)
    },
    destroyScrollListener () {
      // this.$refs.messages.removeEventListener('scroll', this.onScroll)
    },
    onScroll () {
      const scrollHeight = this.$refs.messages.scrollHeight
      const scrollTop = this.$refs.messages.scrollTop
      const clientHeight = this.$refs.messages.clientHeight

      // Scrolled to Bottom
      if (scrollHeight - scrollTop === clientHeight) {
        this.$emit('scroll:bottom')
      } else if (scrollTop === 0) { // Scrolled to Top
        // Save current `scrollHeight` to maintain scroll
        // position when unshift new messages
        this.currentScrollHeight = scrollHeight

        this.$emit('scroll:top')
      }

      // Save currentScrollTop.
      // Used when scrolled bottom while loading messages.
      this.currentScrollTop = this.$refs.messages.scrollTop
    },
    // Fix scroll position after unshift new messages.
    // Called from parent component.
    maintainScrollPosition () {
      this.$refs.messages.scrollTop =
        this.$refs.messages.scrollHeight - this.currentScrollHeight + this.currentScrollTop
    },
    // Scroll to Bottom when new message.
    // Called from parent component.
    scrollToBottom () {
      this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
    }
  },
  components: {
    VChatMessage,
    VChatTransaction
  },
  props: {
    messages: {
      type: Array
    },
    user: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    transition: { // for tests
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="stylus" scoped>
  .messages-move
    transition: transform 1s
</style>
