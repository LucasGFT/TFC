const userVerdadero = {
  "email": "admin@admin.com",
  "password": "secret_admin"
};

const arrayUser = [
  {
    email: 'admin@admin.com',
    password: 'secret_admin',
  },
  {
    email: 'teste',
    password: 'senha',
  },
];

const userSemEmail = {
  "email": "",
  "password": "secret_admin"
};

const userSemSenha = {
  "email": "admin@admin.com",
  "password": ""
};

const userEmailErrado = {
  "email": "admin@admin.comsss",
  "password": "secret_admin"
};

const userEmailErrado2 = {
  "email": "admin@admisn.com",
  "password": "secret_admin"
};

const userSenhaErrada = {
  "email": "admin@admin.com",
  "password": "senhaerrada"
}

export {
  userSemEmail,
  userSemSenha,
  userVerdadero,
  userEmailErrado,
  userEmailErrado2,
  arrayUser,
  userSenhaErrada
};