/*

 for (let i = 0; i < Numero; i++) {
 posts.posts.push(
     {
         claps: Dati[i].claps,
         likes: Dati[i].likes,
         time: Dati[i].tempo,
         uName: Utente[i].nome,
         uImg: PathPngHome + Utente[i].imgProfilo,
         cText: Contenuto[i].testo,
         cImg: PathPngHome + Contenuto[i].imgs,
         comments: [{ user: Commenti[i][0].nome, text: Commenti[i][0].testo }, { user: Commenti[i][1].nome, text: Commenti[i][1].testo }]
     }
 );
 }

 */

let PathSvgHome = "../Img/svg-home-profilo/";
let PathPngHome = "../";

function AbstractHtmlPost(postContainer = "postcontainer") {

    document.getElementsByClassName(postContainer)[0].innerHTML = '' +
        '<div class="mainpost" v-for="post in posts">' +
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
        '<p class="paragraph">' +
        '<strong class="bold-text">{{ post.comments[0].user }}: </strong>' +
        '{{ post.comments[0].text }}' +
        '</p>' +
        '<p class="paragraph">' +
        '<strong class="bold-text">{{ post.comments[1].user }}: </strong>' +
        '{{ post.comments[1].text }}' +
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