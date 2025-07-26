import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { nom, prenom, email, telephone, message, rgpd, token } = req.body;

  // Vérification reCAPTCHA côté serveur
  if (!token) {
    return res.status(400).json({ success: false, error: 'Token reCAPTCHA manquant' });
  }
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  const verifyResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${recaptchaSecret}&response=${token}`,
  });
  const recaptchaData = await verifyResponse.json();
  if (!recaptchaData.success || recaptchaData.score < 0.5) {
    return res.status(400).json({ success: false, error: 'Échec du reCAPTCHA' });
  }

  try {
    await resend.emails.send({
      from: 'LUTÉA <onboarding@resend.dev>',
      to: 'pierreschnell@hotmail.com',
      subject: `Message reçu via le site – ${nom} ${prenom}`,
      html: `
        <p><strong>Nom :</strong> ${nom}</p>
        <p><strong>Prénom :</strong> ${prenom}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${telephone}</p>
        <p><strong>Message :</strong><br/>${message}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erreur Resend:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
