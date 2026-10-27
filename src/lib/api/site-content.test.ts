import { it, expect, describe } from 'vitest';

import { toWhatsAppLink } from './site-content';

// ----------------------------------------------------------------------

describe('toWhatsAppLink', () => {
  it.each([
    ['085128043814', 'https://wa.me/6285128043814'],
    ['+62 851-2804-3814', 'https://wa.me/6285128043814'],
    [6285128043814, 'https://wa.me/6285128043814'],
  ])('normalizes the phone number %s to a wa.me link', (value, expected) => {
    expect(toWhatsAppLink(value)).toBe(expected);
  });

  it('keeps a URL on an allowed WhatsApp host as is', () => {
    expect(toWhatsAppLink(' https://api.whatsapp.com/send?phone=62851 ')).toBe(
      'https://api.whatsapp.com/send?phone=62851'
    );
  });

  it('never passes a non-http scheme through, only its digits', () => {
    expect(toWhatsAppLink('javascript:alert(1)')).toBe('https://wa.me/1');
  });

  it.each([
    ['https://evil.example/wa.me/62851'],
    ['https://wa.me.evil.example/62851'],
    ['https://'],
    ['   '],
    [null],
    [{ phone: '0851' }],
  ])('rejects %s so the caller falls back to the static contact', (value) => {
    expect(toWhatsAppLink(value)).toBeNull();
  });
});
