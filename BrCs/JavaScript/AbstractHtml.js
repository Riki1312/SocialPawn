/*
Post {
    id: -,
    claps: -,
    likes: -,
    time: -,
    uName: -,
    uImg: -,
    cText: -,
    cImg: -,
    nComments -,
    comments: [{ user: -, text: - }, { user: -, text: - }]
}
Profilo {
    id: -,
    uName: -,
    uImg: -,
    uBio: -,
    nPosts: -,
    nFollowers: -,
    nFollowed: -
}
 */

let PathSvgHome = "../Img/svg-home-profilo/";
let PathPngHome = "../";

function AbstractHtmlPost(postContainer = "postcontainer") {

    document.getElementsByClassName(postContainer)[0].innerHTML = '' +
        '<div class="mainpost" v-for="post in posts" :id="post.id">' +
        '<div class="postbar">' +
        '<div class="div-block-7">' +
        '<img :src="post.uImg" class="imagepofile"/>' +
        '<div class="divmascheraprofilo">' +
        '<img src="' + PathSvgHome + 'MascheraProfilo.svg"/>' +
        '</div>' +
        '</div>' +
        '<div class="div-block-9">' +
        '<img src="' + PathSvgHome + 'sezione9-2.svg" class="image-9"/>' +
        '<div class="applausinumero">{{ post.claps }}</div>' +
        '<img src="' + PathSvgHome + 'sezione8.svg" class="image-10"/>' +
        '<div class="likenumero">{{ post.likes }}</div>' +
        '</div>' +
        '</div>' +
        '<div class="postbody">' +
        '<div class="divpost w-clearfix">' +
        '<div class="div-block-3">' +
        '<h6 class="heading">{{ post.time }}</h6>' +
        '<img src="' + PathSvgHome + 'sezione3.svg" class="image-4"/>' +
        '<img src="' + PathSvgHome + 'sezione4.svg" class="image-5"/>' +
        '</div>' +
        '<h3 class="heading-2">{{ post.uName }}</h3>' +
        '<div class="div-block-5">' +
        '<img :src="post.cImg" sizes="(max-width: 479px) 100vw, (max-width: 702px) 80vw, (max-width: 767px) 562px, 31vw" class="image-6"/>' +
        '</div>' +
        '<div class="div-block-4">' +
        '<p class="paragraph">' +
        '{{ post.cText }}' +
        '</p>' +
        '<img src="' + PathSvgHome + 'sezione5.svg"/>' +
        '</div>' +
        '<div class="div-block-4">' +
        '<p class="paragraph" v-for="comment in comments">' +
        '<strong class="bold-text">{{ comment.user }}: </strong>' +
        '{{ comment.text }}' +
        '</p>' +
        '</div>' +
        '<div class="div-block-6">' +
        '<img src="' + PathSvgHome + 'sezione6.svg" class="image-7"/>' +
        '</div>' +
        '</div>' +
        '<div class="divpostaddcom">' +
        '<div class="w-form">' +
        '<form id="wf-form-CommentoForm" name="wf-form-CommentoForm" data-name="CommentoForm" class="form">' +
        '<input type="text" class="text-field w-input" maxlength="256" name="name" data-name="Name" placeholder="Aggiungi commento ..." id="name" required=""/>' +
        '<img src="' + PathSvgHome + 'sezione7.svg" class="image-8"/>' +
        '</form>' +
        '<div class="w-form-done">' +
        '<div>Thank you! Your submission has been received!</div>' +
        '</div>' +
        '<div class="w-form-fail">' +
        '<div>Oops! Something went wrong while submitting the form.</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '';

    let posts = new Vue({
        el: '.postcontainer',
        data: {
            posts: []
        }
    });
    return posts;
}

function AbstractHtmlProfiloPost(postContainer = "divprofilo") {

    document.getElementsByClassName(postContainer)[0].innerHTML += '' +
        '<div class="postsmall w-clearfix" v-for="post in posts" :id="post.id">' +
        '<div class="postsmallinfo">' +
        '<div>' +
        '<img src="../Img/svg-home-profilo/sezione9-2.svg" class="image-14-coypy"/>' +
        '<div class="text-blockr-copy">{{ post.claps }}</div>' +
        '</div>' +
        '<div>' +
        '<img src="../Img/svg-home-profilo/sezione8.svg" class="image-14"/>' +
        '<div class="text-block-copy">{{ post.likes }}</div>' +
        '</div>' +
        '<div>' +
        '<img src="../Img/svg-home-profilo/sezione7.svg" class="image-14-copy"/>' +
        '<div class="text-blockr">{{ post.nComments }}</div>' +
        '</div>' +
        '</div>' +
        '<div class="postsmallcontainer">' +
        '<div class="div-block-20 w-clearfix">' +
        '<div class="div-block-18 w-clearfix">' +
        '<h2 class="nomeutente-copy">{{ post.uName }}</h2>' +
        '<p class="paragraph-copy">{{ post.cText }}/p>' +
        '</div>' +
        '</div>' +
        '<div class="div-block-19 w-clearfix">' +
        '<div class="text-block">Elimina</div>' +
        '<div class="text-block">Condividi</div>' +
        '<div class="text-block">Dettagli</div>' +
        '</div>' +
        '</div>' +
        '<div class="postsmallespandi">' +
        '<img src="../Img/svg-home-profilo/sezione16.svg" class="image-15"/>' +
        '</div>' +
        '</div>' +
        '';

    return new Vue({
        el: '.divprofilo',
        data: {
            posts: []
        }
    });
}

function AbstractHtmlProfilo() {

    let profile =  new Vue({
        el: '.maincontainer',
        data: {
            id: 1,
            uName: "Nome",
            uImg: "",
            uBio: "Bio",
            nPosts: 0,
            nFollowers: 0,
            nFollowed: 0
        }
    });
    return profile;
}