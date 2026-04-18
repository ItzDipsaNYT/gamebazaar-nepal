import { c as createLucideIcon, r as reactExports, u as useActor, i as useAuthStore, k as useRouter, j as jsxRuntimeExports, b as Button, d as LoadingSpinner, G as Gamepad2, L as Link, l as apiLogin, h as ue } from "./index-CQIZzR8Y.js";
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
const __iconNode = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode);
function LoginPage() {
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const { actor } = useActor();
  const { login } = useAuthStore();
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const { token, user } = await apiLogin(actor, email, password);
      login(token, user);
      ue.success("Welcome back!", {
        description: `Logged in as ${user.email}`
      });
      router.navigate({ to: "/dashboard" });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Login failed. Please try again."
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl sm:text-3xl gradient-text mb-2", children: "Welcome Back" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Sign in to your GameBazaar account" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card-strong rounded-2xl p-8 neon-glow-purple", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleSubmit,
          className: "flex flex-col gap-5",
          "data-ocid": "login.form",
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
                    "data-ocid": "login.email.input",
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
                    placeholder: "••••••••",
                    value: password,
                    onChange: (e) => setPassword(e.target.value),
                    className: "pl-9 pr-10 bg-background/50 border-border/60 focus:border-primary/60",
                    "data-ocid": "login.password.input",
                    autoComplete: "current-password"
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
            error && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                "data-ocid": "login.error_state",
                className: "text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2",
                children: error
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "submit",
                disabled: loading,
                "data-ocid": "login.submit_button",
                className: "bg-primary hover:bg-primary/80 text-primary-foreground font-semibold gap-2 mt-1",
                children: [
                  loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Gamepad2, { className: "w-4 h-4" }),
                  loading ? "Signing In..." : "Sign In"
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-3 text-center text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Don't have an account?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/signup",
              className: "text-primary hover:text-primary/80 font-medium transition-colors",
              "data-ocid": "login.signup_link",
              children: "Create one"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border/30 pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/staff-login",
            className: "inline-flex items-center gap-1 text-accent hover:text-accent/80 font-medium transition-colors text-xs",
            "data-ocid": "login.staff_link",
            children: [
              "Staff? Login here",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5" })
            ]
          }
        ) })
      ] })
    ] })
  ] }) });
}
export {
  LoginPage as default
};
