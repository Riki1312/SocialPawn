let Intervall = 1000;
let NumPosts = 10;
let HtmlPost;

window.onload = () => {

    HtmlPost = AbstractHtmlPost();

    PreGetPosts(NumPosts);
    /*
    for (let i = 0; i < serverPosts.length; i++)
        HtmlPost.posts.push(serverPosts[i]);
    */

    var timer = setInterval(TimerTick, Intervall);
};

function TimerTick() {

    var GetIdPosts = () => {
        idPosts = [];
        for (let i = 0; i < HtmlPost.length; i++)
            idPosts.push(HtmlPost.posts[i].id);
        return idPosts;
    };
    PreUpdatePosts(GetIdPosts());

    if (data!=null) {
        let serverPosts = data;

        data = null;

        for (let i = 0; i < serverPosts.length; i++)
        {
            if (serverPosts[i].claps == null)
                serverPosts[i].claps = 0;
            if (serverPosts[i].likes == null)
                serverPosts[i].likes = 0;

            if (i < HtmlPost.leading)
            {
                //Se non rileva l'update vedi: https://vuejs.org/v2/guide/list.html#Caveats
                //Vue.set(vm.items, indexOfItem, newValue)

                HtmlPost.posts[i].claps = serverPosts[i].claps;
                HtmlPost.posts[i].likes = serverPosts[i].likes;
                HtmlPost.posts[i].time = serverPosts[i].time;
                HtmlPost.posts[i].uName = serverPosts[i].uName;
                HtmlPost.posts[i].uImg = serverPosts[i].uImg;
                HtmlPost.posts[i].cText = serverPosts[i].cText;
                HtmlPost.posts[i].cImg = serverPosts[i].cImg;
                HtmlPost.posts[i].comments = serverPosts[i].comments;
            }
            else
                HtmlPost.posts.push(serverPosts[i]);
        }
    }
}

//INFO//
/*
{
    claps: -,
    likes: -,
    time: -,
    uName: -,
    uImg: -,
    cText: -,
    cImg: -,
    comments: [{ user: -, text: - }, { user: -, text: - }]
}
 */

//TEST//
