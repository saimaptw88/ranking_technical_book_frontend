export const state = () => ({
  reccomendedBook: [],
})

export const getters = {
  ReccomendedBook: (state) => {
    return state.reccomendedBook
  },
}

export const mutations = {
  setReccomendedBook(state, books) {
    state.reccomendedBook = books
  },
}

export const actions = {
  async setReccomendedBook({ commit }) {
    await this.$axios.get('/v1/home').then((response) => {
      const books = response.data

      commit('setReccomendedBook', {
        books: books,
      })
    })
  },
}
