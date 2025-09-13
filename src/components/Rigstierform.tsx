// RegisterForm.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ============ صغار UI ============ */
type AlertProps = React.PropsWithChildren<{ type?: "success" | "error"; title?: string }>;

const Alert: React.FC<AlertProps> = ({ type = "error", title, children }) => {
  const isSuccess = type === "success";
  return (
    <div
      className={[
        "rounded border-l-4 p-4 text-sm mb-3",
        isSuccess
          ? "bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-900/20 dark:text-emerald-200"
          : "bg-rose-50 border-rose-300 text-rose-900 dark:bg-rose-900/20 dark:text-rose-200",
      ].join(" ")}
    >
      {title ? <div className="font-semibold mb-1">{title}</div> : null}
      <div className="space-y-1">{children}</div>
    </div>
  );
};

const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    fullWidth?: boolean;
  }
> = ({ fullWidth, className, children, ...rest }) => (
  <button
    className={[
      "inline-flex items-center justify-center rounded-md px-6 py-3 text-white",
      "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-offset-2",
      "transition",
      fullWidth ? "w-full" : "",
      className || "",
    ].join(" ")}
    {...rest}
  >
    {children}
  </button>
);

const Input: React.FC<
  React.InputHTMLAttributes<HTMLInputElement> & { label?: string }
> = ({ label, className, ...rest }) => (
  <label className="block text-sm mb-4">
    {label ? <span className="text-gray-700 dark:text-gray-200">{label}</span> : null}
    <input
      className={[
        "mt-1 block w-full rounded-md border",
        "border-gray-300 dark:border-gray-600",
        "bg-white dark:bg-[#2d303e]",
        "text-gray-900 dark:text-gray-100",
        "placeholder:text-gray-400 dark:placeholder:text-gray-400",
        "px-3 py-2 text-sm outline-none",
        "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        className || "",
      ].join(" ")}
      {...rest}
    />
  </label>
);

/* ============ فاليديشن بسيطة ============ */
const emailValidate = (value: string) => {
  const re =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  if (!re.test(value)) return "Wrong email";
};
const usernameValidate = (value: string) => {
  if (!value || value.trim().length < 3) return "Username must be at least 3 chars";
};
const passwordValidate = (value: string) => {
  if (!value || value.length < 6) return "Password must be more than 6 characters";
};

/* ============ الفورم ============ */
const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors([]);
    setSuccessMsg(null);

    // فاليديشن محلي
    const errs: string[] = [];
    const u1 = usernameValidate(username);
    const e1 = emailValidate(email);
    const p1 = passwordValidate(password);
    if (u1) errs.push(u1);
    if (e1) errs.push(e1);
    if (p1) errs.push(p1);

    if (errs.length) {
      setFormErrors(errs);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        "https://american-softwares.com/api/public/index.php/api/register",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          // لو الباك إند بيطلب confirmed، بنبعتها بنفس قيمة الباسورد
          body: JSON.stringify({
            name: username,
            email,
            password,
            password_confirmation: password,
          }),
        }
      );

      const contentType = res.headers.get("content-type") || "";
      const payload = contentType.includes("application/json")
        ? await res.json()
        : await res.text();

      if (!res.ok) {
        const msg =
          typeof payload === "string"
            ? payload
            : payload?.errors
            ? Object.values(payload.errors).flat().join("\n")
            : payload?.message || `Registration failed (status ${res.status})`;
        throw new Error(msg);
      }

      // لو API بيرجع توكن + يوزر
      if (typeof payload === "object" && payload?.token && payload?.user) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify(payload.user));
        localStorage.setItem("token", payload.token);
        setSuccessMsg("User registered successfully. Redirecting...");
        setTimeout(() => navigate("/dashboard"), 800);
        return;
      }

      // لو بيرجع رسالة نجاح بس
      setSuccessMsg(
        (typeof payload === "object" ? payload?.message : null) ||
          "User registered successfully. You can log in now."
      );
      // ودّي المستخدم لصفحة اللوجين
      setTimeout(() => navigate("/login"), 800);
    } catch (err: any) {
      setFormErrors([err?.message || "Server error. Please try again later."]);
      console.error("Register error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[410px] max-w-[92vw] rounded-2xl bg-white dark:bg-[#252836] text-gray-900 dark:text-white shadow-2xl p-8">
      <h1 className="text-[1.6em] font-semibold text-slate-700 dark:text-slate-200 mb-4">
        Create an account
      </h1>

      {formErrors.length > 0 && (
        <Alert title="Registration failed">
          {formErrors.map((e, i) => (
            <div key={i}>{e}</div>
          ))}
        </Alert>
      )}
      {successMsg && <Alert type="success">{successMsg}</Alert>}

      <form onSubmit={onSubmit} className="space-y-2">
        <Input
          label="Username"
          placeholder="Your username"
          value={username}
          onChange={(e) => setUsername((e.target as HTMLInputElement).value)}
        />
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
        />

        <Button type="submit" fullWidth disabled={loading} className="mt-2">
          {loading ? "Creating..." : "Create account"}
        </Button>
      </form>

      <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        Already have an account?{" "}
        <button
          onClick={() => navigate("/login")}
          className="text-blue-600 hover:underline"
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
