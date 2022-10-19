export default {
  namespaced: true,
  state: {
    locale: 'zh',
    languages: [{
      value: 'en'
    },
    {
      value: 'zh'
    }]
    // isLocaleMessageLoaded: false
  },
  mutations: {
    updateLocale (state, value) {
      state.locale = value
      sessionStorage.setItem('locale', state.locale)
    }
    // updateIsLocaleMessageLoaded (state, value) {
    //   state.isLocaleMessageLoaded = value
    // }
  }
}
