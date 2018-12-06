<template>
  <v-layout row wrap justify-center fill-height>

    <v-flex xs12 sm12 md5 lg5>

      <v-card class="chat">

        <v-chat
          :messages="messages"
          :user="user"
          :loading="loading"

          message-key="message"
          per-page="10"
          send-on-enter
          dark
          no-data-text
          hide-header

          @scroll:top="onScrollTop"
          @scroll:bottom="onScrollBottom"

          ref="chat"

          :transition="enableTransition"
        >
          <v-toolbar flat slot="header" class="toolbar hidden-sm-and-down">
            <v-toolbar-title>Vuetify Chat</v-toolbar-title>

            <v-spacer/>

            <v-btn @click="pushNewMessage" color="primary">Push Message</v-btn>
            <v-btn @click="shuffle" color="secondary">Shuffle</v-btn>

            <v-checkbox
              v-model="enableTransition"
              hide-details
              label="Transition"
            />
          </v-toolbar>

          <v-chat-form slot="form"
            @message="onMessage"
          />
        </v-chat>

      </v-card>

    </v-flex>

  </v-layout>
</template>

<script>
import socket from 'socket.io-client'
import { shuffle } from 'lodash'
import { createRandomMessages, createOneMessage, user } from '~/components/__tests__/__mocks__/chatMessages'
import VChat from '~/components/VChat/VChat'
import VChatForm from '~/components/VChat/VChatForm'

export default {
  created () {
    const io = socket('http://localhost:3000', {
      path: '/api/socket.io'
    })

    io.on('connect', () => {
      console.log('client connect')
    })
    io.on('event', () => {
      console.log('client event')
    })
    io.on('disconnect', () => {
      console.log('client disconnect')
    })
  },
  mounted () {
    this.loading = true

    this.fetchMessages(25)
      .then(messages => this.messages.unshift(...messages))
      .catch(err => console.error(err))
      .finally(() => {
        this.loading = false
      })
  },
  data: () => ({
    messages: [],
    user,
    loading: false,
    enableTransition: false
  }),
  methods: {
    onMessage (message) {
      let oneMessage = createOneMessage()
      oneMessage.sender = { ...user }
      oneMessage.timestamp = (new Date()).getTime()
      oneMessage.message = message

      this.messages.push(oneMessage)

      this.$nextTick(() => {
        this.$refs.chat.scrollToBottom()
      })
    },
    onScrollTop () {
      this.loading = true

      this.fetchMessages(10)
        .then(messages => this.messages.unshift(...messages))
        .catch(err => console.error(err))
        .finally(() => {
          this.loading = false
          this.$refs.chat.maintainScrollPosition()
        })
    },
    onScrollBottom () {
      //
    },
    fetchMessages (count) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          return resolve(createRandomMessages(count))
        }, 2000)
      })
    },
    shuffle () {
     this.messages = shuffle(this.messages)
    },
    pushNewMessage () {
      const messages = createRandomMessages(1)
      this.messages.push(...messages)

      this.$nextTick(() => {
        this.$refs.chat.scrollToBottom()
      })
    }
  },
  components: {
    VChat,
    VChatForm
  }
}
</script>

<style scoped lang="stylus">
  .chat
    height: 100%
    max-height: 700px
  .toolbar >>> .v-input
    flex: unset
</style>
