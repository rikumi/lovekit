var app = new Vue({
  el: '#app',
  data: function() {
    return {
      isLogin: !!/oauth_token=/.test(location.search),
      redirectUrl: '',
      friends: null,
      loading: true,
      error: false
    }
  },
  created: function() {
    this.initRedirectUrl()
    this.initFriends()
  },
  methods: {
    initRedirectUrl: function () {
      if (!this.isLogin) {
        axios.get('https://rikumi.lib.id/lovekit/').then(function (res) {
          app.loading = false
          app.redirectUrl = res.data
        }).catch(function () {
          app.loading = false
          app.error = true
        })
      }
    },
    initFriends: function () {
      if (this.isLogin) {
        axios.get('https://rikumi.lib.id/lovekit/' + location.search).then(function (res) {
          app.loading = false
          app.friends = res.data
        }).catch(function () {
          app.loading = false
          app.error = true
        })
        // history.replaceState({}, null, 'https://rikumi.github.io/lovekit/')
      }
    }
  }
})