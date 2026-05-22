/**
 * Node modules
 */
import React, { useCallback, useEffect } from "react";
import { useFetcher } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/**
 * Custom modules
 */
import { cn } from "@/lib/utils";

/**
 * Components
 */
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  FieldGroup,
  FieldLabel,
  Field,
  FieldError,
} from "@/components/ui/field";
import { toast } from "sonner";

/**
 * Assets
 */
import { ArrowLeftIcon, Loader2Icon } from "lucide-react";

/**
 * Types
 */
import type { SubmitHandler } from "react-hook-form";

/**
 * Form Schema
 */
const formSchema = z.object({
  email: z.email("Please enter a valid email address."),
});

export const ForgotPasswordForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const fetcher = useFetcher();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const isLoading = fetcher.state !== "idle";

  useEffect(() => {
    if (!fetcher.data) return;

    if (fetcher.data.ok) {
      toast.success("Password reset email sent! Check your inbox.");
      form.reset();
    } else {
      toast.error(fetcher.data.error ?? "Something went wrong");
    }
  }, [fetcher.data, form]);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = useCallback(
    (values) => {
      fetcher.submit(values, {
        method: "post",
        encType: "application/json",
      });
    },
    [],
  );

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Forgot password?</CardTitle>

          <CardDescription>
            No worries, we'll send you reset instructions.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            <div className="grid gap-6">
              <FieldGroup>
                <Controller
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Email</FieldLabel>

                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2Icon className="animate-spin" />}
                Send reset email
              </Button>
            </div>

            <div className="text-center text-sm">
              <Button variant="link" asChild>
                <Link
                  to="/auth/login"
                  className="underline underline-offset-4"
                  viewTransition
                >
                  <ArrowLeftIcon />
                  Back to login
                </Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Term of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};
