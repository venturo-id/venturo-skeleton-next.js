'use client';

import { HomeCta } from '../home-cta';
import { HomeHero } from '../home-hero';
import { HomeFaqs } from '../home-faqs';
import { HomeFocus } from '../home-focus';
import { HomeClients } from '../home-clients';
import { HomeProblem } from '../home-problem';
import { HomeSolution } from '../home-solution';
import { HomeResource } from '../home-resource';
import { HomeTechStack } from '../home-tech-stack';
import { HomeManagement } from '../home-management';
import { HomeFloatingCta } from '../home-floating-cta';
import { HomeSpecialOffer } from '../home-special-offer';

// ----------------------------------------------------------------------

export function HomeView() {
  return (
    <>
      <HomeHero />
      <HomeClients />
      <HomeProblem />
      <HomeSolution />
      <HomeFocus />
      <HomeManagement />
      <HomeResource />
      <HomeSpecialOffer />
      <HomeTechStack />
      <HomeFaqs />
      <HomeCta />
      <HomeFloatingCta />
    </>
  );
}
