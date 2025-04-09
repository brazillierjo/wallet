import jwt from "jsonwebtoken";

// Cette fonction vérifie si un token JWT est valide
// Note: Cette vérification est limitée car nous n'avons pas accès au JWT_SECRET côté client
// Mais nous pouvons vérifier la structure et l'expiration du token
export const isTokenValid = (token: string | undefined): boolean => {
  if (!token) return false;

  try {
    // Décoder le token sans vérifier la signature (car nous n'avons pas le secret)
    const decoded = jwt.decode(token);

    // Vérifier si le token a une structure valide
    if (!decoded || typeof decoded !== "object") return false;

    // Vérifier si le token a une date d'expiration
    if (decoded.exp) {
      const expirationDate = new Date(decoded.exp * 1000);
      return expirationDate > new Date();
    }

    return true;
  } catch (error) {
    return false;
  }
};
