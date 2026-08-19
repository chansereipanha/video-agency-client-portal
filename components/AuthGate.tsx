"use client";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import SidebarNav from "@/components/SidebarNav";
import PortalHeader from "@/components/PortalHeader";
import { auth, firebaseConfigured } from "@/lib/firebase";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [create, setCreate] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, setUser);
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!auth) return;

    const form = new FormData(event.currentTarget);
    setError("");

    try {
      if (create) {
        await createUserWithEmailAndPassword(
          auth,
          String(form.get("email")),
          String(form.get("password")),
        );
      } else {
        await signInWithEmailAndPassword(
          auth,
          String(form.get("email")),
          String(form.get("password")),
        );
      }
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message.replace("Firebase: ", "")
          : "Unable to sign in.",
      );
    }
  }

  async function google() {
    if (!auth) return;
    setError("");

    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message.replace("Firebase: ", "")
          : "Unable to sign in with Google.",
      );
    }
  }

  if (!firebaseConfigured) {
    return (
      <main className="auth-page">
        <section className="auth-card">
          <p className="eyebrow">SETUP REQUIRED</p>
          <h1>Firebase configuration is missing</h1>
          <p className="auth-muted">
            Add the six Firebase values to <code>.env.local</code> and Vercel,
            then redeploy.
          </p>
        </section>
      </main>
    );
  }

  if (user === undefined) {
    return (
      <main className="auth-page">
        <p className="auth-muted">Checking your session…</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="auth-page">
        <section className="auth-card">
          <Link className="auth-brand" href="/">
            <span>c</span> CUTROOM
          </Link>
          <p className="eyebrow">CLIENT PORTAL</p>
          <h1>{create ? "Create your account" : "Welcome back"}</h1>
          <p className="auth-muted">
            Sign in to manage client relationships and production resources.
          </p>
          <button className="google-button" onClick={google}>
            G&nbsp;&nbsp; Continue with Google
          </button>
          <div className="auth-divider">
            <span>or</span>
          </div>
          <form className="auth-form" onSubmit={submit}>
            <label>
              Email
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </label>
            <label>
              Password
              <input
                name="password"
                type="password"
                autoComplete={create ? "new-password" : "current-password"}
                minLength={6}
                required
              />
            </label>
            {error && <p className="auth-error">{error}</p>}
            <button className="button">
              {create ? "Create account" : "Sign in"}
            </button>
          </form>
          <button className="auth-switch" onClick={() => setCreate(!create)}>
            {create
              ? "Already have an account? Sign in"
              : "New here? Create an account"}
          </button>
        </section>
      </main>
    );
  }

  const name = user.displayName || user.email?.split("@")[0] || "Portal user";
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand" href="/">
          <span>c</span> CUTROOM
        </Link>
        <SidebarNav />
        <div className="user-card">
          <div className="avatar">{initials}</div>
          <div>
            <b>{name}</b>
            <small>{user.email}</small>
            <button className="sign-out" onClick={() => auth && signOut(auth)}>
              Sign out
            </button>
          </div>
        </div>
      </aside>
      <main className="content">
        <PortalHeader />
        {children}
      </main>
    </div>
  );
}
