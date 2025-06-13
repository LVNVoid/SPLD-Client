import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, useNavigate } from "react-router-dom";
import { ChevronLeft, Lock } from "lucide-react";

export function LoginForm({ className, ...props }) {
  const navigate = useNavigate();
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-background">
        <CardHeader>
          <CardTitle className="text-2xl">Masuk</CardTitle>
          <CardDescription>
            Masuk ke akun Anda untuk kelola laporan dan dokumentasi.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form method="post" className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="johndoe@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="*******"
                required
              />
            </div>
            <div className="flex w-full justify-end space-x-2">
              <Button
                onClick={() => navigate("/")}
                type="submit"
                variant="outline"
                className="w-1/2"
              >
                <ChevronLeft className="h-4 w-4" />
                Kembali
              </Button>
              <Button type="submit" className="w-1/2">
                Masuk
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
