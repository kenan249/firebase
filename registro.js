console.log("usario Registrando");
var database = firebase.database();

$('#guardar').click(function() {
	var userId= $('#email').val();
	var email= $('#email').val();
	var nombre= $('#nombre').val();
	var pass= $('#pass').val();
	writeUserData(userId, nombre, email, pass);
	console.log("usuario guardado");
});

function writeUserData(userId, name, email, pass) {
  firebase.database().ref("usuarios").push({
  	userId: userId,
    nombre : name,
    email: email,
    contraseña : pass
  });
}