<template>
  <div
    class="v-chat__message"
    :class="{ 'v-chat__message--right': senderId === userId }"
  >
    <div class="v-chat__message-avatar">
      <img :src="senderPic"/>
    </div>
    <div class="v-chat__message-card">
      <div class="v-chat__message-card-header">
        <div class="v-chat__sender">{{ senderName }}</div>
        <div :title="date" class="v-chat__timestamp">{{ time }}</div>
      </div>
      <div class="v-chat__message-card-body">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  computed: {
    time () {
      return moment(this.timestamp).format('hh:mm A')
    },
    date () {
      return moment(this.timestamp).format('LLLL')
    }
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      default: ''
    },
    timestamp: {
      type: Number,
      default: 0
    },

    userId: {
      type: String,
      default: ''
    },
    userName: {
      type: String,
      default: ''
    },
    userPic: {
      type: String,
      default: ''
    },

    senderId: {
      type: String,
      default: ''
    },
    senderName: {
      type: String,
      default: ''
    },
    senderPic: {
      type: String,
      default: ''
    }
  }
}
</script>
