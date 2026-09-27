-- Lessons Infrastructure
-- Curriculum lessons table for the /learn section. Lessons are mapped to the
-- 2026 CFA Level 1 curriculum (topic + module + learning outcome codes) and
-- gated: free sample lessons are publicly readable, full lessons are served
-- server-side only to paid subscribers (see app/learn/[topic]/[module]).

CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic TEXT NOT NULL CHECK (topic IN (
    'Ethical and Professional Standards',
    'Quantitative Methods',
    'Economics',
    'Financial Statement Analysis',
    'Corporate Issuers',
    'Equity Investments',
    'Fixed Income',
    'Derivatives',
    'Alternative Investments',
    'Portfolio Management'
  )),
  module_code TEXT NOT NULL,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  los_codes TEXT[] DEFAULT '{}',
  content TEXT NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  is_free BOOLEAN DEFAULT false,
  read_time_minutes INTEGER DEFAULT 4,
  sort_order INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(topic, slug)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_lessons_topic ON lessons(topic);
CREATE INDEX IF NOT EXISTS idx_lessons_status ON lessons(status);
CREATE INDEX IF NOT EXISTS idx_lessons_slug ON lessons(slug);
CREATE INDEX IF NOT EXISTS idx_lessons_topic_sort ON lessons(topic, status, sort_order);

-- Enable RLS
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

-- Public can read free, published samples only. Paywalled lessons are fetched
-- by the server with the service-role client after a subscription check, so no
-- policy exposes them to anonymous or authenticated non-paying users.
CREATE POLICY "Allow public read access to free published lessons"
  ON lessons
  FOR SELECT
  USING (status = 'published' AND is_free = true);

