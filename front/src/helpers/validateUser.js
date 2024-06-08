export default function validateUser(user) {
    const emailRegex = /\S+@\S+\.\S+/;
    const errors = {};

    if(!user.username) {
        errors.username = "Debe ingresar un nombre de usuario";
    } else {
        if(!emailRegex.test(user.username)) {
            errors.username = "Nombre de usuario debe ser un correo válido"
        }
    }

    if(!user.password) {
        errors.password = "Debe ingresar una contraseña"
    } else {
        if(user.password.length < 4) {
            errors.password = "Contraseña debe tener mínimo 4 cáracteres"
        }
        if (user.password.length > 6) {
            errors.password = "Contraseña debe tener máximo 6 cáracteres"
        }
            
    }

    return errors;
}

console.log(
    validateUser({
        username: "a@mail.com",
        password: "1234567",
    })
);