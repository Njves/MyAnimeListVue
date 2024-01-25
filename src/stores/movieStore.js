import { defineStore } from "pinia";
import { watch } from "vue"

export const useMovieStore = defineStore("movieStore", {
    state: () => ({
        movies: localStorage.getItem('animes') ? JSON.parse(localStorage.getItem('animes')) : [],
        activeTab: 2,
    }),
    getters: {
        watchedMovies() {
            console.log(this.movies)
            return this.movies.filter((movie) => movie.isWatched)
        },
        totalWatchedMovies() {
            return this.movies.filter((movie) => movie.isWatched).length
        },
        totalCountMovies() {
            return this.movies.length
        }
    },
    actions: {
        subscribe() {
            this.$subscribe((mutation, state) => {
                localStorage.setItem('animes', JSON.stringify(this.movies))
            })
        },
        setActiveTab(id) {
            this.activeTab = id
        },

        toggleWatched(id) {
            const index = this.movies.findIndex(el => el.id == id)
            this.movies[index].isWatched = !this.movies[index].isWatched
        },
        removeMovie(id) {
            this.movies = this.movies.filter(el => el.id !== id)
        }
    }
});