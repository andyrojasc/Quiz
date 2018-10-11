var database = firebase.database();
var puntos=0;
var d1 = "";

function llenarFormulario()
{
    if(document.getElementById("nombreCompleto").value != "")
    {
      var nombres = document.getElementById("nombreCompleto").value;
      var notas = this.calcularNota();
      console.log("n: "+nombres+" t: "+calcularNota());

      firebase.database().ref("notasQuiz").push({
        nombre: nombres,
        nota: notas,
       }, function(error) {
          if (error) {
            // The write failed...
            console.log("shit");
          } else {
            // Data saved successfully!
             console.log("Wiiii");
          }
    });

    limpiar();
  }else{
    window.alert("Rellena todos los datos por favor");
  }
}

function calcularNota()
{
    puntos=0;

    if(document.getElementById("lanzamientoAngular").value === "31")
    {
      puntos+=20;
    }
    if(document.getElementById("compañiaAngular").value === "Yes")
    {
      puntos+=20;
    }
    if(document.getElementById("incorporacionAngular").value === "Real Madrid")
    {
      puntos+=20;
    }
    if(document.getElementById("metodologiaAngular").value === "Thibaut Courtois")
    {
      puntos+=20;
    }
    if(document.getElementById("inclusionJT").value === "No")
    {
      puntos+=20;
    }

    return puntos;
}

  function limpiar(){
    window.alert("Calificación: "+puntos);
    window.parent.location.reload();  
  }

  function preguntarDatos()
  {
      var ref = database.ref("notasQuiz");
      ref.on("value", gotData, errData);
  }

//Este metodo es muy mal optimizado, pero para el objetivo del mismo vale gaver :v
  function gotData(data){
    //console.log(data.val());
    var scores = data.val();
    var keys = Object.keys(scores);

    for (var i=0; i<keys.length; i++) {
      var k = keys[i];
      var nombre=scores[k].nombre;
      var nota=scores[k].nota;

        d1 += '<tr>'+
      '<td>'+nombre+'</td>'+
      '<td>'+nota+'</td>'+
      '</tr>';
    }

    $("#tabla1").append(d1);
  }

  function errData(err)
  {
    console.log("Error"+err);
  }