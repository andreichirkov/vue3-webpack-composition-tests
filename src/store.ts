import {reactive, readonly} from "vue";
import {Post, today, thisWeek, thisMonth} from "@/mocks";
import axios from "axios";

interface State {
  posts: PostsState
}

//store.state.posts.ids
//store.state.posts.all[1]

interface PostsState {
  ids: string[]
  all: Map<string, Post>
  loaded: boolean
}

class Store {
  private state: State

  constructor(initial: State) {
    this.state = reactive(initial)
  }

  getState() {
    return readonly(this.state)
  }

  async fetchPosts() {
    const response = await axios.get<Post[]>('/posts')

    const postsState: PostsState = {
      ids: [],
      all: new Map,
      loaded: true
    }

    for (const post of response.data) {
      postsState.ids.push(post.id)
      postsState.all.set(post.id, post)
    }


    this.state.posts = postsState

    console.log(this.state.posts)
  }
}

const all = new Map<string, Post>()

const store = new Store({
  posts: {
    all,
    ids: [],
    loaded: false
  }
})

export function useStore() {
  return store
}
