import { defineStore } from "pinia";
import { useMovieStore } from './movieStore';

const url = 'https://shikimori.one/api/animes?limit=10&search='

export const useSearchStore = defineStore("searchStore", {
    state: () => ({
        loader: false,
        accessData: { "access_token": "FTd-7Y__Vhqu9fZ0plfyuG-H4HexVMCk_bSSaxRNxRA", "token_type": "Bearer", "expires_in": 86400, "refresh_token": "-yBfM21wDDN5JkxRdhbulR6LMC0jZk2vWOzGXNsdE_g", "scope": "user_rates comments topics", "created_at": 1706201814 },
        animes: []
    }),
    actions: {
        async getAnimes(query) {
            this.loader = true
            const res = await fetch(url + query)
            const data = await res.json()
            console.log(data)
            this.animes = data
            this.loader = false
        },
        async addToUserAnime(object) {
            const store = useMovieStore()
            store.movies.push({...object, isWatched: false})
            store.activeTab = 1
        }
    }
})