-- Seed: one free sample lesson per topic, mapped to the first curriculum
-- module and its live learning-outcome codes from the question bank.
INSERT INTO lessons (topic, module_code, slug, title, description, los_codes, content, status, is_free, read_time_minutes, sort_order, published_at)
VALUES
(
  'Ethical and Professional Standards',
  'ethics-trust',
  'ethics-and-trust-in-the-investment-profession',
  'Ethics and Trust in the Investment Profession',
  'Why ethics sits at the centre of the investment profession, how ethical conduct differs from legal compliance, and a framework for ethical decisions.',
  ARRAY['EPS-ETIP-1', 'EPS-ETIP-2'],
  'Ethics is the study of right and wrong conduct. In investment management it matters more than in most professions, because clients hand over their savings to people they rarely meet.

## Why trust matters

Clients often cannot judge the quality of investment advice directly, even after the fact. That information gap is why the profession depends on trust, and why a single scandal can damage confidence in an entire market.

## Ethics versus law

Legal compliance is the floor, not the ceiling. An action can be legal and still unethical. Ethical conduct means going beyond the minimum when the two diverge.

## A framework for decisions

The CFA Institute framework asks you to identify the relevant facts and duties, consider the alternatives, then act and reflect. Using a structured process consistently leads to better decisions under pressure.

**Exam focus.** This module tests whether you can explain why ethics matters and describe a decision-making framework. Rule memorisation comes later.',
  'published', true, 3, 1, NOW()
),
(
  'Quantitative Methods',
  'rates-returns',
  'rates-and-returns',
  'Rates and Returns',
  'Three interpretations of an interest rate, the premiums that build a required return, and the holding period return.',
  ARRAY['QM-RR-1', 'QM-RR-2'],
  'An interest rate can be read three ways: as a required rate of return, as a discount rate, or as an opportunity cost. Keep all three in mind and most of fixed income and equity valuation becomes the same idea applied twice.

## What makes up an interest rate

A nominal required return compensates the investor for several distinct things:

\[ r = r_{rf,\text{real}} + \pi + \text{DRP} + \text{LP} + \text{MP} \]

where \( r_{rf,\text{real}} \) is the real risk-free rate, \( \pi \) is expected inflation, and DRP, LP and MP are the default, liquidity and maturity risk premiums.

## Measuring returns

The holding period return combines price change and income:

\[ R = \frac{P_1 - P_0 + D_1}{P_0} \]

For a share bought at 50, sold at 54, with a dividend of 2, \( R = (54 - 50 + 2) / 50 = 12\% \).

**Exam focus.** Be ready to decompose a rate into its premiums and to compute a holding period return quickly. Both appear throughout the level.',
  'published', true, 4, 1, NOW()
),
(
  'Economics',
  'firm-market-structures',
  'the-firm-and-market-structures',
  'The Firm and Market Structures',
  'Perfect competition, monopolistic competition, oligopoly and monopoly: how market structure drives pricing power and long-run profit.',
  ARRAY['ECON-FMS-1', 'ECON-FMS-2'],
  'Market structure describes how many firms compete, how different their products are, and how hard entry is. It drives pricing power and long-run profit.

## The four structures

- **Perfect competition**: many firms, identical products, no barriers. Firms are price takers and earn zero economic profit in long-run equilibrium.
- **Monopolistic competition**: many firms, differentiated products, low barriers. Some pricing power, but entry erodes economic profit over time.
- **Oligopoly**: few firms, high barriers. Pricing is strategic and each firm watches the others.
- **Monopoly**: one firm, very high barriers. The firm sets its price along the demand curve.

## Breakeven and shutdown

In the short run a firm keeps producing while price covers average variable cost; below that it shuts down. It breaks even where price equals average total cost.

**Exam focus.** Expect to identify a structure from a description and to state its long-run profit outcome.',
  'published', true, 3, 1, NOW()
),
(
  'Financial Statement Analysis',
  'fsa-intro',
  'introduction-to-financial-statement-analysis',
  'Introduction to Financial Statement Analysis',
  'What the principal financial statements show, the accounting equation behind all of them, and the difference between reporting and analysis.',
  ARRAY['FSA-IFSA-1', 'FSA-IFSA-2'],
  'Financial reporting provides information about a company. Financial statement analysis turns that information into decisions about investing in or lending to the company.

## The principal statements

- **Balance sheet**: financial position at a point in time.
- **Income statement**: performance over a period.
- **Cash flow statement**: cash generated and used, split into operating, investing and financing activities.
- **Statement of changes in equity**: how the owners claim moved during the period.

Everything hangs on one identity:

\[ \text{Assets} = \text{Liabilities} + \text{Equity} \]

## Roles and limits

Reports follow standards such as IFRS or US GAAP, and an auditor gives an opinion on them. A clean (unqualified) opinion is not a guarantee; analysis still requires judgement about estimates and management choices.

**Exam focus.** Know which statement answers which question, and keep the reporting role separate from the analysis role.',
  'published', true, 4, 1, NOW()
),
(
  'Corporate Issuers',
  'organizational-forms',
  'organizational-forms-corporate-issuer-features-and-ownership',
  'Organizational Forms, Corporate Issuer Features, and Ownership',
  'Sole proprietorships, partnerships and corporations: how the legal form sets liability, taxation and access to capital.',
  ARRAY['CI-OFCFO-1', 'CI-OFCFO-2'],
  'A business can be organised in several legal forms, and the choice determines liability, taxation and access to capital.

## The main forms

- **Sole proprietorship**: one owner, full control, unlimited personal liability, profits taxed once as personal income.
- **Partnership**: two or more owners share control and liability. In a limited partnership, some partners have liability capped at their investment.
- **Corporation**: a separate legal entity. Owners (shareholders) have limited liability, the corporation pays its own tax, and ownership transfers easily through shares.

## Public versus private

Corporations may be privately held or listed on an exchange. Listing gives access to public capital and liquidity for shareholders, at the cost of disclosure and regulation.

**Exam focus.** Questions test the trade-offs of each form, especially limited liability and the double taxation of corporate profits.',
  'published', true, 3, 1, NOW()
),
(
  'Equity Investments',
  'market-organization',
  'market-organization-and-structure',
  'Market Organization and Structure',
  'What the financial system does, long and short positions, market and limit orders, and the roles of primary and secondary markets.',
  ARRAY['EI-MOS-1', 'EI-MOS-2'],
  'The financial system moves money from savers to borrowers, allocates risk, and lets investors trade. Understanding its plumbing makes every later topic easier.

## What the system does

It helps participants save, borrow, raise equity capital, manage risk, trade assets immediately, and trade on information. Well-functioning markets price assets close to fundamental value.

## Positions and orders

- A **long** position profits when the price rises.
- A **short** position borrows and sells an asset, hoping to buy it back cheaper.

Orders tell the market how to trade: a **market order** executes immediately at the best available price, while a **limit order** executes only at the stated price or better.

## Primary and secondary markets

Securities are created in primary markets (IPOs and placements) and then trade between investors in secondary markets, which provide the liquidity that makes primary issuance possible.

**Exam focus.** Be precise on positions, order types and the roles of each market. These definitions recur throughout the equity topic.',
  'published', true, 4, 1, NOW()
),
(
  'Fixed Income',
  'fi-features',
  'fixed-income-instrument-features',
  'Fixed-Income Instrument Features',
  'Issuer, maturity, par value and coupon: the defining elements of a bond, and the price-yield relationship that drives the whole topic.',
  ARRAY['FI-FIIF-1', 'FI-FIIF-2'],
  'A bond is a loan packaged as a security. Its basic features define who owes what, and when.

## Defining elements

- **Issuer**: the borrower, such as a government or a company.
- **Maturity**: the date the principal is repaid.
- **Par value**: the principal amount repaid at maturity.
- **Coupon**: the interest paid, usually stated as an annual percentage of par and paid annually or semiannually.

## Price and yield

A bond price is the present value of its cash flows:

\[ P = \sum_{t=1}^{N} \frac{C_t}{(1+r)^t} + \frac{F}{(1+r)^N} \]

where \( C_t \) is the coupon in period \( t \), \( F \) is the par value and \( r \) is the market discount rate. When market rates rise, the price falls. This inverse relationship is the single most tested idea in fixed income.

**Exam focus.** Identify each feature from a term sheet and reason about the price-yield direction without a calculator.',
  'published', true, 4, 1, NOW()
),
(
  'Derivatives',
  'derivative-features',
  'derivative-instrument-and-derivative-market-features',
  'Derivative Instrument and Derivative Market Features',
  'What makes a derivative a derivative, the four basic contracts, and the difference between exchange-traded and over-the-counter markets.',
  ARRAY['DER-DIDMF-1', 'DER-DIDMF-2'],
  'A derivative is a contract whose value comes from an underlying: a share, bond, commodity, currency, interest rate or index.

## The four basic contracts

- **Forward**: a customised agreement to trade later at a price fixed today.
- **Future**: a standardised forward traded on an exchange and settled daily.
- **Option**: the right, not the obligation, to buy (call) or sell (put) at a fixed strike price.
- **Swap**: an exchange of cash flow streams, such as fixed interest payments for floating ones.

## Exchange versus over-the-counter

Exchange-traded contracts are standardised, liquid and backed by a clearing house. Over-the-counter contracts are flexible and private, but carry counterparty risk.

**Exam focus.** Know what makes a derivative a derivative, and match each contract type to its features.',
  'published', true, 3, 1, NOW()
),
(
  'Alternative Investments',
  'alt-features',
  'alternative-investment-features-methods-and-structures',
  'Alternative Investment Features, Methods, and Structures',
  'Private capital, real assets, hedge funds and digital assets: what counts as an alternative investment and why investors use them.',
  ARRAY['AI-AIFMS-1', 'AI-AIFMS-2'],
  'Alternative investments sit outside traditional long-only positions in shares, bonds and cash.

## The main categories

- **Private capital**: private equity and private debt.
- **Real assets**: real estate, infrastructure, commodities and natural resources.
- **Hedge funds**: pooled funds using flexible strategies, including short selling and leverage.
- **Digital assets**: cryptocurrencies and tokens.

## Why investors bother

Alternatives aim to raise returns, diversify traditional portfolios or hedge inflation. The trade-offs are lower liquidity, higher fees, complex valuation and less regulatory protection.

## How they are accessed

Usually through fund structures in which a general partner manages money for limited partners, typically charging a management fee plus a performance fee.

**Exam focus.** Questions mostly test category definitions and the feature trade-offs versus traditional assets.',
  'published', true, 4, 1, NOW()
),
(
  'Portfolio Management',
  'portfolio-risk-return-1',
  'portfolio-risk-and-return-part-i',
  'Portfolio Risk and Return: Part I',
  'Holding period returns, arithmetic versus geometric mean returns, and what risk aversion means for required returns.',
  ARRAY['PM-PRR1-1', 'PM-PRR1-2'],
  'Portfolio management starts with measuring how an investment performed and how much risk that performance required.

## Measuring returns

The holding period return for one period is

\[ R = \frac{P_1 - P_0 + D_1}{P_0} \]

Across several periods, the arithmetic mean \( \bar{R} = \frac{1}{n} \sum_{t=1}^{n} R_t \) answers what the average period looked like, while the geometric mean answers what constant rate would compound to the same result. For volatile returns the geometric mean is the lower of the two.

## Risk and risk aversion

Investors are assumed to be risk averse: they accept more risk only in exchange for more expected return. A risk-free asset offers a known return; everything riskier must promise a premium on top of it.

**Exam focus.** Compute both mean returns, interpret the gap between them, and state what risk aversion implies for required returns.',
  'published', true, 4, 1, NOW()
)
ON CONFLICT (topic, slug) DO NOTHING;
