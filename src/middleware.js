

export const basicAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const [username, password] = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');

        // Kullanıcı adı ve şifreyi kontrol et
        if (username === 'ad' && password === 'pw') {
            // Kullanıcı adı ve şifre doğruysa bir 
            // sonraki middleware'e veya route'a geç
            return next(); 
        }
    }

    // Kullanıcı adı veya şifre hatalıysa veya 
    // Authorization başlığı eksikse 401 Unauthorized hatası ver
    res.status(401).json({ message: 'Unauthorized' });
};