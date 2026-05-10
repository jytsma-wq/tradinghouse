'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
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
import { Send, CheckCircle2 } from 'lucide-react';

const categoryKeys = [
  'maschinen',
  'chemie',
  'agrar',
  'baustoffe',
  'stahl',
  'elektronik',
] as const;

const inquirySchema = z.object({
  name: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  interest: z.string().optional(),
  message: z.string().min(1, 'Required'),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

export function InquiryForm() {
  const t = useTranslations('contact.form');
  const tProducts = useTranslations('products');
  const [submitted, setSubmitted] = useState(false);

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
    },
  });

  async function onSubmit(data: InquiryFormData) {
    // For now, just log and show success
    console.log('Inquiry submitted:', data);

    // Simulate a brief delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    setSubmitted(true);
    reset();
  }

  if (submitted) {
    return (
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
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
          <p className="text-xs text-warmth">{t('required')}</p>
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
          <p className="text-xs text-warmth">{t('required')}</p>
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
          <p className="text-xs text-warmth">{t('required')}</p>
        )}
      </div>

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
