import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export const authenticate = (headers: Record<string, string | string[] | undefined>): number => {
  // Récupérer le cookie accessToken
  const cookieHeader = headers.cookie;
  const cookieString = Array.isArray(cookieHeader) ? cookieHeader[0] : cookieHeader;
  const cookies = cookieString?.split(';') || [];
  const accessTokenCookie = cookies.find((cookie: string) => cookie.trim().startsWith('accessToken='));

  if (!accessTokenCookie) {
    throw new Error('Unauthorized');
  }

  const token = accessTokenCookie.split('=')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return parseInt(decoded.userId, 10);
  } catch {
    throw new Error('Unauthorized');
  }
};
