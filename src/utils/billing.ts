export type Discount =
  | { type: 'percent'; value: number } // value is percent, e.g. 10 for 10%
  | { type: 'amount'; value: number } // value is fixed amount in same currency

export type BreakdownRow = {
  description: string
  formula: string
  amount: number
}

export function toINR(n: number): string {
  return n.toFixed(2)
}

export function calculateBill(
  base: number,
  discount: Discount,
  taxPercent: number
): { breakdown: BreakdownRow[]; final: number } {
  const baseAmt = Number(base ?? 0)

  let discountAmount = 0
  if (discount.type === 'percent') {
    discountAmount = (baseAmt * discount.value) / 100
  } else {
    discountAmount = discount.value
  }

  // Ensure discount isn't greater than base
  if (discountAmount > baseAmt) discountAmount = baseAmt

  const taxable = baseAmt - discountAmount
  const tax = (taxable * taxPercent) / 100
  const final = taxable + tax

  const breakdown: BreakdownRow[] = [
    { description: 'Base Amount', formula: '—', amount: round2(baseAmt) },
    {
      description: 'Discount',
      formula:
        discount.type === 'percent'
          ? `${toINR(baseAmt)} × ${discount.value}%`
          : `${toINR(discount.value)} (fixed)`,
      amount: round2(discountAmount),
    },
    {
      description: 'Taxable Value',
      formula: `${toINR(baseAmt)} − ${toINR(round2(discountAmount))}`,
      amount: round2(taxable),
    },
    {
      description: 'Tax',
      formula: `${toINR(round2(taxable))} × ${taxPercent}%`,
      amount: round2(tax),
    },
    {
      description: 'Final Bill',
      formula: `${toINR(round2(taxable))} + ${toINR(round2(tax))}`,
      amount: round2(final),
    },
  ]

  return { breakdown, final: round2(final) }
}

function round2(n: number) {
  return Math.round((n + Number.EPSILON) * 100) / 100
}

export function breakdownToMarkdownTable(rows: BreakdownRow[]): string {
  const header = '| Description         | Formula             | Amount (₹)      |'
  const sep = '|---------------------|---------------------|-----------------|'
  const lines = rows.map((r) => {
    const amount = toINR(r.amount)
    return `| ${r.description} | ${r.formula} | ${amount} |`
  })

  return [header, sep, ...lines].join('\n')
}

// Example usage (uncomment for quick local test):
// const { breakdown } = calculateBill(500, { type: 'percent', value: 10 }, 5)
// console.log(breakdownToMarkdownTable(breakdown))
