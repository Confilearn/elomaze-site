import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Forgot Password — Elomaze" },
      { name: "description", content: "Reset your Elomaze password." },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        {submitted ? (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-success" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Check Your Inbox</h1>
            <p className="text-sm text-muted-foreground mb-2">We've sent a password reset link to:</p>
            <p className="text-sm font-medium text-foreground mb-6">{email}</p>
            <p className="text-xs text-muted-foreground mb-6">If you don't see it, check your spam folder.</p>
            <div className="space-y-3">
              <Button variant="outline" className="w-full" onClick={() => setSubmitted(false)}>
                Try a different email
              </Button>
              <Link to="/login" className="block text-sm text-primary font-medium hover:underline text-center">
                Back to login
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Reset your password</h1>
              <p className="text-sm text-muted-foreground mt-1">Enter your email and we'll send you a reset link</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <Button type="submit" variant="premium" size="lg" className="w-full">
                Send Reset Link
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Remember your password?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">Log in</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
