<script>
let chatDataRef = firebase.database().ref('/chatData/')
export default {
  name: 'chatRoom',
  components: {},
  data() {
    return {
      tempMessage: '',
      username: '',
      message: '',
      messages: [
        // {
        //   username: 'Zero',
        //   message: 'Hello 你好',
        //   timestamp: '2018/08/04'
        // },
        // {
        //   username: 'Casper',
        //   message: 'Hello',
        //   timestamp: '2018/08/04'
        // }
      ]
    }
  },
  methods: {
    submitMessage() {
      let vm = this
      // 避免亂數產生，使用時間命名
      var timestamp = Math.floor(Date.now())
      // console.log(timestamp)

      // input都不能空白
      if (!vm.tempMessage | !vm.username) {
        return
      }

      // 計算時間
      function timeStamp2String(time) {
        var datetime = new Date()
        datetime.setTime(time)
        var year = datetime.getFullYear()
        var month = datetime.getMonth() + 1
        var date = datetime.getDate()
        var hour = datetime.getHours()
        var minute = datetime.getMinutes()
        var second = datetime.getSeconds()
        return (
          year +
          '-' +
          month +
          '-' +
          date +
          ' ' +
          hour +
          ':' +
          minute +
          ':' +
          second
        )
      }
      var nowDate = timeStamp2String(timestamp)
      // console.log(nowDate)
      // 測試是否取得Data
      // console.log({
      //   username: vm.username,
      //   message: vm.tempMessage,
      //   time: new Date()
      // })
      chatDataRef.child(timestamp).set({
        time: nowDate,
        username: vm.username,
        message: vm.tempMessage
      })
      vm.tempMessage = ''
    }
  },
  mounted() {
    let vm = this
    chatDataRef.orderByChild('timestamp').on('value', function(snapshot) {
      var val = snapshot.val()
      // console.log(val)
      vm.messages = val
    })
  },
  computed: {}
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
