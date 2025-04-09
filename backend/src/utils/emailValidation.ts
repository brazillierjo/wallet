/**
 * Valide un email avec des règles strictes
 * @param email L'email à valider
 * @returns true si l'email est valide, false sinon
 */
export const isValidEmail = (email: string): boolean => {
  // Expression régulière pour la validation d'email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  // Vérifie la longueur maximale (254 caractères selon RFC 5321)
  if (email.length > 254) {
    return false;
  }
  
  // Vérifie le format de base avec l'expression régulière
  if (!emailRegex.test(email)) {
    return false;
  }
  
  // Vérifie que le domaine a au moins un point
  const [, domain] = email.split('@');
  if (!domain.includes('.')) {
    return false;
  }
  
  // Vérifie que le domaine n'a pas de caractères spéciaux
  if (!/^[a-zA-Z0-9.-]+$/.test(domain)) {
    return false;
  }
  
  return true;
}; 