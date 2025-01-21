import { Request } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { StatusCode } from '../utils/status-code';

function extractTokenFromHeader(req: Request) {
	const bearer = req.headers['authorization'];
	if (bearer && bearer.startsWith('Bearer ')) {
	  return bearer.split(' ')[1];
	}
	return null;
  }

  function verifyToken(token) {
	try {
    const decoded = jsonwebtoken.verify(token, String(process.env.JWT_SECRET));
	  return decoded;
	} catch (error) {
	  return null;
	}
  }


function authenticateToken(req, res, next) {
	const token = extractTokenFromHeader(req);
  if (!token) return res.status(StatusCode.UNAUTHORIZED).send('Acesso negado');

  
	const decoded = verifyToken(token);
	if (!decoded) return res.status(StatusCode.FORBIDDEN).send('Token inválido');
  
	const userId = decoded.userId;
	req.user = { id: userId };
  
	next();
  }

export default authenticateToken;