export default async function handler(req, res) {
  // Autorise uniquement la méthode POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  // Récupère les données envoyées par le frontend
  const { email, token } = req.body;

  if (!email || !token) {
    return res.status(400).json({ message: 'Email ou token manquant' });
  }

  // Vérification reCAPTCHA invisible côté serveur
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;

  const verifyResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${recaptchaSecret}&response=${token}`,
  });

  const recaptchaData = await verifyResponse.json();

  // Si la vérification échoue ou score trop faible → rejet
  if (!recaptchaData.success || recaptchaData.score < 0.5) {
    return res.status(400).json({ message: 'Échec du reCAPTCHA' });
  }

  // Préparation de l'appel à l'API Brevo
  const brevoApiKey = process.env.BREVO_API_KEY;
  const listId = parseInt(process.env.BREVO_LIST_ID, 10);

  const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'api-key': brevoApiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      listIds: [listId],
      updateEnabled: true,
    }),
  });

  if (!brevoResponse.ok) {
    const error = await brevoResponse.json();
    return res.status(500).json({ message: 'Erreur Brevo', error });
  }

  return res.status(200).json({ message: 'Inscription réussie ✅' });
}
