/** Funzioni richiamate prima dell'invio della richiesta Ajax **/

function PreLogin() {
    var obj = new Object({
        "email" : document.getElementById("nickName").value,
        "password" : document.getElementById("password").value
    });
    AjaxSend("login", obj);
}
function PreSignin() {

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
                case "signin":
                    Signin(obj);
                    break;
            }
        }
    }

    richiesta.open("POST", url, true);
    richiesta.send(null);
}

/** Funzioni richiamate dopo la risposta del server **/
function Login(obj) {
    var frm = document.getElementById("login");
    frm.method="post";
    frm.action="../Ajax.php";
    frm.submit();
}
function Signin(obj) {

}