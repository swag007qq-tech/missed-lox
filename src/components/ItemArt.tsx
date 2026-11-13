import React from 'react';
import type { ItemId } from '../data/items';

interface ItemArtProps {
  id: ItemId;
  variant?: 'item' | 'splat';
  className?: string;
}

export const ItemArt: React.FC<ItemArtProps> = ({ id, variant = 'item', className = 'w-14 h-14' }) => {
  if (variant === 'splat') {
    return <SplatArt id={id} className={className} />;
  }

  switch (id) {
    case 'rotten_tomato':
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          <ellipse cx="40" cy="45" rx="25" ry="22" fill="#B8291E" stroke="#3D120D" strokeWidth="2.5" />
          <path d="M22 38C25 27 37 24 46 27C55 29 61 36 60 46" fill="#D93A2B" />
          {/* Bruise & mold */}
          <ellipse cx="49" cy="49" rx="9" ry="7" fill="#5E4623" opacity="0.82" />
          <circle cx="51" cy="48" r="4" fill="#7D963C" opacity="0.85" />
          <circle cx="47" cy="52" r="2.2" fill="#A2BA56" opacity="0.85" />
          {/* Wrinkles */}
          <path d="M24 44C27 48 31 49 34 47" stroke="#6E140D" strokeWidth="2" strokeLinecap="round" />
          <path d="M36 57C41 59 46 58 49 56" stroke="#6E140D" strokeWidth="2" strokeLinecap="round" />
          {/* Stem */}
          <path d="M38 24C34 18 28 20 26 23C31 23 34 25 36 27C34 29 31 31 31 34C35 31 38 28 40 27C43 29 47 32 50 32C48 28 45 25 43 24C46 22 50 20 52 21C49 17 43 18 40 22L41 14L37 15L38 24Z" fill="#466B22" stroke="#22360F" strokeWidth="1.8" strokeLinejoin="round" />
          {/* Little fly */}
          <ellipse cx="62" cy="24" rx="2.5" ry="1.8" fill="#1F1916" />
          <ellipse cx="60" cy="21" rx="2" ry="1.2" transform="rotate(-30 60 21)" fill="#D8E5EB" opacity="0.85" />
          <ellipse cx="64" cy="21" rx="2" ry="1.2" transform="rotate(30 64 21)" fill="#D8E5EB" opacity="0.85" />
        </svg>
      );

    case 'rotten_apple':
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          <path d="M40 25C31 21 19 25 18 39C17 53 26 66 35 66C38 66 40 64 41 64C43 64 45 66 48 66C56 66 63 54 62 40C61 26 49 21 40 25Z" fill="#9E6C34" stroke="#36210E" strokeWidth="2.5" />
          <path d="M24 31C22 36 22 45 25 53C29 49 32 39 30 30C28 29 25 30 24 31Z" fill="#BA8643" opacity="0.7" />
          {/* Rotten core bite */}
          <path d="M59 35C52 37 49 43 52 50C54 53 58 54 61 52C62 47 62 40 59 35Z" fill="#4D3319" stroke="#36210E" strokeWidth="1.8" />
          {/* Cute worm peeking out */}
          <path d="M53 43C57 40 62 41 64 44C66 46 69 45 70 43" stroke="#E08090" strokeWidth="5.5" strokeLinecap="round" />
          <circle cx="69" cy="42" r="1.2" fill="#2A1215" />
          {/* Stem + wilted leaf */}
          <path d="M40 25C40 19 42 15 45 13" stroke="#452A14" strokeWidth="3" strokeLinecap="round" />
          <path d="M41 18C47 14 54 16 55 21C49 23 44 21 41 18Z" fill="#6D7D2B" stroke="#2D360F" strokeWidth="1.6" />
          {/* Bruise spot */}
          <ellipse cx="33" cy="48" rx="6" ry="7" fill="#52371A" opacity="0.65" />
        </svg>
      );

    case 'poop':
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          {/* Stink waves */}
          <path d="M27 22C25 18 29 15 27 11" stroke="#8FB844" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          <path d="M41 18C39 14 43 11 41 7" stroke="#8FB844" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          <path d="M54 23C52 19 56 16 54 12" stroke="#8FB844" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          {/* Swirl base */}
          <path d="M16 57C16 50 22 46 28 46H52C58 46 64 50 64 57C64 63 57 66 40 66C23 66 16 63 16 57Z" fill="#6B3E1B" stroke="#2B1507" strokeWidth="2.5" />
          <path d="M22 47C22 41 27 37 33 37H48C54 37 58 41 58 47C58 51 52 53 40 53C28 53 22 51 22 47Z" fill="#7D4921" stroke="#2B1507" strokeWidth="2.5" />
          <path d="M29 38C29 32 34 27 39 24C41 22 42 19 41 17C46 20 51 27 51 35C51 39 46 41 40 41C34 41 29 40 29 38Z" fill="#8C5327" stroke="#2B1507" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Gloss highlights */}
          <path d="M24 55C26 53 31 52 34 53" stroke="#A86B3B" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M30 43C32 41 36 41 39 41" stroke="#A86B3B" strokeWidth="2.2" strokeLinecap="round" />
          {/* Corn / texture detail */}
          <circle cx="48" cy="56" r="2.2" fill="#D9B236" />
          <circle cx="33" cy="47" r="1.6" fill="#4A2810" />
        </svg>
      );

    case 'mud_clod':
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          <path d="M20 45C17 36 24 25 36 22C46 19 59 24 62 35C66 46 60 60 47 62C34 64 23 56 20 45Z" fill="#4E331D" stroke="#26170B" strokeWidth="2.5" />
          <path d="M26 35C30 28 42 25 50 29C56 32 58 41 53 48" fill="#634227" />
          {/* Pebbles & grass blade */}
          <circle cx="34" cy="40" r="3.5" fill="#7D756D" stroke="#26170B" strokeWidth="1.5" />
          <circle cx="50" cy="48" r="2.8" fill="#8F857B" stroke="#26170B" strokeWidth="1.5" />
          <circle cx="43" cy="33" r="2" fill="#321F10" />
          <path d="M29 29C27 22 23 19 20 18" stroke="#5E7E2E" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M32 27C33 21 35 17 38 15" stroke="#719438" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'spoiled_food':
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          {/* Plate / mess base */}
          <ellipse cx="40" cy="55" rx="26" ry="11" fill="#D9D2C5" stroke="#403930" strokeWidth="2.2" />
          {/* Suspicious moldy spaghetti / mush */}
          <path d="M22 50C20 39 29 31 40 31C52 31 60 39 58 50C54 56 27 56 22 50Z" fill="#8F863B" stroke="#3B3A18" strokeWidth="2.2" />
          <path d="M27 42C33 38 40 44 47 39C52 36 55 41 54 45" stroke="#C2B35B" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M29 48C36 45 43 50 51 47" stroke="#A67C3B" strokeWidth="2.8" strokeLinecap="round" />
          {/* Green mold patches */}
          <circle cx="33" cy="36" r="4.5" fill="#6C9E38" stroke="#2D4515" strokeWidth="1.4" />
          <circle cx="49" cy="41" r="3.5" fill="#5A872C" stroke="#2D4515" strokeWidth="1.4" />
          {/* Fishbone sticking out */}
          <path d="M44 33L58 23M49 27L52 31M53 24L56 28" stroke="#EAE4D7" strokeWidth="2.2" strokeLinecap="round" />
          {/* Stink lines */}
          <path d="M34 24C32 20 35 17 34 14" stroke="#85AD36" strokeWidth="2" strokeLinecap="round" />
          <path d="M44 22C42 18 45 15 44 12" stroke="#85AD36" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'dirty_boot':
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          {/* Boot body */}
          <path d="M25 18H45L47 44C47 47 52 48 60 50C65 51 67 56 66 61H20L25 18Z" fill="#5E4027" stroke="#24160B" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Sole peeling open */}
          <path d="M19 61H66C66 65 62 66 56 66H20C18 66 18 63 19 61Z" fill="#2B2420" stroke="#14100E" strokeWidth="2" />
          <path d="M51 64L67 68" stroke="#2B2420" strokeWidth="4" strokeLinecap="round" />
          {/* Laces */}
          <path d="M38 25L45 27M39 31L46 33M40 37L47 39" stroke="#C9B99B" strokeWidth="2.2" strokeLinecap="round" />
          {/* Mud patches */}
          <ellipse cx="32" cy="53" rx="8" ry="5" fill="#3B2614" opacity="0.85" />
          <ellipse cx="53" cy="56" rx="6" ry="3.5" fill="#3B2614" opacity="0.85" />
          <circle cx="29" cy="36" r="3" fill="#3B2614" opacity="0.7" />
        </svg>
      );

    case 'trash_bag':
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          {/* Tied neck */}
          <path d="M35 16L40 24L47 16L43 26L46 29H34L37 26L35 16Z" fill="#2A2D30" stroke="#111214" strokeWidth="2" strokeLinejoin="round" />
          <path d="M33 27H47" stroke="#C94538" strokeWidth="3" strokeLinecap="round" />
          {/* Bag body */}
          <path d="M33 28C22 33 17 48 19 59C21 66 30 68 41 68C53 68 62 65 62 56C63 44 56 32 47 28H33Z" fill="#2B2E32" stroke="#101113" strokeWidth="2.5" />
          {/* Glossy plastic folds */}
          <path d="M27 36C24 43 24 52 27 59" stroke="#51575E" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M49 38C53 45 53 53 50 58" stroke="#51575E" strokeWidth="2.2" strokeLinecap="round" />
          {/* Leak & slime drip */}
          <path d="M52 57C56 59 57 65 53 68C50 67 50 61 52 57Z" fill="#7D963C" stroke="#2D3812" strokeWidth="1.5" />
          {/* Stink lines */}
          <path d="M24 22C22 18 25 15 23 12" stroke="#88AD3B" strokeWidth="2" strokeLinecap="round" />
          <path d="M56 23C54 19 57 16 55 13" stroke="#88AD3B" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'dirty_rag':
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          <path d="M22 23C31 19 46 21 57 25C61 31 59 42 63 52C57 59 48 56 42 61C34 64 25 59 19 55C18 44 21 33 22 23Z" fill="#8C8371" stroke="#363129" strokeWidth="2.4" strokeLinejoin="round" />
          {/* Stains & grime */}
          <ellipse cx="35" cy="39" rx="10" ry="7" fill="#5E523F" opacity="0.75" />
          <ellipse cx="49" cy="48" rx="7" ry="5" fill="#4D4231" opacity="0.7" />
          <path d="M27 29C34 33 43 32 52 29" stroke="#635B4C" strokeWidth="2" strokeLinecap="round" />
          {/* Dripping murky drops */}
          <path d="M31 61C31 66 28 69 27 66C27 63 30 61 31 61Z" fill="#635B4C" />
          <path d="M52 58C53 64 50 68 48 64C48 61 51 58 52 58Z" fill="#635B4C" />
        </svg>
      );

    case 'crumpled_paper':
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          <path d="M22 33L29 20L46 18L59 27L63 44L54 58L37 62L21 54L18 41L22 33Z" fill="#E3DAC8" stroke="#4D4538" strokeWidth="2.3" strokeLinejoin="round" />
          {/* Crumple creases */}
          <path d="M29 20L39 36L59 27M39 36L37 62M21 54L39 36L63 44M22 33L39 36" stroke="#8F8572" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M46 18L44 33L54 58" stroke="#B5AA96" strokeWidth="1.6" strokeLinejoin="round" />
          {/* Coffee stain */}
          <circle cx="48" cy="45" r="5" fill="#9E774E" opacity="0.45" />
        </svg>
      );

    case 'banana_peel':
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          {/* Top stem */}
          <path d="M38 14H44L43 24H37L38 14Z" fill="#6E531A" stroke="#2E2208" strokeWidth="2" />
          {/* Left peel petal */}
          <path d="M37 24C27 29 19 42 15 54C21 56 27 52 32 45C36 39 38 30 39 24Z" fill="#E8C335" stroke="#473609" strokeWidth="2.3" strokeLinejoin="round" />
          {/* Middle peel petal */}
          <path d="M39 24C36 35 37 50 42 62C47 61 49 54 47 43C45 34 43 28 41 24Z" fill="#F5D74C" stroke="#473609" strokeWidth="2.3" strokeLinejoin="round" />
          {/* Right peel petal */}
          <path d="M42 24C52 29 61 40 66 51C60 54 54 51 49 43C45 36 43 29 42 24Z" fill="#DEB62A" stroke="#473609" strokeWidth="2.3" strokeLinejoin="round" />
          {/* Brown spots */}
          <ellipse cx="25" cy="43" rx="3" ry="2" fill="#6B4A14" />
          <ellipse cx="56" cy="42" rx="3.2" ry="2" fill="#6B4A14" />
          <circle cx="43" cy="52" r="2.2" fill="#6B4A14" />
        </svg>
      );

    case 'rotten_egg':
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          <path d="M40 16C28 16 20 33 20 47C20 59 29 66 40 66C51 66 60 59 60 47C60 33 52 16 40 16Z" fill="#E6DEC8" stroke="#474133" strokeWidth="2.4" />
          {/* Crack */}
          <path d="M27 38L34 43L40 37L46 44L53 38" stroke="#474133" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Greenish stink leak */}
          <path d="M37 42C36 49 38 56 41 56C44 56 44 47 42 41Z" fill="#A5BA32" />
          <circle cx="33" cy="30" r="3" fill="#B5B89A" opacity="0.7" />
          <path d="M39 11C37 8 41 5 39 2" stroke="#8EB336" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'wet_fish':
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          {/* Tail */}
          <path d="M56 40L69 27L66 40L69 53L56 40Z" fill="#6A859C" stroke="#22303D" strokeWidth="2.3" strokeLinejoin="round" />
          {/* Body */}
          <path d="M12 40C18 26 41 25 58 40C41 55 18 54 12 40Z" fill="#88A5BD" stroke="#22303D" strokeWidth="2.4" strokeLinejoin="round" />
          {/* Belly highlight */}
          <path d="M16 42C24 49 42 49 52 42" stroke="#CFE0ED" strokeWidth="3" strokeLinecap="round" />
          {/* X eye & gills */}
          <path d="M20 36L24 40M24 36L20 40" stroke="#1E2832" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M30 33C32 37 32 43 30 47" stroke="#364C5E" strokeWidth="2" strokeLinecap="round" />
          {/* Water droplets */}
          <path d="M35 55C35 59 32 61 31 58C31 56 34 55 35 55Z" fill="#A6D1ED" />
          <path d="M47 53C47 57 44 59 43 56C43 54 46 53 47 53Z" fill="#A6D1ED" />
        </svg>
      );

    case 'cream_pie':
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          {/* Tin */}
          <path d="M16 47H64L57 62H23L16 47Z" fill="#C4C9CE" stroke="#383C40" strokeWidth="2.3" strokeLinejoin="round" />
          {/* Cream mountain */}
          <path d="M17 47C16 37 24 32 31 32C33 23 47 21 49 32C57 32 64 37 63 47H17Z" fill="#FFF8EB" stroke="#4D4233" strokeWidth="2.3" strokeLinejoin="round" />
          {/* Cherry */}
          <circle cx="41" cy="22" r="5" fill="#D9293E" stroke="#4D0C14" strokeWidth="2" />
          <path d="M42 17C44 13 48 11 51 12" stroke="#3D611D" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'stinky_sock':
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          <path d="M30 16H47L45 43L61 52C65 55 64 62 58 64C50 66 36 59 29 53C26 50 26 45 27 40L30 16Z" fill="#B5B398" stroke="#363529" strokeWidth="2.4" strokeLinejoin="round" />
          {/* Stripe cuffs */}
          <path d="M30 22H46M29 27H46" stroke="#8C3E32" strokeWidth="2.6" />
          {/* Green grime & hole */}
          <ellipse cx="52" cy="57" rx="6" ry="4" fill="#6E822B" opacity="0.8" />
          <circle cx="58" cy="56" r="2.2" fill="#3B3328" />
          {/* Stink waves */}
          <path d="M56 36C54 32 58 29 56 25" stroke="#85A832" strokeWidth="2" strokeLinecap="round" />
          <path d="M64 41C62 37 66 34 64 30" stroke="#85A832" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
  }
};

