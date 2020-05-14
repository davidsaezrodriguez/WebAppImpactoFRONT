export interface JwtResponseI {
  datosUsuario: {
    id: number,
    dni: string,
    nombre: string,
    accessToken: string,
    expiresIn: string
  };
}
