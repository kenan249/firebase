//login
var provider = new firebase.auth.GoogleAuthProvider();
$('#logout').hide();


$('#login').click(function(){
	firebase.auth()
	.signInWithPopup(provider)
	.then(function(result) {
      console.log(result.user);
      saveuser(result.user);
      $('#logout').show();
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
//log
$('#log').click(function(){
	const auth= firebase.auth();
	const promise=auth.signInWithEmailAndPassword($('#email').val(),$('#password').val());
	
	var url = "dashboard.html"; 

    $(location).attr('href',url);
});




//registrar
$('#singup').click(function(){
	const auth= firebase.auth();
	const promise=auth.createUserWithEmailAndPassword($('#email').val(),$('#password').val());
});


//guaradar
$('#save').click(function(){
	firebase.database().ref("usuarios")
	.set({
		nombre: "kenan",
		edad: "25",
		sexo: "m"
	});
});
 //logout
 $('#logout').click(function(){
 	firebase.auth().signOut();
 	var url = "index.html"; 

    $(location).attr('href',url);
 });


 //lister en tiempo real para saber si esta logueado
 firebase.auth().onAuthStateChanged(firebaseUser =>{
if(firebaseUser){
console.log(firebaseUser);


var url = "dashboard.html"; 

    $(location).attr('href',url);
$('#logout').show();
$('#log').hide();
$('#login').hide();
$('#singup').hide();

}else{


console.log('no logueado');
$('#logout').hide();
$('#log').show();
$('#login').show();
$('#singup').show();
}
 });


//leer BD

const bd=firebase.database().ref('usuarios');
var userByemail =bd.orderByChild('email').equalTo('kenan249@gmail.com').limitToFirst(1);
userByemail.on('child_added',function(s){
	var u=s.val();
	console.log(u.nombre);
});

