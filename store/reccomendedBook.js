export const state = () => ({
  reccomendedBooks: [],
  topFiveBooks: [],
  totalPoints: [],
  titles: [],
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
  totalPoints: (state) => {
    return state.totalPoints
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
  setTotalPoints(state, totalPoints) {
    state.totalPoints = totalPoints
  },
}

export const actions = {
  async setReccomendedBooks({ commit }, books, topFiveBooks) {
    await this.$axios.get('/v1/home').then((response) => {
      books = response.data
      topFiveBooks = books.slice(0, 5)

      commit('setReccomendedBooks', books)
      commit('setTopFive', topFiveBooks)
    })
  },

  async setTopFiveTitles({ commit }, titles) {
    await this.$axios.get('/v1/ranking/title').then((response) => {
      titles = response.data

      commit('setTitles', titles)
    })
  },

  async setTopFiveTotalPoints({ commit }, totalPoints) {
    await this.$axios.get(`v1/ranking/total_point`).then((response) => {
      totalPoints = response.data

      commit('setTotalPoints', totalPoints)
    })
  },
}
