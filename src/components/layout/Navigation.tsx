'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_NAVBAR = {
  isTransparent: false,
  lightText: false,
  logoText: 'TestSite',
  signInButton: 'Sign In',
  signInHref: '/signin',
  getStartedButton: 'Get Started',
  getStartedHref: '/signup',
  navigationItems: [
    {
      name: 'Home',
      href: '/',
      textEditableId: 'text-nav-home',
      hrefEditableId: 'link-nav-home',
    },
    {
      name: 'Pricing',
      href: '#pricing',
      textEditableId: 'text-nav-pricing',
      hrefEditableId: 'link-nav-pricing',
    },
  ],
};

type NavbarProps = Partial<typeof DEFAULT_NAVBAR>;

export default function Navigation(props: NavbarProps) {
  const config = { ...DEFAULT_NAVBAR, ...props };
  const navigate = useSmartNavigation();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!config.isTransparent) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [config.isTransparent]);

  const navigation = config.navigationItems;

  return (
    <nav
      id="navigation"
      className={cn(
        config.isTransparent && !isScrolled
          ? 'absolute top-0 left-0 w-full z-50'
          : 'sticky top-0 w-full z-50',
        !config.isTransparent && 'border-b bg-background/80 backdrop-blur-md',
        config.isTransparent && !isScrolled && 'bg-transparent border-transparent',
        config.isTransparent && isScrolled && 'bg-background/80 backdrop-blur-md border-b',
        'transition-all duration-300'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  {config.logoText.charAt(0)}
                </span>
              </div>
              <span
                className={cn(
                  'font-bold text-xl transition-colors',
                  config.isTransparent && !isScrolled && config.lightText
                    ? 'text-primary-foreground'
                    : 'text-foreground'
                )}
              >
                <span data-editable="logoText">{config.logoText}</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  data-editable-href={item.hrefEditableId}
                  data-href={item.href}
                  className={cn(
                    'px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md',
                    config.isTransparent && !isScrolled && config.lightText
                      ? 'text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10'
                      : 'text-muted-foreground hover:text-accent-foreground hover:bg-accent'
                  )}
                >
                  <span data-editable={item.textEditableId}>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(config.signInHref)}
              className={cn(
                config.isTransparent && !isScrolled && config.lightText
                  ? 'text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10'
                  : ''
              )}
              data-editable-href="signInHref"
              data-href={config.signInHref}
            >
              <span data-editable="signInButton">{config.signInButton}</span>
            </Button>
            <Button
              size="sm"
              className="group"
              onClick={() => navigate(config.getStartedHref)}
              data-editable-href="getStartedHref"
              data-href={config.getStartedHref}
            >
              <span data-editable="getStartedButton">{config.getStartedButton}</span>
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className={cn(
                config.isTransparent && !isScrolled && config.lightText
                  ? 'text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10'
                  : ''
              )}
            >
              {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'md:hidden transition-all duration-300 ease-in-out overflow-hidden',
            isOpen ? 'max-h-96 pb-4' : 'max-h-0'
          )}
        >
          <div
            className={cn(
              'px-2 pt-2 pb-3 space-y-1 border-t',
              config.isTransparent && !isScrolled && config.lightText
                ? 'border-primary-foreground/20'
                : 'border-border'
            )}
          >
            {navigation.map(item => (
              <Link
                key={item.name}
                href={item.href}
                data-editable-href={item.hrefEditableId}
                data-href={item.href}
                className={cn(
                  'block px-3 py-2 text-base font-medium transition-colors duration-200 rounded-md',
                  config.isTransparent && !isScrolled && config.lightText
                    ? 'text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10'
                    : 'text-muted-foreground hover:text-accent-foreground hover:bg-accent'
                )}
                onClick={() => setIsOpen(false)}
              >
                <span data-editable={item.textEditableId}>{item.name}</span>
              </Link>
            ))}
            <div className="pt-4 flex flex-col space-y-2">
              <Button
                variant="ghost"
                className={cn(
                  'justify-start',
                  config.isTransparent && !isScrolled && config.lightText
                    ? 'text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10'
                    : ''
                )}
                onClick={() => navigate(config.signInHref)}
                data-editable-href="signInHref"
                data-href={config.signInHref}
              >
                <span data-editable="signInButton">{config.signInButton}</span>
              </Button>
              <Button
                className="justify-start group"
                onClick={() => navigate(config.getStartedHref)}
                data-editable-href="getStartedHref"
                data-href={config.getStartedHref}
              >
                <span data-editable="getStartedButton">{config.getStartedButton}</span>
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
