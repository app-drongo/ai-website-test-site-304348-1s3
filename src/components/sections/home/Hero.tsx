'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, CloudIcon } from 'lucide-react';
import Image from 'next/image';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_HERO = {
  title: 'Transform Your Digital Vision',
  description:
    'Build powerful, scalable applications with our cutting-edge development platform. Designed for modern teams who demand excellence and efficiency.',
  primaryCTA: 'Start Building',
  secondaryCTA: 'View Demo',
  primaryCTAHref: '/get-started',
  secondaryCTAHref: '#demo',
  showIcon: true,
  iconUrl: '',
  iconAlt: 'Platform logo',
  backgroundImage: '/api/placeholder/1920/1080',
  backgroundImageAlt: 'Modern tech workspace with developers collaborating',
  showBackgroundImage: true,
  backgroundOverlay: true,
  overlayOpacity: 0.7,
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();

  return (
    <section id="hero" className="relative min-h-[80vh] overflow-hidden bg-background">
      {/* Background Image */}
      {config.showBackgroundImage && config.backgroundImage && (
        <div className="absolute inset-0">
          <Image
            src={config.backgroundImage}
            alt={config.backgroundImageAlt}
            fill
            className="object-cover"
            priority
            data-editable-src="backgroundImage"
          />
          {/* Overlay */}
          {config.backgroundOverlay && (
            <div
              className="absolute inset-0 bg-background"
              style={{ opacity: config.overlayOpacity }}
            />
          )}
        </div>
      )}

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex min-h-[80vh] flex-col items-center justify-center py-20 text-center">
          {/* Icon/Logo */}
          {config.showIcon && (
            <div className="mb-12 flex h-32 w-32 items-center justify-center rounded-full bg-foreground/10 backdrop-blur-sm border border-border/20 text-foreground">
              {config.iconUrl ? (
                <Image
                  src={config.iconUrl}
                  alt={config.iconAlt}
                  width={128}
                  height={128}
                  className="rounded-full"
                  data-editable-src="iconUrl"
                />
              ) : (
                <CloudIcon className="h-16 w-16" />
              )}
            </div>
          )}

          {/* Main Title */}
          <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span data-editable="title" className="text-foreground drop-shadow-sm">
              {config.title}
            </span>
          </h1>

          {/* Description */}
          <p
            data-editable="description"
            className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl drop-shadow-sm"
          >
            {config.description}
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="group px-8 shadow-lg backdrop-blur-sm"
              onClick={() => navigate(config.primaryCTAHref)}
              data-editable-href="primaryCTAHref"
              data-href={config.primaryCTAHref}
            >
              <span data-editable="primaryCTA">{config.primaryCTA}</span>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 backdrop-blur-sm border-border/50 bg-background/20 hover:bg-background/30"
              onClick={() => navigate(config.secondaryCTAHref)}
              data-editable-href="secondaryCTAHref"
              data-href={config.secondaryCTAHref}
            >
              <span data-editable="secondaryCTA">{config.secondaryCTA}</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
