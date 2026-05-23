/**
 * Assets
 */
import { Logo } from "@/assets/logo";

/**
 * Components
 */
import { ResetPasswordForm } from "@/components/ResetPasswordForm";

/**
 * Node modules
 */
import { Link } from "react-router";

export const ResetPassword = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 self-center font-medium"
          viewTransition
        >
          <div className="flex size-6 items-center justify-center">
            <Logo variant="icon" />
          </div>
          Cloudbin
        </Link>

        <ResetPasswordForm />
      </div>
    </div>
  );
};
