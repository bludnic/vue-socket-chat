<template>
  <div>
    <v-card>
      <v-toolbar>
        <v-toolbar-title>Chat socket</v-toolbar-title>
        <v-spacer/>
        <v-text-field
          v-model="username"
          label="Username"
          hide-details
          single-line
        />
      </v-toolbar>

      <v-card-text>

        <div
          v-for="(message, i) in messages"
          :key="i"
          class="message"
        >
          <div class="headline">{{ message.username }}</div>
          <div>{{ message.message }}</div>
        </div>

      </v-card-text>

      <v-card-text>

        <v-text-field
          v-model="message"
          single-line
          hide-details
          label="Type your message"
          @keydown.enter.exact.prevent
          @keyup.enter.exact="sendMessage"
        />

      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import socket from 'socket.io-client'

const io = socket('http://localhost:3000', {
  path: '/api/socket.io'
})

export default {
  created () {
    this.attachSocketEvents()
  },
  data: () => ({
    username: '',
    message: '',
    messages: []
  }),
  methods: {
    attachSocketEvents () {
      io.on('connect', () => {
        console.log('client connect')
      })

      io.on('disconnect', () => {
        console.log('client disconnect')
      })

      io.on('chat message', (message) => {
        console.log('[message]', message)

        this.messages.push(message)
      })
    },
    emit () {
      io.emit('chat message', 'message here')
    },
    sendMessage () {
      console.log('sendMessage', this.message)

      io.emit('chat message', {
        username: this.username,
        message: this.message
      })

      this.message = ''
    }
  }
}
</script>
