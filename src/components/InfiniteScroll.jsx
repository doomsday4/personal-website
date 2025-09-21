export default function TravelInfiniteScroll() {
  const filenames = [
    'Coldplay, Mumbai3.jpg',
    'Goa1.jpg',
    'Goa2.jpg',
    'Goa3.jpg',
    'Japan10.jpg',
    'Japan11.jpg',
    'Japan12.jpg',
    'Japan13.jpg',
    'Japan2.jpg',
    'Japan3.jpg',
    'Japan4.jpg',
    'Japan5.jpg',
    'Japan6.jpg',
    'Japan7.jpg',
    'Japan8.jpg',
    'Japan9.jpg',
    'Kasol, Himachal Pradesh1.jpg',
    'Kasol2.jpg',
    'Manali, Himachal Pradesh1.jpg',
    'Manali2.jpg',
    'Manali3.jpg',
    'Mt. Fuji, Japan1.jpg',
    'Mumbai1.jpg',
    'Mumbai2.jpg',
    'Vietnam1.jpg',
    'Vietnam2.jpg'
  ];

  const toCaption = (name) => {
    const base = name.replace(/\.[^.]+$/, '');
    const withoutDigits = base.replace(/\d+$/, '');
    // Normalize separators
    let label = withoutDigits.trim().replace(/[_-]+/g, ' ');
    // Drop ", Himachal Pradesh" or standalone "Himachal Pradesh"
    label = label.replace(/,\s*Himachal\s*Pradesh/gi, '');
    label = label.replace(/\bHimachal\s*Pradesh\b/gi, '');
    // Clean leftover commas/extra spaces
    label = label.replace(/\s+,/g, ',').replace(/,+$/g, '').replace(/\s{2,}/g, ' ').trim();
    return label;
  };

  const files = filenames.map((f) => {
    const caption = toCaption(f);
    const src = new URL(`../assets/travel/${f}`, import.meta.url).href;
    return { src, alt: caption, caption, place: caption };
  });

  // Shuffle while avoiding consecutive same place
  const groups = files.reduce((acc, item) => {
    (acc[item.place] ||= []).push(item);
    return acc;
  }, {});
  Object.values(groups).forEach((arr) => arr.sort(() => Math.random() - 0.5));
  const order = Object.keys(groups).sort((a, b) => groups[b].length - groups[a].length);

  const arranged = [];
  let lastPlace = '';
  while (true) {
    let progressed = false;
    for (let i = 0; i < order.length; i++) {
      const key = order[i];
      const bucket = groups[key];
      if (!bucket || bucket.length === 0) continue;
      if (key === lastPlace) continue;
      arranged.push(bucket.shift());
      lastPlace = key;
      progressed = true;
    }
    // If we couldn't progress because of adjacency constraint, relax once
    const remaining = Object.values(groups).reduce((sum, a) => sum + a.length, 0);
    if (!progressed && remaining > 0) {
      for (let i = 0; i < order.length; i++) {
        const key = order[i];
        const bucket = groups[key];
        if (!bucket || bucket.length === 0) continue;
        arranged.push(bucket.shift());
        lastPlace = key;
        progressed = true;
        break;
      }
    }
    if (!progressed) break;
  }

  const duplicated = [...arranged, ...arranged];

  return (
    <div className="relative">
      <style>
        {`
          .marquee-container {
            --gap: 0.5rem;
            --duration: 80s;
            position: relative;
            overflow: hidden;
          }
          .marquee-track {
            display: flex;
            align-items: stretch;
            gap: var(--gap);
            width: max-content;
            animation: marquee-left var(--duration) linear infinite;
            will-change: transform;
          }
          .marquee-container:hover .marquee-track { animation-play-state: paused; }
          .marquee-track figure { transition: transform 200ms ease, box-shadow 200ms ease; }
          .marquee-track figure:hover { transform: scale(1.06); z-index: 5; box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
          @keyframes marquee-left {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .marquee-fade {
            position: absolute;
            top: 0; bottom: 0;
            width: 48px;
            pointer-events: none;
          }
          .marquee-fade--left {
            left: 0;
            background: linear-gradient(90deg, rgba(2,6,23,0.85), rgba(2,6,23,0));
          }
          .marquee-fade--right {
            right: 0;
            background: linear-gradient(270deg, rgba(2,6,23,0.85), rgba(2,6,23,0));
          }
          .dark .marquee-fade--left {
            background: linear-gradient(90deg, rgba(2,6,23,0.95), rgba(2,6,23,0));
          }
          .dark .marquee-fade--right {
            background: linear-gradient(270deg, rgba(2,6,23,0.95), rgba(2,6,23,0));
          }
        `}
      </style>

      <div className="marquee-container">
        <div className="marquee-track">
          {duplicated.map((photo, index) => (
            <figure
              key={`${photo.src}-${index}`}
              className="relative flex-none"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="block h-[200px] md:h-[240px] w-auto object-contain"
                loading="lazy"
              />
              <figcaption className="absolute bottom-2 left-2 chip-glass px-2 py-1 rounded-full text-xs md:text-sm text-gray-900 dark:text-gray-100">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="marquee-fade marquee-fade--left" aria-hidden="true" />
        <div className="marquee-fade marquee-fade--right" aria-hidden="true" />
      </div>
    </div>
  );
}


