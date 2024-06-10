export default function validateUser(user) {
    const errors = {};

    if(!user.username) {
        errors.username = "Debe ingresar un nombre de usuario";
    }

    if(!user.password) {
        errors.password = "Debe ingresar una contraseña"
    } else {
        if(user.password.length < 8) {
            errors.password = "Contraseña debe tener mínimo 4 cáracteres"
        }
        if (user.password.length > 12) {
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