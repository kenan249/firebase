//login
var provider = new firebase.auth.GoogleAuthProvider();

$('#login').click(function(){
	firebase.auth()
	.signInWithPopup(provider)
	.then(function(result) {
      console.log(result.user);
      saveuser(result.user);
      $('#login').hide();
      $('#root').append("<img src='"+result.user.photoURL+"'/>")
	});
});
//guardar usario
function saveuser(user) {
	var usuario = {
		uid:user.uid,
		nombre:user.displayName,
		email:user.email,
		foto:user.photoURL
	}
	firebase.database().ref("usuarios/"+ user.uid)
	.set(usuario);

}

//guaradar
$('#save').click(function(){
	firebase.database().ref("usuarios")
	.set({
		nombre: "kenan",
		edad: "25",
		sexo: "m"
	});
});

//leer BD

firebase.database().ref("usuarios")
.on("child_added", function(s){
	var user = s.val();
	$('#root').append("<img width ='100px' src='"+user.foto+"'/>")

});