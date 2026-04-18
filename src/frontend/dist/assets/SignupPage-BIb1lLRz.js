import { c as createLucideIcon, r as reactExports, u as useActor, i as useAuthStore, k as useRouter, j as jsxRuntimeExports, b as Button, d as LoadingSpinner, L as Link, m as apiSignUp, h as ue } from "./index-CQIZzR8Y.js";
import { L as Label, I as Input } from "./label-Cz5yq3VU.js";
import { M as Mail } from "./mail-BVv9u3wZ.js";
import { L as Lock } from "./lock-Cx35JKJ2.js";
import { E as EyeOff, a as Eye } from "./eye-B7ud1lNG.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode);
function SignupPage() {
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [confirm, setConfirm] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const { actor } = useActor();
  const { login } = useAuthStore();
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password || !confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const { token, user } = await apiSignUp(actor, email, password);
      login(token, user);
      ue.success("Account created!", {
        description: "Welcome to GameBazaar Nepal 🎮"
      });
      router.navigate({ to: "/dashboard" });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Sign up failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center px-4 py-12 hero-gradient", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "floating", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/assets/generated/gamebazaar-logo-transparent.dim_200x200.png",
          alt: "GameBazaar Nepal",
          className: "w-16 h-16 object-contain"
        }
      ) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl sm:text-3xl gradient-text mb-2", children: "Create Account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Join GameBazaar Nepal — free forever" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card-strong rounded-2xl p-8 neon-glow-purple", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleSubmit,
          className: "flex flex-col gap-5",
          "data-ocid": "signup.form",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", className: "text-sm font-medium", children: "Email Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "email",
                    type: "email",
                    placeholder: "gamer@example.com",
                    value: email,
                    onChange: (e) => setEmail(e.target.value),
                    className: "pl-9 bg-background/50 border-border/60 focus:border-primary/60",
                    "data-ocid": "signup.email.input",
                    autoComplete: "email"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", className: "text-sm font-medium", children: "Password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "password",
                    type: showPassword ? "text" : "password",
                    placeholder: "Min 6 characters",
                    value: password,
                    onChange: (e) => setPassword(e.target.value),
                    className: "pl-9 pr-10 bg-background/50 border-border/60 focus:border-primary/60",
                    "data-ocid": "signup.password.input",
                    autoComplete: "new-password"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowPassword(!showPassword),
                    className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                    "aria-label": "Toggle password visibility",
                    children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "confirm", className: "text-sm font-medium", children: "Confirm Password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "confirm",
                    type: showPassword ? "text" : "password",
                    placeholder: "Repeat your password",
                    value: confirm,
                    onChange: (e) => setConfirm(e.target.value),
                    className: "pl-9 bg-background/50 border-border/60 focus:border-primary/60",
                    "data-ocid": "signup.confirm_password.input",
                    autoComplete: "new-password"
                  }
                )
              ] })
            ] }),
            error && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                "data-ocid": "signup.error_state",
                className: "text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2",
                children: error
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "submit",
                disabled: loading,
                "data-ocid": "signup.submit_button",
                className: "bg-primary hover:bg-primary/80 text-primary-foreground font-semibold gap-2 mt-1",
                children: [
                  loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4" }),
                  loading ? "Creating Account..." : "Create Account"
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 text-center text-sm text-muted-foreground", children: [
        "Already have an account?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/login",
            className: "text-primary hover:text-primary/80 font-medium transition-colors",
            "data-ocid": "signup.login.link",
            children: "Sign in"
          }
        )
      ] })
    ] })
  ] }) });
}
export {
  SignupPage as default
};
