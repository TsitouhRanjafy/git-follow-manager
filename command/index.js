import followers from "./followers.js";
import follow from "./follow.js";
import unfollow from "./unfollow.js";
import autoUnfollow from "./auto-unfollow.js";
import following from "./following.js";
import autoFollow from "./auto-follow.js";


const commands = [
    followers,
    following,
    follow,
    unfollow,
    autoFollow,
    autoUnfollow
]

export default commands