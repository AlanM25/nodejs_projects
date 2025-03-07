const db = require("../dataAccess/db");
const bcrypt = require("bcrypt");

class RegistrarUsuario {
    
    constructor() {}
        
    async obtenerUsuarios() {
        const [rows] = await db.execute("SELECT * FROM usuarios");
        return rows.map(r => { return {
            id: r.id,
            username: r.username,
            password: r.password,
            nombre: r.nombre,
            apellidos: r.apellidos,
            tipo_usuario: r.tipo_usuario,
            activo: r.activo != 0
        }
        });
    }

    async guardarUsuario(user) {
        if (!user.username || !user.password || !user.nombre) {
            throw new Error("Nombre, username y password son obligatorios");
        }
    
        const [existingUser] = await db.execute("SELECT id FROM usuarios WHERE username = ?", [user.username]);
        if (existingUser.length > 0) {
            throw new Error("El username ya existe");
        }
    
        const hashedPassword = await bcrypt.hash(user.password, 12);
        const sql = 
            "INSERT INTO usuarios (username, password, nombre, apellidos, tipo_usuario, activo) VALUES (?, ?, ?, ?, 'user', 1)";
        const p = [user.username, hashedPassword, user.nombre, user.apellidos || ''];
        const [r] = await db.execute(sql, p);
        
        return r.insertId;
    }
}

module.exports = RegistrarUsuario;