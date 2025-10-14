import { GalleryVerticalEnd } from "lucide-react";
import { BubbleBackground } from "@/components/ui/shadcn-io/bubble-background";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <BubbleBackground interactive={true}>
      <div className="relative z-10 flex min-h-svh flex-col items-center justify-center p-4 sm:p-6 md:p-10 pointer-events-auto">
        <div className="flex w-full max-w-sm flex-col gap-6 sm:gap-8">
          <a
            href="#"
            className="flex items-center gap-2 self-center font-medium text-white touch-manipulation"
            aria-label="Acme Inc. Home"
          >
            <div className="bg-primary text-primary-foreground flex size-8 sm:size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-5 sm:size-4" />
            </div>
            <span className="text-lg sm:text-base">Acme Inc.</span>
          </a>
          <RegisterForm />
        </div>
      </div>
    </BubbleBackground>
  );
}
