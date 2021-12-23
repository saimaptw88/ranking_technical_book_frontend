export const state = () => ({
  reccomendedBooks: [],
})

export const getters = {
  reccomendedBooks: (state) => {
    return state.reccomendedBooks
  },
}

export const mutations = {
  setReccomendedBook(state, books) {
    state.reccomendedBooks = books
  },
}

export const actions = {
  async setReccomendedBook({ commit }, books) {
    await this.$axios.get('/v1/home').then((response) => {
      books = response.data

      commit('setReccomendedBook', books)
    })
  },
}