const SplatArt: React.FC<{ id: ItemId; className?: string }> = ({ id, className = 'w-20 h-20' }) => {
  switch (id) {
    case 'rotten_tomato':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path d="M48 18C55 12 63 23 68 29C78 26 86 35 77 44C87 52 80 67 68 64C64 76 54 89 49 77C41 85 28 76 31 64C18 67 14 52 24 45C15 37 22 25 33 30C36 21 43 22 48 18Z" fill="#B82318" stroke="#4D0B07" strokeWidth="2.2" />
          <ellipse cx="47" cy="48" rx="16" ry="13" fill="#D93B2B" />
          {/* Tomato seeds */}
          <ellipse cx="42" cy="45" rx="2.5" ry="1.4" transform="rotate(20 42 45)" fill="#F2CF66" />
          <ellipse cx="53" cy="49" rx="2.5" ry="1.4" transform="rotate(-35 53 49)" fill="#F2CF66" />
          <ellipse cx="46" cy="56" rx="2.2" ry="1.3" fill="#F2CF66" />
          {/* Drip */}
          <path d="M52 72C53 84 49 92 47 86C46 80 48 73 52 72Z" fill="#B82318" />
          <path d="M35 67C35 77 32 82 30 77C29 73 32 68 35 67Z" fill="#9E1C13" />
          {/* Mold */}
          <circle cx="57" cy="41" r="4" fill="#6F8A2C" opacity="0.8" />
        </svg>
      );

    case 'rotten_apple':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path d="M46 22C58 20 71 29 74 42C80 51 70 67 59 67C52 74 37 73 31 64C20 61 17 44 26 36C27 25 38 23 46 22Z" fill="#8C5D2B" stroke="#36200B" strokeWidth="2.2" />
          <ellipse cx="49" cy="46" rx="15" ry="11" fill="#C49A5C" />
          <ellipse cx="48" cy="46" rx="3" ry="4.5" fill="#3B230E" />
          <circle cx="54" cy="48" r="1.5" fill="#2A1708" />
          <path d="M42 68C43 79 39 85 38 80C37 75 40 69 42 68Z" fill="#754C21" />
        </svg>
      );

    case 'poop':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path d="M47 20C58 17 69 27 72 38C82 44 80 61 68 64C64 77 48 77 41 69C31 74 19 63 23 51C14 44 21 29 33 31C36 23 42 21 47 20Z" fill="#6B3E1B" stroke="#2B1507" strokeWidth="2.4" />
          <ellipse cx="49" cy="47" rx="16" ry="12" fill="#7D4921" />
          <circle cx="42" cy="45" r="2.6" fill="#D9B236" />
          <circle cx="56" cy="51" r="2" fill="#4A2810" />
          {/* Drip & flies */}
          <path d="M51 70C53 84 48 92 46 85C45 79 48 71 51 70Z" fill="#593214" />
          <path d="M35 20C33 14 37 11 35 6" stroke="#85A832" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M55 18C53 12 57 9 55 4" stroke="#85A832" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );

    case 'mud_clod':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path d="M45 19C59 17 69 29 76 39C85 48 76 66 64 66C57 78 40 75 34 65C20 64 15 47 25 38C26 26 36 21 45 19Z" fill="#4B311B" stroke="#24150A" strokeWidth="2.2" />
          <circle cx="23" cy="24" r="4" fill="#4B311B" />
          <circle cx="77" cy="28" r="3.5" fill="#4B311B" />
          <circle cx="75" cy="71" r="4.5" fill="#4B311B" />
          <circle cx="43" cy="46" r="3.5" fill="#7D756D" />
          <path d="M47 71C48 84 44 91 42 84C41 79 44 72 47 71Z" fill="#3D2614" />
        </svg>
      );

    case 'spoiled_food':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path d="M35 23C51 18 68 25 74 40C81 55 68 70 53 69C41 76 23 68 23 52C17 39 24 27 35 23Z" fill="#7E8A35" stroke="#313812" strokeWidth="2.2" />
          <path d="M34 42C42 36 52 46 61 40" stroke="#C9B75B" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="41" cy="54" r="5.5" fill="#5D8A2B" />
          <circle cx="57" cy="53" r="4" fill="#9E6D3B" />
          <path d="M49 69C51 82 46 89 44 83C43 77 46 70 49 69Z" fill="#6F7A2D" />
        </svg>
      );

    case 'rotten_egg':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Egg white splat */}
          <path d="M47 18C61 16 74 26 76 41C83 52 72 68 58 67C49 77 32 72 28 60C16 55 18 35 30 30C33 21 40 19 47 18Z" fill="#EDE6D1" stroke="#6E6650" strokeWidth="2" />
          {/* Sickly green-yellow yolk */}
          <ellipse cx="48" cy="46" rx="14" ry="12" fill="#C4D43B" stroke="#7A871B" strokeWidth="2" />
          {/* Shell fragments */}
          <polygon points="30,30 37,35 32,41" fill="#FFFDF7" stroke="#6E6650" strokeWidth="1.5" />
          <polygon points="62,33 69,39 61,43" fill="#FFFDF7" stroke="#6E6650" strokeWidth="1.5" />
          {/* Runny yolk drip */}
          <path d="M48 56C50 75 45 87 43 79C42 71 45 59 48 56Z" fill="#C4D43B" />
        </svg>
      );

    case 'cream_pie':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path d="M48 15C63 14 75 26 79 40C87 52 76 71 61 70C51 81 31 76 26 62C12 56 15 35 28 29C31 19 40 16 48 15Z" fill="#FFF8EC" stroke="#B8A382" strokeWidth="2.2" />
          <circle cx="21" cy="25" r="4.5" fill="#FFF8EC" />
          <circle cx="80" cy="31" r="4" fill="#FFF8EC" />
          <circle cx="75" cy="70" r="5" fill="#FFF8EC" />
          {/* Squished cherry */}
          <ellipse cx="52" cy="47" rx="6" ry="5" fill="#D9293E" />
          <path d="M45 69C47 83 42 92 40 85C39 78 42 70 45 69Z" fill="#FFF8EC" />
        </svg>
      );

    default:
      return <ItemArt id={id} variant="item" className={className} />;
  }
};
