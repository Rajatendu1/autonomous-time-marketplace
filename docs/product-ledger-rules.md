# Time Credit Ledger Rules

The MVP ledger uses minutes as credits. It does not process money.

## States

- Spendable: credits available for booking or posting requests.
- Held: credits reserved for an active booking or request.
- Earned: credits received after a completed exchange.
- Disputed: credits paused while support reviews an issue.
- Released: credits returned to the spender after cancellation or dispute resolution.

## Booking Flow

1. Buyer chooses a time block.
2. Credits move from spendable to held.
3. Seller accepts or declines.
4. If accepted and completed, held credits become earned credits for the seller.
5. If declined or cancelled inside policy, held credits return to buyer spendable balance.

## Trust Rules

- New accounts have small transaction limits.
- Higher limits require completed exchanges and positive reviews.
- Disputes reduce future autonomy until reviewed.
- Safety issues bypass ordinary support and require human review.

## No-Cost Prototype Rule

The prototype should avoid payment processors. Cash payments, taxes, invoices, and withdrawals are out of scope until explicitly approved.

