import nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const generateToken = (): string => {
  return randomBytes(32).toString('hex');
};

export const sendVerificationEmail = async (email: string, token: string): Promise<void> => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: `"Бизнес Camp 2025" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Подтверждение email - Бизнес Camp 2025',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Добро пожаловать в Бизнес Camp 2025!</h2>
        <p>Спасибо за регистрацию. Пожалуйста, подтвердите ваш email, нажав на кнопку ниже:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}"
             style="background-color: #2563eb; color: white; padding: 12px 30px;
                    text-decoration: none; border-radius: 5px; display: inline-block;">
            Подтвердить Email
          </a>
        </div>
        <p style="color: #6b7280; font-size: 14px;">
          Если кнопка не работает, скопируйте эту ссылку в браузер:<br>
          <a href="${verificationUrl}">${verificationUrl}</a>
        </p>
        <p style="color: #6b7280; font-size: 14px;">
          Ссылка действительна в течение 24 часов.
        </p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        <p style="color: #9ca3af; font-size: 12px;">
          Если вы не регистрировались на сайте Бизнес Camp 2025, просто проигнорируйте это письмо.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendPasswordResetEmail = async (email: string, token: string): Promise<void> => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: `"Бизнес Camp 2025" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Восстановление пароля - Бизнес Camp 2025',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Восстановление пароля</h2>
        <p>Вы запросили восстановление пароля. Нажмите на кнопку ниже, чтобы создать новый пароль:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}"
             style="background-color: #2563eb; color: white; padding: 12px 30px;
                    text-decoration: none; border-radius: 5px; display: inline-block;">
            Восстановить пароль
          </a>
        </div>
        <p style="color: #6b7280; font-size: 14px;">
          Если кнопка не работает, скопируйте эту ссылку в браузер:<br>
          <a href="${resetUrl}">${resetUrl}</a>
        </p>
        <p style="color: #6b7280; font-size: 14px;">
          Ссылка действительна в течение 1 часа.
        </p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        <p style="color: #9ca3af; font-size: 12px;">
          Если вы не запрашивали восстановление пароля, просто проигнорируйте это письмо.
          Ваш пароль останется без изменений.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendContactNotification = async (
  name: string,
  email: string,
  message: string
): Promise<void> => {
  const mailOptions = {
    from: `"Бизнес Camp 2025" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `Новое сообщение от ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Новое сообщение с формы обратной связи</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Сообщение:</strong></p>
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 15px 0;">
          ${message}
        </div>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        <p style="color: #9ca3af; font-size: 12px;">
          Это автоматическое уведомление с сайта Бизнес Camp 2025
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};