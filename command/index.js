import followers from "./followers.js";
import follow from "./follow.js";
import unfollow from "./unfollow.js";
import autoUnfollow from "./auto-unfollow.js";
import following from "./following.js";
import autoFollow from "./auto-follow.js";
import login from "./login.js";
import notFollowedBack from "./not-followed-back.js";
import notFollowBack from "./not-follow-back.js";


const commands = [
    login,
    followers,
    following,
    follow,
    unfollow,
    autoFollow,
    autoUnfollow,
    notFollowedBack,
    notFollowBack
]

export default commands