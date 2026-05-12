'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AlertCircle, Send, CheckCircle2 } from 'lucide-react';

const categoryKeys = [
  'maschinen',
  'chemie',
  'agrar',
  'baustoffe',
  'stahl',
  'elektronik',
] as const;

type InquiryFormData = {
  name: string;
  email: string;
  phone?: string;
  interest?: string;
  message: string;
  _trap?: string;
};

export function InquiryForm() {
  const t = useTranslations('contact.form');
  const tProducts = useTranslations('products');
  const shouldReduceMotion = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const inquirySchema = z.object({
    name: z.string().trim().min(1, t('required')),
    email: z
      .string()
      .trim()
      .min(1, t('required'))
      .email(t('invalidEmail')),
    phone: z.string().optional(),
    interest: z.string().optional(),
    message: z.string().trim().min(1, t('required')),
    _trap: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      interest: '',
      message: '',
      _trap: '',
    },
  });

  async function onSubmit(data: InquiryFormData) {
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok || result.error) {
        throw new Error(result.error || t('error'));
      }

      setSubmitted(true);
      reset();
    } catch {
      setSubmitError(t('error'));
    }
  }

  if (submitted) {
    const successState = (
      <div className="bg-accent-light border border-accent/20 rounded-xl p-8 text-center">
        <CheckCircle2 className="w-12 h-12 text-accent mx-auto mb-4" />
        <p className="text-ink font-semibold text-lg mb-1">{t('success')}</p>
        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={() => setSubmitted(false)}
        >
          {t('submit')}
        </Button>
      </div>
    );

    if (shouldReduceMotion) {
      return successState;
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {successState}
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: 'none' }}
        {...register('_trap')}
      />

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">
          {t('name')} <span className="text-warmth">*</span>
        </Label>
        <Input
          id="name"
          placeholder={t('namePlaceholder')}
          className="border-mist focus:border-accent focus:ring-accent/20"
          {...register('name')}
        />
        {errors.name && (
          <p className="text-xs text-warmth">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">
          {t('email')} <span className="text-warmth">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder={t('emailPlaceholder')}
          className="border-mist focus:border-accent focus:ring-accent/20"
          {...register('email')}
        />
        {errors.email && (
          <p className="text-xs text-warmth">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone">{t('phone')}</Label>
        <Input
          id="phone"
          type="tel"
          placeholder={t('phonePlaceholder')}
          className="border-mist focus:border-accent focus:ring-accent/20"
          {...register('phone')}
        />
      </div>

      {/* Interest (Select) */}
      <div className="space-y-2">
        <Label htmlFor="interest">{t('interest')}</Label>
        <Select onValueChange={(value) => setValue('interest', value)}>
          <SelectTrigger className="w-full border-mist focus:border-accent focus:ring-accent/20">
            <SelectValue placeholder={t('interestPlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            {categoryKeys.map((key) => (
              <SelectItem key={key} value={key}>
                {tProducts(`categories.${key}.title`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message">
          {t('message')} <span className="text-warmth">*</span>
        </Label>
        <Textarea
          id="message"
          placeholder={t('messagePlaceholder')}
          rows={5}
          className="border-mist focus:border-accent focus:ring-accent/20"
          {...register('message')}
        />
        {errors.message && (
          <p className="text-xs text-warmth">{errors.message.message}</p>
        )}
      </div>

      <AnimatePresence initial={false}>
        {submitError &&
          (shouldReduceMotion ? (
            <p className="flex items-start gap-2 rounded-md border border-warmth/30 bg-warmth/10 px-3 py-2 text-sm text-warmth">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{submitError}</span>
            </p>
          ) : (
            <motion.p
              className="flex items-start gap-2 rounded-md border border-warmth/30 bg-warmth/10 px-3 py-2 text-sm text-warmth"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.16, ease: 'easeOut' }}
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{submitError}</span>
            </motion.p>
          ))}
      </AnimatePresence>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-accent hover:bg-accent-hover text-white w-full sm:w-auto"
      >
        {isSubmitting ? (
          t('sending')
        ) : (
          <>
            {t('submit')}
            <Send className="w-4 h-4 ml-1.5" />
          </>
        )}
      </Button>
    </form>
  );
}
