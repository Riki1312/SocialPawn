/** Funzioni richiamate prima dell'invio della richiesta Ajax **/


var data = null;
var dataProfile = null;

function PreLogin() {
    var obj = new Object({
        "nickName": document.getElementById("nickName").value,
        "password": document.getElementById("password").value
    });
    AjaxSend("login", obj);
}
function PreSignin() {
    if(document.getElementById("password").value == document.getElementById("passwordConf").value){
        var obj = new Object({
            "nickName": document.getElementById("nickName").value,
            "email": document.getElementById("email").value,
            "password": document.getElementById("password").value
        });
        AjaxSend("signUp", obj);
    }else
        alert("Le due password non corrispondono.");
}
function PreDataProfile() {
    AjaxSend("profileUpdate", null);
}
function PreGetPosts(numPosts) {
    var obj = new Object({
       "idUser":1,
       "numPosts":numPosts
    });
    AjaxSend("getPosts", obj);

    return data;
}
function PreUpdatePosts(idPosts){
    var obj = new Object({
        "idPosts": idPosts
    });
    //idPosts
    AjaxSend("updatePosts", obj);
}

function PreInsertLikeClap(idPosts, like, claps) {
    var obj = new Object({
        "idPosts": idPosts,
        "like": like,
        "claps": claps
    });
    //idPosts
    AjaxSend("addLikePost", obj);
}

function AjaxSend(action, obj) {
    var richiesta = new XMLHttpRequest();

    var url = "../Ajax.php?action="+action+"&data="+JSON.stringify(obj);

    richiesta.onreadystatechange=function() {

        if (richiesta.readyState == 4 && richiesta.status == 200){
            //Il server ha risposto in maniera corretta
            obj = JSON.parse(richiesta.responseText);
            switch(obj.action){
                case "login":
                    Login(obj);
                    break;
                case "signUp":
                    Signin(obj);
                    break;
                case "profileUpdate":
                    DataProfile(obj);
                    break;
                case "getPosts":
                    GetPosts(obj);
                    break;
                case "updatePosts":
                    GetPosts(obj);
                    break;
                case "myProfile":
                    MyProfile(obj);
                    break;
                case "addLikePost":
                    //Aggiornare post

                    break;

            }
        }
    }

    richiesta.open("POST", url, true);
    richiesta.send(null);
}

/** Funzioni richiamate dopo la risposta del server **/
function Login(obj) {

    if(obj.message=="001"){
        var frm = document.getElementById("login");
        frm.method="post";
        frm.action="home.html";
        frm.submit();
    }else
        $(".w-form-fail").show();
}
function Signin(obj) {

    if(obj.message=="005"){
        var frm = document.getElementById("signUp");
        frm.method="post";
        frm.action="home.html";
        frm.submit();
    }else
        alert("Sign up fallita.");

}
function DataProfile(obj) {
    dataProfile = obj.dataProfile;
}
function GetPosts(obj) {
    data = JSON.parse(obj.data);
}
function MyProfile(obj) {
    dataProfile = JSON.parse(obj.dataProfile);
}
