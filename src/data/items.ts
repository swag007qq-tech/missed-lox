import type { SoundCategory } from '../utils/soundFx';

export type ItemId =
  | 'rotten_apple'
  | 'rotten_tomato'
  | 'trash_bag'
  | 'dirty_rag'
  | 'crumpled_paper'
  | 'dirty_boot'
  | 'banana_peel'
  | 'mud_clod'
  | 'spoiled_food'
  | 'poop'
  | 'rotten_egg'
  | 'wet_fish'
  | 'cream_pie'
  | 'stinky_sock';

export type HitBehavior = 'stick' | 'fall' | 'slide';

export interface ThrowItem {
  id: ItemId;
  name: string;
  behavior: HitBehavior;
  sound: SoundCategory;
  splatColors: string[];
  impactText: string;
  weight: number; // controls frame shake & fall speed
}

export const THROW_ITEMS: ThrowItem[] = [
  {
    id: 'rotten_tomato',
    name: 'Тухлый помидор',
    behavior: 'stick',
    sound: 'splat',
    splatColors: ['#c8281d', '#8c1a11', '#6e8c28', '#e85d3f'],
    impactText: 'ШМЯК!',
    weight: 0.7,
  },
  {
    id: 'rotten_apple',
    name: 'Гнилое яблоко',
    behavior: 'stick',
    sound: 'crunch',
    splatColors: ['#7d5427', '#4e3315', '#879636', '#c2995b'],
    impactText: 'ХРЯСЬ!',
    weight: 0.85,
  },
  {
    id: 'poop',
    name: 'Какашка',
    behavior: 'stick',
    sound: 'splat',
    splatColors: ['#6b3e1b', '#4a2810', '#8c5527', '#381e0b'],
    impactText: 'ПЛЮХ!',
    weight: 0.75,
  },
  {
    id: 'mud_clod',
    name: 'Комок грязи',
    behavior: 'stick',
    sound: 'splat',
    splatColors: ['#4c321d', '#342010', '#69482c', '#29190c'],
    impactText: 'ЧМЯК!',
    weight: 1.0,
  },
  {
    id: 'spoiled_food',
    name: 'Испорченная еда',
    behavior: 'stick',
    sound: 'splat',
    splatColors: ['#6f8c37', '#b59c45', '#4f5e24', '#8e6234'],
    impactText: 'ФУ-У!',
    weight: 0.8,
  },
  {
    id: 'dirty_boot',
    name: 'Грязный ботинок',
    behavior: 'fall',
    sound: 'thud',
    splatColors: ['#593c23', '#382515', '#785a3a'],
    impactText: 'БУМ!',
    weight: 1.5,
  },
  {
    id: 'trash_bag',
    name: 'Мусорный пакет',
    behavior: 'fall',
    sound: 'thud',
    splatColors: ['#2a2c2e', '#65783b', '#876037'],
    impactText: 'БАХ!',
    weight: 1.4,
  },
  {
    id: 'dirty_rag',
    name: 'Грязная тряпка',
    behavior: 'slide',
    sound: 'slap',
    splatColors: ['#6e6759', '#4a4439', '#8c8371'],
    impactText: 'ШЛЁП!',
    weight: 0.9,
  },
  {
    id: 'crumpled_paper',
    name: 'Размятая бумага',
    behavior: 'fall',
    sound: 'boing',
    splatColors: ['#dcd5c4', '#b8af9c', '#8f8675'],
    impactText: 'ПУК!',
    weight: 0.45,
  },
  {
    id: 'banana_peel',
    name: 'Банановая кожура',
    behavior: 'slide',
    sound: 'boing',
    splatColors: ['#e8c63a', '#8c6918', '#523b0c'],
    impactText: 'ВЖУХ!',
    weight: 0.55,
  },
  {
    id: 'rotten_egg',
    name: 'Тухлое яйцо',
    behavior: 'stick',
    sound: 'crunch',
    splatColors: ['#b8c942', '#e8e0c8', '#7d8a22', '#f2da52'],
    impactText: 'ХЛЮП!',
    weight: 0.6,
  },
  {
    id: 'wet_fish',
    name: 'Мокрая рыба',
    behavior: 'fall',
    sound: 'slap',
    splatColors: ['#7b93a8', '#b0c6d6', '#4a6073'],
    impactText: 'ЛЯП!',
    weight: 1.05,
  },
  {
    id: 'cream_pie',
    name: 'Пирог с кремом',
    behavior: 'stick',
    sound: 'splat',
    splatColors: ['#fff9ee', '#f5e1ba', '#d4823b', '#e84a5f'],
    impactText: 'БАЦ!',
    weight: 0.85,
  },
  {
    id: 'stinky_sock',
    name: 'Вонючий носок',
    behavior: 'slide',
    sound: 'slap',
    splatColors: ['#7e8c45', '#b5b89a', '#4d5724'],
    impactText: 'БРР!',
    weight: 0.65,
  },
];
