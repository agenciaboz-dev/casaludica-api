import { ApifyClient } from "apify-client"
import { InstagramPost } from "../types/shared/instagram/post"
import fs from "fs"

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

const getPosts = () => {
    try {
        const posts = JSON.parse(fs.readFileSync("./instagram_posts.json", { encoding: "utf-8" })) as InstagramPost[]
        return posts
    } catch (error) {
        console.log(error)
        return []
    }
}

const fetchPosts = async () => {
    console.log("fetching posts")
    const run = await client.actor("shu8hvrXbJbY3Eb9W").call(input)
    const { items } = await client.dataset(run.defaultDatasetId).listItems()
    fs.writeFileSync("./instagram_posts.json", JSON.stringify(items, null, 4))
    return items
}

export default { fetchPosts, getPosts }
