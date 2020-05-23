export interface JwtResponseI {
  // Interface con la que recogeremos los datos que nos manda la api
  datosUsuario: {
    id: string,
    accessToken: string,
    expiresIn: string
  };
}
