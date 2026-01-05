'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { adminLogin } from './actions';
import Link from 'next/link';

const initialState = { error: '' };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className="admin-login__button" type="submit" disabled={pending}>
      {pending ? 'Verifying...' : 'Access Admin'}
    </button>
  );
}

export default function AdminLoginPage() {
  const [state, formAction] = useActionState(adminLogin, initialState);

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <div className="admin-login__header">
          <Link href="/" className="admin-login__brand">
            <img src="/logo.png" alt="Gurudev Engicon" />
          </Link>
          <h1>Admin Access</h1>
          <p>Enter the admin secret to manage content.</p>
        </div>

        <form action={formAction} className="admin-login__form">
          <label className="admin-login__label" htmlFor="secret">
            Admin Secret
          </label>
          <input
            id="secret"
            name="secret"
            type="password"
            required
            autoComplete="current-password"
            className="admin-login__input"
            placeholder="Enter admin secret"
          />
          {state?.error ? (
            <p className="admin-login__error" role="alert">
              {state.error}
            </p>
          ) : null}
          <SubmitButton />
        </form>

        <p className="admin-login__hint">
          The secret is stored securely in the server environment. Contact the
          site owner if you need access.
        </p>
      </div>
    </div>
  );
}
