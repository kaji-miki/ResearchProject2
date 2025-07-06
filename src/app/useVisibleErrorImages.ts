import { useEffect, useRef, useState } from 'react';

export const useVisibleErrorImages = (errorFields: string[]) => {
  const questionKeys = Array.from({ length: 20 }, (_, i) => `q${i + 1}`);

  const refs: Record<string, React.RefObject<HTMLDivElement | null>> = Object.fromEntries(
    questionKeys.map((key) => [key, useRef<HTMLDivElement>(null)])
  );

  const [visible, setVisible] = useState<Record<string, boolean>>(
    Object.fromEntries(questionKeys.map((key) => [key, false]))
  );

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    questionKeys.forEach((key) => {
      const ref = refs[key];
      if (!ref?.current) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setVisible((prev) => ({
            ...prev,
            [key]: entry.isIntersecting && errorFields.includes(key),
          }));
        },
        { threshold: 0.4 }
      );

      observer.observe(ref.current);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [errorFields]);

  return { refs, visible };
};
