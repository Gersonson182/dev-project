// Agrega puntos y guion para mostrarlo de forma cómoda al usuario
export const formatearRut = (valor: string) => {
  const clean = valor.replace(/\D/g, '');
  if (clean.length <= 1) return clean;

  const cuerpo = clean.slice(0, -1);
  const dv = clean.slice(-1);

  const cuerpoFormateado = cuerpo
    .split('')
    .reverse()
    .reduce((acc, val, i) => {
      return val + (i && i % 3 === 0 ? '.' : '') + acc;
    }, '');

  return `${cuerpoFormateado}-${dv}`;
};

// Quita puntos pero mantiene el guion (para enviar al backend)
export const limpiarRut = (valor: string) => {
  return valor.replace(/\./g, "").toUpperCase();
};

  