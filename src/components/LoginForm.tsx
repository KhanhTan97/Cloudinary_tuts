/**
 * Node modules
 */
import React, { useCallback, useEffect } from "react";
import { useFetcher } from "react-router";
import { Controller, Form, useForm } from "react-hook-form";
import { email, z } from "zod";
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
import { FieldGroup } from '@/components/ui/field';

/**
 * Assets
 */
import { GoogleLogo } from "@/assets/logo/google";
import { Loader2Icon } from "lucide-react";

/**
 * Types
 */
import type { SubmitHandler } from "react-hook-form";

/**
 * Form Schema
 */
const formSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export const LoginForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const fetcher = useFetcher();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = fetcher.state !== "idle";

  useEffect(() => {});

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = useCallback(
    (values) => {
      console.log(values);
    },
  );

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>

          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => {}}
                >
                  <GoogleLogo colorful />
                  Login with Google
                </Button>
              </div>

              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>

              <div className="grid gap-6">
                <FieldGroup>
                  <Controller
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      
                    )}
                  />
                </FieldGroup>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
