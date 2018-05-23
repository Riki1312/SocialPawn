let Intervall = 1000;
let NumPosts = 10;
let HtmlPost;

window.onload = () => {

    HtmlPost = AbstractHtmlPost();

    let serverPosts = PreGetPosts(NumPosts);
    /*
    for (let i = 0; i < serverPosts.length; i++)
        HtmlPost.posts.push(serverPosts[i]);
    */

    var timer = setInterval(TimerTick, Intervall);
};

function TimerTick() {

    /*let serverPosts = UpdatePost(() => {
        idPosts = [];
        for (let i = 0; i < HtmlPost.leading; i++)
            idPosts.push(HtmlPost.posts[i].id);
        return idPosts;
    });*/
    if(data!=null){
        serverPosts = JSON.parse(data.data);

        data = null;

        for (let i = 0; i < serverPosts.length; i++)
        {
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
 if (HtmlPost.posts.length)
 HtmlPost.posts.push(
 {
 id: 1
 claps: 12,
 likes: 34,
 time: "2 ORE FA",
 uName: "Utente",
 uImg: PathPngHome + "ddd",
 cText: "dddddddd",
 cImg: PathPngHome + "ssss",
 comments: [{ user: "rrr", text: "dddd" }, { user: "dgdf", text: "dffdffd" }]
 }
 );
*/

//TEST//
function GetPost() {

}
function UpdatePost() {

}

