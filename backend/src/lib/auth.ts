import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

const authenticate = (headers: Record<string, string | string[] | undefined>): number => {
  const authHeader = headers['Authorization'] || headers['authorization'];

  const authValue = Array.isArray(authHeader) ? authHeader[0] : authHeader;

  if (!authValue?.startsWith('Bearer ')) throw new Error('Unauthorized');

  const token = authValue.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return parseInt(decoded.userId, 10);
  } catch {
    throw new Error('Unauthorized');
  }
};

export default authenticate;
