export function formatNumberWithDots (valor: string) {
   const clean = valor.replace(/\D/g, "");
   const result = clean.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
   return result;
}
