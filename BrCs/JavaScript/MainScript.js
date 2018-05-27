let Intervall = 1000;
let NumPosts = 10;

let HtmlPost_home;
let HtmlPost_profilo;
let Html_profilo;

function OnLoad_home() {
    HtmlPost_home = AbstractHtmlPost();

    HtmlPost_home.ClickCalps = ClikClaps;
    HtmlPost_home.ClikLike = ClikLike;
    HtmlPost_home.ClikComment = ClikComment;

    PreGetPosts(NumPosts);
    /*
    for (let i = 0; i < serverPosts.length; i++)
        HtmlPost_home.posts.push(serverPosts[i]);
    */
    const timer = setInterval(TimerTick_home, Intervall);
}

function TimerTick_home() {
    console.log("Home: update posts");

    let GetIdPosts = () => {
        let idPosts = [];
        for (let i = 0; i < HtmlPost_home.length; i++)
            idPosts.push(HtmlPost_home.posts[i].id);
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

            if (i < HtmlPost_home.leading)
            {
                //Se non rileva l'update vedi: https://vuejs.org/v2/guide/list.html#Caveats
                //Vue.set(vm.items, indexOfItem, newValue)

                HtmlPost_home.posts[i].claps = serverPosts[i].claps;
                HtmlPost_home.posts[i].likes = serverPosts[i].likes;
                HtmlPost_home.posts[i].time = serverPosts[i].time;
                HtmlPost_home.posts[i].uName = serverPosts[i].uName;
                HtmlPost_home.posts[i].uImg = serverPosts[i].uImg;
                HtmlPost_home.posts[i].cText = serverPosts[i].cText;
                HtmlPost_home.posts[i].cImg = serverPosts[i].cImg;
                HtmlPost_home.posts[i].comments = serverPosts[i].comments;
            }
            else
                HtmlPost_home.posts.push(serverPosts[i]);
        }
    }
}

function OnLoad_profilo() {
    Html_profilo = AbstractHtmlProfilo();

    //HtmlPost_profilo = AbstractHtmlProfiloPost();
    //PreGetPosts(NumPosts);
    const timer = setInterval(TimerTick_profilo, Intervall);
}

function TimerTick_profilo() {
    console.log("Profilo: update posts");

    PreDataProfile();

    if (dataProfile != null) {

        if (Html_profilo.profile.length > 0)
        {
            Html_profilo.profile[0].id = dataProfile.id;
            Html_profilo.profile[0].uName = dataProfile.uName;
            Html_profilo.profile[0].uImg = dataProfile.uImg;
            Html_profilo.profile[0].uBio = dataProfile.uBio;
            Html_profilo.profile[0].nPosts = dataProfile.nPosts;
            Html_profilo.profile[0].nFollowers = dataProfile.nFollowers;
            Html_profilo.profile[0].nFollowed = dataProfile.nFollowed;
        }
        else
            Html_profilo.profile.push(dataProfile);

        dataProfile = null;
    }
}

function ClikClaps(idPost) {
    console.log("clik claps idPost: " + idPost);
    PreInsertLikeClaps(idPost, 0, 1);
}
function ClikLike(idPost) {
    console.log("clik like: " + idPost);
    PreInsertLikeClaps(idPost, 1, 0);
}
function ClikComment(idPost) {
    console.log("clik comment: " + idPost);
}
