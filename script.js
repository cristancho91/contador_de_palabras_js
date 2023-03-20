"use strict";
let entrada, contarCaracter, contarPalabra,contarOracion,
contarParrafo,tiempoLeer, palabrasClave, palabrasClavePrincipales;

entrada = document.querySelectorAll('textarea')[0];
contarCaracter = document.querySelector('#contarCaracteres');
contarPalabra = document.querySelector('#contarPalabras');
contarOracion = document.querySelector('#contarOraciones');
contarParrafo =  document.querySelector('#contarParrafos');
tiempoLeer = document.querySelector('#tiempoLeer');
palabrasClave = document.querySelectorAll('.palabrasClave')[0];
palabrasClavePrincipales = document.querySelector('#palabrasClavesPrincipales');

// actualiza el estado cada vez que presiones una tecla 
entrada.addEventListener('keyup',function(){
    // mantiene la consola limpia para hacer visible solo los datos mas recientes
    console.clear();

    // contador de caracteres 
    // muestra el largo de cada caracter ingresado
    contarCaracter.innerHTML= entrada.value.length;

    // contador de palabras usando el metacarcter \w - remplazando esto con .* para hacer coincidir cualquier cosa entre los limites
    // de las palabras ya que no estaba tomando 'a' como una palabra.
    // esto es un golpe maestro - para contar palabras con  cualquier numero de guiones como una sola palabra 
    //[-?('w+)?]+ busca un guion y una palabra (hacemos ambas opcionales con ? ). + al final lo convierte en un patron repetido.
    //el metacaracter \b se utiliza para encontrar una coincidencia al principio o al final de una palabra.
    let expRegularPalabra= /\b[-?(\w+)?]+\b/gi;

    let palabras = entrada.value.match(expRegularPalabra);
    // console.log(palabras);
    if (palabras){
        contarPalabra.innerHTML = palabras.length;
    }else{
        contarPalabra.innerHTML= 0
    }

    //el contador de oraciones utiliza ./!/? como separador de oraciones
    let exoRegularOracion = /[.|!|?]+/g;

    if(!palabras){
        contarOracion.innerHTML= 0;
    }else{
        let oraciones = entrada.value.split(exoRegularOracion);
        // console.log(oraciones);
        contarOracion.innerHTML = oraciones.length-1;
    }

    //contador de parrafos
    let parrafos = [];
    if(!palabras){
        contarParrafo.innerHTML = 0;
    }else{
        // \n$ se encarga de las lineas vacias: lineas sin caracteres y solo \n
        //no son parrafos y no necesitan ser reemplazadoscon una cadena vacia
        const expContadorParrafo = /\n$/gm;
        let parrafos = entrada.value.replace(expContadorParrafo, '').split(/\n/);
        contarParrafo.innerHTML = parrafos.length;
        // console.log(parrafos);
    }

    //tiempo de lectura basado en 275 palabras/minuto
    if(!palabras){
        tiempoLeer.innerHTML = " 0s";
    }else{
        let segundos = Math.floor(palabras.length * 60 / 275);
        //necesitamos convertir segundos a minutos y horas.
        if(segundos > 59){
            let minutos = Math.floor(segundos/60);
            segundos = segundos - minutos * 60;
            tiempoLeer.innerHTML = minutos + "m " + segundos + "s";
        }else{
            tiempoLeer.innerHTML = segundos + "s";
        }
    }

    //descubre las palabras clave y su recuento
    //paso 1: elimina todas las palabras vacias.
    //paso 2: formar un objrto con palabras clave y su recuento
    //paso 3: ordena el objeto convirtiendolo primero en una matriz 2d
    //paso 4: muestro las palabras claves principales y su recuento.

    if(!palabras){
        debugger;
    }else{
        //paso 1: eliminando todas palabras vacias

        let palabrasNoVacias = [];
        let palabrasVacias= ["a", " acuerdo", " adelante", " ademas", "además", " adrede", " ahi", " ahí", " ahora", " al", " alli"," allí"," alrrededor", " antano", " antaño", " ante", " antes", " apenas", " aproximadamente", " aquel", " aquél", " aquella", " aquélla", " aquellas", " aquéllas", " aquello", "aquellos", " aquéllos"," aqui", " aquí", " arriba", " abajo", " asi", " así", " aun", " aún", " aunque", " b", " bajo", " bastante", " bien", " breve", " c"," casi", " cerca"," claro", " como", " cómo"," con", " conmigo"," contigo"," contra"," cual"," cuál", " cuales", " cuáles"," cuando", " cuándo", " cuanta", " cuánta"," cuantas"," cuántas", " cuanto"," cuánto"," cuantos"," cuántos"," d", " de", " debajo", " del"," delante", " demasiado"," dentro", " deprisa", " desde"," despacio"," despues"," después"," detras"," detrás"," dia", " día", " dias", " días", " donde", " dónde"," dos"," durante", " e"," el"," él", "ella"," ellas"," ellos"," en"," encima", " enfrente", " enseguida"," entre", " es", " esa", " ésa"," esas"," ésas"," ese"," ése"," eso"," esos"," ésos"," esta", " está"," ésta"," estado"," estados", " estan", " están"," estar", " estas"," éstas"," este"," éste", " esto"," estos"," éstos"," ex", " excepto"," f"," final"," fue"," fuera"," fueron"," g"," general"," gran", " h"," ha"," hasta"," hay", " horas", " hoy", " i"," incluso"," informo", " informó", " j"," junto", " k", " l"," la"," lado"," las"," le"," lejos"," lo"," los"," luego", " m"," mal"," mas"," más", " mayor", " me", " medio"," mejor"," menos"," menudo"," mi"," mí"," mia", " mía"," mias", " mías"," mientras"," mio"," mío", " mios"," míos"," mis"," mismo"," mucho"," muy"," n"," nada"," nadie"," ninguna"," no"," nos"," nosotras", " nosotros", " nuestra"," nuestras"," nuestro"," nuestros", " nueva", " nuevo"," nunca"," o"," os"," otra"," otros"," p"," pais"," país"," para"," parte"," pasado"," peor"," peor"," pero"," poco"," por"," porque"," pronto", " proximo"," proxímo", " puede", " q"," qeu"," que"," qué"," quien"," quíen"," quienes"," quiénes"," quiza"," quizá", " quizas"," quizás"," r"," raras"," repente"," s"," salvo"," se"," sé"," segun"," según"," ser"," sera"," será"," si"," sí"," sido"," siempre"," sin"," sobre"," solamente"," solo"," sólo"," son"," soyos"," su"," supuestos", " sus"," suyas"," suya"," suyo"," t"," tal"," tambien"," también"," tampoco", " tarde"," te"," temprano"," ti"," tiene"," todavia"," todavía"," todo"," todos"," tras"," tu"," tú"," tus"," tuya"," tuyas","tuyo"," tuyos"," u"," un"," una"," unas"," uno"," unos"," usted", " ustedes"," v", " veces"," vez"," vosotros"," vosotras"," vuestra","vuestro"," vuestros"," w"," x"," y"," ya"," yo"," z" ];

        for(let i = 0; i<palabras.length;i++){
            //filtrando palabras vacias y numeros
            if(!(palabrasVacias.indexOf(palabras[i].toLowerCase())=== -1 && isNaN(palabras[i]))){
                debugger;
            }else{
                palabrasNoVacias.push(palabras[i].toLowerCase());
            }
        }
        // console.log(palabrasNoVacias);

        //paso 2:formando un objeto con palabras clave y su recuento
        let palabrasClave = {};

        for(let i = 0; i<palabrasNoVacias.length;i++){
            palabrasNoVacias[i] in palabrasClave ? palabrasClave[palabrasNoVacias[i]] +=1 : palabrasClave[palabrasNoVacias[i]]=1;

        }
        

        //paso 3:ordena el objeto convirtiendolo primero en un array 2d
        let palabrasClavesOrdenadas= [];
        for(let palabraClave in palabrasClave){
            palabrasClavesOrdenadas.push([palabraClave, palabrasClave[palabraClave]]);
        }
        palabrasClavesOrdenadas.sort((a,b)=>{
            return b[1]-a[1];
        })
        
        // console.log(palabrasClavesOrdenadas);

        // paso 4: muestra las catro palabras claves principales y su recuento

        palabrasClavePrincipales.innerHTML = " ";
        for(let i= 0; i < palabrasClavesOrdenadas.length && i<4;i++){
            let lista = document.createElement('li');
            lista.innerHTML = "<b>" + palabrasClavesOrdenadas[i][0]+ "</b>: " + palabrasClavesOrdenadas[i][1];
            palabrasClavePrincipales.appendChild(lista); 
        }
    }
    palabras ? palabrasClave.style.display = "block": palabrasClave.style.display="none";
    
})
