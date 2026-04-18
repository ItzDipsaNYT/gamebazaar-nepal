import { c as createLucideIcon, r as reactExports, u as useActor, i as useAuthStore, k as useRouter, j as jsxRuntimeExports, S as Shield, B as Badge, b as Button, d as LoadingSpinner, L as Link, n as apiStaffLogin, h as ue } from "./index-CQIZzR8Y.js";
import { L as Label, I as Input } from "./label-Cz5yq3VU.js";
import { M as Mail } from "./mail-BVv9u3wZ.js";
import { E as EyeOff, a as Eye } from "./eye-B7ud1lNG.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
      key: "1s6t7t"
    }
  ],
  ["circle", { cx: "16.5", cy: "7.5", r: ".5", fill: "currentColor", key: "w0ekpg" }]
];
const KeyRound = createLucideIcon("key-round", __iconNode);
function StaffLoginPage() {
  const [email, setEmail] = reactExports.useState("");
  const [staffCode, setStaffCode] = reactExports.useState("");
  const [showCode, setShowCode] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const { actor } = useActor();
  const { login } = useAuthStore();
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !staffCode) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const { token, user } = await apiStaffLogin(actor, email, staffCode);
      login(token, user);
      ue.success("Staff access granted!", {
        description: "Welcome to the admin panel."
      });
      router.navigate({ to: "/admin" });
    } catch {
      setError("Invalid credentials. Please check your details and try again.");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center px-4 py-12 hero-gradient", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 rounded-2xl bg-accent/10 border border-accent/30 neon-glow-cyan", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-12 h-12 text-accent" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "mb-3 bg-accent/15 text-accent border-accent/30 gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5" }),
        "Staff Only"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl sm:text-3xl text-foreground mb-2", children: "Staff Login" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Authorized personnel only. All access attempts are logged." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card-strong rounded-2xl p-8 neon-glow-cyan", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        className: "flex flex-col gap-5",
        "data-ocid": "staff_login.form",
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
                  placeholder: "staff@gamebazaar.np",
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  className: "pl-9 bg-background/50 border-border/60 focus:border-accent/60",
                  "data-ocid": "staff_login.email.input",
                  autoComplete: "email"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "staffCode", className: "text-sm font-medium", children: "Staff Code" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "staffCode",
                  type: showCode ? "text" : "password",
                  placeholder: "Enter your staff code",
                  value: staffCode,
                  onChange: (e) => setStaffCode(e.target.value),
                  className: "pl-9 pr-10 bg-background/50 border-border/60 focus:border-accent/60",
                  "data-ocid": "staff_login.staff_code.input",
                  autoComplete: "off"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setShowCode(!showCode),
                  className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                  "aria-label": "Toggle code visibility",
                  children: showCode ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Code is verified securely on the backend — never exposed in the browser." })
          ] }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "data-ocid": "staff_login.error_state",
              className: "text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2",
              children: error
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "submit",
              disabled: loading,
              "data-ocid": "staff_login.submit_button",
              className: "bg-accent hover:bg-accent/80 text-accent-foreground font-semibold gap-2 mt-1",
              children: [
                loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" }),
                loading ? "Verifying..." : "Access Admin Panel"
              ]
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/login",
        className: "text-xs text-muted-foreground hover:text-foreground transition-colors",
        "data-ocid": "staff_login.back_link",
        children: "← Back to regular login"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-4", children: "This page is for authorized staff only. Unauthorized access attempts will be rejected." })
  ] }) });
}
export {
  StaffLoginPage as default
};
