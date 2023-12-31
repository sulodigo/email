document.addEventListener("DOMContentLoaded", function() { //con esta formula se asegura que se descargue todo el codigo html

    const email = {
        email: "",
        asunto: "",
        mensaje: ""
    }




    //seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector("#email");
    const inputAsunto = document.querySelector("#asunto");
    const inputMensaje = document.querySelector("#mensaje");
    const formulario = document.querySelector("#formulario");
    const btnSubmit = document.querySelector("#formulario button[type='submit']");
    const btnReset = document.querySelector("#formulario button[type='reset']");
    const spinner = document.querySelector("#spinner");


    // console.log(inputEmail);
    // console.log(inputAsunto);
    // console.log(inputMensaje);

//asignar eventos
    inputEmail.addEventListener("input", validar); //blur hace que se ponga el campo rojo al hacer click afuera
    inputAsunto.addEventListener("input", validar);//input se va actualizando la info en el momento
    inputMensaje.addEventListener("input", validar);

    formulario.addEventListener("submit", enviarEmail);

    btnReset.addEventListener("click", function(e){
        e.preventDefault();

        //reiniciar el objeto
        resetFormulario();
    })

    function enviarEmail(e){
        e.preventDefault();

        spinner.classList.add("flex");
        spinner.classList.remove("hidden");

        setTimeout(() => {
            spinner.classList.remove("flex");
            spinner.classList.add("hidden");

            resetFormulario();

            //crear una alerta
            const alertaExito = document.createElement("P");
            alertaExito.classList.add("bg-green-500", "text-white", "p-2", "text-center", "rounded-lg", "mt-10", "font-bold", "text-sm", "uppercase");
            alertaExito.textContent = "Mensaje enviado correctamente";

            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();                
            }, 4000);
        }, 4000);

    }

    function validar(e){
        //console.log(e.target.parentElement.nextElementSibling);//nextElementSibling es para saltarte al siguiente div
        if(e.target.value.trim() === ""){ //muestra lo que se escribe
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = "";
            gestionarSubmit();
            return;
        }

        if(e.target.id === "email" && !validarEmail(e.target.value)){
            mostrarAlerta("El email no es válido", e.target.parentElement);
            email[e.target.name] = "";
            gestionarSubmit();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        //asignar los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();

        //comprobar el objeto de email
        gestionarSubmit();

        };
    

    function mostrarAlerta(mensaje, referencia){
       limpiarAlerta(referencia);

        //generar alerta en html
        const error = document.createElement("P");
        error.textContent = mensaje;
        error.classList.add("bg-red-600", "text-white", "p-2", "text-center"); //bg se refiere a background

        //inyectar el error al formulario
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia){
        //comprueba si ya existe una alerta
        const alerta = referencia.querySelector(".bg-red-600");
        if(alerta){
            alerta.remove();
        }
    }

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email);
        return resultado; 
    }

    function gestionarSubmit(){
        if(Object.values(email).includes("")){
            btnSubmit.classList.add("opacity-50");
            btnSubmit.disabled = true; //desactivar
            return;
        }        
        btnSubmit.classList.remove("opacity-50");
        btnSubmit.disabled = false; //activar
    }

    function resetFormulario(){
        email.email = "";
        email.asunto = "";
        email.mensaje = "";

        formulario.reset();
        gestionarSubmit();
    }


});
