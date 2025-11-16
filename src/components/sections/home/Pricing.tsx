'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PRICING = {
  badge: 'Pricing',
  mainTitle: 'Simple, Transparent',
  mainTitleHighlight: 'Pricing',
  mainDescription:
    'Choose the perfect plan for your tech project. No hidden fees, no surprises. Scale as you grow.',
  billingMonthly: 'Monthly',
  billingAnnual: 'Annual',
  billingAnnualBadge: 'Save 20%',

  plans: [
    {
      name: 'Starter',
      description: 'Perfect for developers and small projects',
      price: 'Free',
      period: '',
      badge: null,
      cta: 'Get Started',
      ctaHref: '/signup',
      trial: null,
      popular: false,
      features: [
        'Up to 5 projects',
        'Basic API access',
        'Community support',
        '5GB storage',
        'Standard analytics',
      ],
    },
    {
      name: 'Pro',
      description: 'Best for growing teams and businesses',
      price: '$49',
      period: '/month',
      badge: 'Most Popular',
      cta: 'Start Free Trial',
      ctaHref: '/signup',
      trial: '14-day free trial • No credit card required',
      popular: true,
      features: [
        'Unlimited projects',
        'Advanced API access',
        'Priority support',
        '100GB storage',
        'Advanced analytics',
        'Custom integrations',
        'Team collaboration',
        'SSL certificates',
      ],
    },
    {
      name: 'Enterprise',
      description: 'For large organizations with custom needs',
      price: 'Custom',
      period: '',
      badge: 'Contact Sales',
      cta: 'Contact Sales',
      ctaHref: '/contact',
      trial: null,
      popular: false,
      features: [
        'Everything in Pro',
        'Unlimited storage',
        '24/7 dedicated support',
        'Custom integrations',
        'Advanced security',
        'SLA guarantee',
        'Dedicated account manager',
        'White-label solutions',
      ],
    },
  ],

  bottomTitle: 'Need a custom solution?',
  bottomDescription:
    'We work with enterprises to build tailored solutions that fit your specific technical requirements and scale.',
  bottomCTA: 'Schedule a Demo',
  bottomCTAHref: '/demo',
};

type PricingProps = Partial<typeof DEFAULT_PRICING>;

export default function Pricing(props: PricingProps) {
  const config = { ...DEFAULT_PRICING, ...props };
  const navigate = useSmartNavigation();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  // Get plan count for responsive grid
  const planCount = config.plans.length;

  return (
    <section className="py-24 bg-background" data-editable="pricing">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            <span data-editable="badge">{config.badge}</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span data-editable="mainTitle">{config.mainTitle}</span>
            <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              <span data-editable="mainTitleHighlight">{config.mainTitleHighlight}</span>
            </span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            <span data-editable="mainDescription">{config.mainDescription}</span>
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center p-1 bg-muted rounded-lg">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-md transition-all',
                billingCycle === 'monthly'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <span data-editable="billingMonthly">{config.billingMonthly}</span>
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2',
                billingCycle === 'annual'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <span data-editable="billingAnnual">{config.billingAnnual}</span>
              <Badge variant="secondary" className="text-xs">
                <span data-editable="billingAnnualBadge">{config.billingAnnualBadge}</span>
              </Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards - Dynamic grid based on plan count */}
        <div
          className={cn(
            'grid gap-8 max-w-7xl mx-auto',
            planCount <= 2 && 'grid-cols-1 md:grid-cols-2 max-w-5xl',
            planCount === 3 && 'grid-cols-1 lg:grid-cols-3',
            planCount >= 4 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          )}
        >
          {config.plans.map((plan, index) => (
            <Card
              key={index}
              className={cn(
                'relative overflow-hidden transition-all duration-300 hover:shadow-lg',
                plan.popular
                  ? 'border-primary/50 shadow-lg shadow-primary/10 lg:scale-105'
                  : 'border-border/50 hover:border-primary/20'
              )}
            >
              {/* Popular Badge */}
              {plan.popular && plan.badge && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1 shadow-lg">
                    <Star className="size-3 mr-1 fill-current" />
                    <span>{plan.badge}</span>
                  </Badge>
                </div>
              )}

              {/* Background Gradient */}
              {plan.popular && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
              )}

              <CardHeader className={cn('relative text-center pb-8', plan.popular && 'pt-10')}>
                {plan.badge && !plan.popular && (
                  <Badge variant="outline" className="mb-4 mx-auto w-fit">
                    <span>{plan.badge}</span>
                  </Badge>
                )}

                <CardTitle className="text-2xl mb-2">
                  <span>{plan.name}</span>
                </CardTitle>
                <CardDescription className="text-base mb-6">
                  <span>{plan.description}</span>
                </CardDescription>

                <div className="flex items-end justify-center gap-1">
                  <span className="text-4xl font-bold">
                    <span>{plan.price}</span>
                  </span>
                  {plan.period && (
                    <span className="text-muted-foreground mb-1">
                      <span>{plan.period}</span>
                    </span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="relative space-y-6">
                {/* Features List */}
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className="size-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="size-3 text-primary" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  className={cn(
                    'w-full text-base py-6',
                    plan.popular && 'bg-primary hover:bg-primary/90'
                  )}
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => navigate(plan.ctaHref)}
                  data-editable-href={`plan${index + 1}CTAHref`}
                  data-href={plan.ctaHref}
                >
                  {plan.popular && <Zap className="size-4 mr-2" />}
                  <span>{plan.cta}</span>
                </Button>

                {/* Trial text */}
                {plan.trial && (
                  <p className="text-center text-sm text-muted-foreground">
                    <span>{plan.trial}</span>
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-16 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">
            <span data-editable="bottomTitle">{config.bottomTitle}</span>
          </h3>
          <p className="text-muted-foreground mb-6">
            <span data-editable="bottomDescription">{config.bottomDescription}</span>
          </p>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate(config.bottomCTAHref)}
            data-editable-href="bottomCTAHref"
            data-href={config.bottomCTAHref}
          >
            <span data-editable="bottomCTA">{config.bottomCTA}</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
