import CONST from '@/constants.js';

export default {
    methods: {
        $_errorNetWork(err) {
            console.log(err);
            alert('通信エラーが発生しました。時間を置いて再度試してください：'+err)
        },
    },
    computed: {
        hello: function () {
          return this.greeting + ' ' + this.world + '!'
        }
    },
    data () {
      return {
        greeting: '',
        world: 'World'
      }
    }
  }
