import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PROGRAMS } from "@/lib/programs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(120),
  phone: z.string().trim().min(6, "Enter a valid phone").max(20),
  courseInterest: z.string().optional(),
  message: z.string().trim().min(10, "A few words help us respond well").max(1000),
});

type FormValues = z.infer<typeof schema>;

export function EnquiryForm({ defaultCourse, sourcePage }: { defaultCourse?: string; sourcePage?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { courseInterest: defaultCourse ?? "" },
  });

  async function onSubmit(values: FormValues) {
    // TODO(phase-2): submit to Supabase enquiries table via createServerFn.
    await new Promise((r) => setTimeout(r, 700));
    console.log("[enquiry submission]", { ...values, sourcePage });
    toast.success("Thanks! We'll be in touch within one business day.");
    setSubmitted(true);
    reset();
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-card">
        <h3 className="font-display text-2xl font-bold">You're in the loop 🎉</h3>
        <p className="mt-2 text-muted-foreground">
          A GeekX advisor will reach out shortly. Meanwhile, explore our programs.
        </p>
        <Button variant="gradient" className="mt-6" onClick={() => setSubmitted(false)}>
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-8"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input id="name" placeholder="Your full name" className="mt-1.5" {...register("name")} />
          {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" className="mt-1.5" {...register("email")} />
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" placeholder="+91 …" className="mt-1.5" {...register("phone")} />
          {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
        </div>
        <div>
          <Label htmlFor="course">Course interest</Label>
          <Select defaultValue={defaultCourse} onValueChange={(v) => setValue("courseInterest", v)}>
            <SelectTrigger id="course" className="mt-1.5">
              <SelectValue placeholder="Choose a program (optional)" />
            </SelectTrigger>
            <SelectContent>
              {PROGRAMS.map((p) => (
                <SelectItem key={p.slug} value={p.slug}>
                  {p.title}
                </SelectItem>
              ))}
              <SelectItem value="not-sure">Not sure yet — help me choose</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-5">
        <Label htmlFor="message">How can we help?</Label>
        <Textarea
          id="message"
          rows={4}
          placeholder="Tell us about your goals, background, or specific questions."
          className="mt-1.5"
          {...register("message")}
        />
        {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}
      </div>
      <Button
        type="submit"
        variant="gradient"
        size="lg"
        className="mt-6 w-full md:w-auto"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending…" : "Send enquiry"}
      </Button>
    </form>
  );
}
