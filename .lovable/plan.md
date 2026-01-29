

# Square Payments Integration Plan

## Overview

This plan integrates Square payment processing into the existing invoice system, allowing customers to pay invoices using credit/debit cards via Square's secure payment infrastructure.

## Approach: Square Checkout Links

We'll use **Square Checkout Links** - the simplest and most secure approach. When a customer clicks "Pay Now," we redirect them to a Square-hosted payment page. This avoids PCI compliance concerns and works seamlessly on mobile.

```text
+----------------+       +------------------+       +------------------+
|  Invoice Page  | ----> | Edge Function    | ----> | Square Checkout  |
|  (Pay Now btn) |       | (create link)    |       | (hosted page)    |
+----------------+       +------------------+       +------------------+
                                                            |
                                                            v
+----------------+       +------------------+       +------------------+
| Payment Done   | <---- | Webhook Handler  | <---- | Square confirms  |
| (update DB)    |       | (edge function)  |       | payment complete |
+----------------+       +------------------+       +------------------+
```

## What You'll Need

Before implementation, you'll need to provide:
1. **Square Application ID** - from Square Developer Dashboard
2. **Square Access Token** - for API authentication  
3. **Square Location ID** - identifies your business location

## Implementation Steps

### Step 1: Add Square Secrets

Store your Square credentials securely as backend secrets:
- `SQUARE_APPLICATION_ID`
- `SQUARE_ACCESS_TOKEN`
- `SQUARE_LOCATION_ID`

### Step 2: Create Payment Link Edge Function

New file: `supabase/functions/create-square-checkout/index.ts`

This function will:
- Receive invoice details (id, amount, customer info)
- Call Square's Checkout API to create a payment link
- Include the invoice ID in the reference so we can track it
- Return the checkout URL to redirect the customer

### Step 3: Create Webhook Handler Edge Function

New file: `supabase/functions/square-webhook/index.ts`

This function will:
- Receive payment confirmation from Square
- Verify the webhook signature for security
- Extract the invoice ID from the payment reference
- Update the invoice status to "paid" in the database
- Record the `paid_at` timestamp

### Step 4: Update Invoice Database Table

Add columns to track Square payment details:
- `square_payment_id` (text, nullable) - Square's payment reference
- `payment_method` (text, default 'square') - track payment source

### Step 5: Update Invoice Page

Modify `src/pages/InvoicePage.tsx`:
- Replace the demo payment simulation with a real Square checkout call
- On "Pay Now" click, call the edge function to get checkout URL
- Redirect customer to Square's secure payment page
- Handle return from Square (success/cancel URLs)
- Remove the "Demo Mode" notice when Square is configured

### Step 6: Add Payment Success/Cancel Pages

Create simple pages to handle post-payment redirects:
- Success page: confirms payment, shows receipt
- Cancel page: allows customer to retry payment

## Technical Details

**Edge Function: create-square-checkout**
```text
Request:
  - invoiceId: string
  - amount: number (in dollars)
  - customerEmail: string
  - description: string

Response:
  - checkoutUrl: string (Square payment page URL)
```

**Edge Function: square-webhook**
```text
Validates Square signature header
Handles: payment.completed event
Updates: invoices table (status, paid_at, square_payment_id)
```

**Database Changes**
```text
ALTER TABLE invoices
ADD COLUMN square_payment_id TEXT,
ADD COLUMN payment_method TEXT DEFAULT 'manual';
```

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `supabase/functions/create-square-checkout/index.ts` | Create | Generate Square checkout links |
| `supabase/functions/square-webhook/index.ts` | Create | Handle payment confirmations |
| `src/pages/InvoicePage.tsx` | Modify | Add real payment flow |
| `src/pages/PaymentSuccess.tsx` | Create | Post-payment confirmation |
| `src/pages/PaymentCancel.tsx` | Create | Payment retry page |
| `src/App.tsx` | Modify | Add new routes |
| Database migration | Create | Add Square tracking columns |

## Security Considerations

- Square Access Token stored as backend secret (never exposed to frontend)
- Webhook signature verification prevents spoofed payment confirmations
- All payment processing happens on Square's PCI-compliant infrastructure
- Invoice amounts validated server-side before creating checkout links

## Testing Flow

1. Create a test invoice in admin dashboard
2. Open the invoice link
3. Click "Pay Now" - should redirect to Square checkout
4. Complete payment with Square test card
5. Verify redirect back to success page
6. Confirm invoice status updated to "paid" in admin dashboard

