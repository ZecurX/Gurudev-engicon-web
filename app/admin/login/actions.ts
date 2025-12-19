'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type LoginState = {
  error?: string;
};

export async function adminLogin(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const submittedSecret = formData.get('secret');

  if (typeof submittedSecret !== 'string' || !submittedSecret.trim()) {
    return { error: 'Secret is required' };
  }

  const secret = process.env.ADMIN_SECRET;

  if (!secret) {
    return { error: 'Admin secret is not configured' };
  }

  if (submittedSecret !== secret) {
    return { error: 'Invalid secret' };
  }

  const cookieStore = await cookies();

  cookieStore.set('admin-auth', secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });

  redirect('/admin');

  // Fallback return for type completeness; redirect will short-circuit.
  return { error: '' };
}
