import { useRef } from "react";
import { gsap } from "gsap/gsap-core";
import { useGSAP } from "@gsap/react";
import { scoreToStrokeColor } from "@/utils/score";

interface Props {
  score: number;
  size?: number;
}

export function ScoreGauge({ score, size = 200 }: Props) {
  const containerRef = useRef<SVGSVGElement>(null);
  const arcRef = useRef<SVGCircleElement>(null);
  const textRef = useRef<SVGTextElement>(null);

  const cx = size / 2;
  const cy = size / 2;
  const strokeWidth = 12;
  const radius = size / 2 - strokeWidth - 4;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * (270 / 360);
  const fillOffset = arcLength - (arcLength * score) / 100;

  useGSAP(
    () => {
      gsap.fromTo(
        arcRef.current,
        { strokeDashoffset: arcLength },
        { strokeDashoffset: fillOffset, duration: 1.2, ease: "power2.out" },
      );

      const counter = { val: 0 };
      gsap.to(counter, {
        val: score,
        duration: 1.2,
        ease: "power2.out",
        onUpdate() {
          if (textRef.current) {
            textRef.current.textContent = Math.round(counter.val).toString();
          }
        },
      });
    },
    { scope: containerRef, dependencies: [score] },
  );

  return (
    <svg
      ref={containerRef}
      width={size}
      height={size}
      role="img"
      aria-label={`Score: ${score} out of 100`}
    >
      {/* Full 270deg sweep */}
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke="currentColor"
        className="text-gray-200 dark:text-gray-700"
        strokeWidth={strokeWidth}
        strokeDasharray={`${arcLength} ${circumference}`}
        strokeLinecap="round"
        transform={`rotate(-225 ${cx} ${cy})`}
      />
      {/* Full arc colored by score, offset determines how much shows */}
      <circle
        ref={arcRef}
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke={scoreToStrokeColor(score)}
        strokeWidth={strokeWidth}
        strokeDasharray={`${arcLength} ${circumference}`}
        strokeDashoffset={fillOffset}
        strokeLinecap="round"
        transform={`rotate(-225 ${cx} ${cy})`}
      />
      <text
        ref={textRef}
        x={cx}
        y={cy - 2}
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-current text-gray-900 dark:text-white"
        fontSize={size * 0.22}
        fontWeight="700"
        fontFamily="inherit"
      >
        {score}
      </text>
      <text
        x={cx}
        y={cy + size * 0.14}
        textAnchor="middle"
        className="fill-current text-gray-400 dark:text-gray-500"
        fontSize={13}
        fontFamily="inherit"
      >
        / 100
      </text>
    </svg>
  );
}
