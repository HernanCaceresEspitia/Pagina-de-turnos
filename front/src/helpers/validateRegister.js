export default function validateRegister(newUser) {
  const emailRegex = /\S+@\S+\.\S+/;
  const nDniRegex = /^\d+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,12}$/;
  const errors = {};

  if (!newUser.name) {
    errors.name = "Debe ingresar un nombre y apellido";
  }

  if (!newUser.email) {
    errors.email = "Debe ingresar un email";
  } else {
    if (!emailRegex.test(newUser.email)) {
      errors.email = "Debe ingresar un email válido";
    }
  }

  if (!newUser.dob) {
    errors.dob = "Debe ingresar su fecha de nacimiento";
  } else {
    const birthDate = new Date(newUser.dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (
      age < 14 ||
      (age === 14 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))
    ) {
      errors.dob = "Debe tener al menos 14 años";
    }
  }

  if (!newUser.nDni) {
    errors.nDni = "Debe ingresar su número de identificación";
  } else {
    if (!nDniRegex.test(newUser.nDni)) {
      errors.nDni = "El número de identificación debe contener solo números";
    }
    if(newUser.nDni >= 2147483647 || newUser.nDni < 0) {
      errors.nDni = "El número escogido no es válido"
    }
  }

  if (!newUser.username) {
    errors.username = "Debe ingresar un nombre de usuario";
  }

  if (!newUser.password) {
    errors.password = "Debe ingresar una contraseña";
  } else {
    if (!passwordRegex.test(newUser.password)) {
      errors.password =
        "La contraseña debe tener entre 8 y 12 caracteres, al menos una mayúscula, un número y un carácter especial";
    }
  }

  return errors;
}

