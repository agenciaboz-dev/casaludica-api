import { ApifyClient } from "apify-client"
import { InstagramPost } from "../types/shared/instagram/post"

const apify_token = "apify_api_IMnanN6Fzye4D7bwu5JOgPgUwvLitc3aG5iB"
const client = new ApifyClient({
    token: apify_token,
})

const input = {
    addParentData: false,
    directUrls: ["https://www.instagram.com/casaludica/"],
    enhanceUserSearchWithFacebookPage: false,
    isUserTaggedFeedURL: false,
    resultsLimit: 10,
    resultsType: "posts",
    searchLimit: 1,
    searchType: "hashtag",
}

let posts: InstagramPost[] = []

const getPosts = () => posts

const fetchPosts = async () => {
    console.log("fetching posts")
    const run = await client.actor("shu8hvrXbJbY3Eb9W").call(input)
    const { items } = await client.dataset(run.defaultDatasetId).listItems()

    console.log("done. saving posts")
    // @ts-ignore
    posts = items
    return items
}

export default { fetchPosts, posts, getPosts }
