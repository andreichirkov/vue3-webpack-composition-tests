import {reactive, readonly} from "vue";
import {Post} from "@/mocks";

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


}

const store = new Store({
  posts: {
    ids: [],
    all: new Map(),
    loaded: false
  }
})
