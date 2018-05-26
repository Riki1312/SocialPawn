let Intervall = 1000;
let NumPosts = 10;

let HtmlPost_home;
let HtmlPost_profilo;
let Html_profilo;

function OnLoad_home() {
    HtmlPost_home = AbstractHtmlPost();
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

    HtmlPost_profilo = AbstractHtmlProfiloPost();
    //PreGetPosts(NumPosts);
    const timer = setInterval(TimerTick_profilo, Intervall);
}

function TimerTick_profilo() {
    console.log("Profilo: update posts");

    PreDataProfile();

    if (dataProfile != null) {

        Html_profilo.id = dataProfile.id;
        Html_profilo.uName = dataProfile.uName;
        Html_profilo.uImg = dataProfile.uImg;
        Html_profilo.uBio = dataProfile.uBio;
        Html_profilo.nPosts = dataProfile.nPosts;
        Html_profilo.nFollowers = dataProfile.nFollowers;
        Html_profilo.nFollowed = dataProfile.nFollowed;

        dataProfile = null;
    }
}
