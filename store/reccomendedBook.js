export const state = () => ({
  reccomendedBooks: [],
  topFiveBooks: [],
  points: [],
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
}

export const actions = {
  // default & set total ranking
  async setTotalReccomendedBooks({ commit }) {
    await this.$axios
      .get('/v1/ranking/total/reccomended_book')
      .then((response) => {
        const books = response.data
        const topFiveBooks = books.slice(0, 5)

        commit('setReccomendedBooks', books)
        commit('setTopFive', topFiveBooks)
      })
  },

  async setTotalTopFiveTitles({ commit }) {
    await this.$axios.get('/v1/ranking/total/title').then((response) => {
      const titles = response.data

      commit('setTitles', titles)
    })
  },

  async setTotalTopFivePoints({ commit }) {
    await this.$axios.get(`v1/ranking/total/point`).then((response) => {
      const points = response.data

      commit('setPoints', points)
    })
  },

  // set yearly ranking
  async setYearlyReccomendedBooks({ commit }) {
    await this.$axios
      .get('/v1/ranking/yearly/reccomended_book')
      .then((response) => {
        const books = response.data
        const topFiveBooks = books.slice(0, 5)

        commit('setReccomendedBooks', books)
        commit('setTopFive', topFiveBooks)
      })
  },

  async setYearlyTopFiveTitles({ commit }) {
    await this.$axios.get('/v1/ranking/yearly/title').then((response) => {
      const titles = response.data

      commit('setTitles', titles)
    })
  },

  async setYearlyTopFivePoints({ commit }) {
    await this.$axios.get(`v1/ranking/yearly/point`).then((response) => {
      const points = response.data

      commit('setPoints', points)
    })
  },

  // set monthly ranking
  async setMonthlyReccomendedBooks({ commit }) {
    await this.$axios
      .get('/v1/ranking/monthly/reccomended_book')
      .then((response) => {
        const books = response.data
        const topFiveBooks = books.slice(0, 5)

        commit('setReccomendedBooks', books)
        commit('setTopFive', topFiveBooks)
      })
  },

  async setMonthlyTopFiveTitles({ commit }) {
    await this.$axios.get('/v1/ranking/monthly/title').then((response) => {
      const titles = response.data

      commit('setTitles', titles)
    })
  },

  async setMonthlyTopFivePoints({ commit }) {
    await this.$axios.get(`v1/ranking/monthly/point`).then((response) => {
      const points = response.data

      commit('setPoints', points)
    })
  },
}
