// Teléfono de WhatsApp de Helados Caram (formato internacional sin "+" ni espacios, ej. 18091234567).
// Déjalo vacío hasta confirmar el número real: los botones de WhatsApp quedarán deshabilitados.
export const WHATSAPP_PHONE = "";

export const BRAND = { name: "Caram", slogan: "La felicidad tiene un sabor" };

export function whatsappUrl(message: string): string | null {
  const phone = WHATSAPP_PHONE.replace(/\D/g, "");
  if (!phone) return null;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
