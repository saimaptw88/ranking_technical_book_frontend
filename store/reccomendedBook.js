// NOTE : 取得書籍数が単数の場合の Vuex
// NOTE : _id.vue で使用する

import camelcaseKeys from 'camelcase-keys'

export const state = () => ({
  title: '',
  authors: '',
  publicationData: '',
  explanation: '',
  thumbnailUrl: '',
  affiliateUrl: '',
  qiitaLgtm: 0,
  qiitaTitles: [],
  qiitaTags: [],
})

export const getters = {
  title: (state) => {
    return state.title
  },
  authors: (state) => {
    return state.authors
  },
  publicationData: (state) => {
    return state.publicationData
  },
  explanation: (state) => {
    return state.explanation
  },
  thumbnailUrl: (state) => {
    return state.thumbnailUrl
  },
  affiliateUrl: (state) => {
    return state.affiliateUrl
  },
  qiitaLgtm: (state) => {
    return state.qiitaLgtm
  },
  qiitaTitles: (state) => {
    return state.qiitaTitles
  },
  qiitaTags: (state) => {
    return state.qiitaTags
  },
}

export const mutations = {
  setTitle(state, title) {
    state.title = title
  },
  setAuthors(state, authors) {
    state.authors = authors
  },
  setPublicationData(state, publicationData) {
    state.publicationData = publicationData
  },
  setExplanation(state, explanation) {
    state.explanation = explanation
  },
  setThumbnailUrl(state, thumbnailUrl) {
    state.thumbnailUrl = thumbnailUrl
  },
  setAffiliateUrl(state, affiliateUrl) {
    state.affiliateUrl = affiliateUrl
  },
  setQiitaLgtm(state, qiitaLgtm) {
    state.qiitaLgtm = qiitaLgtm
  },
  setQiitaTitles(state, qiitaTitles) {
    state.qiitaTitles = qiitaTitles
  },
  setQiitaTags(state, qiitaTags) {
    state.qiitaTags = qiitaTags
  },
}

export const actions = {
  async setReccomendedBook({ commit }, bookId) {
    await this.$axios.get(`/v1/home/${bookId}`).then((res) => {
      const book = camelcaseKeys(res.data, { deep: true })

      const title = book.title
      const authors = book.author
      const publicationData = book.publicationData
      const explanation = book.explanation
      const thumbnailUrl = book.thumbnailUrl
      const affiliateUrl = book.affiliateUrl
      const qiitaLgtm = book.qiitaLgtm
      const qiitaTitles = book.qiitaTitles
      const qiitaTags = book.qiitaTags

      commit('setTitle', title)
      commit('setAuthors', authors)
      commit('setPublicationData', publicationData)
      commit('setExplanation', explanation)
      commit('setThumbnailUrl', thumbnailUrl)
      commit('setAffiliateUrl', affiliateUrl)
      commit('setQiitaLgtm', qiitaLgtm)
      commit('setQiitaTitles', qiitaTitles)
      commit('setQiitaTags', qiitaTags)
    })
  },
}
