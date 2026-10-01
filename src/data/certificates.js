// Datos tomados de cada certificado (del más reciente al más antiguo).
export const certificates = [
  {
    id: "congreso-ciberseguridad",
    title: "Congreso de Ciberseguridad",
    type: "Participación",
    issuer: "Fundación Konrad Adenauer · Agencia para el Desarrollo Zona Sur",
    place: "Ciudad Neily",
    date: "2025-09-27",
    width: 1500,
    height: 1212,
  },
  {
    id: "celonis-foundations",
    title: "Celonis Foundations",
    issuer: "Celonis Academy",
    date: "2024-06-02",
    // TODO: verificar que el enlace de Credly abre la credencial correcta.
    credentialUrl: "https://www.credly.com/badges/b605b396-3776-40f0-af51-ea84d0ba4a55",
    width: 888,
    height: 686,
  },
  {
    id: "academic-process-mining",
    title: "Academic Process Mining Fundamentals",
    issuer: "Celonis Academy",
    date: "2023-11-11",
    // TODO: verificar que el enlace de Credly abre la credencial correcta.
    credentialUrl: "https://www.credly.com/badges/d82b9d1a-57d8-42d7-8c3e-d599c4d11f6f",
    width: 864,
    height: 664,
  },
  {
    id: "linux-essentials",
    title: "Linux Essentials",
    issuer: "NDG · Cisco Networking Academy",
    date: "2023-04-06",
    width: 1169,
    height: 742,
  },
  {
    id: "linux-unhatched",
    title: "Linux Unhatched",
    issuer: "NDG · Cisco Networking Academy",
    date: "2023-03-31",
    width: 1176,
    height: 757,
  },
].map((c) => ({
  ...c,
  image: `/images/certificates/${c.id}.webp`,
  thumb: `/images/certificates/${c.id}-thumb.webp`,
}));
