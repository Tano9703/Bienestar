import React from 'react';
import { Compass, Wrench, Radio, LifeBuoy, BookOpen, Bot, HelpCircle } from 'lucide-react';

const challengeIcons = {
  Compass,
  Wrench,
  Radio,
  LifeBuoy,
  BookOpen,
  Bot,
};

const getChallengeIcon = (iconName) => {
  const IconComponent = challengeIcons[iconName];
  return IconComponent || HelpCircle;
};

export default getChallengeIcon;