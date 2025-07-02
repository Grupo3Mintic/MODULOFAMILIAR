CREATE TABLE grupo_familiar (
  id SERIAL PRIMARY KEY,
  nombre_grupo VARCHAR(100)
);

CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  correo VARCHAR(100) UNIQUE,
  clave TEXT NOT NULL,
  avatar TEXT,
  grupo_familiar_id INT REFERENCES grupo_familiar(id)
);

CREATE TABLE bitacora_salud (
  id SERIAL PRIMARY KEY,
  usuario_id INT REFERENCES usuarios(id),
  fecha DATE NOT NULL,
  tipo_servicio VARCHAR(100),
  observaciones TEXT
);