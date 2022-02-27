// NOTE : 取得書籍数が複数の場合の Vuex
// NOTE : index.vue で使用する

import camelcaseKeys from 'camelcase-keys'

export const state = () => ({
  reccomendedBooks: [],
  topFiveBooks: [],
  points: [],
  titles: [],
  page: 1,
})

export const getters = {
  reccomendedBooks: (state) => {
    return state.reccomendedBooks
  },
  topFiveBooks: (state) => {
    return state.topFiveBooks
  },
  titles: (state) => {
    return state.titles
  },
  points: (state) => {
    return state.points
  },
}

export const mutations = {
  setReccomendedBooks(state, books) {
    state.reccomendedBooks = books
  },
  setTopFive(state, books) {
    state.topFiveBooks = books
  },
  setTitles(state, titles) {
    state.titles = titles
  },
  setPoints(state, points) {
    state.points = points
  },
  addReccomendedBooks(state, books) {
    for (let i = 0; i < books.length; i++) {
      state.reccomendedBooks.push(books[i])
    }
  },
  addPage(state) {
    state.page += 1
  },
}

export const actions = {
  // default & set total ranking
  async setTotalReccomendedBooks({ commit, state }) {
    await this.$axios
      .get('/v1/ranking/total/reccomended_book', {
        params: { page: state.page },
      })
      .then((response) => {
        const books = camelcaseKeys(response.data, { deep: true })
        const topFiveBooks = books.slice(0, 5)

        commit('setReccomendedBooks', books)
        commit('setTopFive', topFiveBooks)
        commit('addPage')
      })
  },

  async setTotalTopFiveTitles({ commit }) {
    await this.$axios.get('/v1/ranking/total/title').then((response) => {
      const titles = camelcaseKeys(response.data, { deep: true })

      commit('setTitles', titles)
    })
  },

  async setTotalTopFivePoints({ commit }) {
    await this.$axios.get(`v1/ranking/total/point`).then((response) => {
      const points = camelcaseKeys(response.data, { deep: true })

      commit('setPoints', points)
    })
  },

  // set yearly ranking
  async setYearlyReccomendedBooks({ commit }) {
    await this.$axios
      .get('/v1/ranking/yearly/reccomended_book')
      .then((response) => {
        const books = camelcaseKeys(response.data, { deep: true })
        const topFiveBooks = books.slice(0, 5)

        commit('setReccomendedBooks', books)
        commit('setTopFive', topFiveBooks)
      })
  },

  async setYearlyTopFiveTitles({ commit }) {
    await this.$axios.get('/v1/ranking/yearly/title').then((response) => {
      const titles = camelcaseKeys(response.data, { deep: true })

      commit('setTitles', titles)
    })
  },

  async setYearlyTopFivePoints({ commit }) {
    await this.$axios.get(`v1/ranking/yearly/point`).then((response) => {
      const points = camelcaseKeys(response.data, { deep: true })

      commit('setPoints', points)
    })
  },

  // set monthly ranking
  async setMonthlyReccomendedBooks({ commit }) {
    await this.$axios
      .get('/v1/ranking/monthly/reccomended_book')
      .then((response) => {
        const books = camelcaseKeys(response.data, { deep: true })
        const topFiveBooks = books.slice(0, 5)

        commit('setReccomendedBooks', books)
        commit('setTopFive', topFiveBooks)
      })
  },

  async setMonthlyTopFiveTitles({ commit }) {
    await this.$axios.get('/v1/ranking/monthly/title').then((response) => {
      const titles = camelcaseKeys(response.data, { deep: true })

      commit('setTitles', titles)
    })
  },

  async setMonthlyTopFivePoints({ commit }) {
    await this.$axios.get(`v1/ranking/monthly/point`).then((response) => {
      const points = camelcaseKeys(response.data, { deep: true })

      commit('setPoints', points)
    })
  },

  // commons
  async addReccomendedBooks({ commit, state }, term) {
    await this.$axios
      .get(`v1/ranking/${term.term.toLowerCase()}/reccomended_book`, {
        params: { page: state.page },
      })
      .then((response) => {
        if (response.data.length) {
          const books = camelcaseKeys(response.data, { deep: true })

          commit('addReccomendedBooks', books)
          commit('addPage')
        }
      })
  },
}
