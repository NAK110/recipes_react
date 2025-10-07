import { GalleryVerticalEnd } from "lucide-react";

import { BubbleBackground } from "@/components/ui/shadcn-io/bubble-background";
import { RegisterForm } from "@/components/auth/RegisterForm";



export default function RegisterPage() {
  return (
    <BubbleBackground interactive={true}>
      <div className="relative z-10 flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 pointer-events-auto">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <a
            href="#"
            className="flex items-center gap-2 self-center font-medium text-white"
          >
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
          <RegisterForm />
        </div>
      </div>
    </BubbleBackground>
  );
}
